const { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, Client } = require("discord.js");

module.exports = {
    //guild: 'guild_id', //if this command is guild specific, enter the guild id here
    data: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.User)
        .setName('Mention')
        .setNameLocalization('tr', 'Bahset'),
    /**
     * Executes this command
     * @param {UserContextMenuCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (interaction, client) => {
        interaction.reply(`<@${interaction.targetId}>`);
    }
};