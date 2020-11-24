const express = require("express")
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller")
const { createPost, allposts } = require("../controllers/post.controller")
const { getUserById } = require("../controllers/user.controller")
const router = express.Router()

//param
router.param("userId", getUserById)

// post route - create
router.post("/create/post/:userId", createPost)

// get all posts - read all
router.get("/posts", isSignedIn, allposts)

module.exports = router
