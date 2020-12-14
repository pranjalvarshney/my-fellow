const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");
const { getPollById, createPoll } = require("../controllers/poll.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("pollId", getPollById);

// create poll
router.post("/create/poll/:userId", isSignedIn, isAuthenticated, createPoll);

module.exports = router;
