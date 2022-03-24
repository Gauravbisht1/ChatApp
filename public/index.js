const socket = io('http://localhost:5500')
const area = document.querySelector('.text')
const btn = document.querySelector('#btn')
const txt = document.querySelector('#addtxt')

var names
do {
  names = prompt('Please enter your name: ')
} while (!names)
// addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {

function sendMessage() {
  let text = txt.value
  txt.value = ''
  sendMessage(text)
  //   console.log(e)
}
btn.addEventListener('click', (e) => {
  let text = txt.value
  txt.value = ''
  sendMessage(text)
  //   console.log(e)
})
txt.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    let text = txt.value
    txt.value = ''
    sendMessage(text)
    // console.log(e)
  }
})

function sendMessage(message) {
  let msg = {
    user: names,
    message: message.trim(),
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
        ${msg.message}
    `
  //   console.log(markup)
  newElement.innerHTML = markup
  area.appendChild(newElement)
}

socket.on('message', (msg) => {
  appendMessage(msg, 'left')
  scrollToBottom()
})

function scrollToBottom() {
  area.scrollTop = area.scrollHeight
}
const file = document.getElementById('file')

function readURL(input) {
  var fReader = new FileReader()
  fReader.readAsDataURL(file.files[0])
  if (file.value) {
    fReader.onloadend = function (event) {
      event.preventDefault()
      const msg = `<img src="./assets/${file.files[0].name}" alt="photo" width="100" height="100">`
      console.log(msg)
      sendMessage(msg)
    }
  }
}
