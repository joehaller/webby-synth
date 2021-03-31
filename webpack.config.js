const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // New rules to load css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  },
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx']
  }
}