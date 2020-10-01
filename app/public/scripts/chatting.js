const chatlog = document.querySelector('.chatlog');
const chatinput = document.querySelector('.chatinput input');
const chatsubmit = document.querySelector('.chatinput button');

var chatsocket = new WebSocket("ws://13.209.48.163:8080/chat");

function submitchat(event){
  if(chatinput.value != ''){
    let msg = {
      username : 'isabelle',
      channel : '1',
      content : chatinput.value
    }
    chatinput.value = '';
    chatsocket.send(JSON.stringify(msg));
  }
}

chatsocket.onopen = function (event) {
  console.log('client onopen')
  chatsubmit.addEventListener('click', submitchat);
  chatinput.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
      submitchat();
    }
  });
};

chatsocket.onmessage = function (event) {
  var msg = JSON.parse(event.data)
  chatlog.innerHTML += `<p>${msg.username} : ${msg.content}</p>`
  chatlog.scrollTop = chatlog.scrollHeight;
}
