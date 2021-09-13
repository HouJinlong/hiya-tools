import chalk from 'chalk';
import fs from 'fs';
import { json } from 'stream/consumers';
import xlsx from 'xlsx'
import {resolveCurrentDir,dirName,PathConfig,relativeApp,config} from '../path'
import i18nIndexAst from '../ast/i18nIndex';
import shimsAst from '../ast/shims';
export default function (source:string,langFileIndex:string){
    if(/xlsx$/.test(source)){
        const data = i18nIndexAst.parse(resolveCurrentDir(langFileIndex))
        console.log(chalk.bold.green('原语言包读取成功'),data);
        // 读取
        const file = fs.readFileSync(resolveCurrentDir(source))
        console.log(chalk.bold.green('文件读取成功正在生成语言包...'));
        var wb = xlsx.read(file, {type:'buffer'});
        const xlsxData = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        // 生成json
        try {
            fs.accessSync(resolveCurrentDir(dirName))
        } catch (error) {
            fs.mkdirSync(resolveCurrentDir(dirName))
        }
        let langs = []
        Object.keys(config.xlsxKeyMap).forEach(v=>{
            if(createLangFile(xlsxData,v)){
                langs.push(v)
            }
        })
        console.log(langs);
        // 生成入口文件
        fs.writeFileSync(resolveCurrentDir(langFileIndex),i18nIndexAst.getSourceCode(langs,data.defaultNS))
        console.log(chalk.bold.green(`./${dirName}/index.ts   已更新`));
    }else{
        console.log(chalk.bold.red('source 暂时只支持xlsx文件'));
    }
} 

function createLangFile(data,lang){
    const langXlsxKey = config.xlsxKeyMap[lang]
    if(!data[0][langXlsxKey]){
        console.log(chalk.bold.yellow(`该xlxs缺少 ${langXlsxKey}`));
        return
    }
    let fileData = {}
    data.forEach(v => {
        if(!fileData[v[config.key]]){
            if(v[langXlsxKey]){
                fileData[v[config.key]]=v[langXlsxKey]
            }else{
                console.log(chalk.bold.yellow(`${v[config.key]} 缺少 ${langXlsxKey}`));
            }
        }
    });
    fs.writeFileSync(resolveCurrentDir(`${dirName}/${lang}.json`),JSON.stringify(fileData,null,2))
    console.log(chalk.bold.green(`./${dirName}/${lang}.json   生成`));
    return fileData
}