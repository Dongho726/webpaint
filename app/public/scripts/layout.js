const title = document.querySelector('.maintitle');
const searchMenu = document.querySelector('.searchMenu');
const drawMenu = document.querySelector('.drawMenu');
const createMenu = document.querySelector('.createMenu');
const userMenu = document.querySelector('.userMenu');

let logindata = {
  islogined : false,
  username : null,
  id : null,
  img : null,
};

let query = {};
fetch('/login/query',{
  method:'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(query)
}).then(function(res){
  return res.text();
}).then(function(data){
  const parsedData = JSON.parse(data);
  //parsedData is object
  if(parsedData.login){
    userMenu.innerHTML = `<img src='https://webpaint.s3.ap-northeast-2.amazonaws.com/${parsedData.data.img}'>`;
    logindata.islogined = true;
    logindata.username = parsedData.data.username;
    logindata.id = parsedData.data.id;
    logindata.img = parsedData.data.img;
  }else{
    userMenu.innerHTML = 'Login';
    logindata.islogined = false;
    logindata.username = null;
    logindata.id = null;
    logindata.img = null;
  }
});


title.addEventListener('click',function(){
  location.href = '/';
});
searchMenu.addEventListener('click',function(){
  location.href = '/search'
});
drawMenu.addEventListener('click',function(){
  location.href = '/draw'
});
createMenu.addEventListener('click',function(){
  location.href = '/create'
});
userMenu.addEventListener('click',function(){
  if(!logindata.islogined){
    location.href = '/login'
  }
  else{
    location.href = `/profile/${logindata.id}`
  }
});
