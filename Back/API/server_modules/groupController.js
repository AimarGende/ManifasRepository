const BBDD = require('./BBDD.js');

function getGroups() {
    let conexion = BBDD.getConexion();
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM Grupos`, (error, groupRow) => {
            if (error) {
                console.log(error)
                resolve(false);
            }
            resolve(groupRow);
        })
    })
}
module.exports.getGroups = getGroups;
