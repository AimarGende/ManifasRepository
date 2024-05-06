const BBDD = require('./BBDD.js');

function getCities() {
    let conexion = BBDD.getConexion();

    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ciudades`, (error, cities) => {
            if (error){
                console.log(error)
                resolve(false)
            }
            resolve(cities)
        })
    })
}

module.exports.getCities = getCities;
