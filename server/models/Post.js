const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		user     : {
			type : mongoose.Schema.ObjectId,
			ref  : 'User'
		},
		content  : {
			type : String,
			max  : 3000
		},
		picture  : {
			data        : Buffer,
			contentType : String
		},
		likes    : [
			{
				type : mongoose.Schema.ObjectId,
				ref  : 'User'
			}
		],
		comments : [
			{
				user : {
					type : mongoose.Schema.ObjectId,
					ref  : 'User'
				},
				text : {
					type     : String,
					required : true
				}
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
