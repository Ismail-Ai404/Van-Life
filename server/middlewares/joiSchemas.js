/** @format */

const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
	type: "string",
	base: joi.string(),
	messages: {
		"string.escapeHTML": "{{#label}} must not include HTML!",
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value)
					return helpers.error("string.escapeHTML", { value });
				return clean;
			},
		},
	},
});

const Joy = BaseJoi.extend(extension);

module.exports.vanSchema = Joy.object({
	name: Joy.string().required().escapeHTML(),
	// image: Joy.string().required(),
	description: Joy.string().required().escapeHTML(),

	type: Joy.string().valid("simple", "rugged", "luxury").required(),
	sort: Joy.boolean().required(),
	price: Joy.number().required().min(0),
	deleteImages: Joy.array(),
});

module.exports.reviewSchema = Joy.object({
	review: Joy.object({
		rating: Joy.number().required().min(1).max(5),
		comment: Joy.string().max(1000).allow("").escapeHTML(),
	}).required(),
});

module.exports.userSchema = Joy.object({
	username: Joy.string().alphanum().min(3).max(30).required().escapeHTML(),
	email: Joy.string().email().required().escapeHTML(),
	password: Joy.string().required().min(8).max(128),
	confirmPassword: Joy.string(),
});

module.exports.hostSchema = Joy.object({
	bio: Joy.string().max(1000).allow("").escapeHTML(),
	profileImage: Joy.string().uri().allow(""),
	contactEmail: Joy.string().email().required().escapeHTML(),
});
