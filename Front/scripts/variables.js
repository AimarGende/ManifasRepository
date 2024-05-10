const username = JSON.parse(localStorage.getItem('token')).user;
const socket = io.connect(`http://${urlActual}:8080/`, {
    auth: {
        username
    }
});


//Para chat de mensajes
let upcomingMessages = document.getElementById('upcoming-messages');
let textBox = document.getElementById('text-box')
let messagesContainer = document.getElementById('messages');
let expertChatHead = document.getElementById('expert-chat-head');
let expertChatForm = document.getElementById('expert-chat-form');
let groupSelection = document.getElementById('group-selection');
let groupHead = document.getElementById('group-head');
let logOut = document.getElementById('logout');

logOut.addEventListener('click', () => {
    logout()
})

let grupos;
let protestas;
let ciudades;

let infoUsuario;

function logout() {
    localStorage.removeItem('token')
    window.location.assign('index.html')
}