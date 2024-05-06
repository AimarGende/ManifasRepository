socket.on('userGroups', (groups) => {
    grupos = groups;
    groups.forEach(group => {
        CreateGroup(group);
    });
});

socket.on('newMessage', msgInfo => {
    if (grupos !== undefined) {
        grupos.forEach(grupo => {
            if (parseInt(grupo.id) === parseInt(msgInfo.group)) {
                let mensaje = document.createElement('p')
                mensaje.innerHTML = `${msgInfo.user.split('@')[0]}: ${msgInfo.message}`
                messagesContainer.appendChild(mensaje)
            }
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
})

socket.on('protestas', protest => {
    protestas = protest
})

socket.on('ciudades', cities => {
    ciudades = cities;
    ciudades.forEach(ciudad => {
        let marker = L.marker([parseFloat(ciudad.latitud), parseFloat(ciudad.longitud)]).addTo(locationMap);
        marker._icon.classList.add('marcador')
        marker.on('click', () => {
            toggleInfo('info');
        });
    });
})

socket.on('userInfo', info => {
    if (info.evita === 1) {
        upcomingMessages.style.display = 'none'
        expertChatHead.style.display = 'none'
    }
})