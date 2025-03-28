const { Notification } = require("../models");

module.exports = {
	async index(req, res) {
		try {
			const notifications = await Notification.findAll({
				order: [["id", "DESC"]],
			});
			return res.json(notifications);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async create(req, res) {
		try {
			const notification = await Notification.create(req.body);

			// Emitir notificação via Socket.IO
			req.io.emit("newNotification", notification);

			return res.status(201).json(notification);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
