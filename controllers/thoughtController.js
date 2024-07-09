const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

   // create a new thought
    async createThought({ body }, res) {
      try {
        const dbThoughtData = await Thought.create(body);
        const dbUserData = await User.findByIdAndUpdate(
          body.userId,
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

  // get one thought by id
  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findById(params.id);
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a thought by id
  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a thought
  async deleteThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndDelete(params.id);
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // add a reaction to a thought
  async addReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        params.thoughtId,
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // remove a reaction from a thought
  async removeReaction({ params }, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        params.thoughtId,
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};