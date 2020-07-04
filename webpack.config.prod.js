const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "share-place": "./src/SharePlace.js",
    "my-place": "./src/MyPlace.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist", "assets", "scripts"),
    publicPath: "dist/assets/scripts/",
  },
  devtool: "cheap-source-map",
  plugins: [new CleanPlugin.CleanWebpackPlugin()]
};
