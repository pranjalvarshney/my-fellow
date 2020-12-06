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
  likePost,
  unlikePost,
  commentPost,
  getAllPostByUser,
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

// Like a post
router.put("/post/like/:userId/:postId", isSignedIn, isAuthenticated, likePost)

// Unlike a post
router.put(
  "/post/unlike/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  unlikePost
)

// comment a post
router.put(
  "/post/comment/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  commentPost
)

// get all post by user
router.get("/:userId/posts", isSignedIn, getAllPostByUser)

module.exports = router
