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
    const channel = client.channels.cache.get('1073642334803218462');
    if(channel){
        channel.send('Bot is now online! Type /help for the command list.')
    }
})

client.on("messageCreate", message => {
    //Ping Pong bot input test
    if (message.content === 'ping') {
        message.reply("pong")
    }
    //Shutdown command
    if (message.content === 'shutdown') {
        if (message.member.roles.cache.some(role => role.name === "Moderator")) {
            client.destroy();
        }
    }

})

client.login(process.env.TOKEN)

const pclient = createClient(process.env.PEXELS);
const query = 'Nature';

/* Cloudinary Test */
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
    cloud_name: "dyfeccam2",
    api_key: "142971231487454",
    api_secret: "gI0zc8QLyI2zLtg2faXAk86KQvY"
});

client.on("messageCreate", async (message) => {
    if (message.content.startsWith("edit ")) {
      try {
        const url = message.content.slice(5);
        //message.reply(url)
        // Fetch image from URL and apply transformation
        cloudinary.uploader.upload(url, {
            transformation: [
                { effect: "sepia" }
            ],
            public_id: 'processed_image' // Public ID for the processed image in Cloudinary
        },
        (error, result) => {
            if (error) {
                message.reply("Failed to edit a photo url.");
            } 
            else {
                // Return the new edited/processed image URL
            message.reply(result.secure_url);
            }
        });
        }
    //Might need in the future, but currently try-catch unnecessary
      catch (error) {
        console.error(error);
        message.reply("Failed to edit a photo url.");
      }
    }
});
/* End of Cloudinary Test */

//Generating an image with generate
client.on("messageCreate", async (message) => {
    if (message.content.startsWith("generate ")) {
      try {
        const query = message.content.slice(9);
        const { photos, total_results } = await pclient.photos.search({ query, per_page: 50 });
        if (total_results > 0) {
            const photoNum = Math.floor(Math.random() * photos.length);
            const photoUrl = photos[photoNum].src.medium;
            message.reply({ files: [photoUrl] });
        } 

        else {
            message.reply("There does not seem to be any responses for your search. Please try again.");
        }
        
        }

      catch (error) {
        console.error(error);
        message.reply("Failed to get a photo.");
      }
    }
  });

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) 
        return;
    
    if (interaction.commandName === 'generate') {
        const query = interaction.options.get('query')?.value;

        try {
            const { photos, total_results } = await pclient.photos.search({ query, per_page: 50 });
            if (total_results > 0) {
                const photoNum = Math.floor(Math.random() * photos.length);
                const photoUrl = photos[photoNum].src.medium;
                interaction.reply({ files: [photoUrl] });
            } 
            else {
                interaction.reply("There does not seem to be any responses for your search. Please try again.");
            }
        }
    
        catch (error) {
            console.error(error);
            interaction.reply("Failed to get a photo.");
        }
    }
});