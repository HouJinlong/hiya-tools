import chalk from 'chalk';
import fs from 'fs';
import { json } from 'stream/consumers';
import xlsx from 'xlsx'
import {resolveCurrentDir,dirName,PathConfig,relativeApp,config} from '../path'
import i18nIndexAst from '../ast/i18nIndex';
import shimsAst from '../ast/shims';
export default function (source:string,name:string){
    if(/xlsx$/.test(source)){
        const AllNamespac = shimsAst.getAllNamespace()
        if(AllNamespac.includes(name)){
            return console.log(chalk.bold.red(`${name} 已存在请换一个名称`));
        }
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
        fs.writeFileSync(PathConfig.i18nIndex.output,i18nIndexAst.getSourceCode(langs,name))
        console.log(chalk.bold.green(`./${dirName}/index.ts   已生成`));
        // 类型添加
        shimsAst.addNamespace(name,relativeApp(resolveCurrentDir(`${dirName}/index`)))
        console.log(chalk.bold.green(`已在 shims.i18next.d.ts 中添加类型提示`));
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