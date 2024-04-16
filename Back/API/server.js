const http = require('http');
// const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;
const secretKey = 'claveSecreta';

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

/**
 * Ruta para hacer login a un usuario
 */
app.post('/Login', (req, res) => {
    let userObj = req.body;
    let token = jwt.sign({ user: userObj.email }, secretKey);
    // userContr.login(userObj, token)
    //     .then(ok => {
    //         let state = {
    //             user: userObj.email,
    //             state: ok ? 'ok' : 'error',
    //             token: token,
    //             expiration: 1800000, //30 min = 1800s = 1800000ms
    //         }
    //         res.json(state);
    //     }); funcion para login
});

/**
 * Ruta para registrar a un usuario
 */
app.post('/Register', (req, res) => {
    let userObj = req.body;
    let token = jwt.sign({ user: userObj.email }, secretKey);
    // let resultado = userContr.register(userObj, token); funcion para register
    // resultado.then(data => {
    //     let state = {
    //         user: userObj.email,
    //         state: data ? 'ok' : 'error',
    //         token: token,
    //         expiration: 1800000,
    //     }
    //     let dirPath = `./videos/${userObj.email}`;
    //     res.json(state);
    // });
});

app.post('/logout', (req, res) => {
    //funcion para logout 
});

const expressServer = http.createServer(app);
// const expressServer = https.createServer(options,app);//Creacion de servidor https

expressServer.listen(port, () => {
    console.log('Server open at port ' + port);
});