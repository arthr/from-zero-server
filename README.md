# API de Servidor para Jogo

Este é um servidor backend para um jogo, construído com Node.js, Express, Sequelize (SQLite) e Socket.IO. O servidor é **server-authoritative**, o que significa que todas as ações do cliente são validadas e processadas no servidor antes de serem aplicadas. Isso garante maior segurança e consistência no estado do jogo.

## 🚀 Tecnologias

O projeto utiliza as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web
- **Sequelize**: ORM para banco de dados
- **SQLite**: Banco de dados relacional
- **Socket.IO**: Biblioteca para comunicação em tempo real

## 📋 Pré-requisitos

- Node.js (v14+ recomendado)
- pnpm (ou npm/yarn)

## 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd from-zero-server

# Instale as dependências
pnpm install
```

## ⚙️ Configuração do Banco de Dados

Antes de iniciar o servidor, você precisa configurar o banco de dados:

```bash
# Criar as tabelas no banco de dados
pnpm run db:sync

# Carregar os dados iniciais
pnpm run seed
```

## 🚀 Execução

Para iniciar o servidor em modo de desenvolvimento:

```bash
pnpm run dev
```

O servidor será iniciado na porta 3000 por padrão (ou a porta definida na variável de ambiente PORT).

## 📊 Estrutura do Projeto

```
from-zero-server/
├── src/
│   ├── config/            # Configurações
│   ├── controllers/       # Controladores da API
│   ├── database/          # Scripts de banco de dados
│   ├── mockData/          # Dados iniciais para seed
│   ├── models/            # Modelos Sequelize
│   ├── routes.js          # Definição de rotas
│   ├── server.js          # Ponto de entrada
│   └── socket.js          # Configuração do Socket.IO
├── .env                   # Variáveis de ambiente
├── package.json
└── README.md
```

## 📡 API Endpoints

### Jogador

- **GET /api/player**: Retorna os dados do jogador atual
- **PUT /api/player**: Atualiza os dados do jogador (validação no servidor)

### Ranking

- **GET /api/ranking**: Retorna a lista de ranking dos jogadores

### Mensagens

- **GET /api/messages**: Retorna a lista de mensagens
- **POST /api/messages**: Cria uma nova mensagem (validação no servidor)

### Atividades

- **GET /api/activities**: Retorna as atividades recentes

### Notificações

- **GET /api/notifications**: Retorna a lista de notificações
- **POST /api/notifications**: Cria uma nova notificação (validação no servidor)

### Páginas

- **GET /api/pages**: Retorna todas as páginas
- **GET /api/pages/:id**: Retorna uma página específica

## 🔌 Socket.IO Events

### Cliente -> Servidor

- **connection**: Estabelece conexão com o servidor
- **sendMessage**: Envia uma nova mensagem
- **useItem**: Solicita o uso de um item do inventário (validação no servidor)
- **updateHealth**: Atualiza a saúde do jogador
- **updateEnergy**: Atualiza a energia do jogador
- **levelUp**: Solicita o aumento de nível do jogador
- **updateStats**: Atualiza as estatísticas do jogador
- **addItemToInventory**: Adiciona um item ao inventário do jogador
- **removeItemFromInventory**: Remove um item do inventário do jogador

### Servidor -> Cliente

- **newMessage**: Recebe uma nova mensagem
- **newNotification**: Recebe uma nova notificação
- **inventoryUpdate**: Recebe atualizações do inventário
- **playerUpdate**: Recebe atualizações de atributos do jogador (saúde, energia, nível, etc.)
- **actionError**: Recebe erros relacionados a ações inválidas

## 📝 Modelos de Dados

### Player

```javascript
{
  id: Number,
  name: String,
  level: Number,
  health: Number,
  energy: Number,
  xp: Number,
  stats: {
    strength: Number,
    agility: Number,
    intelligence: Number,
    luck: Number
  },
  maxSlots: Number,
  enabledSlots: Number,
  inventory: Array
}
```

### Ranking

```javascript
{
  id: Number,
  name: String,
  score: Number,
  avatar: String,
  isCurrentUser: Boolean
}
```

### Message

```javascript
{
  id: Number,
  sender: String,
  text: String,
  time: String,
  isCurrentUser: Boolean
}
```

### Activity

```javascript
{
  id: Number,
  user: String,
  action: String,
  time: String
}
```

### Notification

```javascript
{
  id: Number,
  text: String,
  time: String
}
```

### Page

```javascript
{
  id: String,
  title: String,
  icon: String,
  suffixIcon: String,
  order: Number,
  content: Object
}
```

## 🛡️ Server-Authoritative

O servidor é responsável por validar e processar todas as ações críticas do jogo. Isso inclui:

1. **Validação de Ações**:
   - O servidor valida todas as ações enviadas pelo cliente, como o uso de itens ou envio de mensagens.
   - Exemplo: O evento `useItem` verifica se o jogador possui o item no inventário antes de processar a ação.

2. **Estado Centralizado**:
   - O estado do jogo (jogadores, inventários, etc.) é mantido no servidor.
   - O cliente apenas exibe o estado e envia comandos.

3. **Prevenção de Trapaças**:
   - Como o cliente não pode alterar diretamente o estado do jogo, isso reduz a possibilidade de trapaças.

## 📦 Scripts Disponíveis

- **start**: Inicia o servidor
- **dev**: Inicia o servidor em modo de desenvolvimento com recarga automática
- **db:sync**: Sincroniza os modelos com o banco de dados
- **seed**: Carrega dados iniciais no banco de dados

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
