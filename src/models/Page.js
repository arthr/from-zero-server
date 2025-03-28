const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Page = sequelize.define("Page", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		suffixIcon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		order: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		content: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	});

	return Page;
};
