const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/auth.controller");
const {
  getPollById,
  createPoll,
  pollYes,
  pollNo,
  skipPoll,
  allpolls,
  getPoll,
  updatePoll,
  deletePoll,
} = require("../controllers/poll.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("pollId", getPollById);

// create poll
router.post("/create/poll/:userId", isSignedIn, isAuthenticated, createPoll);

// Agree/Disagree/Skip the poll
router.put("/poll/agree/:userId", isSignedIn, isAuthenticated, pollYes);
router.put("/poll/disagree/:userId", isSignedIn, isAuthenticated, pollNo);
router.put("/poll/skip/:userId", isSignedIn, isAuthenticated, skipPoll);

// get all polls
router.get("/polls", isSignedIn, allpolls);

//get a particular poll
router.get("/poll/:pollId", isSignedIn, getPoll);

// update poll
router.put(
  "/update/poll/:userId/:pollId",
  isSignedIn,
  isAuthenticated,
  updatePoll
);

// delete poll
router.delete(
  "/delete/poll/:userId/:pollId",
  isSignedIn,
  isAuthenticated,
  deletePoll
);

module.exports = router;
