const username = 'Usuario';
// const socket = io.connect('http://localhost:8080/', {
//     auth: {
//         userName
//     }
// });


//Para chat de mensajes
let upcomingMessages = document.getElementById('upcoming-messages');
let textBox = document.getElementById('text-box')
let messagesContainer = document.getElementById('messages');
let expertChatHead = document.getElementById('expert-chat-head');
let expertChatForm = document.getElementById('expert-chat-form');
let userName = 'Usuario';
let groupSelection = document.getElementById('group-selection');
let groups = ['Protesta Hola', 'Protesta puede', 'Protesta nose', 'Protesta', 'Protesta', 'Protesta', 'Protesta', 'Protesta', 'Protesta', 'Protesta'];
let groupHead = document.getElementById('group-head');