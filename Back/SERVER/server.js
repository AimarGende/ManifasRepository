const http = require('http');
// const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');

const groupController = require('./server_modules/groupController.js')
const BBDD = require('./server_modules/BBDD.js')
const port = 3000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.get('/Grupos', (req, res) => {
    let grupos = groupController.getGroups();
    grupos.then(data => {
        let sendInfo = {
            groups: data,
        };
        res.json(sendInfo)
    })
});
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
    const userName = socket.handshake.auth.userName;
    //Eventos que recibira el server y como respondera a ellos y que hacer cuando se conecte
});