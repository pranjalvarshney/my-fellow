const Feedback = require("../models/Feedback")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { getUserById } = require("../controllers/user.controller")

exports.getFeedbackById = (req, res, next, Id) => {
  Feedback.findById(Id).exec((err, feedback) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (!feedback) {
      return res.status(400).json({
        errorMsg: "Feedback not found",
      })
    }
    req.feedback = feedback
    next()
  })
}

fs.mkdir("uploads", (err) => {
  if (err) {
  }
  fs.mkdir("uploads/feedbacks", (err) => {
    if (err) {
    }
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/feedbacks")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "feedback_" +
        new Date(Date.now())
          .toLocaleString("en-IN")
          .replace(/-|:|\/|\.|,|/g, "")
          .replace(/ /g, "_") +
        path.extname(file.originalname)
    )
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/svg+xml" ||
    file.mimetype == "video/mp4"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
exports.upload = multer({ storage: storage, fileFilter: fileFilter })

// create feedback
exports.createFeedback = (req, res) => {
  const user = req.profile
  const { feedback } = req.body
  var picture
  if (req.file) {
    picture = req.file.path
  }
  const newFeedback = Feedback({ user, feedback, picture })
  newFeedback.save((err, feedback) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    res.status(200).json(feedback)
  })
}

//get all feedbacks
exports.allFeedbacks = (req, res) => {
  Feedback.find().exec((err, feedbacks) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      })
    }

    return res.json(feedbacks)
  })
}

//Read a particular feedback
exports.getFeedback = (req, res) => {
  Feedback.find({ _id: req.feedback._id }).exec((err, feedback) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    return res.json(feedback)
  })
}
