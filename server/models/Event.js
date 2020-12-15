const mongoose = require("mongoose");
require("mongoose-type-url");

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		date: {
			type: String,
			required: true,
		},
		picture: {
			type: String,
			default: null,
		},
		venue: {
			type: String,
			required: true,
		},
		link: {
			type: mongoose.SchemaTypes.Url,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
