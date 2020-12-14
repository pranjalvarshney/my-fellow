const express = require("express");
const {
	isSignedIn,
	isAuthenticated,
} = require("../controllers/auth.controller");
const { upload } = require("../controllers/event.controller");
const {
	getEventById,
	createEvent,
} = require("../controllers/event.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("eventId", getEventById);

// create event
router.post(
	"/create/event/:userId",
	isSignedIn,
	isAuthenticated,
	upload.single("picture"),
	createEvent
);

module.exports = router;
