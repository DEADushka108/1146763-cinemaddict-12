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
    // publicPath: `http://localhost:8080/`,
    compress: true,
    port: 9000,
    watchContentBase: true
  },
};
