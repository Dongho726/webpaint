const canvas=document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const controlColor = document.querySelector('.controlColor');
const range = document.getElementById("jsRange");

canvas.width=700;
canvas.height=700;

let drawingMode; //true일 때만 그리기
context.strokeStyle = "#2c2c2c";
context.lineWidth = 2.5;


function downHandler(){
 drawingMode=true; //클릭하면 참으로
}

function uphandler(){
 drawingMode=false; //마우스떼면 거짓으로
}

function moveHandler(event){
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

function setColor(event){
  context.strokeStyle=controlColor.value;
}

function handleRangeChange(event){
  const size = event.target.value;
  context.lineWidth=size;
}


if(range){ 
  range.addEventListener("input", handleRangeChange)
}

canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', uphandler);
controlColor.addEventListener('input', setColor);
