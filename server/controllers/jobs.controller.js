const Job = require("../models/Jobs");
const path = require("path");

exports.getJobById = (req, res, next, Id) => {
  Job.findById(Id).exec((err, job) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    if (!job) {
      return res.status(400).json({
        errorMsg: "Job not found",
      });
    }
    req.job = job;
    next();
  });
};

// Create job
exports.createJob = (req, res) => {
  const { user, work, company, abtWork, date } = req.body;

  const newJob = Job({
    user,
    work,
    company,
    abtWork,
    date,
  });

  newJob.save((err, job) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.status(200).json(job);
  });
};

// read all jobs
exports.allJobs = (req, res) => {
  Job.find().exec((err, jobs) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(jobs);
  });
};

//Read a particular job
exports.getJob = (req, res) => {
  Job.find({ _id: req.job._id }).exec((err, job) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(job);
  });
};

// update job
exports.updateJob = (req, res) => {
  Job.findByIdAndUpdate(
    { _id: req.job._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, job) => {
      if (err || !job) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json(job);
    }
  );
};

// delete job
exports.deleteJob = (req, res) => {
  Job.findByIdAndRemove(
    { _id: req.job._id },
    { useFindAndModify: false, new: true },
    (err, job) => {
      if (err || !job) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json({ message: "Job has been removed" });
    }
  );
};
