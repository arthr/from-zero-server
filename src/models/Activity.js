const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Activity = sequelize.define("Activity", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		action: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		time: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Activity;
};
