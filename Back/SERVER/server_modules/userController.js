const BBDD = require('./BBDD.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//EJEMPLO
function logOut(user_id) {
    let conexion = BBDD.getConexion();
    conexion.query(`SELECT id FROM user WHERE email='${user_id}'`, (error, userRow) => {
        if (error) {
            console.log(error);
            resolve(false);
        }
        else {
            for (let key in userRow) {
                conexion.query(`DELETE FROM tokens WHERE user_id=${userRow[key].id}`, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        }
    });
}

module.exports.logOut = logOut;