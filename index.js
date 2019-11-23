var message = document.getElementById('messages');
var roomNameInput = document.getElementById('roomname-input');
var sendButton = document.getElementById('send-btn');
//  по нажатию на кнопку отправить - отправить на сервер nickname:message
sendButton.addEventListener('click', sendUserMessage);

start();
// каждые 500 милисекунд забирать сообщение
function start(){
  getMessagesfromServer();
  setInterval(getMessagesfromServer, 2000);
}

var lastMessages = [];
// шаг1
// сообщение с сервера
async function getMessagesfromServer() 
{
// получаем название комнаты
var roomname = roomNameInput.value;

     // получаем фссинхронный ответ
     var response = await fetch('https://fchatiavi.herokuapp.com/get/${roomname}/?offset=0&limit=200');
      // декодируем его из строкив обьекты javascript 
     response = await response.json();

     if( response == null){
      message.innerHTML = 'No message';
       return;
     }
    //  сформировать html месендж
     var messagesHTML = fromMessagesHTML (response);
       console.log(response);
// добавить в messages-wrapper письма 
 message.innerHTML = messagesHTML;
//  если сообщениий больше чем в прошлый раз проскролить
if(lastMessages.length < response.length){
  scrollToEnd ();
}

lastMessages = response;
}

// отправить сообщение
async function sendUserMessage(){
// получаем название комнаты
var roomname = roomNameInput.value;

    //получить что написал пользователь в поле nickname
    var userNickname = document.getElementById('nickname-input').value;
    var UserMessage = document.getElementById('message-input').value;
if(UserMessage.length === 0){
  alert ("You should write name");
  return;
}

if(UserMessage.length === 0){
  alert ("You should write message!");
  return;
}
  
await fetch('https://fchatiavi.herokuapp.com/send/${roomname}/',{
  method:'POST',
  body: JSON.stringify({
  Name:userNickname,
  Message:UserMessage,
})
});


 
scrollToEnd()
}
  
function scrollToEnd (){
 // message.innerHTML = allMessagesHtml;
}
  
function fromMessagesHTML(response){
   var allMessagesHtml = '';
  for( var i = 0; i < response.length; i++){
    var messageData = response [i];
       var message = '<div class="message"><div class="message-nickname">'+messageData.Name+'</div><div class="message-text">'+messageData.Message+'</div>';

       allMessagesHtml = allMessagesHtml + message;
}
return allMessagesHtml;
}
 
messages.scrollTop = messages.scrollHeight;

