const chatting = document.querySelector('.chatinput')
const submit = document.querySelector('.chatsubmit')

var chatsocket = new WebSocket("ws://localhost:8080/chat");

function submitchat(event){
  let msg = {
    username : 'isabelle',
    channel : '1',
    content : chatting.value
  }
  chatting.value = '';
  chatsocket.send(JSON.stringify(msg));
}

chatsocket.onopen = function (event) {
  console.log('client onopen')
  submit.addEventListener('click', submitchat);
};

chatsocket.onmessage = function (event) {
  console.log(event.data);
}