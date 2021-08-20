import Discord from 'discord.js';
import logger from './../logger';
import commands from './commands';

export default (token: string): Promise<void> => {
    return new Promise((resolve) => {
        const client = new Discord.Client({
            intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
        });

        client.once('ready', () => resolve());

        client.on('shardError', (error) => {
            logger.error('A websocket connection encountered an error: %o', error);
        });

        client.on('error', (error) => {
            logger.error('Client error: %o', error);
        });

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            if (!commands.has(interaction.commandName)) return;

            try {
                await commands.get(interaction.commandName)?.execute(interaction);
            } catch (error) {
                logger.error(error);
                return interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        });

        client.login(token);
    });
};
