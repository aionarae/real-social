// Create the Thought model using the thoughtSchema
const {Schema, model, Types } = require('mongoose');

// Import date-format
const dateFormat = require('date-format');

// Define the Reaction subdocument for the reactions array in the Thought schema
const reactionSchema = new Schema(
    {
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
            type: { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat('MM/dd/yyyy hh:mm:ss', new Date(createdAtVal))
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Define the Thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat('MM/dd/yyyy hh:mm:ss', new Date(createdAtVal))
        },
        username: {
            type: { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Create the Reaction model using the reactionSchema
//const //Reaction = model('Reaction', reactionSchema);

// Export the Thought model
module.exports = { Thought };