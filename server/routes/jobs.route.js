const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");
const {
  getJobById,
  createJob,
  allJobs,
} = require("../controllers/jobs.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("jobId", getJobById);

// create job
router.post("/create/job/:userId", isSignedIn, isAuthenticated, createJob);

// all blogs
router.get("/jobs", isSignedIn, allJobs);

module.exports = router;
