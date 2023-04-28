//deleted file here for test history
//unused API for background removal
const FormData = require('form-data');
const fs = require('fs');

const formData = new FormData();
formData.append('size', 'auto');
formData.append('image_url', 'https://www.remove.bg/example.jpg');

axios({
  method: 'post',
  url: 'https://api.remove.bg/v1.0/removebg',
  data: formData,
  responseType: 'arraybuffer',
  headers: {
    ...formData.getHeaders(),
    'X-Api-Key': 'Pky8bWHXqWwNRDJMJ1C4K22L',
  },
  encoding: null
})
.then((response) => {
  if(response.status != 200) return console.error('Error:', response.status, response.statusText);
  fs.writeFileSync("no-bg.png", response.data);
})
.catch((error) => {
    return console.error('Request failed:', error);
});