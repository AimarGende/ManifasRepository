let loginForm = document.getElementById('idLogin');
let registerForm = document.getElementById('idRegister');
let gruposContainer = document.getElementById('grupos')
let avoidBox = document.getElementById('evitar')
avoidBox.addEventListener('change', () => {
    gruposContainer.classList.toggle('hidden')
    document.getElementById('group-title').classList.toggle('hidden')
    let gruposCheck = document.getElementsByClassName('group-check')
    for (let check of gruposCheck) {
        check.checked = false
    }
})
fetch('http://localhost:8081/Grupos')
    .then(response => {
        return response.json()
    })
    .then(data => {
        for (let grupo of data.groups) {
            let checkbox = `<p class='group-text'>${grupo.nombre} <input type='checkbox' class='group-check' value=${grupo.id}></p>`

            gruposContainer.innerHTML += checkbox
        }
    })

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    login()
})

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()
    register()
})

function register() {
    if (document.getElementById('regConfPasswd').value === '' || document.getElementById('regName').value === '' || document.getElementById('regEmail').value === '' || document.getElementById('regPasswd').value === '') {
        alert('rellene todos los campos')
        return
    }
    if (document.getElementById('regConfPasswd').value !== document.getElementById('regPasswd').value) {
        alert('Contraseñas diferentes');
        return;
    }
    let grupos = new Array();
    if (!document.getElementById('evitar').checked) {
        for (let groupCheck of document.getElementsByClassName('group-check')) {
            if (groupCheck.checked) {
                grupos.push(parseInt(groupCheck.value))
            }
        }
    }
    let user = {
        nombre: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPasswd').value,
        evita: document.getElementById('evitar').checked,
        groups: grupos,
    }
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    };

    fetch('http://localhost:8081/Register', config)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
}

function login() {
    if (document.getElementById('logEmail').value === '' || document.getElementById('logPasswd').value === '') {
        alert('rellene todos los campos')
        return
    }
    let user = {
        email: document.getElementById('logEmail').value,
        password: document.getElementById('logPasswd').value,
    }
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    };
    fetch('http://localhost:8081/Login', config)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
}