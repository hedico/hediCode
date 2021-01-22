'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    id: String,
    postTitle: String,
    postContent: String,
    postDesc: String,
    postReference: String,
    postImgUrl: String,
    created: { type: Date },
    updated: { type: Date, default: Date.now }
});

postSchema.statics.getone = async function (id) {
    try {
        let searchResult = await this.model('Post').findOne({ id: id });
        return searchResult;
    } catch (e) {
        throw e;
    }
}

postSchema.statics.getAll = async function () {
    try {
        let searchResult = await this.model('Post').find({});
        return searchResult;
    } catch (e) {
        throw e;
    }
}

postSchema.statics.newPost = async function (post) {
    try {
        let saveResult = await post.save();
        return saveResult;
    } catch (e) {
        throw e;
    }
}

postSchema.statics.updatePost = async function (id, update) {
    try {
        let updateResult = await this.model('Post').updateOne({ id: id }, { $set: update });
        return updateResult;
    } catch (e) {
        throw e;
    }
}

postSchema.statics.deletePost = async function () {
    try {
        let deleteResult = await this.model('Post').deleteOne({ id: id });
        return deleteResult;
    } catch (e) {
        throw e;
    }
}

module.exports = mongoose.model('Post', postSchema);