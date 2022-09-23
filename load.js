const { Axios } = require("axios");
const { ApplicationCommand } = require("discord.js");
const { readdir } = require("fs");
const Logger = require("terminal.xr");
const { botId } = require("./config");
const wait = require('delay');
require('dotenv/config');

const logger = new Logger();
const API = new Axios({
    baseURL: 'https://discord.com/api/v10',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${process.env.BOT_TOKEN}`
    }
});

/**
 * @type {ApplicationCommand[]}
 */
const commands = [];
/**
 * @type {Record<import("discord.js").Snowflake, ApplicationCommand[]>}
 */
const guildCommands = {};

readdir('./interactions/commands/slash', (error, files = []) => { //Slash Commands
    if (error) logger.error(`[CommandLoader/Slash] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[CommandLoader/Slash] Loading ${files.length} slash commands...`);
    else logger.warn(`[CommandLoader/Slash] Your bot has not any slash commands`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._SlashCommand}
             */
            const command = require(`./interactions/commands/slash/${file}`);

            if (command.guild) {
                if (guildCommands[command.guild]) guildCommands[command.guild].push(command.data);
                else guildCommands[command.guild] = [command.data];
            } else commands.push(command.data);

            logger.success(`[CommandLoader/Slash] ${command.data.name} slash command loaded`);
        } catch (error) {
            logger.error(`[CommandLoader/Slash/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/commands/user', (error, files = []) => { //User Commands
    if (error) logger.error(`[CommandLoader/User] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[CommandLoader/User] Loading ${files.length} user commands...`);
    else logger.warn(`[CommandLoader/User] Your bot has not any user commands`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._UserCommand}
             */
            const command = require(`./interactions/commands/user/${file}`);

            if (command.guild) {
                if (guildCommands[command.guild]) guildCommands[command.guild].push(command.data);
                else guildCommands[command.guild] = [command.data];
            } else commands.push(command.data);

            logger.success(`[CommandLoader/User] ${command.data.name} user command loaded`);
        } catch (error) {
            logger.error(`[CommandLoader/User/${file}] ${error.stack ?? error}`);
        };
    });
});

readdir('./interactions/commands/message', (error, files = []) => { //Message Commands
    if (error) logger.error(`[CommandLoader/Message] ${error.stack ?? error}`);

    if (files.length > 0) logger.info(`[CommandLoader/Message] Loading ${files.length} message commands...`);
    else logger.warn(`[CommandLoader/Message] Your bot has not any message commands`);

    files.forEach(file => {
        try {
            /**
             * @type {import("./types")._MessageCommand}
             */
            const command = require(`./interactions/commands/message/${file}`);

            if (command.guild) {
                if (guildCommands[command.guild]) guildCommands[command.guild].push(command.data);
                else guildCommands[command.guild] = [command.data];
            } else commands.push(command.data);

            logger.success(`[CommandLoader/Message] ${command.data.name} message command loaded`);
        } catch (error) {
            logger.error(`[CommandLoader/Message/${file}] ${error.stack ?? error}`);
        };
    });
});

(async () => {
    await wait(5000); //Wait 5 seconds for listing commands

    logger.info(`[CommandLoader/PUT] Registering ${commands.length} commands`)

    API.put(`applications/${botId}/commands`, JSON.stringify(commands.map(command => command.toJSON())))
        .then(() => logger.success('[CommandLoader/PUT] Commands registered'))
        //.then(res => logger.debug(`[CommandLoader/PUT] ${JSON.stringify(res.data)}`)) //For Debugging
        .catch(error => logger.error(`[CommandLoader/PUT] ${error.stack ?? error}`));

    for (var guild in guildCommands) {
        logger.info(`[CommandLoader/Guild_${guild}/PUT] Registering ${commands.length} commands`)

        API.put(`applications/${botId}/guilds/${guild}/commands`, JSON.stringify(guildCommands[guild].map(command => command.toJSON())))
            .then(() => logger.success(`[CommandLoader/Guild_${guild}/PUT] Commands registered`))
            //.then(res => logger.debug(`[CommandLoader/Guild_${guild}/PUT] ${JSON.stringify(res.data)}`)) //For Debugging
            .catch(error => logger.error(`[CommandLoader/Guild_${guild}/PUT] ${error.stack ?? error}`));

        await wait(3000); //Wait 3 seconds each guild for rate limits
    };
})();