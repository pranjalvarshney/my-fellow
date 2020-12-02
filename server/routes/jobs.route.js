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
  updateJob,
  deleteJob,
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

// update job
router.put(
  "/update/job/:userId/:jobId",
  isSignedIn,
  isAuthenticated,
  updateJob
);

// delete job
router.delete(
  "/delete/job/:userId/:jobId",
  isSignedIn,
  isAuthenticated,
  deleteJob
);
module.exports = router;
