const connection = require('./config/connection');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts, reactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected to the database');

  // delete collections if they exist



  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  await User.create(users);
  await Thought.create(thoughts);
  await Reaction.create(reactions);

  console.log('all done!');
  process.exit(0);
});