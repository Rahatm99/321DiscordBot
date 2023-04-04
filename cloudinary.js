const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
    cloud_name: "dyfeccam2",
    api_key: "142971231487454",
    api_secret: "gI0zc8QLyI2zLtg2faXAk86KQvY"
});

// Fetch image from URL and apply transformation
cloudinary.uploader.upload('https://cdn.discordapp.com/attachments/1073642334803218462/1091502679123034112/pexels-photo-8467823.jpeg', {
  transformation: [
    { effect: "sepia" }
  ],
  public_id: 'processed_image' // Public ID for the processed image in Cloudinary
},

(error, result) => {
  if (error) {
    console.error(error);
  } 
  else {
    // Processed image URL
    console.log('Processed image URL:', result.secure_url);
  }
});