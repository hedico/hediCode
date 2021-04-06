'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const jobSchema = new schema({
    id: String,
    title: String,
    author: String,
    date: Date,
    created: Date,
    updated: { type: Date, default: Date.now() }
});

jobSchema.statics.GetOne = async function (id) {
    try {
        let searchResult = await this.model('Job').find({ id: id });
        return searchResult;
    } catch (e) {
        throw e;
    }
}

jobSchema.statics.getAll = async function(){
    try{
        let searchResult = await this.model('Job').find({});
        return searchResult;
    }catch(e){
        throw e;
    }
}

module.exports = mongoose.model('Job', jobSchema);