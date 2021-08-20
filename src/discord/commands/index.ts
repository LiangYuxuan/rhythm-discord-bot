import {Collection, CommandInteraction} from 'discord.js';
import type {ToAPIApplicationCommandOptions} from '@discordjs/builders';

import echo from './echo';
import ping from './ping';

interface Command {
    data: {
        name: string,
        description: string,
        options?: ToAPIApplicationCommandOptions[]
    },
    execute(interaction: CommandInteraction): Promise<void>
}

const commands = new Collection<string, Command>();
commands.set(echo.data.name, echo);
commands.set(ping.data.name, ping);

export default commands;
export type {Command};
