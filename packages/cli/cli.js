#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const program = require('commander')
const log = console.log

const packageJson = require('./package.json')

let projectName

program.version(packageJson.version)
program.arguments('<project-directory>')
program.usage(`${chalk.green('<project-directory>')} [options]`)
program.action(name => {
  projectName = name
})
program.parse(process.argv)
program.on('--help', function() {
  console.log('')
  console.log('Examples:')
  console.log('  npx github:ricardocanelas/simplest-cms myadmin')
  console.log('')
})

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`)
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('cms')}`)
  console.log()
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`)
  process.exit(1)
}

const dir = process.cwd() + '/' + projectName

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const files = [
  { filename: __dirname + '/../../dist/index.php', output: 'index.php' },
  { filename: __dirname + '/../../dist/config.php', output: 'config.php' },
  { filename: __dirname + '/../../dist/bundle.js', output: 'bundle.js' },
  { filename: __dirname + '/../../dist/data.json', output: 'data.json' },
]

files.forEach(file => {
  const content = fs.readFileSync(file.filename)
  const output = './' + projectName + '/' + file.output
  fs.writeFileSync(output, content.toString())
})

log(chalk.black('Installed with success in ./' + projectName + ' directory'))
log(chalk.white.bgBlack(' Please, now you need to edit the file: '))
log(chalk.black('- config.php'))
log('')
