let mysql = require('mysql');
let conexion = null;//Variable donde se guardara la conexion de BBDD

let options = {
    host: 'mysql', //donde se hostea la base, por defecto buscara el puerto 3306
    user: 'usuario', //usuario con el que se va a conectar a la base
    password: 'gerardo', //contraseña del usuario con el que se va a conectar a la base
    database: 'Manifas',//Nombre de BBDD
};

/**
 * Funcion para incializar la conexion a la base de datos y conectarse a ella
 */
function InitializeConexion() {
    conexion = mysql.createConnection(options); //Metodo base de paquete mysql para crear la conexion a la base
    conexion.connect(); 
}

/**
 * 
 * @returns Devuelve la conexion a la bbdd si se le ha asignado una a la variable ya.
 */
function getConexion() {
    if (conexion != null && conexion != '' && conexion != undefined) {
        return conexion;
    }
}

module.exports.InitializeConexion = InitializeConexion;
module.exports.getConexion = getConexion;