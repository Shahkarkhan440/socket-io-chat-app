const socket = io()

let userName;
let textArea= document.querySelector('#textarea')
let messageArea= document.querySelector('.message__area')


do{
    userName = prompt("Enter your name to start")
    document.querySelector('.user__name').innerHTML= 'Welcome ' +  userName
}while(!userName)


textArea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg= {
        user: userName,
        message: message.trim()
    }
    //lets append the msg to window
    appendMessage(msg, 'outgoing')
    textArea.value=''
    scrollBottom()
    //send msg via web socket
    socket.emit('message', msg)
}


function appendMessage(msg, type){

    let mainDiv= document.createElement('div')
    let className= type
    mainDiv.classList.add(className, 'message')

    let markUp= `
        <h4> <strong>(${msg.user})</strong>- ${new Date().toLocaleString()}        </h4>
        <p> ${msg.message} </p>
    `
    mainDiv.innerHTML= markUp
    messageArea.appendChild(mainDiv)

}

//receive msg
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollBottom()
})


function scrollBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}