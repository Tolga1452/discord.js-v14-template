const { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType } = require("discord.js");

module.exports = {
    //guild: 'guild_id', //if this command is guild specific, enter the guild id here
    data: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.User)
        .setName('Mention')
        .setNameLocalization('tr', 'Bahset'),
    /**
     * Executes this command
     * @param {UserContextMenuCommandInteraction} interaction
     */
    execute: async (interaction) => {
        interaction.reply(`<@${interaction.targetId}>`);
    }
};