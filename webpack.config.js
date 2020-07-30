'use strict';

const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: __dirname + `public`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: true,
    port: 9000,
    watchContentBase: true,
    historyApiFallback: true,
    inline: true,
  },
};
