/* eslint-disable no-console */

import assert from 'node:assert';

import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import yargs from 'yargs';

import commands, { Command } from '../discord/commands/index.ts';

const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

assert(token !== undefined, 'Missing TOKEN for Discord Token');
assert(clientID !== undefined, 'Missing CLIENT_ID for Discord Application ID');

yargs(process.argv.slice(2))
    .command(['register', '$0'], 'register slash commands', () => {
        // do nothing
    }, async () => {
        try {
            const rest = new REST({ version: '9' }).setToken(token);

            console.info('Started refreshing application (/) commands.');

            const route = guildID
                ? Routes.applicationGuildCommands(clientID, guildID)
                : Routes.applicationCommands(clientID);

            const payload: Command['data'][] = [...commands.values()].map((value) => value.data);

            await rest.put(route, { body: payload });

            console.info('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })
    .command('clear', 'clear slash commands', () => {
        // do nothing
    }, async () => {
        try {
            const rest = new REST({ version: '9' }).setToken(token);

            console.info('Started clearing application (/) commands.');

            const route = guildID
                ? Routes.applicationGuildCommands(clientID, guildID)
                : Routes.applicationCommands(clientID);

            await rest.put(route, { body: [] });

            console.info('Successfully cleared application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })
    .help('h')
    .alias('h', 'help');
