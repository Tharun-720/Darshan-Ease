const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Golden_Temple_at_Night.jpg/800px-Golden_Temple_at_Night.jpg", dest: "gallery-1.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Meenakshi_Amman_Temple_Madurai.jpg/800px-Meenakshi_Amman_Temple_Madurai.jpg", dest: "gallery-2.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Varanasi_ghats_night.jpg/800px-Varanasi_ghats_night.jpg", dest: "gallery-3.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Brihadeeswarar_Temple_at_Thanjavur.jpg/800px-Brihadeeswarar_Temple_at_Thanjavur.jpg", dest: "gallery-4.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Hampi_chariot_Karnataka.jpg/800px-Hampi_chariot_Karnataka.jpg", dest: "gallery-5.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kedarnath_Temple_Garhwal_Himalayas.jpg/800px-Kedarnath_Temple_Garhwal_Himalayas.jpg", dest: "gallery-6.jpg" }
];

const destFolder = path.join(__dirname, 'src', 'assets');

async function download() {
    for (const img of images) {
        const file = fs.createWriteStream(path.join(destFolder, img.dest));
        await new Promise((resolve, reject) => {
            https.get(img.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            }).on('error', (err) => {
                fs.unlink(img.dest, () => reject(err));
            });
        });
        console.log(`Downloaded ${img.dest}`);
    }
}

download().then(() => console.log('Done')).catch(console.error);
