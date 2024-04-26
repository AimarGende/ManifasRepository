const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken')
const port = 8080;
const secretKey = 'claveSecreta';

const BBDD = require('./server_modules/BBDD.js')
const userController = require('./server_modules/userController.js')

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

/**
 * Ruta para hacer login a un usuario
 */
app.post('/Login', (req, res) => {
    let userObj = req.body;
    let token = jwt.sign({ user: userObj.email }, secretKey);
    userController.login(userObj, token).then(data => {
        if (data) {
            let userInfo = {
                user: userObj.email,
                token: token,
                state: data,
            }
            res.json(userInfo)
        }
    })

    //Codigo para login
});

/**
 * Ruta para registrar a un usuario
 */
app.post('/Register', (req, res) => {
    let userObj = req.body;
    let token = jwt.sign({ user: userObj.email }, secretKey);
    userController.register(userObj, token).then(data => {
        if (data) {
            let userInfo = {
                user: userObj.email,
                token: token,
                state: data,
            }
            res.json(userInfo)
        }
    });
    //Codigo para registrarse
});

/**
 * Ruta para hacer logout al usuario
 */
app.post('/Logout', (req, res) => {
    let userObj = req.body;
    userController.logOut(userObj.email)
});

const expressServer = http.createServer(app);

expressServer.listen(port, () => {
    console.log('Server open at port ' + port);
});

BBDD.InitializeConexion();