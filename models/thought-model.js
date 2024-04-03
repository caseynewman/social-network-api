const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const opts = { toJSON: { virtuals: true } };

const reactionSchema = new mongoose.Schema({
    reactionId: { type: ObjectId, default: set(new ObjectId)}, // default value set to new ObjectId
    reactionBody: { type: String, required: true }, // 280 character maximum
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // user getter method to format timestamp on query
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true }, // validate between 1 and 280 characters
    createdAt: { type: Date, default: Date.now }, // getter method to format timestamp on query
    username: { type: String, required: true }, // user that created this thought
    reactions: [reactionSchema],
}, {
    virtuals: { // where to add opts
        reactionCount: {
            get() { return `${this.reactions.length}` }
        }
    }
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
