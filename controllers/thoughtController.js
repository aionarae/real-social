const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = Thought.find({})
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get one thought by id, use findById instead of findOne
    async getThoughtById({ params }, res) {
        try {
            const thought = Thought.findbyId(params.id);
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create thought to belong to a user use findbyid instad of findOneAndUpdate
    async createThought({ body }, res) {
        try {
            const thought = Thought.create(body);
            const user = User.findByIdAndUpdate(
                { _id: ObjectId(body.userId) },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    },
        // update thought by id use findByIdAndUpdate
        async updateThought({ params, body }, res) {
            try {
                const thought = Thought.findByIdAndUpdate(
                    { _id: ObjectId(params.id) },
                    body,
                    { new: true }
                );
                res.json(thought);
            }
            catch (err) {
                console.log(err);
                res.status(400).json(err);
            }  
        },
        // delete thought by id
        async deleteThought({ params }, res) {
            try {
                const thought = Thought.findOneAndDelete({ _id: ObjectId(params.id) });
            }
            catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },
          // add reaction to thought
        async addReaction({ params, body }, res) {
            try {
                const thought = Thought.findByIdAndUpdate(
                    { _id: ObjectId(params.id) },
                    { $push: { reactions: body } },
                    { new: true }
                );
                res.json(thought);
            }
            catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },
          // remove reaction from thought
        async deleteReaction({ params }, res) {
            try {
                const thought = Thought.findByIdAndUpdate(
                    { _id: ObjectId(params.id) },
                    { $pull: { reactions: { reactionId: params.reactionId } } },
                    { new: true }
                );
                res.json(thought);
            }
            catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },

}