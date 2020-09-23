const username = document.getElementById('signup_username');
const password = document.getElementById('signup_password');
const confirmPassword = document.getElementById('signup_confirm');
const submit = document.getElementById('signup_submit');

let usernameLength = false; // true가 올바른 길이
let passwordLength = false; // true가 올바른 길이
let comfimMatch = false; // true가 비밀번호 일치
let duplicate = false; // true가 username 중복되지 않음

// username 길이 체크
function checkUsernameLength(){
  if(username.value.length > 20){
    usernameLength = false;
  }
  else if(username.value.length < 4){
    usernameLength = false;
  }
  else{
    usernameLength = true;
  }
}

// password 길이 체크
function checkPasswordLength(){
  if(password.value.length < 8){
    passwordLength = false;
  }
  else if(password.value.length > 30){
    passwordLength = false;
  }
  else{
    passwordLength = true;
  }
}

// confirm 비밀번호 일치 체크
function checkMatch(){
  if(password.value != confirmPassword.value){
    comfimMatch = false;
  }
  else{
    comfimMatch = true;
  }
}

// username 중복 체크
function checkDuplicate(){
  // 서버에 보낼 객체 생성
  let usernameCheck = {
    username : username.value
  };
  // 서버에 전송
  fetch('/signup/duplicate',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usernameCheck)
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
username.addEventListener('blur',function(){
  if(username.value != ''){
    checkUsernameLength();
    checkDuplicate();
  }
});
password.addEventListener('blur',function(){
  if(password.value != ''){
    checkPasswordLength();
  }
});
confirmPassword.addEventListener('blur',function(){
  if(confirmPassword.value != ''){
    checkMatch();
  }
});

submit.addEventListener('click',function(){
  if(username.value == ''){
    alert('username을 입력해주세요');
  }
  else if(password.value == ''){
    alert('password를 입력해주세요');
  }
  else if(confirmPassword.value == ''){
    alert('confirm pasword를 입력해주세요');
  }
  else if(!usernameLength){
    alert('username은 4~20글자 입니다');
  }
  else if(!duplicate){
    alert('이미 사용중인 username입니다');
  }
  else if(!passwordLength){
    alert('password는 8~30글자 입니다');
  }
  else if(!comfimMatch){
    alert('confirm password가 일치하지 않습니다');
  }
  else{
    // 모든 조건 충족
    let registerData = {
      username : username.value,
      password : password.value
    };
    // 서버에 전송
    fetch('/signup/submit',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    }).then(function(res){
      return res.text();
    }).then(function(data){
      const parsedData = JSON.parse(data);
      if(parsedData.registered === true){
          alert(`${username.value} 회원가입 성공!`);
          location.href="/login";
      }else{
        alert(`회원가입 실패. 다시 시도해주세요.`);
      }
    });
  }
});
