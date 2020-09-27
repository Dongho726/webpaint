const canvas=document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control');


let drawingMode; //true일 때만 그리기
let brush= 'color'; //color 
let colorVal = 'black'; //default값으로 검은색 설정
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
brush = event.target.getAttribute('data-type');
colorVal = event.target.getAttribute('data-color');
context.strokeStyle=colorVal;
console.log(brush);
}




canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', uphandler);
control.addEventListener('click', setColor);