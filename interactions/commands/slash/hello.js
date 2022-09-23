const { SlashCommandBuilder, ChatInputCommandInteraction, SlashCommandStringOption, AutocompleteInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } = require("discord.js");

module.exports = {
    //guild: 'guild_id', //if this command is guild specific, enter the guild id here
    data: new SlashCommandBuilder()
        .setName('hello')
        .setNameLocalization('tr', 'merhaba')
        .setDescription('Says hello to the world')
        .setDescriptionLocalization("tr", 'Dünyaya merhaba der')
        .addStringOption(
            new SlashCommandStringOption()
                .setName('with')
                .setNameLocalization('tr', 'birlikte')
                .setDescription('Says with ...')
                .setDescriptionLocalization('tr', '... ile birlikte söyler')
                .setAutocomplete(true)
        ),
    /**
     * Executes this command
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (interaction, client) => {
        let custom = interaction.options.getString('with');

        interaction.reply({
            content: interaction.locale === 'tr'
                ? `Merhaba${custom ? ` ${custom}` : ''} dünya!`
                : `Hello${custom ? ` ${custom}` : ''} world!`,
            components: [
                new ActionRowBuilder()
                    .setComponents([
                        new ButtonBuilder()
                            .setCustomId(`repeat_command-${interaction.user.id}`)
                            .setLabel('Repeat Command')
                            .setStyle(ButtonStyle.Primary)
                    ])
            ]
        });
    },
    /**
     * If this command have an autocomplete, this will send a respond with recommended options
     * @param {AutocompleteInteraction} interaction
     * @param {Client} client
     */
    autocomplete: async (interaction, client) => {
        let focused = interaction.options.getFocused(true);

        if (focused.name === 'with') {
            const words = [ //with localizations
                'wonderful', 'harika',
                'beautiful', 'güzel'
            ];

            interaction.respond(words.filter(word => word.includes(focused.value.toLowerCase())).map(word => ({ name: word, value: word })));
        };
    }
};