const mongoose = require("mongoose");
require("mongoose-type-url");

const noticeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
		link: {
			type: mongoose.SchemaTypes.Url,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
