const { Page } = require("../models");

module.exports = {
	async index(req, res) {
		try {
			const pages = await Page.findAll({
				order: [["order", "ASC"]],
			});
			return res.json(pages);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async show(req, res) {
		try {
			const { id } = req.params;
			const page = await Page.findByPk(id);

			if (!page) {
				return res.status(404).json({ error: "Página não encontrada" });
			}

			return res.json(page);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
