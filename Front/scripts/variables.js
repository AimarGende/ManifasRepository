const username = JSON.parse(localStorage.getItem('token')).user;
const socket = io.connect('http://localhost:8080/', {
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
let userName = 'Usuario';
let groupSelection = document.getElementById('group-selection');
let groupHead = document.getElementById('group-head');