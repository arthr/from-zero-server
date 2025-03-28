const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Ranking = sequelize.define("Ranking", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		score: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isCurrentUser: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return Ranking;
};
