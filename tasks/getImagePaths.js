const path = require('path');
const fs = require('fs');

async function getAllFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllFiles(fullPath) : fullPath;
  }));
  return files.flat();
}

async function getImagePaths(folderNames) {
    return new Promise(async (resolve, reject) => {
        const filePromises = folderNames.map((folderName) => getAllFiles(path.join(process.cwd(), `src_assets/${folderName}`)));
        const allFiles = await Promise.all(filePromises);
        if (allFiles.some((files) => files instanceof Error)) {
            reject({success: false, error: 'Error reading files'});
        }

        resolve({ success: true, data: allFiles.flat() });
    });
}

module.exports = { getImagePaths };