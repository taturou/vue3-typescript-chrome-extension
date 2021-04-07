const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base').config
const DtsBundlePlugin = require('./webpack.config.base').DtsBundlePlugin

const libraryName = 'storage'
const outputPath = path.resolve(__dirname, './dist')

const config = merge(baseConfig, {
  output: {
    path: outputPath,
    filename: '[name].common.js',
    library: libraryName,
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              context: path.resolve(__dirname, './'),
              configFile: path.resolve(__dirname, './tsconfig.commonjs.json')
            }
          }
        ]
      }
    ]
  }
  // plugins: [new DtsBundlePlugin(libraryName, outputPath)]
})

module.exports = config
