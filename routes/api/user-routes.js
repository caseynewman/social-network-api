const router = require('express').Router();
const { ObjectId } = require('bson');
const { User, Thought } = require('../../models');

// endpoint /api/users

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({}).lean()
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single user by _id and populated thought and friend data


// POST a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT update single user by _id
router.put('/:id', async (req, res) => {
    try{
        const updatedUser = await User.updateOne({
            _id: new ObjectId(req.params.id)
        }, req.body)
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE user by _id
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({
            _id: new ObjectId(req.params.id)
        })
        res.status(200).json(deleteUser);
    } catch {
        res.status(500).json(err);
    }
});

// BONUS: remove user's associated thoughts when deleted






// endpoint /api/users/:userId/friends/:friendId

// POST add new friend to user's friend list
// DELETE remove friend from user's friend list



module.exports = router
