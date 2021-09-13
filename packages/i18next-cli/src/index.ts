#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import {Command} from 'commander'
import {resolveCliApp} from './path'
import init from './actions/init'
import create from './actions/create'
import xlsx from './actions/xlsx'
import update from './actions/update'

const pkg = JSON.parse(fs.readFileSync(resolveCliApp('./package.json'),'utf-8'))

const program = new Command(pkg.name)
program.version(`v${pkg.version}`, '-v, --version');
program
    .command('init')
    .description('初始化@xc/i18next')
    .action(init);
program
    .command('create')
    .description('根据数据源创建语言包')
    .argument('<source>', '来源(暂时只支持xlsx文件)')
    .argument('<name>', '语言包的名称,最好全中文')
    .action(create);   

program
    .command('update')
    .description('根据数据源创建语言包')
    .argument('<source>', '来源(暂时只支持xlsx文件)')
    .argument('<langFileIndex>', '语言包index.ts的路径')
    .action(update); 

program
    .command('xlsx')
    .description('根据语言包生成xlsx文件')
    .argument('<source>', '语言包index.ts的路径')
    .action(xlsx);       

program.parse(process.argv);
