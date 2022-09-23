const { ModalSubmitInteraction, Client } = require("discord.js");

module.exports = {
    id: 'example_modal',
    /**
     * Executes this button
     * @param {ModalSubmitInteraction} interaction
     * @param {string[]} args
     * @param {Client} client
     */
    execute: async (interaction, args = [], client) => {
        interaction.reply(
            `First arg: ${args[0]}
            Second arg: ${args[1]}
            Value: ${interaction.fields.getTextInputValue('component_id')}`
        );
    }
};