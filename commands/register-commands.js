require('dotenv').config({path:'./.env'})
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: "generate",
        description: "Generates an image from Pexels",
        options: [
            {
                name: 'query',
                description: "The search query",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ],
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering Commands");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
            {
                body: commands
            }
        );
        console.log("COMPLETE");
    }
    catch (error) {
        console.error(error);
    }
})();