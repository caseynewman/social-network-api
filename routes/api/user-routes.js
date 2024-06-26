const router = require('express').Router();
const { ObjectId } = require('bson');
const { User, Thought } = require('../../models');


// endpoint /api/users

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({});
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single user by _id and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.status(200).json({ message: 'New user added successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT update single user by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({
            _id: new ObjectId(req.params.id)
        }, req.body);
        console.log(updatedUser);
        res.status(200).json({ message: 'User updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE user by _id
// BONUS: remove user's associated thoughts when deleted
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        await Thought.deleteMany({ username: user.username });
        await User.deleteOne({
            _id: req.params.id
        });
        console.log(user);
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch {
        console.error(err);
        res.status(500).json(err);
    }
});


// endpoint /api/users/:userId/friends/:friendId

// POST add new friend to user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $addToSet: {
                friends: req.params.friendId
            }
        }, {
            new: true
        });
        res.status(200).json({ message: 'New friend added successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE remove friend from user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $pull: {
                friends: req.params.friendId
            }
        }, {
            new: true
        });
        res.status(200).json({ message: 'Friend successfully removed!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router
