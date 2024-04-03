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
// PUT update single user by _id
// DELETE user by _id

// BONUS: remove user's associated thoughts when deleted






// endpoint /api/users/:userId/friends/:friendId

// POST add new friend to user's friend list
// DELETE remove friend from user's friend list



module.exports = router
