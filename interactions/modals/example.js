const { ModalSubmitInteraction } = require("discord.js");

module.exports = {
    id: 'example_modal',
    /**
     * Executes this button
     * @param {ModalSubmitInteraction} interaction
     * @param {string[]} args
     */
    execute: async (interaction, args = []) => {
        interaction.reply(
            `First arg: ${args[0]}
            Second arg: ${args[1]}
            Value: ${interaction.fields.getTextInputValue('component_id')}`
        );
    }
};