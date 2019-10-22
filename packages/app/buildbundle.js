const path = require('path')
const glob = require('glob')
const mergeFiles = require('merge-files')

const jsFiles = glob.sync('build/static/?(js)/*.?(js)').map(filepath => {
  return path.resolve(__dirname, filepath)
})

// [deprecated]
// const cssFiles = glob.sync('build/static/?(css)/*.?(css)').map(filepath => {
//   return path.resolve(__dirname, filepath)
// })
// // mergeFiles(cssFiles, __dirname + '/../simplest-cms/bundle.css').then(status => {})

mergeFiles(jsFiles, __dirname + '/../../dist/bundle.js').then(status => {})
