const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/auth.controller");
const {
  getFeedbackById,
  createFeedback,
  allFeedbacks,
  upload,
  getFeedback,
} = require("../controllers/feedback.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("feedbackId", getFeedbackById);

//create feedback
router.post(
  "/create/feedback/:userId",
  isSignedIn,
  isAuthenticated,
  upload.single("picture"),
  createFeedback
);
// get all feedbacks
router.get(
  "/feedbacks/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  allFeedbacks
);
//get a particular feedback
router.get(
  "/feedbacks/:feedbackId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getFeedback
);

module.exports = router;
