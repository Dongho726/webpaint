const canvas=document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const controlColor = document.querySelector('.controlColor');
const range = document.getElementById("jsRange");
const canvas=document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control');
const drawChoose=document.getElementById("jsDraw");
const circleChoose=document.getElementById("jsCircle");
const triangleChoose=document.getElementById("jsTriangle");
const rectangleChoose=document.getElementById("jsRectangle");

canvas.width=700;
canvas.height=700;

let drawingMode; //true일 때만 그리기
let draw=true; // true일 때 drawing 하기
let circle=false; // true일 때 circle 그리기
let triangle=false; // true일 때 triangle 그리기
let rectangle=false; // rectangle일 때 rectangle 그리기
let brush= 'color'; //color 
let colorVal = 'black'; //default값으로 검은색 설정
let x=0; // 도형 그릴 때 x축 초기값 설정
let y=0; // 도형 그릴 때 y축 초기값 설정
context.strokeStyle = "#2c2c2c";
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
        context.fill();
    } else if(triangle===true){ // triangle일 때
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(lastX, lastY);
        context.lineTo(2*x-lastX, lastY);
        context.closePath();
        context.fill();
    } else if(rectangle===true){ // rectangle일 때
        context.fillRect(x,y,lastX-x, lastY-y);
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

if(range){ 
  range.addEventListener("input", handleRangeChange)
}

canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', upHandler);
control.addEventListener('click', setColor);

if(drawChoose){ // draw 버튼 눌렀을 때
    drawChoose.addEventListener("click", handleDrawClick);
}

if(circleChoose){ // circle 버튼 눌렀을 때
    circleChoose.addEventListener("click", handleCircleClick);
}

if(triangleChoose){ // triangle 버튼 눌렀을 때
    triangleChoose.addEventListener("click", handleTriangleClick);
}

if(rectangleChoose){ // rectangle 버튼 눌렀을 때
    rectangleChoose.addEventListener("click", handleRectangleClick);
}
