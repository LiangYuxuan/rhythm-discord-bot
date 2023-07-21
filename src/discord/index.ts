import Discord from 'discord.js';
import logger from '../logger.js';
import commands from './commands/index.js';

export default (token: string): Promise<void> => new Promise((resolve, reject) => {
    const client = new Discord.Client({
        intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages],
    });

    client.once('ready', () => {
        resolve();
    });

    client.on('shardError', (error) => {
        logger.error('A websocket connection encountered an error: %o', error);
    });

    client.on('error', (error) => {
        logger.error('Client error: %o', error);
    });

    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;

        if (!commands.has(interaction.commandName)) return;

        try {
            await commands.get(interaction.commandName)?.execute(interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    client.login(token).catch(reject);
});
