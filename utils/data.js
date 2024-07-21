// Purpose: This file contains the data that will be used to seed the database.

const users = [
  "Betty",
  "Inez",
  "Clara",
  "Taylor",
  "James",
]

const reactionData = [
  {
    reactionBody: "My reaction: This is my reaction.",
    username: users[Math.floor(Math.random() * users.length)],
  }
];

const thoughtData = [
  {
    thoughtText: "My thoughts: These are my thoughts.",
    username: users[Math.floor(Math.random() * users.length)],
    reactions: [
      {
        reactionBody: "My reaction: This is my reaction.",
        username: users[Math.floor(Math.random() * users.length)],
      }
    ]
  }
];

const userData = users.map(user => {
  return {
    username: user,
    email: `${user.toLowerCase()}@test.com`,
    };
});



console.log("This is the userData:", userData);

console.log("This is the userData:", userData);
console.log(" ");
console.log("This is the reactionData:", reactionData);
console.log(" ");
console.log("This is the thoughtData:", thoughtData);

module.exports = { userData, reactionData, thoughtData };