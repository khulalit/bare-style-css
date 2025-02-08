const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry point for SCSS
  entry: "./src/styles/main.scss",

  //   // Output configuration
  //   output: {
  //     path: path.resolve(__dirname, "dist"),
  //     filename: "bundle.js", // This won't be used since no JS entry is provided, but Webpack requires a filename.
  //     clean: true, // Clean dist folder before building
  //   },

  // Set mode to development
  mode: "development",

  // DevServer configuration
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "demo"), // Serve HTML files from demo folder
      },
      {
        directory: path.join(__dirname, "docs"), // Serve HTML files from docs folder
      },
    ],
    open: true, // Open browser automatically
    hot: true, // Enable HMR
    port: 3000, // Define the development server port
  },

  // Module rules for processing SCSS files
  module: {
    rules: [
      {
        test: /\.scss$/, // Match SCSS files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          "css-loader", // Parses CSS
          "sass-loader", // Compiles SCSS to CSS
        ],
      },
    ],
  },

  // Plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bare-style-css.css", // Output CSS filename
    }),
    new HtmlWebpackPlugin({
      template: "./demo/index.html",
      filename: "index.html",
      inject: true, // Injects the CSS link into the HTML
    }),
    new HtmlWebpackPlugin({
      template: "./docs/index.html",
      filename: "docs/index.html",
      inject: true, // Injects the CSS link into the HTML
    }),
  ],
};
