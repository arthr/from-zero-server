const { sequelize } = require("../models");

async function syncDatabase() {
	try {
		await sequelize.sync({ force: true });
		console.log("Banco de dados sincronizado com sucesso!");
	} catch (error) {
		console.error("Erro ao sincronizar banco de dados:", error);
	} finally {
		process.exit();
	}
}

syncDatabase();
