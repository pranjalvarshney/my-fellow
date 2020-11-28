const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth.controller");
const { getUserById } = require("../controllers/user.controller");
const { createBlog, allblogs, upload, getBlogById, updateBlog, deleteBlog } = require("../controllers/blog.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("blogId", getBlogById);

// create blog
router.post("/create/blog/:userId", isSignedIn, isAuthenticated, upload.single("picture"), createBlog);

// updtae blog
router.put("/update/:userId/:blogId", isSignedIn, isAuthenticated, updateBlog);

// delete blog
router.delete("/delete/:userId/:blogId",isSignedIn, isAuthenticated, deleteBlog);

// all blogs
router.get("/blogs", isSignedIn, allblogs);

module.exports = router;