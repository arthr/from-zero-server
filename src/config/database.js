const path = require("path");

module.exports = {
	dialect: "sqlite",
	storage: path.resolve(__dirname, "..", "database", "database.sqlite"),
	define: {
		timestamps: true,
		underscored: true,
	},
	logging: false,
};
