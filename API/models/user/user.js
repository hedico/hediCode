'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({    
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.statics.getOne = async function(username){
    try{
        let searchResult = await this.model('User').findOne({username: username});
        return searchResult;
    }catch(e){
        throw e;
    }
}

userSchema.statics.getAll = async function () {
    try {
        let findResult = this.model('User').find({});
        return findResult;
    } catch (e) {
        throw e;
    }
}

userSchema.statics.newUser = async function (user) {
    try {
        let saveResult = await user.save();
        return saveResult;
    } catch (e) {
        throw e;
    }
}

userSchema.statics.updateUser = async function(username, update){
    try{
        let updateResult = await this.model('User').updateOne({username: username}, {$set: update});
        return updateResult;
    }catch(e){
        throw e;
    }
}

userSchema.statics.deleteUser = async function(username){
    try{
        let deleteResult = await this.model('User').deleteOne({username: username});
        return deleteResult;
    }catch(e){
        throw e;
    }
}

module.exports = mongoose.model('User', userSchema);