/** @format */

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	role: {
		type: String,
		enum: ["guest", "host"], // User can be either guest or host
		default: "guest",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// This adds authenticate(), register(), serializeUser(), etc.
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
