const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { getImagePaths } = require('./getImagePaths');
const { writeToFile } = require('./writeToFile');

async function resizeImages() {
    const folderNames = ['environment_decor', 'interactive_objects', 'people'];
    const result = await getImagePaths(folderNames);
    if (!result.success) {
        throw new Error('Error getting image paths', result.error);
    }

    console.log('Image paths:', result.data);
    const imagePaths = result.data;

    for (const path of imagePaths) {
        sharp(path)
            .resize(64)
            .png({ quality: 80 })
            .toFile(path.replace(/\.png$/, '_resized.png'), (err, info) => {
                if (err) {
                    console.error('Error resizing image:', err);
                } else {
                    console.log('Resized image saved:', info);
                }
            });
    }

    //     sharp('input.jpg')
    //   .rotate()
    //   .resize(200)
    //   .jpeg({ mozjpeg: true })
    //   .toBuffer()
    //   .then( data => { ... })
    //   .catch( err => { ... });
}

resizeImages()