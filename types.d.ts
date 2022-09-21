import { ApplicationCommandType, AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ContextMenuCommandBuilder, MessageContextMenuCommandInteraction, ModalSubmitInteraction, SelectMenuInteraction, SlashCommandBuilder, Snowflake, UserContextMenuCommandInteraction } from "discord.js";

export interface _SlashCommand {
    guild?: Snowflake;
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
}

export interface _UserCommand {
    guild?: Snowflake;
    data: ContextMenuCommandBuilder & { type: ApplicationCommandType.User };
    execute: (interaction: UserContextMenuCommandInteraction) => void;
}

export interface _MessageCommand {
    guild?: Snowflake;
    data: ContextMenuCommandBuilder & { type: ApplicationCommandType.Message };
    execute: (interaction: MessageContextMenuCommandInteraction) => void;
}

export type _Command = _SlashCommand | _UserCommand | _MessageCommand;

export interface _Button {
    id: string;
    execute: (interaction: ButtonInteraction, args?: string[]) => void;
}

export interface _SelectMenu {
    id: string;
    execute: (interaction: SelectMenuInteraction, args?: string[]) => void;
}

export interface _Modal {
    id: string;
    execute: (interaction: ModalSubmitInteraction, args?: string[]) => void;
}