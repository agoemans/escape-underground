const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { getImagePaths } = require('./getImagePaths');

async function resizeAnimations() {
    const scaleFactor = 1.25;
    const folderNames = ['animations'];

    const result = await getImagePaths('assets', folderNames);
    if (!result.success) {
        throw new Error('Error getting image paths', result.error);
    }
    const animPaths = result.data;

    for (const animPath of animPaths) {
        sharp(animPath)
            .metadata()
            .then(metadata => {
                const newHeight = 64;
                const aspectRatio = metadata.width / metadata.height;
                const newWidth = Math.round(newHeight * aspectRatio);

                return sharp(animPath)
                    .resize({
                        width: newWidth,
                        height: newHeight,
                        kernel: sharp.kernel.nearest,
                    })
                    .toFile(animPath + '.scaled')
                    .then(() => {
                        fs.rename(animPath + '.scaled', animPath, (err) => {
                            if (err) throw err;
                            console.log(`Scaled to ${scaleFactor}x and replaced: ${animPath}`);
                        });
                    });
            })
            .catch(err => {
                console.error('Error scaling image:', err);
            });
    }
}

resizeAnimations()
    .then(() => {
        console.log('All animations resized successfully!');
    })
    .catch(err => {
        console.error('Error resizing animations:', err);
    });
