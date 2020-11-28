const express = require("express")
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller")
const { createPost, allposts, upload, getPostById, updatePost, deletePost } = require("../controllers/post.controller")
const { getUserById } = require("../controllers/user.controller")
const router = express.Router()

//param
router.param("userId", getUserById);
router.param("postId", getPostById);

// post route - create
router.post("/create/post/:userId", isSignedIn, isAuthenticated, upload.array("picture", 10), createPost)

// get all posts - read all
router.get("/posts", isSignedIn, allposts)

// update post
router.put("/update/:userId/:postId", isSignedIn, isAuthenticated, updatePost);

// delete post
router.delete("/delete/:userId/:postId",isSignedIn, isAuthenticated, deletePost);

module.exports = router
