const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src') + '/client.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|public)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public', 'ner1vah0s'),
    filename: 'bundle.js'
  }
}
