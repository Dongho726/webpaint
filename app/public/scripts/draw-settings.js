const inviteName = document.querySelector('.inviteName');
const inviteBtn = document.querySelector('.inviteBtn');
const collaboList = document.querySelector('.collaboratorList ol');
const canvasId = document.querySelector('.canvasid').innerHTML;

let collaborators = [];

fetch(`/draw/${canvasId}/load`,{
  method:'POST'
}).then(function(res){
  return res.text();
}).then(function(data){
  const parsedData = JSON.parse(data);
  collaborators.push(parsedData.mycanvas.username);
  parsedData.othercanvas.forEach(element => {
    collaborators.push(element.username);
  });
  collaborators.forEach(element => {
    collaboList.innerHTML += `<li>${element}</li>`;
  });
});

inviteBtn.addEventListener('click',function(){
  if(inviteName.value != ''){
    if(collaborators.indexOf(inviteName.value) == -1){
      fetch(`/draw/${canvasId}/invite`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:inviteName.value, id:canvasId})
      }).then(function(res){
        return res.text();
      }).then(function(data){
        const parsedData = JSON.parse(data);
        if(parsedData.invite == true){
          collaboList.innerHTML += `<li>${inviteName.value}</li>`;
          inviteName.value = '';
        }
        else{
          alert('username을 다시 확인해주세요.');
        }
      });
    }else{
      alert('이미 collaborator 입니다.');
    }
  }
});
