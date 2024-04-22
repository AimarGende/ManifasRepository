expertChatHead.addEventListener('click', () => {
    toggleMenu()
})
groups.forEach(group => {
    CreateGroup(group)
});
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
        let separatedUser = userName.split('@')[0];
        let mensaje = event.target.children[0].value;
        let messageInfo = {
            user: separatedUser,
            message: mensaje,
        };
        let mensajePropio = document.createElement('p');
        mensajePropio.innerHTML = `<b>${separatedUser}</b>: ${mensaje}`;
        event.target.children[0].value = '';
        messagesContainer.appendChild(mensajePropio);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});

function CreateGroup(group) {
    let groupDiv = document.createElement('div')
    groupDiv.className += `group group${group}`
    groupDiv.innerHTML = `<h3>${group}</h3> <i><small>Fecha: 28/04/2024</small></i>`
    groupDiv.addEventListener('click', () => {
        groupSelection.style.display = 'none'
        groupHead.innerHTML = group;
        /*
            Encontrar grupo en array donde se guardan, y mostrar todos los mensajes
        */
    })
    groupSelection.appendChild(groupDiv)
}
groupHead.addEventListener('click', () => {
    groupSelection.style.display = 'block'
    messages.innerHTML = ''
})
