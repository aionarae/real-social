// Purpose: This file contains the data that will be used to seed the database.
const user = [
  {
    username: 'test_user',
    email: 'test@test.com',
    thoughts: [],
    friends: []
  }
];

const reaction = [
  {
    reactionBody: 'test reaction',
    username: 'test_user'
  }
];

const thought = [
  {
    thoughtText: 'test thought',
    username: 'test_user',
    reactions: []
  }
];

module.exports = { user, reaction, thought };