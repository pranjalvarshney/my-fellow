const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const {
  signup,
  signin,
  signout,
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller")

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage("Enter a valid name"),
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("collegeId")
      .isLength({ min: 5 })
      .withMessage("Enter a valid College Id"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password should be greater than 5 characters"),
  ],
  signup
)

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password should be greater than 5 characters"),
  ],
  signin
)

router.get("/signout", signout)

// router.get("/isme", isSignedIn, (req, res) => {
//   res.send("hi")
// })

module.exports = router
