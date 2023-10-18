import { Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';

import echo from './echo.ts';
import ping from './ping.ts';

interface Command {
    data: {
        name: string,
        description: string,
        options?: typeof SlashCommandBuilder.prototype.options,
    },
    execute(interaction: CommandInteraction): Promise<void>
}

const commands = new Collection<string, Command>();
commands.set(echo.data.name, echo);
commands.set(ping.data.name, ping);

export default commands;
export type { Command };
