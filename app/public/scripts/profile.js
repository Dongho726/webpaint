const imgBtn = document.querySelector('.profile button');
const profileID = document.querySelector('.profileId').innerHTML;
const imgInput = document.querySelector('.imgupload');
const intro = document.querySelector('.introValue');
const imgsubmit = document.querySelector('.imgsubmit');
const introsubmit = document.querySelector('.introsubmit');

const initialIntro = intro.value;

loginEvent.addEventListener('click', function(){
  if(profileID == logindata.id){
    imgBtn.classList.remove('hide');
    intro.readOnly = false;
  }
});

imgBtn.addEventListener('click', function(){
  imgInput.click();
});

imgInput.addEventListener('input', function(){
  if(profileID == logindata.id){
    imgsubmit.click();
  }
});

intro.addEventListener('blur', function(){
  if(profileID == logindata.id){
    if(intro.value != initialIntro){
      introsubmit.click();
    }
  }
});
