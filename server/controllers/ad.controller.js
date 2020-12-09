const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Ads = require("../models/Ads");
const { getUserById } = require("../controllers/user.controller");

exports.getAdById = (req, res, next, Id) => {
	Ads.findById(Id).exec((err, ad) => {
		if (err) {
			return res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		if (!ad) {
			return res.status(400).json({
				errorMsg: "Ad not found",
			});
		}
		req.ads = ad;
		next();
	});
};

fs.mkdir("uploads", (err) => {
	if (err) {
	}
	fs.mkdir("uploads/ads", (err) => {
		if (err) {
		}
	});
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/ads");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			"ad_" +
				new Date(Date.now())
					.toISOString()
					.replace(/-|:|Z|\./g, "")
					.replace(/T/g, "_") +
				path.extname(file.originalname)
		);
	},
});
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype == "image/jpeg" ||
		file.mimetype == "image/png" ||
		file.mimetype == "image/gif" ||
		file.mimetype == "image/svg+xml"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
exports.upload = multer({ storage: storage, fileFilter: fileFilter });

//Create an Ad
exports.createAd = (req, res) => {
	const { user, title, content, contact, price } = req.body;
	const files = req.files;
	const picture = [];
	for (let i = 0; i < files.length; i++) {
		picture[i] = files[i].path;
	}
	const newAd = Ads({ user, title, content, price, contact, picture });
	newAd.save((err, ad) => {
		if (err) {
			res.status(400).json("error");
		}
		return res.status(200).json(ad);
	});
};

//Read all ads
exports.allAds = (req, res) => {
	Ads.find().exec((err, ads) => {
		if (err) {
			res.status(400).json("error");
		}
		return res.json(ads);
	});
};

//Read a particular ad
exports.getAd = (req, res) => {
	// Ads.find({_id: req.ads._id}).exec((err, ad) => {
	//     if (err) {
	//       res.status(400).json("error")
	//     }
	//     return res.json(ad)
	// })
	return res.json(req.ads);
};

//Update an Ad
exports.updateAd = (req, res) => {
	Ads.findById({ _id: req.ads._id }).exec((err, ad) => {
		for (let picture of ad.picture) {
			let path = picture;

			fs.readdir(path, (err, files) => {
				if (path) {
					fs.unlink(path, (err) => {
						if (err) {
							console.error(err);
							return;
						}
					});
				}
			});
		}
	});

	const { user, title, content, contact, price } = req.body;
	const files = req.files;
	const picture = [];
	for (let i = 0; i < files.length; i++) {
		picture[i] = files[i].path;
	}
	const updateObj = { user, title, content, price, contact, picture };

	Ads.findByIdAndUpdate(
		{ _id: req.ads._id },
		{ $set: updateObj },
		{ useFindAndModify: false, new: true },
		(err, ad) => {
			if (err || !ad) {
				return res.status(400).json({
					error: "An error occured,  try again later",
				});
			}
			return res.status(200).json(ad);
		}
	);
};

//Delete an Ad
exports.deleteAd = (req, res) => {
	Ads.findById({ _id: req.ads._id }).exec((err, ad) => {
		for (let picture of ad.picture) {
			let path = picture;

			fs.readdir(path, (err, files) => {
				if (path) {
					fs.unlink(path, (err) => {
						if (err) {
							console.error(err);
							return;
						}
					});
				}
			});
		}
	});
	Ads.findByIdAndRemove(
		{ _id: req.ads._id },
		{ useFindAndModify: false, new: true },
		(err, ad) => {
			if (err || !ad) {
				return res.status(400).json({
					error: "An error occured,  try again later",
				});
			}
			return res.status(200).json({ message: "Ad has been deleted" });
		}
	);
};

// Like ad
exports.likeAd = (req, res) => {
	Ads.findByIdAndUpdate(
		{ _id: req.ads._id },
		{
			$push: { likes: req.profile._id },
		},
		{
			new: true,
			useFindAndModify: false,
		}
	)
		.populate("user likes.user")
		.exec((err, result) => {
			if (err) {
				return res
					.status(400)
					.json({ errorMsg: "An error occured, try again later" });
			}
			result.user.salt = undefined;
			result.user.encryptedpassword = undefined;
			res.status(200).json(result);
		});
};

// Unlike ad
exports.unlikeAd = (req, res) => {
	Ads.findByIdAndUpdate(
		{ _id: req.ads._id },
		{
			$pull: { likes: req.profile._id },
		},
		{
			new: true,
			useFindAndModify: false,
		}
	)
		.populate("user likes.user")
		.exec((err, result) => {
			if (err) {
				return res
					.status(400)
					.json({ errorMsg: "An error occured, try again later" });
			}
			result.user.salt = undefined;
			result.user.encryptedpassword = undefined;

			res.status(200).json(result);
		});
};

// comment on an ad
exports.commentAd = (req, res) => {
	Ads.findByIdAndUpdate(
		{ _id: req.ads._id },
		{
			$push: {
				comments: { user: req.profile._id, text: req.body.text },
			},
		},
		{
			new: true,
		}
	).exec((err, result) => {
		if (err) {
			return res
				.status(400)
				.json({ error: "An error occured, try again later" });
		} else {
			res.status(200).json(result);
		}
	});
};
