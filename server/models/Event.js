const mongoose = require("mongoose");

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
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
