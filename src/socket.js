const socketIO = require("socket.io");
const { Message, Notification, Player } = require("./models");

module.exports = (server) => {
	const io = socketIO(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`Usuário conectado: ${socket.id}`);

		// Tratar mensagens recebidas
		socket.on("sendMessage", async (messageData) => {
			try {
				// Formatar a hora atual
				const now = new Date();
				const time = `${now.getHours()}:${now
					.getMinutes()
					.toString()
					.padStart(2, "0")}`;

				const message = await Message.create({
					...messageData,
					time,
				});

				io.emit("newMessage", message);
			} catch (error) {
				console.error("Erro ao enviar mensagem:", error);
			}
		});

		// Evento: Usar item do inventário
		socket.on("useItem", async ({ playerId, itemId }) => {
			try {
				// Buscar jogador no banco de dados
				const player = await Player.findByPk(playerId);

				if (!player) {
					socket.emit("actionError", {
						message: "Jogador não encontrado",
					});
					return;
				}

				// Verificar se o item existe no inventário
				const itemIndex = player.inventory.findIndex(
					(item) => item.id === itemId
				);
				if (itemIndex === -1) {
					socket.emit("actionError", {
						message: "Item não encontrado no inventário",
					});
					return;
				}

				// Processar uso do item (exemplo: reduzir quantidade)
				const item = player.inventory[itemIndex];
				if (item.quantity > 1) {
					player.inventory[itemIndex].quantity -= 1;
				} else {
					player.inventory.splice(itemIndex, 1); // Remover item se quantidade for 1
				}

				// Salvar alterações no banco de dados
				await player.save();

				// Enviar atualização para o cliente
				socket.emit("inventoryUpdate", player.inventory);
			} catch (error) {
				console.error("Erro ao processar ação:", error);
				socket.emit("actionError", {
					message: "Erro ao processar ação",
				});
			}
		});

		// Evento: Atualizar saúde do jogador
		socket.on("updateHealth", async ({ playerId, health }) => {
			try {
				const player = await Player.findByPk(playerId);
				if (!player) {
					socket.emit("actionError", {
						message: "Jogador não encontrado",
					});
					return;
				}

				player.health = health;
				await player.save();

				io.emit("playerUpdate", { playerId, health });
			} catch (error) {
				console.error("Erro ao atualizar saúde:", error);
				socket.emit("actionError", {
					message: "Erro ao atualizar saúde",
				});
			}
		});

		// Evento: Atualizar energia do jogador
		socket.on("updateEnergy", async ({ playerId, energy }) => {
			try {
				const player = await Player.findByPk(playerId);
				if (!player) {
					socket.emit("actionError", {
						message: "Jogador não encontrado",
					});
					return;
				}

				player.energy = energy;
				await player.save();

				io.emit("playerUpdate", { playerId, energy });
			} catch (error) {
				console.error("Erro ao atualizar energia:", error);
				socket.emit("actionError", {
					message: "Erro ao atualizar energia",
				});
			}
		});

		// Evento: Subir de nível
		socket.on("levelUp", async ({ playerId }) => {
			try {
				const player = await Player.findByPk(playerId);
				if (!player) {
					socket.emit("actionError", {
						message: "Jogador não encontrado",
					});
					return;
				}

				player.level += 1;
				await player.save();

				io.emit("playerUpdate", { playerId, level: player.level });
			} catch (error) {
				console.error("Erro ao subir de nível:", error);
				socket.emit("actionError", {
					message: "Erro ao subir de nível",
				});
			}
		});

		// Evento: Atualizar estatísticas do jogador
		socket.on("updateStats", async ({ playerId, stats }) => {
			try {
				const player = await Player.findByPk(playerId);
				if (!player) {
					socket.emit("actionError", {
						message: "Jogador não encontrado",
					});
					return;
				}

				player.stats = { ...player.stats, ...stats };
				await player.save();

				io.emit("playerUpdate", { playerId, stats: player.stats });
			} catch (error) {
				console.error("Erro ao atualizar estatísticas:", error);
				socket.emit("actionError", {
					message: "Erro ao atualizar estatísticas",
				});
			}
		});

		// Evento: Adicionar item ao inventário
		socket.on("addItemToInventory", async ({ playerId, item }) => {
			try {
				const player = await Player.findByPk(playerId);
				if (!player) {
					socket.emit("actionError", {
						message: "Jogador não encontrado",
					});
					return;
				}

				const existingItem = player.inventory.find(
					(i) => i.id === item.id
				);
				if (existingItem) {
					existingItem.quantity += item.quantity;
				} else {
					player.inventory.push(item);
				}

				await player.save();

				io.emit("inventoryUpdate", {
					playerId,
					inventory: player.inventory,
				});
			} catch (error) {
				console.error("Erro ao adicionar item ao inventário:", error);
				socket.emit("actionError", {
					message: "Erro ao adicionar item ao inventário",
				});
			}
		});

		// Evento: Remover item do inventário
		socket.on(
			"removeItemFromInventory",
			async ({ playerId, itemId, quantity }) => {
				try {
					const player = await Player.findByPk(playerId);
					if (!player) {
						socket.emit("actionError", {
							message: "Jogador não encontrado",
						});
						return;
					}

					const itemIndex = player.inventory.findIndex(
						(i) => i.id === itemId
					);
					if (itemIndex === -1) {
						socket.emit("actionError", {
							message: "Item não encontrado no inventário",
						});
						return;
					}

					const item = player.inventory[itemIndex];
					if (item.quantity > quantity) {
						item.quantity -= quantity;
					} else {
						player.inventory.splice(itemIndex, 1);
					}

					await player.save();

					io.emit("inventoryUpdate", {
						playerId,
						inventory: player.inventory,
					});
				} catch (error) {
					console.error("Erro ao remover item do inventário:", error);
					socket.emit("actionError", {
						message: "Erro ao remover item do inventário",
					});
				}
			}
		);

		// Tratar desconexão
		socket.on("disconnect", () => {
			console.log(`Usuário desconectado: ${socket.id}`);
		});
	});

	return io;
};
