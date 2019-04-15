const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const entryPoint = 'index.js'
const outputFolder = 'dist'


module.exports = {
  entry: {
    js: `./src/${entryPoint}`
  },
  output: {
    path: `${__dirname}/${outputFolder}/`,
    publicPath: `../`,
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { 
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({
                "browsers": [
                  "last 2 versions",
                  "IE 10"
                ],
                'grid': true
              })]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|svg|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/webfonts'
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        exclude: [/webfonts/],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/img'
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true,
      excludeWarnings: true,
      title: 'Webpack',
      contentImage: path.join(__dirname, 'webpack.svg')
    })
  ]
}