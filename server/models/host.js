/** @format */

const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
	user: {
		// Reference to the User model, ensuring that a host is a user
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the User model
		required: true,
	},
	vans: [
		{
			// Reference to the Van model, so a host can have multiple vans
			type: mongoose.Schema.Types.ObjectId,
			ref: "Van",
		},
	],
	bio: {
		// Bio about the host (optional)
		type: String,
		required: false,
	},
	profileImage: {
		// Profile image URL (optional)
		type: String,
		required: false,
	},
	contactEmail: {
		// Contact email for the host
		type: String,
		required: true,
	},
	createdAt: {
		// Date when the host account was created
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Host", HostSchema);
