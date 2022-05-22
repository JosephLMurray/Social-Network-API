const { Schema, Types, model } = require("mongoose");

const formatDate = (date) => {
  return date.toLocaleString();
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      maxlength: 280,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
