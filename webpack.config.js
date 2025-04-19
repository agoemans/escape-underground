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
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    host: 'localhost',
    compress: true,
    port: 8080
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
