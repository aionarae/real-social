// Purpose: to create the user controller for the user model
const { ObjectId } = require('mongoose');

const { User, Thought } = require('../models');

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    User.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err.message);
        res.status(500).json(err);
      });
  },

  // get one user by id
  async getUserById({ params }, res ) {
    User.findById({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json(err);
      });
  },
  // create a user
  async createUser({ body }, res) {
    const { userId, thoughtId } = body;

    // Ensure userId and thoughtId are valid ObjectIds
  
  
    try {
      // Create the user first
      const newUser = await User.create(body);
  
      // Then, push the thoughtId into the newUser's thoughts array
      let updatedUser = newUser;
      if (thoughtId) {
        updatedUser = await User.findByIdAndUpdate(
          newUser._id, // Use the newly created user's _id
          { $push: { thoughts: thoughtId } }, // Pushing thoughtId into the thoughts array
          { new: true }
        );
      }

      if (!updatedUser) {
        return res.status(404).json({ message: 'User creation succeeded but updating thoughts failed.' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // update a user by id
  async updateUser({ params, body }, res) {

    console.log("params:", params)
    console.log("body:", body)

    try {
      const dbUserData = await User.findByIdAndUpdate(params.id);

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // delete a user by id
  async deleteUser({ params }, res) {
    try {
      const dbUserData = await User.findByIdAndDelete(params.id);

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },
  // add a friend to a user's friend list
  async addFriend({ userId, friendId }) {
    // Ensure userId and friendId are valid ObjectIds
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId)) {
      throw new Error('Invalid user ID or friend ID');
    }

    const dbUserData = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: new ObjectId(friendId) } },
      { new: true }
    );
  
    if (!dbUserData) {
      throw new Error('No user found with this id');
    }
  
    return dbUserData;
  },
  // remove a friend from a user's friend list
  async deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  } 
  
};


