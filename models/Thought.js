// Purpose: Create the Thought model using the ThoughtSchema
const {Schema, model } = require('mongoose');

// Import the Reaction schema
const ReactionSchema = require('./Reaction');

// Import the dateFormat utility
const dateFormat = require('../utils/dateFormat');

// Define the Thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    // Array of nested documents created with the reactionSchema
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }, 
}
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;