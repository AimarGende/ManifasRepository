const http = require('http');
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
    //Codigo para login
});

/**
 * Ruta para registrar a un usuario
 */
app.post('/Register', (req, res) => {
    let userObj = req.body;
    let token = jwt.sign({ user: userObj.email }, secretKey);
    //Codigo para registrarse
});

/**
 * Ruta para hacer logout al usuario
 */
app.post('/logout', (req, res) => {
    //Funcion para logout 
});

const expressServer = http.createServer(app);

expressServer.listen(port, () => {
    console.log('Server open at port ' + port);
});