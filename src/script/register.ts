import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import dotenv from 'dotenv';
import {bootstrap} from 'global-agent';
import {exit} from 'process';
import yargs from 'yargs';
import logger from '../logger';
import commands from '../discord/commands';

import type {Command} from './../discord/commands/index';

if (process.env.NODE_ENV === 'development') {
    bootstrap();
}

dotenv.config();

const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;
if (token === undefined) {
    logger.fatal('Missing TOKEN for Discord Token in .env.');
    exit(1);
}
if (clientID === undefined) {
    logger.fatal('Missing CLIENT_ID for Discord Application ID in .env.');
    exit(1);
}

const rest = new REST({version: '9'}).setToken(token);

yargs(process.argv.slice(2))
    .command(['register', '$0'], 'register slash commands', () => {
        // do nothing
    }, async () => {
        try {
            logger.info('Started refreshing application (/) commands.');

            let route: `/${string}` = '/';
            if (guildID === undefined) {
                route = Routes.applicationCommands(clientID);
            } else {
                route = Routes.applicationGuildCommands(clientID, guildID);
            }

            const payload: Command['data'][] = [];
            for (const [, value] of commands) {
                payload.push(value.data);
            }

            await rest.put(route, {body: payload});

            logger.info('Successfully reloaded application (/) commands.');
        } catch (error) {
            logger.error('%o', error);
        }
    })
    .command('clear', 'clear slash commands', () => {
        // do nothing
    }, async () => {
        try {
            logger.info('Started clearing application (/) commands.');

            let route: `/${string}` = '/';
            if (guildID === undefined) {
                route = Routes.applicationCommands(clientID);
            } else {
                route = Routes.applicationGuildCommands(clientID, guildID);
            }

            await rest.put(route, {body: []});

            logger.info('Successfully cleared application (/) commands.');
        } catch (error) {
            logger.error('%o', error);
        }
    })
    .help('h')
    .alias('h', 'help')
    .argv;
