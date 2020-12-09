const Notice = require("../models/Notice");

exports.getNoticeById = (req, res, next, Id) => {
	Notice.findById(Id).exec((err, notice) => {
		if (err) {
			return res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		if (!notice) {
			return res.status(400).json({
				errorMsg: "News/Notice not found",
			});
		}
		req.notice = notice;
		next();
	});
};

// Create notice
exports.createNotice = (req, res) => {
	const { title, description, link } = req.body;
	const newNotice = Notice({ title, description, link });
	newNotice.save((err, notice) => {
		if (err) {
			res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		return res.status(200).json(notice);
	});
};

// Read all notices
exports.allNotices = (req, res) => {
	Notice.find().exec((err, notices) => {
		if (err) {
			res.status(400).json({
				errorMsg: "An error occured",
			});
		}
		return res.json(notices);
	});
};

// Read a particular notice
exports.getNotice = (req, res) => {
	return res.json(req.notice);
};
