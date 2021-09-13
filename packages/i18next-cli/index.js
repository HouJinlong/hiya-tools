const commander = require('commander');
const package  = require('./package.json')

commander.version(`${package.version}`'v1.0.0', '-v, --version');