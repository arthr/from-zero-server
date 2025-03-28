const express = require("express");
const PlayerController = require("./controllers/PlayerController");
const RankingController = require("./controllers/RankingController");
const MessageController = require("./controllers/MessageController");
const ActivityController = require("./controllers/ActivityController");
const NotificationController = require("./controllers/NotificationController");
const PageController = require("./controllers/PageController");

const routes = express.Router();

// Rotas do Player
routes.get("/player", PlayerController.show);
routes.put("/player", PlayerController.update);

// Rotas do Ranking
routes.get("/ranking", RankingController.index);

// Rotas de Mensagens
routes.get("/messages", MessageController.index);
routes.post("/messages", MessageController.create);

// Rotas de Atividades
routes.get("/activities", ActivityController.index);

// Rotas de Notificações
routes.get("/notifications", NotificationController.index);
routes.post("/notifications", NotificationController.create);

// Rotas de Páginas
routes.get("/pages", PageController.index);
routes.get("/pages/:id", PageController.show);

module.exports = routes;
