/** @format */

const mongoose = require("mongoose");

//todo add the review and host model later
// const Review = require("./review");
// const Host = require("./host");

//todo add cloudinary later
// const { cloudinary } = require("../database/cloudinary");

const ImageSchema = new mongoose.Schema({
	url: { type: String, required: true },
	filename: { type: String },
});

const VanSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: [ImageSchema],

	type: {
		type: String,
		enum: ["simple", "rugged", "luxury"],
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Host",
		required: true,
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review",
		},
	],
	sort: {
		type: Boolean,
		default: false,
		required: true,
	},
	rentDays: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			from: { type: Date, required: true },
			to: { type: Date, required: true },
			noOfDays: { type: Number, required: true },
		},
	],
});

// const from = new Date("2025-11-20");
// const to = new Date("2025-11-25");
// const noOfDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

module.exports = mongoose.model("Van", VanSchema);
