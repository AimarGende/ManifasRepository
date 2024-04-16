const http = require('http');
// const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');

const port = 3000;
const secretKey = 'claveSecreta';

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

io.on('connection', socket => {

});