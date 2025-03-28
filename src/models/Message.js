const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Message = sequelize.define("Message", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		sender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		time: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isCurrentUser: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return Message;
};
