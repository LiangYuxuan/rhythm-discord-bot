import dotenv from 'dotenv';
import { exit } from 'process';
import logger from './logger.js';
import discord from './discord/index.js';
import express from './express/index.js';

dotenv.config();

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled promise rejection: %o', error);
});

if (!process.env.NO_DISCORD) {
    const token = process.env.TOKEN;

    if (token === undefined) {
        logger.fatal('Missing TOKEN for Discord Token in .env.');
        exit(1);
    }

    discord(token).then(() => {
        logger.info('Discord server ready!');
    });
}

if (!process.env.NO_EXPRESS) {
    const port: number = parseInt(process.env.PORT ?? '3000', 10);

    express(port).then(() => {
        logger.info('Express server listening on port %d', port);
    });
}
