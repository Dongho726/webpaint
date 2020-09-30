const imgBtn = document.querySelector('.profile button');
const profileID = document.querySelector('.profileId').innerHTML;
const imgInput = document.querySelector('.imgupload');
const intro = document.querySelector('.introValue');


loginEvent.addEventListener('click', function(){
  console.log(logindata);
  if(profileID == logindata.id){
    imgBtn.classList.remove('hide');
    intro.readOnly = false;
  }
});

imgBtn.addEventListener('click', function(){
  imgInput.click();
});
