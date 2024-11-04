/* eslint-disable import-x/no-unused-modules */

import assert from 'node:assert';

import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

import commands from './commands/index.ts';

const token = process.env.TOKEN;

assert(token !== undefined, 'Missing TOKEN for Discord Token');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
    console.info('Discord client ready!');
});

client.on('error', (error) => {
    console.error('Client error: %o', error);
});

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (!commands.has(interaction.commandName)) return;

    commands
        .get(interaction.commandName)
        ?.execute(interaction)
        .catch(async (error: unknown) => {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
});

client.login(token).catch((error: unknown) => {
    console.error('Failed to login: %o', error);
    process.exit(1);
});
