const { ContextMenuCommandBuilder, MessageContextMenuCommandInteraction, ApplicationCommandType } = require("discord.js");

module.exports = {
    //guild: 'guild_id', //if this command is guild specific, enter the guild id here
    data: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.Message)
        .setName('Read')
        .setNameLocalization('tr', 'Oku'),
    /**
     * Executes this command
     * @param {MessageContextMenuCommandInteraction} interaction
     */
    execute: async (interaction) => {
        interaction.reply(interaction.targetMessage.content);
    }
};