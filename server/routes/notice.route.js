const express = require("express");
const {
	isSignedIn,
	isAuthenticated,
	isAdmin,
} = require("../controllers/auth.controller");
const {
	getNoticeById,
	createNotice,
	allNotices,
	getNotice,
} = require("../controllers/notice.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("noticeId", getNoticeById);

// Create notice
router.post(
	"/create/notice/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createNotice
);

// Get all notices
router.get("/notices", isSignedIn, allNotices);

// Get a particular news/notice
router.get("/notices/:noticeId", isSignedIn, getNotice);

module.exports = router;
