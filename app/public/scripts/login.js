const username = document.getElementById('login_username');
const password = document.getElementById('login_password');
const submit = document.getElementById('login_submit');

submit.addEventListener('click',function(){
  let loginData = {
    username : username.value,
    password : password.value
  };
  fetch('/login/submit',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  }).then(function(res){
    return res.text();
  }).then(function(data){
    const parsedData = JSON.parse(data);
    if(parsedData.login === false){
      alert('로그인 정보가 일치하지 않습니다');
    }else{
      location.href="/";
    }
  });
});
