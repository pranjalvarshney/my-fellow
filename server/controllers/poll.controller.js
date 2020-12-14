const Poll = require("../models/Poll");
const { getUserById } = require("../controllers/user.controller");

exports.getPollById = (req, res, next, Id) => {
  Poll.findById(Id)
    // .populate("user upvotes.user comments.user")
    .exec((err, poll) => {
      if (err) {
        return res.status(400).json({
          errorMsg: "An error occured",
        });
      }
      if (!poll) {
        return res.status(400).json({
          errorMsg: "Poll not found",
        });
      }
      // blog.user.salt = undefined;
      // blog.user.encryptedpassword = undefined;
      req.poll = poll;
      next();
    });
};

// create poll
exports.createPoll = (req, res) => {
  const { user, title, poll } = req.body;
  const newPoll = Poll({ user, title, poll });
  newPoll.save((err, poll) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.status(200).json(poll);
  });
};

// Agree with the poll
exports.pollYes = (req, res) => {
  Poll.findByIdAndUpdate(
    { _id: req.body.pollId },
    { $push: { yes: req.profile._id } },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, poll) => {
    if (err) {
      return res
        .json(400)
        .json({ errorMsg: "An error occured, try again later" });
    }
    res.status(200).json(poll);
  });
};

// Disagree with the poll
exports.pollNo = (req, res) => {
  Poll.findByIdAndUpdate(
    { _id: req.body.pollId },
    { $push: { no: req.profile._id } },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, poll) => {
    if (err) {
      return res
        .json(400)
        .json({ errorMsg: "An error occured, try again later" });
    }
    res.status(200).json(poll);
  });
};

// Skip the poll
exports.skipPoll = (req, res) => {
  Poll.findByIdAndUpdate(
    { _id: req.body.pollId },
    { $push: { skip: req.profile._id } },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, poll) => {
    if (err) {
      return res
        .json(400)
        .json({ errorMsg: "An error occured, try again later" });
    }
    res.status(200).json(poll);
  });
};
