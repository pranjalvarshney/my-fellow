const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const User = require("../models/User")
const expressJWT = require("express-jwt")

exports.signup = (req, res) => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    })
  }
  const { name, dob, email, password, collegeId, rollno } = req.body
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (user) {
      return res.status(200).json({
        errorMsg: "User already exits",
      })
    }
    if (!user) {
      const newUser = new User({
        name,
        email,
        password,
        dob,
        rollno,
        collegeId,
      })
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({
            err,
            errorMsg: "An error occured while processing the request",
          })
        }
        return res.status(200).json({
          success: "true",
          data: user.name,
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
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
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      expire: new Date() + 9999,
    })

    const { _id, name, email, role, collegeId, rollno } = user

    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
        rollno,
        collegeId,
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

// for protected routes
exports.isSignedIn = expressJWT({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  console.log(req.profile)
  console.log(req.auth)
  let check = req.profile && req.auth && req.profile._id == req.auth.id
  if (!check) {
    return res.status(403).json({
      errorMsg: "Access denied",
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 1 || req.profile.role === 0) {
    return res.status(403).json({
      errorMsg: "Access denied ! not admin",
    })
  }
  next()
}
