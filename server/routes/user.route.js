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
  bookmark,
  getAllBookmarks,
  addFriend,
} = require("../controllers/user.controller")
const router = express.Router()

router.param("userId", getUserById)
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/users", isSignedIn, getAllUsers)

router.put("/bookmark/user/:userId", bookmark)
router.get("/bookmarks/user/:userId", getAllBookmarks)

router.post("/addFriend/:userId", isSignedIn, isAuthenticated, addFriend)

module.exports = router
