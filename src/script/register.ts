/* eslint-disable import-x/no-unused-modules */

import assert from 'node:assert';

import 'dotenv/config';
import { REST, Routes } from 'discord.js';

import commands from '../commands/index.ts';

import type { Command } from '../commands/index.ts';

const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID ?? '';

assert(token !== undefined, 'Missing TOKEN for Discord Token');
assert(clientID !== undefined, 'Missing CLIENT_ID for Discord Application ID');

const rest = new REST({ version: '10' }).setToken(token);

console.info('Started refreshing application (/) commands.');

const route = guildID.length === 0
    ? Routes.applicationGuildCommands(clientID, guildID)
    : Routes.applicationCommands(clientID);

const payload: Command['data'][] = [...commands.values()].map((value) => value.data);

await rest.put(route, { body: payload });

console.info('Successfully reloaded application (/) commands.');
