const router = require('express').Router();
const { ObjectId } = require('bson');
const { User, Thought } = require('../../models');


// endpoint /api/thoughts

// GET all thoughts
// GET a single thought by _id
// POST new thought - push created thought's _id to the associated user's thoughts array field
// PUT update thought by _id
// DELETE remove thought by _id





// endpoint /api/thoughts/:thoughtId/reactions

// POST create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value


module.exports = router
