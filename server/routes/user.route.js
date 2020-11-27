const express = require("express")
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller")
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
} = require("../controllers/user.controller")
const router = express.Router()

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/users", isSignedIn, getAllUsers)

module.exports = router
