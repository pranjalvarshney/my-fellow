const express = require("express");
const {
	isSignedIn,
	isAuthenticated,
} = require("../controllers/auth.controller");
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
} = require("../controllers/user.controller");
const router = express.Router();

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/users", isSignedIn, getAllUsers);

// Bookmarks
router.put("/bookmark/user/:userId", bookmark);
router.get("/bookmarks/user/:userId", getAllBookmarks);

// Friends
router.put("/addFriend/:userId", isSignedIn, isAuthenticated, addFriend);
router.put("/acceptRequest/:userId", isSignedIn, isAuthenticated, acceptReq);
router.put("/rejectRequest/:userId", isSignedIn, isAuthenticated, rejectReq);
router.put("/unfriend/:userId", isSignedIn, isAuthenticated, unfriend);

module.exports = router;
