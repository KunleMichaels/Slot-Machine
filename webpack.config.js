const path = require("path");
const webpack = require("webpack");
const js = path.resolve(__dirname, "js");
const modules = path.resolve(__dirname, "js/components");
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./js/main.js",
  output: {
    filename: "./js/app.js",
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
              publicPath: "fonts",
            },
          },
        ],
      },
    ],
    loaders: [
      {
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new extractTextPlugin({ filename: "app.bundle.css" })],
  devtool: "#inline-source-map",

  watch: true,
};
