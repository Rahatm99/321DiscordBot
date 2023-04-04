fetch('https://api.benzin.io/v1/removeBackground', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'b807719afaed433dbbc12bad29dc4a1d'
    },
    body: JSON.stringify({
        image_file_url: 'https://cdn.discordapp.com/attachments/1073642334803218462/1091502679123034112/pexels-photo-8467823.jpeg',
        size: 'preview',
        output_format: 'image'
    })
})
.then(response => response.json())
.then(data => {
    var imageUrl = data.url;
    console.log('Image URL:', imageUrl);
})
.catch(error => {
    console.error('Error:', error);
});