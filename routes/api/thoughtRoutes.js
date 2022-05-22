const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
  addThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(addThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(addReaction);

// /api/thoughts/:thoughtId/:reactionId
router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
