const express = require("express");
const { getAdById, createAd, upload, allAds } = require("../controllers/ad.controller");
const { isSignedIn, isAuthenticated } = require("../controllers/auth.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

//param
router.param("userId", getUserById);
router.param("adId", getAdById);

// create ads
router.post("/create/ad/:userId", isSignedIn, isAuthenticated, upload.array("picture", 5), createAd);

// get all ads - read all
router.get("/ads", isSignedIn, allAds);

module.exports = router;
