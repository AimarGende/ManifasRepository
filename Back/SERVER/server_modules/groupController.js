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
                    for (let i = 0; i < groupIds.length; i++) {
                        if (i === groupIds.length - 1 || groupIds.length === 1) {
                            select += `${groupIds[i].idGrupo};`
                        } else {
                            select += `${groupIds[i].idGrupo} OR id=`
                        }
                    }
                    conexion.query(select, (error, groups) => {
                        if (error) {
                            console.log(error)
                            resolve(false);
                        }
                        else {
                            resolve(groups)
                        }
                    })
                })
            }
        })
    })
}

function getGroupMessages(groups) {
    let conexion = BBDD.getConexion();

    let select = 'SELECT * FROM mensajes WHERE idGrupo='
    for (let i = 0; i < groups.length; i++) {
        if (i === groups.length - 1 || groups.length === 1) {
            select += `${groups[i].id};`
        } else {
            select += `${groups[i].id} OR idGrupo=`
        }
    }
    return new Promise((resolve, reject) => {
        conexion.query(select, (error, msgs) => {
            if (error) {
                console.log(error)
                resolve(false);
            }
            else {
                // Recorrer cada mensaje para obtener el correo electrónico del usuario
                let promises = msgs.map(msg => {
                    return new Promise((resolveMsg, rejectMsg) => {
                        conexion.query(`SELECT email FROM usuarios WHERE id = ${msg.idUsuario}`, (error, email) => {
                            if (error) {
                                console.log(error);
                                rejectMsg(error);
                            } else {
                                let msgCopy = msg
                                msgCopy.idUsuario = email[0].email;
                                resolveMsg(msgCopy);
                            }
                        });
                    });
                });
                Promise.all(promises)
                    .then(messagesWithUserEmails => {
                        resolve(messagesWithUserEmails);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            }
        })
    })
}

module.exports.getUserGroups = getUserGroups;
module.exports.getGroupMessages = getGroupMessages;