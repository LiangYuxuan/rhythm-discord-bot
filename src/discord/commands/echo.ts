import {SlashCommandBuilder} from '@discordjs/builders';
import {CommandInteraction} from 'discord.js';

const command = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption((option) =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true),
        ),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        await interaction.reply(interaction.options.getString('input', true));
    },
};

export default command;
