const User = require("../models/User")

exports.getUserById = (req, res, next, Id) => {
  User.findById(Id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured",
      })
    }
    if (!user) {
      return res.status(400).json({
        errormsg: "User not found",
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

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured",
      })
    }
    if (!users) {
      return res.status(400).json({
        errormsg: "User not found",
      })
    }
    return res.json(users)
  })
}
