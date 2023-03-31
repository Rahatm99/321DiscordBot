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

//Confirmation the bot is turned on
client.on('ready', () => {
    console.log('the bot is ready')
})

client.on("messageCreate", message => {
    //Ping Pong bot input test
    if (message.content === 'ping') {
        message.reply("pong")
    }
    //Shutdown command
    if (message.content === 'shutdown') {
        client.destroy();
    }

})

client.login(process.env.TOKEN)

const pclient = createClient('bxJPwwP46cSPiYtwR72PSPfwdKIxH56nWXKWGpspTcQ1IEbVStVYBQKd');
const query = 'Nature';

/*
client.on("messageCreate", message => {
    if (message.content === 'query') {
        message.reply(query);
    }
})
*/

//Generating an image with generate
client.on("messageCreate", async (message) => {
    if (message.content === "generate") {
      try {
        const photos = await pclient.photos.search({ query, per_page: 1 });
        if (photos.total_results > 0) {
            const photoUrl = photos.photos[0].src.medium;
            message.reply({ files: [photoUrl] });
        } 

        else {
            message.reply("No photos found for your query.");
        }
        
        }

      catch (error) {
        console.error(error);
        message.reply("Failed to fetch a photo.");
      }
    }
  });