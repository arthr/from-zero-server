const { Activity } = require("../models");

module.exports = {
	async index(req, res) {
		try {
			const activities = await Activity.findAll({
				order: [["id", "DESC"]],
				limit: 10,
			});
			return res.json(activities);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
