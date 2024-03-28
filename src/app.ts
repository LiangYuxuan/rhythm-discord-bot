import assert from 'node:assert';

import 'dotenv/config';

import Discord from 'discord.js';

import logger from './logger.ts';
import commands from './commands/index.ts';

const token = process.env.TOKEN;

assert(token !== undefined, 'Missing TOKEN for Discord Token');

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
    logger.info('Discord client ready!');
});

client.on('error', (error) => {
    logger.error('Client error: %o', error);
});

client.on(Discord.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (!commands.has(interaction.commandName)) return;

    try {
        await commands.get(interaction.commandName)?.execute(interaction);
    } catch (error) {
        logger.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(token).catch((error: unknown) => {
    logger.error('Failed to login: %o', error);
    process.exit(1);
});
