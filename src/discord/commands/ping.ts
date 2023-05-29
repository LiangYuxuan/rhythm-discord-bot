import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        await interaction.reply('Pong.');
    },
};

export default command;
