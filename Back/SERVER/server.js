const http = require('http');
// const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');

const userController = require('./server_modules/userController.js')
const ciudadesController = require('./server_modules/citiesController.js')
const prottestasController = require('./server_modules/protestasController.js')
const msgController = require('./server_modules/messageController.js')
const groupController = require('./server_modules/groupController.js')
const BBDD = require('./server_modules/BBDD.js')

const port = 8080;
// const port = 3000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());


const expressServer = http.createServer(app);
// const expressServer = https.createServer(options,app);//Creacion de servidor https

expressServer.listen(port, () => {
    console.log('Server open at port ' + port);
});

const io = socketio(expressServer, {
    cors: {
        origin: (origin, callback) => {
            callback(null, true);
        },
        methods: ["GET", "POST"],
    },
});

BBDD.InitializeConexion()



io.on('connection', socket => {
    const userName = socket.handshake.auth.username;
    //Eventos que recibira el server y como respondera a ellos y que hacer cuando se conecte

    userController.getUser(userName).then(user => {
        socket.emit('userInfo', user)
        if (user.evita === 0) {
            groupController.getUserGroups(userName).then(groups => {
                groupController.getGroupMessages(groups).then(msgs => {
                    groups.forEach(group => {
                        let messages = new Array();
                        msgs.forEach(msg => {
                            if (msg.idGrupo === group.id) {
                                let messageInfo = {
                                    message: msg.detalle,
                                    user: msg.idUsuario,
                                }
                                messages.push(JSON.stringify(messageInfo))
                            }
                        });
                        group.messages = messages
                    });
                    socket.emit('userGroups', groups)
                })
            })
        }
    })

    prottestasController.getProtestas().then(protestas => {
        socket.emit('protestas', protestas)
    })

    ciudadesController.getCities().then(ciudades => {
        socket.emit('ciudades', ciudades)
    })

    socket.on('newMessage', msgInfo => {
        msgController.insertUserMessageGroup(msgInfo)
        socket.broadcast.emit('newMessage', msgInfo);
    });
});