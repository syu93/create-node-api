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
    message: 'Chose the name of your project : ',
    name: 'packageName',
    default: path.basename(path.resolve('./'))
  }
]).then(initProject);

async function initProject(responses) {
  // Copy API file into current directory
  copy.sync(`${__dirname}/../src/template/`, `./`);

  let data = fs.readFileSync(`${__dirname}/../src/_package.json`, 'utf8');

  if (!responses['packageName']) return console.log('[error] Your must provide a package name');

  // Replace package name
  const result = data.replace(/\[PROJECT_NAME\]/g, responses['packageName']);

  const newFile = fs.writeFileSync('./package.json', result, 'utf8');

  if (newFile) return console.log(err);

  // Do execude npm add
  console.log(`[info] I'm all done, intalling dependencies ...`);
  await install(["nodemon"], { saveDev: true, stdio: 'inherit' });
  await install(["express", "chalk", "winston"], { stdio: 'inherit' });
}