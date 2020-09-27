const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const controlColor = document.querySelector('.controlColor');
const range = document.getElementById("jsRange");
const drawChoose=document.getElementById("jsDraw");
const circleChoose=document.getElementById("jsCircle");
const triangleChoose=document.getElementById("jsTriangle");
const rectangleChoose=document.getElementById("jsRectangle");
const modeSpace=document.getElementById("jsModeSpace");
const saveBtn=document.getElementById("jsSave");

canvas.width=800;
canvas.height=600;

let drawingMode; //true일 때만 그리기
let draw=true; // true일 때 drawing 하기
let circle=false; // true일 때 circle 그리기
let triangle=false; // true일 때 triangle 그리기
let rectangle=false; // rectangle일 때 rectangle 그리기
let full=true; // true면 색깔 다 채워지기, false이면 선만 그리기
let x=0; // 도형 그릴 때 x축 초기값 설정
let y=0; // 도형 그릴 때 y축 초기값 설정
context.fillStyle="white"; // 사진저장 배경을 위해 설정
context.fillRect(0, 0, canvas.width, canvas.height); // 사진저장 배경을 위해 설정
context.strokeStyle = "#2c2c2c";
context.fillStyle="#2c2c2c";
context.lineWidth = 2.5;


function downHandler(event){
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
    if(circle===true){ // circle일 때
        context.beginPath();
        context.arc((x+lastX)/2, (y+lastY)/2, (Math.abs(lastX-x)+Math.abs(lastY-y))/4, 0, 2*Math.PI, 1);
        if(full===true){
            context.fill();
        }else{
            context.stroke();
        }
    } else if(triangle===true){ // triangle일 때
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
    } else if(rectangle===true){ // rectangle일 때
        if(full===true){
            context.fillRect(x,y,lastX-x, lastY-y);
        }else{
            context.strokeRect(x,y,lastX-x, lastY-y);
        }
    }
}

function moveHandler(event){
    if(draw===true){
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
    draw=true; 
    circle=false;
    triangle=false;
    rectangle=false;
}

function handleCircleClick(){ // circle 눌렀을 때 실행
    draw=false; 
    circle=true;
    triangle=false;
    rectangle=false;
}

function handleTriangleClick(){ // triangle 눌렀을 때 실행
    draw=false;
    circle=false;
    triangle=true;
    rectangle=false;
}

function handleRectangleClick(){ // rectangle 눌렀을 때 실행
    draw=false;
    circle=false; 
    triangle=false; 
    rectangle=true;
}

function handleModeSpaceClick(){ // 도형 타입 설정
    if(full===true){
        full=false;
        modeSpace.innerText="Line";
    } else{
        full=true;
        modeSpace.innerText="Full";
    }
}


function handleRangeChange(event){
  const size = event.target.value;
  context.lineWidth=size;
}

function handleSaveClick(){ // Save
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="WebPaint";
    link.click();
}

function handleCM(event){ // 우클릭으로 사진저장 방지
    event.preventDefault();
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
modeSpace.addEventListener("click", handleModeSpaceClick);
saveBtn.addEventListener("click", handleSaveClick);
canvas.addEventListener("contextmenu", handleCM);