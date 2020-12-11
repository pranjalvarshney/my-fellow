const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		objType: {
			type: String,
			default: "blog",
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			max: 50,
		},
		content: {
			type: String,
			max: 3000,
			required: true,
		},
		picture: {
			type: String,
			default: null,
		},
		upvotes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: "User",
				},
				text: {
					type: String,
					required: true,
				},
			},
		],
		shareCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
