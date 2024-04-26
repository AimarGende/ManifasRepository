const BBDD = require('./BBDD.js');

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

module.exports.logOut = logOut;
module.exports.register = register;