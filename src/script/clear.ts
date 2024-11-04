/* eslint-disable import-x/no-unused-modules */

import assert from 'node:assert';

import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID ?? '';

assert(token !== undefined, 'Missing TOKEN for Discord Token');
assert(clientID !== undefined, 'Missing CLIENT_ID for Discord Application ID');

const rest = new REST({ version: '10' }).setToken(token);

console.info('Started clearing application (/) commands.');

const route = guildID.length === 0 ? (
    Routes.applicationGuildCommands(clientID, guildID)
) : (
    Routes.applicationCommands(clientID)
);

await rest.put(route, { body: [] });

console.info('Successfully cleared application (/) commands.');
