const { ButtonInteraction, Client } = require("discord.js");

module.exports = {
    id: 'repeat_command',
    /**
     * Executes this button
     * @param {ButtonInteraction} interaction
     * @param {string[]} args
     * @param {Client} client
     */
    execute: async (interaction, args = [], client) => {
        interaction.reply(`<@${interaction.user.id}> repeated <@${args[0]}>'s command.\n${interaction.message.content}`);
    }
};