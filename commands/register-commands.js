require('dotenv').config({path:'./.env'})
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'generate',
        description: 'Generates an image from Pexels',
        options: [
            {
                name: 'query',
                description: 'The search query',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    
    {
        name: 'edit-image',
        description: 'edits an image with the applied effect',
        options: [
            {
                name: 'effect-type',
                description: 'The type of effect to apply to the image',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'sepia',
                        value: 'sepia',
                    },
                    {
                        name: 'cartoonify',
                        value: 'cartoonify',
                    },
                    {
                        name: 'pixelate',
                        value: 'pixelate',
                    },
                    {
                        name: 'vignette',
                        value: 'vignette',
                    },
                ],
                required: true,
            },
            {
                name: 'image-attachment',
                description: 'upload an image to edit',
                type: ApplicationCommandOptionType.Attachment,
                required: false, 
            },
            {
                name: 'image-url',
                description: 'provide the URL of an image to edit',
                type: ApplicationCommandOptionType.String,
                required: false, 
            },
        ],
    },
];

const rest = new REST({ version: '10'}).setToken('MTA3MzY0MDE2MzI4MjAwMTk2MA.Gqi3kB.bMIrtkl1HCIuI2mJB-0JiR4jTpkj8JufUcvy0I');

(async () => {
    try {
        console.log('Registering Commands');

        await rest.put(
            Routes.applicationGuildCommands('1073640163282001960', '1067876157753671760'),
            {
                body: commands
            }
        );
        console.log('COMPLETE');
    }
    catch (error) {
        console.error(error);
    }
})();