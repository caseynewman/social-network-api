const router = require('express').Router();
const { ObjectId } = require('bson');
const { User, Thought } = require('../../models');

// endpoint /api/users

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({}).lean();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single user by _id and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findById(req.params.id).lean();
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
        res.status(200).json({ message: 'New user added successfully! '});
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT update single user by _id
router.put('/:id', async (req, res) => {
    try{
        const updatedUser = await User.updateOne({
            _id: new ObjectId(req.params.id)
        }, req.body);
        console.log(updatedUser);
        res.status(200).json({ message: 'User updated successfully! '});
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE user by _id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        console.log(deletedUser);
        res.status(200).json({ message: 'User deleted successfully! '});
    } catch {
        res.status(500).json(err);
    }
});

// BONUS: remove user's associated thoughts when deleted




// endpoint /api/users/:userId/friends/:friendId

// POST add new friend to user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findById(userId);
        console.log(userId)
        console.log(friendId)
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found!' });
        // }
        user.friends.push(friendId);
        await user.save();
        res.status(200).json({ message: 'New friend added successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});



// DELETE remove friend from user's friend list



module.exports = router
