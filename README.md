# Rhythm Discord Bot

## Getting Started

1. Create new bot.
2. Invite bot to service. Replace `CLIENT_ID` with your Application ID.
   ```
   https://discord.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot+applications.commands&permissions=183360
   ```
3. Copy .env.example and fill up your token, Application ID and Guild ID.
4. Run following command.
   ```bash
   pnpm install
   npx ts-node src/script/register.ts
   pnpm start
   ```
