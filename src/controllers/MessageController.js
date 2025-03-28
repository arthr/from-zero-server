const { Message } = require("../models");

module.exports = {
	async index(req, res) {
		try {
			const messages = await Message.findAll({
				order: [["id", "ASC"]],
			});
			return res.json(messages);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async create(req, res) {
		try {
			const message = await Message.create(req.body);

			// Emitir mensagem via Socket.IO
			req.io.emit("newMessage", message);

			return res.status(201).json(message);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
