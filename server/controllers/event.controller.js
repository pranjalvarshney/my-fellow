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
	const { title, description, date, venue, link } = req.body;
	var picture;
	if (req.file) {
		picture = req.file.path;
	}
	const newEvent = Event({ title, description, date, venue, link, picture });
	newEvent.save((err, event) => {
		if (err) {
			res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		return res.status(200).json(event);
	});
};

// Get all Events

exports.allEvents = (req, res) => {
	Event.find()
		.sort({ createdAt: -1 })
		.exec((err, events) => {
			if (err) {
				res.status(400).json({
					errorMsg: "An error occured",
				});
			}
			return res.json(events);
		});
};

//Read a particular event
exports.getEvent = (req, res) => {
	return res.json(req.event);
};

// update event
exports.updateEvent = (req, res) => {
	Event.findById({ _id: req.event._id }).exec((err, event) => {
		if (event.picture) {
			let path = event.picture;
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
	const { title, description, date, venue, link } = req.body;
	var picture;
	if (req.file) {
		picture = req.file.path;
	}
	const updateObj = { title, description, date, venue, link, picture };

	Event.findByIdAndUpdate(
		{ _id: req.event._id },
		{ $set: updateObj },
		{ useFindAndModify: false, new: true },
		(err, event) => {
			if (err || !event) {
				return res.status(400).json({
					error: "An error occured,  try again later",
				});
			}
			return res.status(200).json(event);
		}
	);
};

// delete event
exports.deleteEvent = (req, res) => {
	Event.findById({ _id: req.event._id }).exec((err, event) => {
		if (event.picture) {
			let path = event.picture;
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
	Event.findByIdAndRemove(
		{ _id: req.event._id },
		{ useFindAndModify: false, new: true },
		(err, event) => {
			if (err || !event) {
				return res.status(400).json({
					error: "An error occured,  try again later",
				});
			}
			return res.status(200).json({ message: "Event has been deleted" });
		}
	);
};
