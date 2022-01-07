import chalk from 'chalk';
import fs from 'fs';
import { json } from 'stream/consumers';
import xlsx from 'xlsx'
import {createLang} from '../utils'
import { resolveCurrentDir } from '../config';
import i18nIndexAst from '../ast/i18nIndex';
import shimsAst from '../ast/shims';
export default function (langFileIndex:string){
    const data = i18nIndexAst.parse(resolveCurrentDir(langFileIndex))
    console.log(chalk.bold.green('原语言包读取成功'),data);
    createLang({
        dataUrl:data.config.data,
        data:data
    })
} 

