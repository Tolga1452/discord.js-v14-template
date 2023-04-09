//Packages & Helpful Tools

const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const { readdir } = require('node:fs');
const Logger = require('terminal.xr');
const { Axios } = require("axios");
const wait = require('delay');
const { botId } = require('./config');
require('dotenv/config');

//Setup

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});
const logger = new Logger();
const discordAPI = new Axios({
    baseURL: 'https://discord.com/api/v10',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${process.env.BOT_TOKEN}`
    }
});

//Details

var shard = client.shard.ids[0];

//Interaction Loader

client.interactions = {
    commands: new Collection(),
    guildCommands: {}
};

readdir('./interactions/slash', (error, files = []) => { //Slash Commands
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/SlashCommands] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/SlashCommands] Loading ${files.length} slash commands...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/SlashCommands] Your bot has not any slash commands`);

    files.forEach(file => {
        try {
            const command = require(`./interactions/slash/${file}`);

            if (command.guild) {
                if (client.interactions.guildCommands[command.guild]) client.interactions.guildCommands[command.guild].set(command.data.name, command);
                else client.interactions.guildCommands[command.guild] = new Collection().set(command.data.name, command);
            } else client.interactions.commands.set(command.data.name, command);

            logger.success(`[Shard ${shard}] [InterationLoader/SlashCommands] ${command.data.name} slash command loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/SlashCommands/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/user', (error, files = []) => { //User Commands
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/UserCommands] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/UserCommands] Loading ${files.length} user commands...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/UserCommands] Your bot has not any user commands`);

    files.forEach(file => {
        try {
            const command = require(`./interactions/user/${file}`);

            if (command.guild) {
                if (client.interactions.guildCommands[command.guild]) client.interactions.guildCommands[command.guild].set(command.data.name, command);
                else client.interactions.guildCommands[command.guild] = new Collection().set(command.data.name, command);
            } else client.interactions.commands.set(command.data.name, command);

            logger.success(`[Shard ${shard}] [InterationLoader/UserCommands] ${command.data.name} user command loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/UserCommands/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/message', (error, files = []) => { //Message Commands
    if (error) logger.error(`[Shard ${shard}] [InterationLoader/MessageCommands] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[Shard ${shard}] [InterationLoader/MessageCommands] Loading ${files.length} message commands...`);
    else logger.warn(`[Shard ${shard}] [InterationLoader/MessageCommands] Your bot has not any message commands`);

    files.forEach(file => {
        try {
            const command = require(`./interactions/message/${file}`);

            if (command.guild) {
                if (client.interactions.guildCommands[command.guild]) client.interactions.guildCommands[command.guild].set(command.data.name, command);
                else client.interactions.guildCommands[command.guild] = new Collection().set(command.data.name, command);
            } else client.interactions.commands.set(command.data.name, command);

            logger.success(`[Shard ${shard}] [InterationLoader/MessageCommands] ${command.data.name} message command loaded`);
        } catch (error) {
            logger.error(`[Shard ${shard}] [InterationLoader/MessageCommands/${file}] ${error.stack ?? error}`);
        };
    });
});

//Command Installer

if (shard === 0) (async () => {
    logger.status('[CommandInstaller] Waiting for loading commands...');

    await wait(5000); //Wait 5 seconds for loading commands

    var commands = client.interactions.commands;
    var guildCommands = client.interactions.guildCommands;

    logger.info(`[CommandInstaller] Installing ${commands.size} commands...`);

    discordAPI.put(`applications/${botId}/commands`, JSON.stringify(commands.map(command => command.data.toJSON())))
        .then(() => logger.success('[CommandInstaller] All commands are registered'))
        //.then(res => logger.debug(`[CommandInstaller] ${JSON.stringify(res.data)}`)) //For Debugging
        .catch(error => logger.error(`[CommandInstaller] ${error.stack ?? error}`));

    for (var guild in client.interactions.guildCommands) {
        logger.info(`[CommandInstaller/Guild_${guild}] Registering ${commands.size} commands...`)

        discordAPI.put(`applications/${botId}/guilds/${guild}/commands`, JSON.stringify(guildCommands[guild].map(command => command.data.toJSON())))
            .then(() => logger.success(`[CommandInstaller/Guild_${guild}] All commands are registered`))
            //.then(res => logger.debug(`[CommandInstaller/Guild_${guild}] ${JSON.stringify(res.data)}`)) //For Debugging
            .catch(error => logger.error(`[CommandInstaller/Guild_${guild}] ${error.stack ?? error}`));

        await wait(3000); //Wait 3 seconds each guild for rate limits
    };
})().then(() => client.login(process.env.BOT_TOKEN));

//Events

client
    .on(Events.InteractionCreate, async interaction => {
        if (interaction.isCommand()) {
            let name = interaction.commandName.split(' ')[0];
            let guild = interaction.commandGuildId;
            let command;

            if (guild) command = client.interactions.guildCommands[guild].get(name);
            else command = client.interactions.commands.get(name);

            if (command) command.execute(interaction, client);
            else logger.error(`[Shard ${shard}] [Events/InteractionCreate/Command] ${name} command could not found`);
        } else if (interaction.isAutocomplete()) {
            let name = interaction.commandName.split(' ')[0];
            let guild = interaction.commandGuildId;
            let command;

            if (guild) command = client.interactions.guildCommands[guild].get(name);
            else command = client.interactions.commands.get(name);

            if (command) command.autocomplete(interaction, client);
            else logger.error(`[Shard ${shard}] [Events/InteractionCreate/Autocomplete] ${name} command could not found`);
        };
    });