const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//     body: {type: String, required: true },
//     user: {
//         username: {type: String, required: false},
//         password: {type: String, required: false},
//     },
//     createdAt: {type: Date, default: Date.now}
// })

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true , },
    // thoughts: ,
    // friends: ,
    createdAt: {type: Date, default: Date.now}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
