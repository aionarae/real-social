const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData, reactionData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected to the database');

  // delete collections if they exist
  // users
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.db.dropCollection('users');
  }

  // thoughts
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.db.dropCollection('thoughts');
  }

  // reactions
  let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
  if (reactionCheck.length) {
    await connection.db.dropCollection('reactions');
  }

  await User.create(userData);
  await Thought.create(thoughtData, reactionData);

  console.log('all done!');
  process.exit(0);
});