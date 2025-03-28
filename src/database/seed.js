const {
	Player,
	Ranking,
	Message,
	Activity,
	Notification,
	Page,
} = require("../models");

// Convertendo os imports de ES Modules para CommonJS
const playerDataModule = require("../mockData/mockPlayer");
const rankingDataModule = require("../mockData/mockRanking");
const messagesDataModule = require("../mockData/mockMessages");
const activitiesDataModule = require("../mockData/mockActivities");
const notificationsDataModule = require("../mockData/mockNotifications");
const pagesDataModule = require("../mockData/mockPages");

// Extraindo os dados dos módulos
const playerData = playerDataModule.playerData;
const rankingData = rankingDataModule.rankingData;
const messagesData = messagesDataModule.messagesData;
const activitiesData = activitiesDataModule.activitiesData;
const notificationsData = notificationsDataModule.notificationsData;
const pagesData = pagesDataModule.pagesData;

async function seedDatabase() {
	try {
		// Seed Player
		await Player.create(playerData);
		console.log("Player data seeded");

		// Seed Ranking
		await Ranking.bulkCreate(rankingData);
		console.log("Ranking data seeded");

		// Seed Messages
		await Message.bulkCreate(messagesData);
		console.log("Messages data seeded");

		// Seed Activities
		await Activity.bulkCreate(activitiesData);
		console.log("Activities data seeded");

		// Seed Notifications
		await Notification.bulkCreate(notificationsData);
		console.log("Notifications data seeded");

		// Seed Pages
		await Page.bulkCreate(pagesData);
		console.log("Pages data seeded");

		console.log("Todos os dados foram carregados com sucesso!");
	} catch (error) {
		console.error("Erro ao carregar dados:", error);
	} finally {
		process.exit();
	}
}

seedDatabase();
