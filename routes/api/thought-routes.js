const router = require('express').Router();
const { ObjectId } = require('bson');
const { User, Thought } = require('../../models');


// endpoint /api/thoughts

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find({});
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single thought by _id
router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findById(req.params.id);
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST new thought - push created thought's _id to the associated user's thoughts array field
router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate({
            _id: req.body.userId
        }, {
            $push: {
                thoughts: thoughtData._id
            }
        }, {
            new: true
        });
        if (!userData) {
            return res.status(404).json({ message: 'Thought created but no user with that ID!' });
        }
        res.status(200).json({ message: 'New thought added successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT update thought by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.updateOne({
            _id: new ObjectId(req.params.id)
        }, req.body);
        console.log(updatedThought);
        res.status(200).json({ message: 'Thought updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE remove thought by _id
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        console.log(deletedThought);
        res.status(200).json({ message: 'Thought deleted successfully!' });
    } catch {
        res.status(500).json(err);
    }
});


// endpoint /api/thoughts/:thoughtId/reactions

// POST create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        }, {
            $addToSet: {
                reactions: req.body
            }
        }, {
            runValidators: true,
            new: true
        });
        res.status(200).json({ message: 'Reaction added successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value -- what if thought has multiple reactions?
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, {
            $pull: {
                reactions: {
                    reactionId
                }
            }
        }, {
            new: true
        });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json({ message: 'Reaction removed successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router
