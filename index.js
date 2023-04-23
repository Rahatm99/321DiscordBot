/*
  Main file containing all commands for the discord bot
*/
const { Client, GatewayIntentBits } = require('discord.js')
const { createClient } = require('pexels')
require('dotenv/config')

//creates the Discord client
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

//Replies based on messages
client.on("messageCreate", message => {
    //Ping Pong bot input test
    if (message.content === 'ping') {
        message.reply("pong")
    }
    //Shutdown command (only works for Moderators)
    if (message.content === 'shutdown') {
        if (message.member.roles.cache.some(role => role.name === "Moderator")) {
            client.destroy();
        }
    }

})

//Creates Pexals client and login for the bot
client.login(process.env.TOKEN)
const pclient = createClient(process.env.PEXELS);

/* Cloudinary Test */
const cloudinary = require('cloudinary').v2;

/* API Information */
let key = process.env.CLOUDINARY_KEY.toString();
let secret = process.env.CLOUDINARY_SECRET.toString();

// Configuration
cloudinary.config({
    cloud_name: "dyfeccam2",
    api_key: key,
    api_secret: secret
});

/*
  Slash command handling
  currently supports Image generation and editing
*/
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) 
        return;
    
    //generates an image using Pexels API
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

    //Edits an image using Cloudinary API
    if (interaction.commandName === 'edit-image') {
        const filter = interaction.options.get('effect-type').value;
        const imageUrl = interaction.options.getString('image-url');
        const imageAttachment = interaction.options.getAttachment('image-attachment');
        const effectStrength = interaction.options.get('effect-strength')?.value;

        //Error if both URL and attachments is given
        if (imageUrl && imageAttachment) {
            interaction.reply({ content: 'ERROR: Provide an image attachment OR URL, not both.', ephemeral: true });
            return;
        }

        if(filter === "sharpen" && effectStrength > 1500){
          interaction.reply({ content: 'Not a valid input. Please input a number less than 1500', ephemeral: true });
          return;
        }

        //Getting an image from url or attachment
        let url;
        if (imageAttachment) {
          url = imageAttachment.url;
        } else if (imageUrl) {
          url = imageUrl;
        } else {
          interaction.reply({ content: 'You must provide an image attachment or URL.', ephemeral: true });
        }

        //Deciding filter Strength
        let newFilter;
        if(effectStrength) {
            let effectStrengthStr = effectStrength.toString();
            newFilter = filter.concat(":", effectStrengthStr);
        }

        try {
          //edits image with specified filter strength
          if(newFilter){
          const result = await cloudinary.uploader.upload(url, {
            transformation: [
                { effect: newFilter }
              ],
             public_id: 'processed_image'
            });
            await interaction.reply({ files: [{ attachment: result.url }] });
          }
          //edits image with default filter strength
          else{
            const result = await cloudinary.uploader.upload(url, {
              transformation: [
                { effect: filter }
              ],
              public_id: 'processed_image'
            });
            await interaction.reply({ files: [{ attachment: result.url }] });

          }
        } catch (error) {
          console.error(error);
          interaction.reply({ content: 'Failed to edit a photo URL.', ephemeral: true });
        }
      }

    //crop command for images using Cloudinary API
    if(interaction.commandName === 'crop'){
      const imageUrl = interaction.options.getString('image-url');
      const imageAttachment = interaction.options.getAttachment('image-attachment');
      const hVal = interaction.options.get('hvalue')?.value;
      const wVal = interaction.options.get('wvalue')?.value;
      if(hVal < 1 || wVal < 1 || hVal > 1000 || wVal > 1000){
        interaction.reply({content: 'Error, the h and/or w values are less than 1/bigger than 1000. Please try again', 
                            ephemeral: true});
        return;
      }
      if (imageUrl && imageAttachment) {
        interaction.reply({ content: 'ERROR: Provide an image attachment OR URL, not both.', ephemeral: true });
        return;
      }



      let grav;
      if(interaction.options.get('type')){
        grav = interaction.options.get('type').value;
      }
      else{
        grav = "auto";
      }
      //Getting an image from url or attachment
      let url;
      if (imageAttachment) {
        url = imageAttachment.url;
      } else if (imageUrl) {
        url = imageUrl;
      } else {
        interaction.reply({ content: 'You must provide an image attachment or URL.', ephemeral: true });
      }

      try {
        const result = await cloudinary.uploader.upload(url, {
          transformation: [
            { 
              gravity: grav,
              height : hVal,
              width : wVal,
              crop: "crop"
            }
          ],
          public_id: 'processed_image'
        });
        interaction.reply({ files: [{ attachment: result.url }] });
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'Failed to edit a photo URL.', ephemeral: true });
      }
    }
    if(interaction.commandName === 'resize'){
      const imageUrl = interaction.options.getString('image-url');
      const imageAttachment = interaction.options.getAttachment('image-attachment');
      const hVal = interaction.options.get('hvalue')?.value;
      const wVal = interaction.options.get('wvalue')?.value;
      if(hVal < 1 || wVal < 1 || hVal > 1000 || wVal > 1000){
        interaction.reply({content: 'Error, the h and/or w values are less than 1/bigger than 1000. Please try again', 
                            ephemeral: true});
        return;
      }
      if (imageUrl && imageAttachment) {
        interaction.reply({ content: 'ERROR: Provide an image attachment OR URL, not both.', ephemeral: true });
        return;
      }
      //Getting an image from url or attachment
      let url;
      if (imageAttachment) {
        url = imageAttachment.url;
      } else if (imageUrl) {
        url = imageUrl;
      } else {
        interaction.reply({ content: 'You must provide an image attachment or URL.', ephemeral: true });
      }

      try {
        const result = await cloudinary.uploader.upload(url, {
          transformation: [
            { 
              height : hVal,
              width : wVal,
              crop: "scale"
            }
          ],
          public_id: 'processed_image'
        });
        interaction.reply({ files: [{ attachment: result.url }] });
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'Failed to edit a photo URL.', ephemeral: true });
      }
    }
    //help command that gives imformation about the commands
    if(interaction.commandName === 'help'){
        const helpMessage = `/generate is a command that generates you an image with a specific prompt.
      Ex: /generate (prompt)
      
      /edit-image is a command that edits an image with a specific filter with an image from a URL or an attachment.
      Ex: /edit-image (filter) (image URL OR attachment) (effect strength if any)

      /crop is a command that crops an image with a specific size given
      Ex: /crop (image URL OR attatchment) (type of crop) (height) (width)

      /resize is a command that resizes an image with a specific size given
      Ex: /resize (image URL OR attatchment) (height) (width)
      
      /help is what you are doing.
      Ex: /help`;
        interaction.reply(helpMessage);
    }
});