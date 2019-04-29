#!/usr/bin/env node

const inquirer = require('inquirer');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const copy = require('copy-dir');
const install = require('spawn-npm-install');
const package = require(`${__dirname}/../package.json`);

console.log(`
 ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    ███╗   ██╗ ██████╗ ██████╗ ███████╗     █████╗ ██████╗ ██╗
██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔══██╗██║
██║     ██████╔╝█████╗  ███████║   ██║   █████╗      ██╔██╗ ██║██║   ██║██║  ██║█████╗      ███████║██████╔╝██║
██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝      ██║╚██╗██║██║   ██║██║  ██║██╔══╝      ██╔══██║██╔═══╝ ██║
╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    ██║ ╚████║╚██████╔╝██████╔╝███████╗    ██║  ██║██║     ██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝
===============================================================================================================
Version : ${package.version}
`);

inquirer.prompt([
  {
    type: 'input',
    message: 'Choose a project name : ',
    name: 'packageName',
    default: path.basename(path.resolve('./'))
  }
]).then(initProject);

function initProject(responses) {
  log('info', "Copying template files ...");
  // Copy API file into current directory
  copy.sync(`${__dirname}/../src/template/`, `./`);

  let data = fs.readFileSync(`${__dirname}/../src/_package.json`, 'utf8');

  if (!responses['packageName']) return log('error', 'Your must provide a package name');

  // Replace package name
  const result = data.replace(/\[PROJECT_NAME\]/g, responses['packageName']);

  const newFile = fs.writeFileSync('./package.json', result, 'utf8');

  if (newFile) return log('error', err);

  // Do execude npm add
  log('info', `I'm all done, intalling dependencies ...`);
  install(["express", "chalk", "winston"], { saveDev: true, stdio: 'inherit' }, err => {
    if (err) return log('error', err);
    install(["nodemon"], { stdio: 'inherit' }, err => {
      log('info', `Your are almost done ...`);
      log('info', `Copy the config file ${colors.green('config/config.json.example')} ${colors.cyan('into')} ${colors.green('config/config-dev.json')}`);
      log('info', `Then run : ${colors.green('npm run start')}`);
    });
  });
}

function log(level, message) {
  if (level == "info") {
    return console.log(`[${level}] 🚀 ${message}`.cyan);
  }
  console.log(`[${level}] 🚧 ${message}`.magenta);
}