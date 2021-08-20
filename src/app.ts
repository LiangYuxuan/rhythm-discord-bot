import logger from './logger';
import dotenv from 'dotenv';
import discord from './discord';
import express from './express';
import {bootstrap} from 'global-agent';
import {exit} from 'process';

if (process.env.NODE_ENV === 'development') {
    bootstrap();
}

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
    const port: number = parseInt(process.env.PORT ?? '3000');

    express(port).then(() => {
        logger.info('Express server listening on port %d', port);
    });
}
