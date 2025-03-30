const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CustomSpritesheetGeneratorPlugin = require('./tasks/customSpritesheetCreatorPlugin');
module.exports = {
  entry: './src/index.ts',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CustomSpritesheetGeneratorPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: 'html', to: '' },
        { from: 'css', to: '' }
      ]
    })
  ]
};
