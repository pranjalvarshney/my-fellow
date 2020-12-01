const express = require("express")
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller")
const {
  createPost,
  allposts,
  upload,
  getPostById,
  updatePost,
  deletePost,
  getPost,
} = require("../controllers/post.controller")
const { getUserById } = require("../controllers/user.controller")
const router = express.Router()

//param
router.param("userId", getUserById)
router.param("postId", getPostById)

// post route - create
router.post(
  "/create/post/:userId",
  isSignedIn,
  isAuthenticated,
  upload.array("picture", 10),
  createPost
)

// get all posts - read all
router.get("/posts", isSignedIn, allposts)

//get a particular post
router.get("/post/:postId", isSignedIn, getPost)

// update post
router.put(
  "/update/post/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  upload.array("picture", 10),
  updatePost
)

// delete post
router.delete(
  "/delete/post/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  deletePost
)

module.exports = router
