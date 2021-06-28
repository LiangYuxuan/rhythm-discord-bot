import Discord from 'discord.js';
import pino from 'pino';

export default (prefix: string, token: string | undefined): Promise<void> => {
    return new Promise((resolve) => {
        const logger = pino();
        const client = new Discord.Client();

        client.once('ready', resolve);

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
    });
};
