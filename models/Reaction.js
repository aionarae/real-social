const { Schema, model } = require('mongoose');

// Create the Reaction schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  }
}, 
{
  toJSON: {
    getters: true
  },
});

// used as a reaction to a thought in the Thought model

// Create the Reaction model using the ReactionSchema
const Reaction = model('reaction', ReactionSchema);

// Export the Reaction model
module.exports = Reaction;
