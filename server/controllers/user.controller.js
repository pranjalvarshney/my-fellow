const User = require("../models/User")
const formidable = require("formidable")
const fs = require("fs")

exports.getUserById = (req, res, next, Id) => {
  User.findById(Id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (!user) {
      return res.status(400).json({
        errorMsg: "User not found",
      })
    }
    req.profile = user
    next()
  })
}

exports.getUser = (req, res) => {
  //TODO: get back here for password
  req.profile.encryptedpassword = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      user.encryptedpassword = undefined
      user.salt = undefined
      return res.json(user)
    }
  )
}

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (!users) {
      return res.status(400).json({
        errorMsg: "User not found",
      })
    }
    return res.json(users)
  })
}
