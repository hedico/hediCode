'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    id: String,
    catName: String,
    catDesc: String,
    catImgUrl: String,
    catContent: String,
    updated: { type: Date, default: Date.now }
});

categorySchema.statics.getOne = async function (id) {
    try {
        let searchResult = this.model('Category').findOne({ id: id });
        return searchResult;
    } catch (e) {
        throw e;
    }
}

categorySchema.statics.getAll = async function () {
    try {
        let searchResult = this.model('Category').find({});
        return searchResult;
    } catch (e) {
        throw e;
    }
}

categorySchema.statics.newCategory = async function (category) {
    try {
        let saveResult = await category.save();
        return saveResult;
    } catch (e) {
        throw e;
    }
}

categorySchema.statics.updateCategory = async function (id, update) {
    try {
        let updateResult = await category.updateOne({ id: id }, { $set: update });
        return updateResult;
    } catch (e) {
        throw e;
    }
}

categorySchema.statics.deleteCategory = async function (id) {
    try {
        let deleteResult = await this.model('Category').deleteOne({ id: id });
        return deleteResult;
    } catch (e) {
        throw e;
    }
}

module.exports = mongoose.model('Category', categorySchema);