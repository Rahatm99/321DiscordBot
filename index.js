const { Client, GatewayIntentBits } = require('discord.js')
const { createClient } = require('pexels')
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on('ready', () => {
    console.log('the bot is ready')
})

client.on("messageCreate", message => {
    if (message.content === 'ping') {
        message.reply("pong")
    }
})

client.on("messageCreate", message => {
    if (message.content === 'shutdown') {
        client.destroy();
    }
})

client.login(process.env.TOKEN)


//import {pclient, query} from "./pexelsModule.mjs";

const pclient = createClient('bxJPwwP46cSPiYtwR72PSPfwdKIxH56nWXKWGpspTcQ1IEbVStVYBQKd');
const query = 'Nature';

client.on("messageCreate", message => {
    if (message.content === 'query') {
        message.reply(query);
    }
})

client.on("messageCreate", message => {
    if (message.content === 'generate') {
        pclient.photos.search({ query, per_page: 1 }).then(photos => {});
    }
})