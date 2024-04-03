const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: ObjectId, default: new ObjectId() },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
        get(timestamp) {
            return new Date(timestamp).toLocaleString('en')
        }
    },
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get(timestamp) {
            return new Date(timestamp).toLocaleString('en')
        }
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
}, {
    virtuals: {
        reactionCount: {
            get() { return `${this.reactions.length}` }
        }
    },
    toJSON: {
        virtuals: true
    }
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
