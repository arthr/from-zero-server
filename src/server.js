require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const configureSocket = require("./socket");
const { sequelize } = require("./models");

const app = express();
const server = http.createServer(app);
const io = configureSocket(server);

app.use(cors());
app.use(express.json());

// Middleware para disponibilizar io para os controllers
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/api", routes);

// Rota básica para verificar se o servidor está rodando
app.get("/", (req, res) => {
	res.json({ message: "Servidor do jogo está rodando!" });
});

// Sincronizar banco de dados em desenvolvimento
if (process.env.NODE_ENV === "development") {
	sequelize.sync().then(() => {
		console.log("Banco de dados sincronizado");
	});
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
