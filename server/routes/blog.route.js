const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth.controller");
const { getUserById } = require("../controllers/user.controller");
const { createBlog, allblogs, upload } = require("../controllers/blog.controller");
const router = express.Router();

// param
router.param("userId", getUserById);

// create blog
router.post("/create/blog/:userId", isSignedIn, isAuthenticated, upload.single("picture"), createBlog);

// all blogs
router.get("/blogs", isSignedIn, allblogs);


module.exports = router;