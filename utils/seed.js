const connection = require('../config/connection');
const User = require('../models/User');
const { Thought } = require('../models/Thought');
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

  const thoughtMapping = {};


// Create users without thoughts and friends
  const createdUsers = await User.create(userData.map(user => ({
    username: user.username,
    email: user.email
  })));

// Create a mapping of usernames to _ids for later reference
const userMapping = createdUsers.reduce((acc, user) => {
  acc[user.username] = user._id;
  return acc;
  console.log("This is the userMapping acc:", acc);
}, {});

// Create thoughts and associate them with users
for (const thought of thoughtData) {
  const createdThought = await Thought.create({
    thoughtText: thought.thoughtText,
    username: userMapping[thought.username], // Use the _id from the mapping
    reactions: thought.reactions
  });

  // If the username doesn't exist in thoughtMapping, create a new array with the thought ID
  if (!thoughtMapping[thought.username]) {
    thoughtMapping[thought.username] = [createdThought._id];
  }

  // Update the user to include thoughts in thoughts array and include friends in their friends array
  await User.findByIdAndUpdate(
    userMapping[thought.username],
    { $push: { 
      thoughts: createdThought._id,
      friends: Object.values(userMapping).filter(id => id !== userMapping[thought.username])
      } 
    },
  );
}

// Create reactions and associate them with thoughts
  console.log('all done!');
  process.exit(0);

});
