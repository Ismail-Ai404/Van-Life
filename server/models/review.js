/** @format */

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	comment: {
		type: String,
		// required: true,
	},
	van: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Van",
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Review", ReviewSchema);
