const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Player = sequelize.define("Player", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		level: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		health: {
			type: DataTypes.INTEGER,
			defaultValue: 100,
		},
		energy: {
			type: DataTypes.INTEGER,
			defaultValue: 100,
		},
		xp: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		stats: {
			type: DataTypes.JSON,
			defaultValue: {
				strength: 10,
				agility: 10,
				intelligence: 10,
				luck: 10,
			},
		},
		maxSlots: {
			type: DataTypes.INTEGER,
			defaultValue: 10,
		},
		enabledSlots: {
			type: DataTypes.INTEGER,
			defaultValue: 5,
		},
		inventory: {
			type: DataTypes.JSON,
			defaultValue: [],
		},
	});

	return Player;
};
