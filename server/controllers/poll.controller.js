const Poll = require("../models/Poll")
const { getUserById } = require("../controllers/user.controller")

exports.getPollById = (req, res, next, Id) => {
  Poll.findById(Id).exec((err, poll) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (!poll) {
      return res.status(400).json({
        errorMsg: "Poll not found",
      })
    }
    req.poll = poll
    next()
  })
}

// create poll
exports.createPoll = (req, res) => {
  const { user, title, poll } = req.body
  const newPoll = Poll({ user, title, poll })
  newPoll.save((err, poll) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    res.status(200).json(poll)
  })
}

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
        .json({ errorMsg: "An error occured, try again later" })
    }
    res.status(200).json(poll)
  })
}

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
        .json({ errorMsg: "An error occured, try again later" })
    }
    res.status(200).json(poll)
  })
}

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
        .json({ errorMsg: "An error occured, try again later" })
    }
    res.status(200).json(poll)
  })
}

// get all polls
exports.allpolls = (req, res) => {
  Poll.find().exec((err, polls) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    res.json(polls)
  })
}

//Read a particular poll
exports.getPoll = (req, res) => {
  return res.json(req.poll)
}

// Update poll
exports.updatePoll = (req, res) => {
  Poll.findByIdAndUpdate(
    { _id: req.poll._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, poll) => {
      if (err || !poll) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      res.status(200).json(poll)
    }
  )
}

// Delete polls
exports.deletePoll = (req, res) => {
  Poll.findByIdAndRemove(
    { _id: req.poll._id },
    { useFindAndModify: false, new: true },
    (err, poll) => {
      if (err || !poll) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      res.status(200).json({ message: "Poll has been removed" })
    }
  )
}
