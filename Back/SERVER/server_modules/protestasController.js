const BBDD = require('./BBDD.js');

function getProtestas() {
    let conexion = BBDD.getConexion();
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM protestas_ciudades`, (error, protestas) => {
            if(error){
                resolve(error)
            }
            resolve(protestas)
        })
    })
}

module.exports.getProtestas = getProtestas;