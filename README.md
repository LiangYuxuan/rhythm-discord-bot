# Rhythm Discord Bot

## Getting Started

1. Create new bot.
2. Invite bot to service. Replace `CLIENT_ID` with your Application ID.
   ```
   https://discord.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot+applications.commands&permissions=183360
   ```
3. Copy .env.example and fill up your token, Application ID and Guild ID.
   ```bash
   cp .env.example .env
   vi .env
   ```
4. Run following command.
   ```bash
   # Docker
   docker pull rhyster/rhythm-discord-bot:latest
   docker run --rm --env-file .env --name discord rhyster/rhythm-discord-bot:latest npx ts-node-esm src/script/register.ts
   docker run -d --restart always --env-file .env --name discord rhyster/rhythm-discord-bot:latest
   # Node
   pnpm install
   npx ts-node-esm src/script/register.ts
   pnpm start
   ```
