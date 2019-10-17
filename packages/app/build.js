const path = require('path')
const glob = require('glob')
const mergeFiles = require('merge-files')

const jsFiles = glob.sync('build/static/?(js)/*.?(js)').map(filepath => {
  return path.resolve(__dirname, filepath)
})

const cssFiles = glob.sync('build/static/?(css)/*.?(css)').map(filepath => {
  return path.resolve(__dirname, filepath)
})

mergeFiles(jsFiles, __dirname + '/../simplest-cms/bundle.js').then(status => {})
mergeFiles(cssFiles, __dirname + '/../simplest-cms/bundle.css').then(status => { })