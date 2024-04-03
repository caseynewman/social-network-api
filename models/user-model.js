const mongoose = require('mongoose');
const opts = { toJSON: { virtuals: true } };
const thoughtSchema = require('./thought-model');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, // unique, trimmed
    email: { type: String, required: true, }, // unique, matching validation for valid email
    thoughts: [thoughtSchema], // array of _id values referencing thought model
    friends: [userSchema], // array of _id values self-referencing user-model
}, {
    virtuals: { // where to add opts
        friendCount: {
            get() { return `${this.friends.length}` }
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
