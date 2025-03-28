const { Ranking } = require("../models");

module.exports = {
	async index(req, res) {
		try {
			const ranking = await Ranking.findAll({
				order: [["score", "DESC"]],
			});
			return res.json(ranking);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
