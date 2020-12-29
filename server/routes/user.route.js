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
  acceptReq,
  rejectReq,
  unfriend,
  unBookmark,
  updateProfileImg,
  getProfilePic,
} = require("../controllers/user.controller")
const router = express.Router()

router.param("userId", getUserById)
router.get("/user/:userId", isSignedIn, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.put("/pic/user/:userId", isSignedIn, isAuthenticated, updateProfileImg)
router.get("/pic/user/:userId", getProfilePic)
router.get("/users", isSignedIn, getAllUsers)

// Bookmarks
router.put("/bookmark/user/:userId", isSignedIn, isAuthenticated, bookmark)
router.put("/unbookmark/user/:userId", isSignedIn, isAuthenticated, unBookmark)
router.get(
  "/bookmarks/user/:userId",
  isSignedIn,
  isAuthenticated,
  getAllBookmarks
)

// Friends
router.put("/addfriend/:userId", isSignedIn, isAuthenticated, addFriend)
router.put("/acceptrequest/:userId", isSignedIn, isAuthenticated, acceptReq)
router.put("/rejectrequest/:userId", isSignedIn, isAuthenticated, rejectReq)
router.put("/unfriend/:userId", isSignedIn, isAuthenticated, unfriend)

module.exports = router
