const { ShardingManager } = require("discord.js");
const Terminal = require('terminal.xr');
require('dotenv/config');

const logger = new Terminal()
const manager = new ShardingManager('./shard.js', { token: process.env.BOT_TOKEN });

manager.on('shardCreate', shard => logger.status(`[ShardingManager] Launched shard ${shard.id}`));

manager.spawn();