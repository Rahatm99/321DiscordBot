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
                        name: 'sepia (1-100, Default: 80)',
                        value: 'sepia',
                    },
                    {
                        name: 'cartoonify (0-100, Default: 50)',
                        value: 'cartoonify',
                    },
                    {
                        name: 'pixelate (1-200, Default: N/A)' ,
                        value: 'pixelate',
                    },
                    {
                        name: 'vignette (0-100, Default: 20)',
                        value: 'vignette',
                    },
                    {
                        name: 'hue (-100-100, Default: 80)',
                        value: 'hue',
                    },
                    {
                        name: 'improve (Do not input strength for this effect)',
                        value: 'improve',
                    },
                    {
                        name: 'fill_light (-100-100, Default: 0)',
                        value: 'fill_light',
                    },
                    {
                        name: 'sharpen (1-2000, Default: 100)',
                        value: 'sharpen',
                    },
                    {
                        name: 'brightness (-100-100, Default: 80)',
                        value: 'brightness',
                    },
                    {
                        name: 'pixelate_faces (1-2000, Default: 100)',
                        value: 'pixelate_faces',
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
            {
                name: 'effect-strength',
                description: 'Strength of the applied effect (Uses default value if empty)',
                type: ApplicationCommandOptionType.Integer,
                minValue: -100,
                maxValue: 2000,
                required: false, 
            },
        ],
        
    },
    {
        name: 'crop',
        description: 'Crops a desired area with a specific x and y value',
        options: [
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
            {
                name: 'type',
                description: 'Type of crop (Auto is default)',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Auto',
                        value: 'auto',
                    },
                    {
                        name: 'North West',
                        value: 'north_west',
                    },
                    {
                        name: 'North East',
                        value: 'north_east',
                    },
                    {
                        name: 'South West',
                        value: 'south_west',
                    },
                    {
                        name: 'South East',
                        value: 'south_east',
                    },
                    {
                        name: 'Face',
                        value: 'face',
                    },

                ],
                required: false, 
            },
            {
                name: 'hvalue',
                description: 'The height of the desired cropped image',
                type: ApplicationCommandOptionType.Integer,
                required: false, 
            },
            {
                name: 'wvalue',
                description: 'The width of the desired cropped image',
                type: ApplicationCommandOptionType.Integer,
                required: false, 
            },
        ],
        required: true
    },
    {
        name: 'help',
        description: 'Ask the bot for help',
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