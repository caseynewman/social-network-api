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
        match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
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
