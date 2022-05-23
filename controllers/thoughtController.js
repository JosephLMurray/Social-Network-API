const { Thought, User, Reaction } = require("../models");

module.exports = {
  //get a thought
  getThoughts(req, res) {
    Thought.find()
      .populate("reactions")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted, but no users found",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add an reaction to a thought
  addReaction(req, res) {
    Reaction.create(req.body).then((reaction) =>
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction._id } }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: "No thought found with that ID :(" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    );
  },
  // Remove reaction from a thought
  removeReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId }).then((reaction) =>
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: "No thought found with that ID " })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    );
  },
  // Add a thought to a user
  addThought(req, res) {
    Thought.create(req.body).then((thought) =>
      User.findOneAndUpdate(
        { username: thought.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No user found with that ID" })
            : res.json([thought, user])
        )
        .catch((err) => res.status(500).json(err))
    );
  },
};
