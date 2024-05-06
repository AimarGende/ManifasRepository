const BBDD = require('./BBDD.js');

function getUserMessages(email) {
    let conexion = BBDD.getConexion();
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT id FROM Usuarios WHERE email='${email}'`, (error, userId) => {
            if (error) {
                console.log(error)
                resolve(false);
            }
            conexion.query(`SELECT * FROM Mensajes WHERE idUsuario='${userId[0].id}'`, (error, mensajes) => {
                if (error) {
                    console.log(error)
                    resolve(false);
                }
                else {
                    let messageInfo = {
                        messages:mensajes,
                        user:email,
                    }
                    resolve(messageInfo)
                    console.log(mensajes)
                }
            })
        })
    })
}

function insertUserMessageGroup(insertInfo) {
    let conexion = BBDD.getConexion();
    /*
    insertInfo={
        user
        group
        message
    }
    */
    console.log(insertInfo)
    conexion.query(`SELECT id FROM Usuarios WHERE email='${insertInfo.user}'`, (error, userId) => {
        if (error) {
            console.log(error)
        }
        conexion.query(`INSERT INTO Mensajes (detalle,fecha,idUsuario,idGrupo) VALUES ('${insertInfo.message}',NOW(),${userId[0].id},${insertInfo.group})`, (error) => {
            if (error) {
                console.log(error)
            }
        })

    })
}


module.exports.getUserMessages = getUserMessages;
module.exports.insertUserMessageGroup = insertUserMessageGroup;