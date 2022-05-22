const connection = require("../config/connection");
const { Thought, User } = require("../models");

const userData = [
  {
    username: "jimmy",
    email: "jimmy@email.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "bobby",
    email: "bobby@email.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "suzy",
    email: "suzy@email.com",
    thoughts: [],
    friends: [],
  },
];

const thoughtData = [
  {
    thoughtText: "Hoo boy! That was fast",
    username: "bobby",
  },
  {
    thoughtText: "New car! so excited!",
    username: "jimmy",
  },
  {
    thoughtText: "we doing anything this weekend?",
    username: "suzy",
  },
];

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing Users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Add users and thoughts to the collection and await the results
  await User.collection.insertMany(userData);

  await Thought.collection.insertMany(thoughtData);

  // Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
