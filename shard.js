//Packages & Helpful Tools

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { readdir } = require("fs");
const Logger = require('terminal.xr');
require('dotenv/config');

//Setup

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});
const logger = new Logger();

//Details
var shard = client.shard.ids[0];

//Interaction Loader

/**
 * @type {{ commands: Collection<string, import("./types")._Command>, guildCommands: Record<import("discord.js").Snowflake, Collection<string, import("./types")._Command>>, components: { buttons: Collection<string, import("./types")._Button>, selectMenus: Collection<string, import("./types")._SelectMenu> }, modals: Collection<string, import("./types")._Modal> }}
 */
const interactions = {
    commands: new Collection(),
    guildCommands: {},
    components: {
        buttons: new Collection(),
        selectMenus: new Collection()
    },
    modals: new Collection()
};

readdir('./interactions/commands/slash', (error, files = []) => { //Slash Commands
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/SlashCommands] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/SlashCommands] Loading ${files.length} slash commands...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/SlashCommands] Your bot has not any slash commands`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._SlashCommand}
             */
            const command = require(`./interactions/commands/slash/${file}`);

            if (command.guild) {
                if (interactions.guildCommands[command.guild]) interactions.guildCommands[command.guild].set(command.data.name, command);
                else interactions.guildCommands[command.guild] = new Collection().set(command.data.name, command);
            } else interactions.commands.set(command.data.name, command);

            logger.success(`[Shard ${shard}] [InterationLoader/SlashCommands] ${command.data.name} slash command loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/SlashCommands/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/commands/user', (error, files = []) => { //User Commands
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/UserCommands] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/UserCommands] Loading ${files.length} user commands...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/UserCommands] Your bot has not any user commands`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._UserCommand}
             */
            const command = require(`./interactions/commands/user/${file}`);

            if (command.guild) {
                if (interactions.guildCommands[command.guild]) interactions.guildCommands[command.guild].set(command.data.name, command);
                else interactions.guildCommands[command.guild] = new Collection().set(command.data.name, command);
            } else interactions.commands.set(command.data.name, command);

            logger.success(`[Shard ${shard}] [InterationLoader/UserCommands] ${command.data.name} user command loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/UserCommands/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/commands/message', (error, files = []) => { //Message Commands
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/MessageCommands] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/MessageCommands] Loading ${files.length} message commands...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/MessageCommands] Your bot has not any message commands`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._MessageCommand}
             */
            const command = require(`./interactions/commands/message/${file}`);

            if (command.guild) {
                if (interactions.guildCommands[command.guild]) interactions.guildCommands[command.guild].set(command.data.name, command);
                else interactions.guildCommands[command.guild] = new Collection().set(command.data.name, command);
            } else interactions.commands.set(command.data.name, command);

            logger.success(`[Shard ${shard}] [InterationLoader/MessageCommands] ${command.data.name} message command loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/MessageCommands/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/components/buttons', (error, files = []) => { //Button Components
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/ButtonComponents] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/ButtonComponents] Loading ${files.length} button components...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/ButtonComponents] Your bot has not any button components`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._Button}
             */
            const component = require(`./interactions/components/buttons/${file}`);

            interactions.components.buttons.set(component.id, component);

            logger.success(`[Shard ${shard}] [InterationLoader/ButtonComponents] ${component.id} button component loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/ButtonComponents/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/components/selectMenus', (error, files = []) => { //Select Menu Components
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/SelectMenuComponents] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/SelectMenuComponents] Loading ${files.length} select menu components...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/SelectMenuComponents] Your bot has not any select menu components`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._SelectMenu}
             */
            const component = require(`./interactions/components/selectMenus/${file}`);

            interactions.components.selectMenus.set(component.id, component);

            logger.success(`[Shard ${shard}] [InterationLoader/SelectMenuComponents] ${component.id} select menu component loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/SelectMenuComponents/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/modals', (error, files = []) => { //Modals
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/Modals] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/Modals] Loading ${files.length} modals...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/Modals] Your bot has not any modals`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._Modal}
             */
            const component = require(`./interactions/modals/${file}`);

            interactions.components.selectMenus.set(component.id, component);

            logger.success(`[Shard ${shard}] [InterationLoader/Modals] ${component.id} modal loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/Modals/${file}] ${error.stack ?? error}`);
        };
    });
});

//Logging In

client.login(process.env.BOT_TOKEN);

//Events

client
    .on('interactionCreate', async interaction => {
        if (interaction.isCommand()) {
            let name = interaction.commandName.split(' ')[0];
            let guild = interaction.commandGuildId;
            let command;

            if (guild) command = interactions.guildCommands[guild].get(name);
            else command = interactions.commands.get(name);

            if (command) command.execute(interaction, client);
            else logger.error(`[Shard ${shard}] [Events/InteractionCreate/Command] ${name} command could not found`);
        } else if (interaction.isAutocomplete()) {
            let name = interaction.commandName.split(' ')[0];
            let guild = interaction.commandGuildId;
            let command;

            if (guild) command = interactions.guildCommands[guild].get(name);
            else command = interactions.commands.get(name);

            if (command) command.autocomplete(interaction, client);
            else logger.error(`[Shard ${shard}] [Events/InteractionCreate/Autocomplete] ${name} command could not found`);
        } else if (interaction.isMessageComponent()) {
            let args = interaction.customId.split('-');
            let id = args[0];

            args = args.filter(arg => arg !== id);

            if (interaction.isButton()) {
                let component = interactions.components.buttons.get(id);

                if (component) component.execute(interaction, args, client);
                else logger.error(`[Shard ${shard}] [Events/InteractionCreate/Button] ${id} button could not found`);
            } else if (interaction.isSelectMenu()) {
                let component = interactions.components.selectMenus.get(id);

                if (component) component.execute(interaction, args, client);
                else logger.error(`[Shard ${shard}] [Events/InteractionCreate/SelectMenu] ${id} select menu could not found`);
            };
        } else if (interaction.isModalSubmit()) {
            let args = interaction.customId.split('-');
            let id = args[0];

            args = args.filter(arg => arg !== id);

            let modal = interactions.modals.get(id);

            if (modal) modal.execute(interaction, args, client);
            else logger.error(`[Shard ${shard}] [Events/InteractionCreate/Modal] ${id} modal could not found`);
        };
    });