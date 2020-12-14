const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getUserById } = require("../controllers/user.controller");
const Event = require("../models/Event");

exports.getEventById = (req, res, next, Id) => {
	Event.findById(Id).exec((err, event) => {
		if (err) {
			return res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		if (!event) {
			return res.status(400).json({
				errorMsg: "Event not found",
			});
		}
		req.event = event;
		next();
	});
};

fs.mkdir("uploads", (err) => {
	if (err) {
	}
	fs.mkdir("uploads/events", (err) => {
		if (err) {
		}
	});
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/events");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			"event_" +
				new Date(Date.now())
					.toLocaleString("en-IN")
					.replace(/-|:|\/|\.|,|/g, "")
					.replace(/ /g, "_") +
				path.extname(file.originalname)
		);
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
exports.upload = multer({ storage: storage, fileFilter: fileFilter });

// Create an Event
exports.createEvent = (req, res) => {
	const { title, description, date, venue } = req.body;
	var picture;
	if (req.file) {
		picture = req.file.path;
	}
	const newEvent = Event({ title, description, date, venue, picture });
	newEvent.save((err, event) => {
		if (err) {
			res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		return res.status(200).json(event);
	});
};
