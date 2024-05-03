const BBDD = require('./BBDD.js');
function getUserGroups(email) {
    let conexion = BBDD.getConexion();
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT id FROM Usuarios WHERE email='${email}'`, (error, userId) => {
            if (error) {
                console.log(error)
                resolve(false);
            }
            if (userId) {
                conexion.query(`SELECT idGrupo FROM Usuarios_Grupos WHERE idUsuario=${userId[0].id}`, (error, groupIds) => {
                    if (error) {
                        console.log(error)
                        resolve(false);
                    }
                    let select = `SELECT * FROM Grupos WHERE id=`
                    for (let i = 0; i < groupIds; i++) {
                        if (i === groupIds.length){
                            query += `${groupIds[i].id};`
                        }else{
                            query += `${groupIds[i].id} OR id=`
                        }
                    }
                    conexion.query(select, (error, groups) => {
                        if (error) {
                            console.log(error)
                            resolve(false);
                        }
                        else{
                            console.log(groups)
                            // resolve(groups)
                        }
                    })
                })
            }
        })
        conexion.query(`SELECT * FROM Grupos WHERE id=${p}`, (error, groupRow) => {
            if (error) {
                console.log(error)
                resolve(false);
            }
            resolve(groupRow);
        })
    })
}

module.exports.getUserGroups = getUserGroups;