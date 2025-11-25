/** @format */

const Van = require("../models/van");

module.exports = isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const van = await Van.findById(id);

	if (!van.author.equals(req.user._id)) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/vans/${id}`);
	}
	next();
};
