import Discord from 'discord.js';
import pino from 'pino';
import {prefix, token} from './config.json';

const client = new Discord.Client();
const logger = pino();

client.once('ready', () => {
    logger.info('Server ready!');
});

client.on('shardError', (error) => {
    logger.error('A websocket connection encountered an error: %o', error);
});

client.on('error', (error) => {
    logger.error('Client error: %o', error);
});

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled promise rejection: %o', error);
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong.');
    }
});

client.login(token);
