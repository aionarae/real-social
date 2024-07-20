// Create the Thought model using the thoughtSchema
const {Schema, model, Types } = require('mongoose');

// Define the Reaction schema subdocument
const reactionSchema = new Schema({
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
    }
});

// Define the Thought schema
const thoughtSchema = new Schema({
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
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }, 
}
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;