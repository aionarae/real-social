// Purpose: This file contains the data that will be used to seed the database.
const userData = [
  {
    username: 'user_1',
    email: 'user_1@test.com',
    thoughts: [],
    friends: []
  }
];

const reactionData = [
  {
    reactionBody: 'This is the reaction body.',
    username: 'user_1'
  }
];

const thoughtData = [
  {
    thoughtText: 'This is a thought.',
    username: 'user_1',
    reactions: []
  }
];

module.exports = { userData, reactionData, thoughtData };