const { Schema, model } = require('mongoose');

// Define the User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  // Array of _id values referencing the Thought model
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }
  ],
  // Array of _id values referencing the User model (self-reference)
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('user', UserSchema);

// Export the User model
module.exports = User;
