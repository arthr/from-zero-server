const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Notification = sequelize.define("Notification", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		time: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Notification;
};
