const fs = require('fs');
const https = require('https');
const path = require('path');

const fileUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Om_mani_padme_hum_chanting.ogg";
const destFile = path.join(__dirname, 'src', 'assets', 'ambient.ogg');

const file = fs.createWriteStream(destFile);

https.get(fileUrl, {
    headers: {
        'User-Agent': 'Mozilla/5.0'
    }
}, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close(() => console.log('Downloaded ambient.ogg'));
    });
}).on('error', (err) => {
    fs.unlink(destFile, () => console.error(err));
});
