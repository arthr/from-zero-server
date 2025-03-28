const { Player } = require("../models");

module.exports = {
	async show(req, res) {
		try {
			const player = await Player.findByPk(1);
			return res.json(player);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async update(req, res) {
		try {
			const player = await Player.findByPk(1);

			if (!player) {
				return res
					.status(404)
					.json({ error: "Jogador não encontrado" });
			}

			await player.update(req.body);
			return res.json(player);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
