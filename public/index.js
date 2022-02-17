const socket = io("http://localhost:5500");
const area = document.querySelector('.text')
const btn=document.querySelector("#icon");
const txt=document.querySelector("#addtxt")


var names;
do {
    names = prompt('Please enter your name: ')
} while (!names)


btn.addEventListener("click",()=>{
    let text=txt.value;
    txt.value="";
    sendMessage(text)
})

function sendMessage(message) {
    let msg = {
        user: names,
        message: message.trim()
    }
    appendMessage(msg, 'right')
    scrollToBottom()
    socket.emit('message', msg)
}


function appendMessage(msg, className) {
    let newElement = document.createElement('div')
    newElement.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    newElement.innerHTML = markup
    area.appendChild(newElement)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'left')
    scrollToBottom()
})

function scrollToBottom() {
    area.scrollTop =area.scrollHeight;
}
