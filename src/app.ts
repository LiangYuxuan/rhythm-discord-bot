import pino from 'pino';
import dotenv from 'dotenv';
import discord from './discord';
import express from './express';

const logger = pino();
dotenv.config();

const prefix = process.env.PREFIX ?? '!';
const token = process.env.TOKEN;

if (!process.env.NO_DISCORD) {
    discord(prefix, token).then(() => {
        logger.info('Discord server ready!');
    });
}

if (!process.env.NO_EXPRESS) {
    const port: number = parseInt(process.env.PORT ?? '3000');

    express(port).then(() => {
        logger.info('Express server listening on port %d', port);
    });
}
