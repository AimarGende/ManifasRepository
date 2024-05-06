expertChatHead.addEventListener('click', () => {
    toggleMenu()
})

function toggleMenu() {
    upcomingMessages.classList.toggle('hidden');
    expertChatHead.classList.toggle('hidden');
    messagesContainer.classList.toggle('hidden');
    textBox.classList.toggle('hidden');
    groupSelection.classList.toggle('hidden');
    groupHead.classList.toggle('hidden')
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


expertChatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.children[0].value !== '') {
        let separatedUser = username.split('@')[0];
        let mensaje = event.target.children[0].value;
        let messageInfo = {
            user: username,
            group: groupHead.className.split(' ')[1],
            message: mensaje,
        };
        let mensajePropio = document.createElement('p');
        mensajePropio.innerHTML = `<b>${separatedUser}</b>: ${mensaje}`;
        event.target.children[0].value = '';
        messagesContainer.appendChild(mensajePropio);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        socket.emit('newMessage', messageInfo)
    }
});

function CreateGroup(group) {
    let groupDiv = document.createElement('div')
    groupDiv.className += `group group${group.nombre}`
    groupDiv.innerHTML = `<h3>${group.nombre}</h3> <i><small>${group.detalle}</small></i>`
    groupDiv.addEventListener('click', () => {
        groupSelection.style.display = 'none'
        groupHead.innerHTML = group.nombre;
        groupHead.className += ` ${group.id}`;
        let separatedUser = username.split('@')[0];
        group.messages.forEach(msg => {
            let mensaje = document.createElement('p')
            let jsonmsg = JSON.parse(msg);
            if (jsonmsg.user.split('@'[0] === separatedUser)) {
                mensaje.innerHTML = `<b>${separatedUser}</b>: ${jsonmsg.message}`;
            }
            else {
                mensaje.innerHTML = `${separatedUser}: ${jsonmsg.message}`
            }
            messagesContainer.appendChild(mensaje)
        });
    })
    groupSelection.appendChild(groupDiv)
}
groupHead.addEventListener('click', () => {
    groupSelection.style.display = 'block'
    messages.innerHTML = ''
    groupHead.className= 'hidden'
})
