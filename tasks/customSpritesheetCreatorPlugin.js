const { createSpritesheet } = require('./generateSpritesheets');

class CustomSpritesheetGeneratorPlugin {
    apply(compiler) {
      compiler.hooks.beforeCompile.tapPromise('CustomSpriteSheetGeneratorPlugin', async () => {
        await createSpritesheet();
      });
    }
  }
  
  module.exports = CustomSpritesheetGeneratorPlugin;
  