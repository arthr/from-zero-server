const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig);

const Player = require("./Player")(sequelize);
const Ranking = require("./Ranking")(sequelize);
const Message = require("./Message")(sequelize);
const Activity = require("./Activity")(sequelize);
const Notification = require("./Notification")(sequelize);
const Page = require("./Page")(sequelize);

const models = {
	Player,
	Ranking,
	Message,
	Activity,
	Notification,
	Page,
};

Object.values(models)
	.filter((model) => typeof model.associate === "function")
	.forEach((model) => model.associate(models));

module.exports = {
	sequelize,
	...models,
};
