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
        errorMsg: "Blog not found",
      });
    }
    req.jobs = job;
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
      res.status(400).json("error");
      console.log(err);
    }
    return res.status(200).json(job);
  });
};
