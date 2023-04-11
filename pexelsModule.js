const { createClient } = require('pexels')

const pclient = createClient(process.env.PEXELS);

async function generate(query) {

    var output = "";
    try {
        const { photos, total_results } = await pclient.photos.search({ query, per_page: 50 });
        if (total_results > 0) {
            const photoNum = Math.floor(Math.random() * photos.length);
            const photoUrl = photos[photoNum].src.medium;
            //message.reply({ files: [photoUrl] });
            output = {files: [photoUrl]};
        } 

        else {
            output = "There does not seem to be any responses for your search. Please try again.";
        }
        
    }

    catch (error) {
        console.error(error);
        output = "Failed to get a photo.";
    }

    return output;
}

ModalSubmitFields.exports = { generate }