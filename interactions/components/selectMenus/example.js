const { SelectMenuInteraction, Client } = require("discord.js");

module.exports = {
    id: 'example_select_menu',
    /**
     * Executes this select menu
     * @param {SelectMenuInteraction} interaction
     * @param {string[]} args
     * @param {Client} client
     */
    execute: async (interaction, args = [], client) => {
        interaction.reply(
            `First arg: ${args[0]}
            Second arg: ${args[1]}
            Selected: ${interaction.values[0]}`
        );
    }
};