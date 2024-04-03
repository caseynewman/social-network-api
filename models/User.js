const { model, Types, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // matching validation for valid email
    },
    thoughts: {
        type: Types.ObjectId,
        ref: 'Thought',
    },
    friends: {
        type: Types.ObjectId,
        ref: 'User',
    },
}, {
    virtuals: {
        friendCount: {
            get() { return `${this.friends.length}` }
        }
    },
    toJSON: {
        virtuals: true
    }
});

const User = model('User', userSchema);

module.exports = User;
