const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const User = require("../models/user")

exports.signup = (req, res) => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    })
  }
  const { name, email, password, rollno } = req.body
  const newUser = new User({ name, email, password, rollno })
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured while processing the request",
      })
    }
    return res.status(200).json({
      data: user,
    })
  })
}

exports.signin = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errormsg: errors.array()[0].msg,
    })
  }
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured!",
      })
    }
    if (!user) {
      return res.status(400).json({
        errorMsg: "Wrong credentials!",
      })
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        errorMsg: "Wrong credentials!",
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET)
    res.cookie("token", token, { expire: new Date() + 9999 })

    const { _id, name, email, role, rollno } = user

    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
        rollno,
      },
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.json({
    msg: "Signed out successfully",
  })
}
