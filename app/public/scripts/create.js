const createName = document.querySelector('.createName');
const submitBtn = document.querySelector('.submitBtn');
const createSubmit = document.querySelector('.createSubmit');

let createNameLength = false; // true가 올바른 길이
let duplicate = false; // true가 name 중복되지 않음

function checkNameLength(){
  if(createName.value.length > 20){
    createNameLength = false;
  }
  else if(createName.value.length < 4){
    createNameLength = false;
  }
  else{
    createNameLength = true;
  }
}

function checkDuplicate(){
  // 서버에 보낼 객체 생성
  let createNameCheck = {
    createName : createName.value
  };
  // 서버에 전송
  fetch('/create/duplicate',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createNameCheck)
  }).then(function(res){
    return res.text();
  }).then(function(data){
    const parsedData = JSON.parse(data);
    if(parsedData.duplicated === false){
      duplicate = true;
    }
    else{
      duplicate = false;
    }
  });
}

createName.addEventListener('blur', checkDuplicate);

submitBtn.addEventListener('click', function(){
  checkNameLength();
  checkDuplicate();
  if(createName.value == ''){
    alert('name을 입력해주세요');
  }
  else if(!createNameLength){
    alert('name은 4~20글자 입니다');
  }
  else if(!duplicate){
    alert('이미 사용중인 name입니다');
  }
  else{
    createSubmit.click();
  }
});
