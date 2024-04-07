const router = require('express').Router();
const { ObjectId } = require('bson');
const { User, Thought } = require('../../models');


// endpoint /api/thoughts

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find({}).lean();
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single thought by _id
router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findById(req.params.id).lean();
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST new thought - push created thought's _id to the associated user's thoughts array field
router.post('/', async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this username' });
        }
        await user.save();
        await User.findByIdAndUpdate(
            user._id, {
            $push: {
                thoughts: savedThought._id
            }
        }, {
            new: true,
            runValidators: true
        }
        );
        console.log(savedThought);
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
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        const newReaction = {
            reactionBody,
            username
        };
        const thought = await Thought.findByIdAndUpdate(thoughtId, {
            $push: {
                reactions: newReaction
            }
        }, {
            new: true
        });
        res.status(200).json({ message: 'Reaction added successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE to pull and remove a reaction by the reaction's reactionId value


module.exports = router
