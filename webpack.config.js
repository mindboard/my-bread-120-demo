const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: './my-bread-120-lib.js',
    path: path.resolve(__dirname, 'docs')
  }
};
