const BBDD = require('./BBDD.js');
const crypto = require('crypto');

//EJEMPLO
function login(userObj) {
    let conexion = BBDD.getConexion();
    conexion.query(`SELECT id FROM user WHERE email='${user_id}'`, (error, userRow) => {
        if (error) {
            console.log(error);
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

function register(userObj) {
    let conexion = BBDD.getConexion();
    let userObjCopy = userObj;
    userObjCopy.salt = crypto.randomBytes(16).toString('hex');
    userObjCopy.password = crypto.pbkdf2Sync(userObjCopy.password, userObjCopy.salt, 1000, 64, `sha512`).toString('hex');
    conexion.query(`INSERT INTO Usuarios SET ?`, userObj, (error,useRow)=>{
        if (error) {
            console.log(useRow);
        }
        console.log(userRow)
    })
}

function logOut(user_id) {
    let conexion = BBDD.getConexion();
    conexion.query(`SELECT id FROM Usuarios WHERE email='${user_id}'`, (error, userRow) => {
        if (error) {
            console.log(error);
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

function validatePassword(password, hashedPass, salt) {
    console.log()
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash == hashedPass;
}

module.exports.logOut = logOut;
module.exports.register = register;