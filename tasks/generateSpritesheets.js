const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { getImagePaths } = require('./getImagePaths');
const { writeToFile } = require('./writeToFile');

const folderNames = ['objects', 'people'];

async function generateJSONFile(jsonMetadata, fileName, totalWidth, maxHeight) {
  let phaserJson = {
    frames: [],
    meta: {
      image: `${fileName}.png`,
      size: { w: totalWidth, h: maxHeight },
      scale: "1"
    }
  };

  jsonMetadata.forEach(entry => {
    // Extract the base filename without extension
    const baseFilename = path.parse(entry.filename).name;
    phaserJson.frames.push({
      filename: baseFilename,
      frame: {
        x: entry.x,
        y: entry.y,
        w: entry.width,
        h: entry.height
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: entry.width,
        h: entry.height
      },
      sourceSize: {
        w: entry.width,
        h: entry.height
      }
    });
  });

  await writeToFile(path.join(process.cwd(), `assets/atlases/${fileName}.json`), JSON.stringify(phaserJson, null, 4));
}

// Function to create the spritesheet
async function createSpritesheet() {
  const result = await getImagePaths(folderNames);
  if (!result.success) {
    throw new Error('Error getting image paths', result.error);
  }

  const imagePaths = result.data;
  const layers = [];
  const jsonMetadata = [];
  let xOffset = 0;
  let totalWidth = 0;
  let maxHeight = 0;

  // Prepare all images
  for (const path of imagePaths) {
    const image = sharp(path);
    const { width, height } = await image.metadata();

    // Store layer for final composition
    layers.push({
      input: await image.toBuffer(),
      left: xOffset,
      top: 0
    });

    // Metadata
    jsonMetadata.push({
      filename: path,
      x: xOffset,
      y: 0,
      width,
      height
    });

    xOffset += width;
    totalWidth += width;
    if (height > maxHeight) maxHeight = height;
  }

  //this will change as I add more assets, this is temp name
  const fileBaseName = 'atlas01';
  // Create blank base and composite all at once
  await sharp({
    create: {
      width: totalWidth,
      height: maxHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(layers)
    .toFile(path.join(process.cwd(), `assets/atlases/${fileBaseName}.png`));

  // Save JSON metadata
  await generateJSONFile(jsonMetadata, fileBaseName, totalWidth, maxHeight);
  // await writeToFile(path.join(process.cwd(), `assets/atlases/atlas01.json`), JSON.stringify(jsonMetadata, null, 4));

  console.log('✅ Spritesheet and metadata generated successfully!');
}

module.exports = {
  createSpritesheet
};