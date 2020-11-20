const express = require("express")
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller")
const { getUserById, getUser } = require("../controllers/user.controller")
const router = express.Router()

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
module.exports = router
