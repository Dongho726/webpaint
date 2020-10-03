const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const controlColor = document.querySelector('.controlColor');
const range = document.getElementById("jsRange");
const drawChoose=document.getElementById("jsDraw");
const circleChoose=document.getElementById("jsCircle");
const triangleChoose=document.getElementById("jsTriangle");
const rectangleChoose=document.getElementById("jsRectangle");
const fullChoose=document.getElementById("jsFull");
const textChoose=document.getElementById("jsText");
const saveBtn=document.getElementById("jsSave");
const restoreBtn=document.getElementById("restore");
const eraseBtn=document.getElementById("erase");
const canvasid=document.querySelector('.canvasid').innerHTML;

fetch(`/draw/${canvasid}/load`,{
    method:'POST'
  }).then(function(res){
    return res.text();
  }).then(function(data){
    const parsedData = JSON.parse(data);
    console.log(parsedData);
  });

const width = 912;
const height = 513;

canvas.width=width;
canvas.height=height;

let drawingMode; //true일 때만 그리기
let chooseMode='draw'; // mode가 어떤 건지 확인
let full=true; // true면 색깔 다 채워지기, false이면 선만 그리기
let textInput; // text 입력 받기
let sizeFont=0; // 주어진 크기에 맞게 font 크기 조정
let x=0; // 도형 그릴 때 x축 초기값 설정
let y=0; // 도형 그릴 때 y축 초기값 설정
context.fillStyle="white"; // 사진저장 배경을 위해 설정
context.fillRect(0, 0, canvas.width, canvas.height); // 사진저장 배경을 위해 설정
context.strokeStyle = "#2c2c2c";
context.fillStyle="#2c2c2c";
context.lineWidth = 2.5;
var drawBack= new Array;

function downHandler(event){
    saveCanvas();
    drawingMode=true; //클릭하면 참으로

    x=event.offsetX; // 도형 그릴 때 초기값 설정
    y=event.offsetY; // 도형 그릴 때 초기값 설정
}

function upHandler(event){
    if(drawingMode===true){ // draw일 때
        drawingMode=false; //마우스떼면 거짓으로
    }
    const lastX=event.offsetX;
    const lastY=event.offsetY;
    if(chooseMode==='circle'){ // circle일 때
        context.beginPath();
        context.arc((x+lastX)/2, (y+lastY)/2, (Math.abs(lastX-x)+Math.abs(lastY-y))/4, 0, 2*Math.PI, 1);
        if(full===true){
            context.fill();
        }else{
            context.stroke();
        }
    } else if(chooseMode==='triangle'){ // triangle일 때
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(lastX, lastY);
        context.lineTo(2*x-lastX, lastY);
        context.closePath();
        if(full===true){
            context.fill();
        }else{
            context.stroke();
        }
    } else if(chooseMode==='rectangle'){ // rectangle일 때
        if(full===true){
            context.fillRect(x,y,lastX-x, lastY-y);
        }else{
            context.strokeRect(x,y,lastX-x, lastY-y);
        }
    } else if(chooseMode==='text'){ // text일 때
        sizeFont=Math.abs(x-lastX)/textInput.length*1.5;

        context.font=sizeFont+"px sans-serif";
        context.fillText(textInput, x, y+sizeFont);
    }
    sendToServer();
}

function moveHandler(event){
    if(chooseMode==='draw'){
        const x = event.offsetX;  //mousepointer의 x
        const y = event.offsetY;  //mousepointer의 y

        if(!drawingMode) {
            context.beginPath();
            context.moveTo(x, y);
        }
        else {
            context.lineTo(x, y);
            context.stroke();
        }
    }
}

function setColor(event){
  context.strokeStyle=controlColor.value;
  context.fillStyle=controlColor.value;
}

function handleDrawClick(){ // draw 눌렀을 때 실행
    context.globalCompositeOperation='source-over';
    chooseMode='draw';
}

function handleCircleClick(){ // circle 눌렀을 때 실행
    chooseMode='circle';
}

function handleTriangleClick(){ // triangle 눌렀을 때 실행
    chooseMode='triangle';
}

function handleRectangleClick(){ // rectangle 눌렀을 때 실행
    chooseMode='rectangle';
}

function handleEraseClick() {  //Erase 눌렀을 때 실행
    context.globalCompositeOperation = 'destination-out';  
    
  }

function handleFullClick(){ // 도형 타입 설정
    if(full===true){
        full=false;
        fullChoose.innerText="Line";
    } else{
        full=true;
        fullChoose.innerText="Full";
    }
}


function handleRangeChange(event){
  const size = event.target.value;
  context.lineWidth=size;
}

function handleTextClick(){ // text 눌렀을 때 실행
    textInput=document.getElementById("input_Text").value;

    chooseMode='text';
}

function handleSaveClick(){ // Save 눌렀을 때 실행
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="WebPaint";
    link.click();
}

function handleCM(event){ // 우클릭으로 사진저장 방지
    event.preventDefault();
}

function saveCanvas(){  //현재 그리기 상태 저장
    drawBack.push(context.getImageData(0, 0, canvas.width, canvas.height));
}


function prevCanvas(event) {  //되돌리기
    if(drawBack.length>0){
        context.putImageData(drawBack.pop(), 0, 0);
        sendToServer();
    }
}

function sendToServer(){
    console.log('sendtoserver');
    canvas.toBlob(function(blob){
        var formdata = new FormData();
        formdata.append("img",blob);
        fetch(`/draw/${canvasid}/submit`,{
        method:'POST',
        body: formdata
      });
    });
}

controlColor.addEventListener("input", setColor);
range.addEventListener("input", handleRangeChange)
canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', upHandler);
drawChoose.addEventListener("click", handleDrawClick);
circleChoose.addEventListener("click", handleCircleClick);
triangleChoose.addEventListener("click", handleTriangleClick);
rectangleChoose.addEventListener("click", handleRectangleClick);
fullChoose.addEventListener("click", handleFullClick);
textChoose.addEventListener("click", handleTextClick);
saveBtn.addEventListener("click", handleSaveClick);
canvas.addEventListener("contextmenu", handleCM);
restoreBtn.addEventListener("click", prevCanvas);
eraseBtn.addEventListener("click", handleEraseClick);
