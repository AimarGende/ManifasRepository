const { resolve } = require('path');
const BBDD = require('./BBDD.js');
const crypto = require('crypto');
const { rejects } = require('assert');

//EJEMPLO
function login(userObj, token) {
    let conexion = BBDD.getConexion();
    return new Promise((resolve, rejects) => {
        conexion.query(`SELECT * FROM Usuarios WHERE email='${userObj.email}'`, (error, user) => {
            if (error) {
                console.log(error);
                resolve(false);
            }
            else {
                console.log(user)
                if (user.length !== 0) {
                    let valid = validatePassword(userObj.password, user[0].password, user[0].salt)
                    if (valid) {
                        let insertTokenInfo = {
                            idUsuario: user[0].id,
                            token: token,
                        };
                        conexion.query(`INSERT INTO tokens SET ?`, insertTokenInfo, (error) => {
                            if (error) {
                                console.log(error)
                                resolve(false);
                            }
                            else{
                                resolve(true);
                            }
                        });
                    }
                }
            };
        });
    });
}

function register(userObj, token) {
    let conexion = BBDD.getConexion();
    let userObjCopy = userObj;
    return new Promise((resolve, rejects) => {
        conexion.query(`SELECT * FROM Usuarios WHERE email='${userObj.password}'`, (error, userRow) => {
            if (error) {
                console.log(error);
                resolve(false);
            }
            if (userRow.length === 0) {
                userObjCopy.salt = crypto.randomBytes(16).toString('hex');
                userObjCopy.password = crypto.pbkdf2Sync(userObjCopy.password, userObjCopy.salt, 1000, 64, `sha512`).toString('hex');
                conexion.query(`INSERT INTO Usuarios SET ?`, userObj, (error, useRow) => {
                    if (error) {
                        console.log(error);
                        resolve(false);
                    }
                    console.log(useRow.insertId);
                    let insertTokenInfo = {
                        idUsuario: useRow.insertId,
                        token: token,
                    }
                    conexion.query(`INSERT INTO tokens SET ?`, insertTokenInfo, (error, token) => {
                        if (error) {
                            console.log(error)
                            resolve(false);
                        }
                        else {
                            resolve(true);
                        }

                    });
                });
            }
        });
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
                conexion.query(`DELETE FROM tokens WHERE idUsuario=${userRow[key].id}`, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        }
    });
}

function validatePassword(password, hashedPass, salt) {
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash == hashedPass;
}

module.exports.logOut = logOut;
module.exports.register = register;
module.exports.login = login;