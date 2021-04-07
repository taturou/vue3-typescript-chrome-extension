const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const packageJson = require('../package.json')
const { exit } = require('process')

function create_zip_file() {
  const productName = packageJson.name
  const srcDirName = path.join(__dirname, '../dist')
  const destDirName = path.join(__dirname, '../dist_zip')
  const destFileName = `${packageJson.name}-${packageJson.version}.zip`
  const destPath = path.join(destDirName, destFileName)

  if (fs.existsSync(srcDirName) === false) {
    console.error(`Error: '${srcDirName}' is not found.`)
    console.error('Please build the extension before zip it.')
    exit()
  }

  // create destination dir
  if (fs.existsSync(destDirName) === false) {
    console.log(`Create directory: ${destDirName}`)
    console.log('')
    fs.mkdirSync(destDirName)
  }

  // zip
  console.log(`Zip ${srcDirName}`)
  console.log(` to ${destPath}`)
  console.log('')
  console.log('Start...')

  const output = fs.createWriteStream(destPath)
  output.on('close', () => {
    console.log(archive.pointer() + ' total bytes.')
    console.log('Done.')
    console.log('')
  })

  const archive = archiver('zip', { zlib: { level: 9 } })
  archive.directory(srcDirName, productName)
  archive.pipe(output)
  archive.on('warning', (err) => {
    console.log(err)
  })
  archive.on('error', (err) => {
    console.log(err)
  })
  archive.finalize()
}

create_zip_file()
