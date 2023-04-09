const { ContextMenuCommandBuilder, MessageContextMenuCommandInteraction, ApplicationCommandType, Client } = require("discord.js");

module.exports = {
    //guild: 'guild_id', //if this command is guild specific, enter the guild id here
    data: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.Message)
        .setName('Read')
        .setNameLocalization('tr', 'Oku'),
    /**
     * Executes this command
     * @param {MessageContextMenuCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (interaction, client) => {
        interaction.reply(interaction.targetMessage.content);
    }
};