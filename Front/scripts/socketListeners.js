socket.on('userGroups', (groups) => {
    grupos = groups;
    groups.forEach(group => {
        CreateGroup(group);
    });
});

socket.on('newMessage', msgInfo => {
    console.log(msgInfo)
    grupos.forEach(grupo => {
        if (parseInt(grupo.id) === parseInt(msgInfo.group)) {
            let mensaje = document.createElement('p')
            mensaje.innerHTML = `${msgInfo.user.split('@')[0]}: ${msgInfo.message}`
            messagesContainer.appendChild(mensaje)
        }
    });
})