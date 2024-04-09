const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const opts = { toJSON: { virtuals: true } };


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
        get: timestamp => dayjs(timestamp).format('MMMM DD, YYYY [at] hh:mm a'),
    },
}, {
    toJSON: {
        getters: true
    },
    _id: false
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
        get: (timestamp) => {
            return dayjs(timestamp).format('MMMM DD, YYYY [at] hh:mm a')
        },
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
