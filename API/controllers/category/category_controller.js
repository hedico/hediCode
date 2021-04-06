'use strict'

const categoryModel = require('../../models/category/category');

async function getCategories(req, res, next) {
    try {
        if (req.params.id) {
            let id = req.params.id;
            let queryResult = await categoryModel.getOne(id);
            if (queryResult == null) {
                let error = new Error(`No existe la categoría con id ${id}`);
                error.name = "NoEntriesError";
                throw error;
            }
            return res.send({ message: "Mostrando registro solicitado.", ack: true, result: queryResult });
        } else {
            let queryResult = await categoryModel.getAll();
            if (queryResult == null) {
                let error = new Error(`No existe registros de categorías.`);
                error.name = "NoEntriesError";
                throw error;
            }
            return res.send({ message: "Mostrando registros solicitados.", ack: true, result: queryResult });
        }
    } catch (e) {
        next(e);
    }
}

async function newCategory(req, res, next) {
    try {

    } catch (e) {
        next(e);
    }
}

module.exports = {
    getCategories,
    newCategory
}