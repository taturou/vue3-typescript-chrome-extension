const path = require('path')
const dts = require('dts-bundle')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

class DtsBundlePlugin {
  constructor(libraryName, outputPath) {
    this.libraryName = libraryName
    this.outputPath = outputPath
  }

  apply(compiler) {
    compiler.hooks.done.tap('DtsBundlePlugin', (stats) => {
      console.log({ stats: stats })
      dts.bundle({
        name: this.libraryName,
        main: path.resolve(this.outputPath, './**/*.d.ts'),
        out: path.resolve(this.outputPath, './index.d.ts'),
        removeSource: true,
        outputAsModuleFolder: true
      })
    })
  }
}

const config = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, './src/'),
  target: 'node',
  entry: { index: './index' },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new EslintWebpackPlugin()]
}

module.exports = {
  config: config,
  DtsBundlePlugin: DtsBundlePlugin
}
