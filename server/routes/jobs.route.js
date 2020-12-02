const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");
const {
  getJobById,
  createJob,
  allJobs,
  getJob,
} = require("../controllers/jobs.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("jobId", getJobById);

// create job
router.post("/create/job/:userId", isSignedIn, isAuthenticated, createJob);

// read all jobs
router.get("/jobs", isSignedIn, allJobs);

//read a particular job
router.get("/jobs/:jobId", isSignedIn, getJob);

module.exports = router;
