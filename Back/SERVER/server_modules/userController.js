const BBDD = require('./BBDD.js');

//EJEMPLO
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

function getUser(email) {
    let conexion = BBDD.getConexion();

    return new Promise((resolve, reject) => {
        conexion.query(`SELECT evita FROM Usuarios WHERE email='${email}'`, (error, user)=>{
            if(error){
                console.log(error)
                resolve(false)
            }
            resolve(user[0])
        })
    })
}

module.exports.logOut = logOut;
module.exports.getUser = getUser;