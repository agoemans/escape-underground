const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { getImagePaths } = require('./getImagePaths');

async function resizeImages() {
    const folderNames = ['environment_decor', 'people'];
    const result = await getImagePaths('src_assets', folderNames);
    if (!result.success) {
        throw new Error('Error getting image paths', result.error);
    }
    const imagePaths = result.data;

    for (const imgPath of imagePaths) {
        sharp(imgPath)
            .resize({
                width: 64,
                height: 64,
                kernel: sharp.kernel.nearest,
            })
            .png({ quality: 80 })
            .toFile(imgPath + '.tmp')
            .then(() => {
                fs.rename(imgPath + '.tmp', imgPath, (err) => {
                    if (err) {
                        console.error(`Error renaming ${imgPath}:`, err);
                        return;
                    }
                })
            })
            .catch(err => {
                console.error(`Error resizing ${imgPath}:`, err);
            });
    }

}

resizeImages()