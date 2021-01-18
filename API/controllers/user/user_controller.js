'use strict'

const userModel = require('../../models/user/user');
const bCrypt = require('bcrypt');
const jwtMddw = require('../../middleware/jwt');
const jwt = require('jsonwebtoken');

async function getUsers(req, res, next) {
    try {
        if (req.params.username) {
            let username = req.params.username;
            let queryResult = await userModel.getOne(username);
            if (queryResult == null) {
                let error = new Error(`No existe el usuario ${username}`);
                error.name = "NoEntriesError";
                throw error;
            }
            return res.send({ message: "Mostrando resgistro solicitado.", result: queryResult });
        } else {
            let queryResult = await userModel.getAll();
            if (queryResult == null) {
                let error = new Error(`No existen registros de usuarios.`);
                error.name = "NoEntriesError";
                throw error;
            }
            return res.send({ message: "Mostrando registros solicitados.", result: queryResult });
        }
    } catch (e) {
        next(e);
    }
}

async function newUser(req, res, next) {
    try {
        let reqBody = req.body;
        if (!reqBody.password) {
            let error = new Error('Es necesario introducir una contraseña.');
            error.name = "NoData";
            throw error;
        }
        let hash = await bCrypt.hash(reqBody.password, await bCrypt.genSalt(10));
        reqBody.password = hash;
        let user = new userModel(reqBody);
        let queryResult = await userModel.newUser(user);
        return res.send({ message: "Registro realizado con éxito.", result: queryResult });
    } catch (e) {
        next(e);
    }
}

async function updateUser(req, res, next) {
    try {
        let username = req.params.username;
        let update = req.body;
        let queryResult = await userModel.updateUser(username, update);
        if (queryResult.nModified == 0) {
            let error = new Error('No se ha actualizado el registro, o no existe.');
            error.name = "NoEntriesError";
            throw error;
        }
        return res.send({ message: "El registro ha sido actualizado con éxito.", ack: true });
    } catch (e) {
        next(e);
    }
}

async function deleteUser(req, res, next) {
    try {
        let username = req.params.username;
        let queryResult = await userModel.deleteUser(username);
        if (queryResult.deletedCount == 0) {
            let error = new Error('El registro no se ha borrado, o no existe.');
            error.name = "NoEntriesError"
            throw error;
        }
        return res.send({ message: "El resgistro ha sido eliminado con éxito." });
    } catch (e) {
        next(e);
    }
}

async function login(req, res, next) {
    try {
        let reqBody = req.body;
        if (!reqBody.username || !reqBody.password) {
            let error = new Error('Falta usuario y/o contraseña.');
            error.name = "NoData";
            throw error;
        }
        let searchResult = await userModel.getOne(reqBody.username);
        if (searchResult == null) {
            let error = new Error('El usuario y/o contraseña son incorrectos.');
            error.name = "NoData";
            throw error;
        }
        let dbUser = searchResult;
        let match = await bCrypt.compare(reqBody.password, dbUser.password);
        if (match) {
            if (reqBody.getHash) {
                return res.send({ jwt: jwtMddw.createToken(dbUser), user: dbUser, ack: true });
            } else {
                return res.send({ user: dbUser, ack: true });
            }
        } else {
            let error = new Error('El usuario y/o contraseña son incorrectos.');
            error.name = "NoData";
            throw error;
        }
    } catch (e) {
        next(e);
    }
}

async function decodeToken(req, res, next) {
    try {
        let token = req.body.token;
        let decoded = await jwt.verify(token, process.env.SECRET);
        return res.send({ message: "Token descodificado con éxtio.", ack: true, user: decoded });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getUsers,
    newUser,
    updateUser,
    deleteUser,
    login,
    decodeToken
}