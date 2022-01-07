
import fs from 'fs'
import chalk from 'chalk';
import Papa from 'papaparse';
import axios from 'axios';
import i18nIndexAst from './ast/i18nIndex';
import shimsAst from './ast/shims';
import { config,dirName,resolveCurrentDir,relativeApp,PathConfig} from './config';

interface CreateLangArgument{
    // 谷歌文档svg地址
    dataUrl:string
    data:{
        // 语言包名称
        defaultNS:string
        // config 声明代码
        configStr:string
        // 创建没有 更新有
        config?:{
            url:string,
            data:string
        }
    }
}
export function createLang({dataUrl,data}:CreateLangArgument){
    dataUrl = dataUrl.replace('pubhtml','pub?output=csv')
    axios.get(dataUrl).then(res=>{
        Papa.parse(res.data, {
            header: true,
            complete: (results)=>{
                const xlsxData = results.data
                if(xlsxData[0][config.key]){
                    console.log(chalk.bold.green('读取成功'));
                    console.log('正在生成语言包...');
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
                    fs.writeFileSync(PathConfig.i18nIndex.output,i18nIndexAst.getSourceCode(langs,{
                        ...data,
                        langs,
                    }))
                    // 生成入口文件
                    console.log(chalk.bold.green(`./${dirName}/index.ts   已生成`));
                    if(!data.config){
                        // 类型添加
                        shimsAst.addNamespace(data.defaultNS,relativeApp(resolveCurrentDir(`${dirName}/index`)))
                        console.log(chalk.bold.green(`已在 shims.i18next.d.ts 中添加类型提示`));
                    }
                }else{
                    console.log(chalk.bold.red('读取数据有问题，请校验该地址下载的 csv 文件:'),dataUrl);
                }
            }
        })
    }).catch(error=>{
        console.warn(error);
        console.log(chalk.bold.red('读取失败请确保该地址可正常访问且下载 csv 文件:'),dataUrl);
    })
}
export function createLangFile(data,lang){
    const langXlsxKey = config.xlsxKeyMap[lang]
    if(!data[0][langXlsxKey]){
        console.log(chalk.bold.yellow(`该xlxs缺少 ${langXlsxKey}`));
        return
    }
    let fileData = {}
    data.forEach(v => {
        if(!fileData[v[config.key]]){
            if(v[langXlsxKey]){
                fileData[v[config.key]]=String(v[langXlsxKey])
            }else{
                console.log(chalk.bold.yellow(`${v[config.key]} 缺少 ${langXlsxKey}`));
            }
        }
    });
    fs.writeFileSync(resolveCurrentDir(`${dirName}/${lang}.json`),JSON.stringify(fileData,null,2))
    console.log(chalk.bold.green(`./${dirName}/${lang}.json   生成`));
    return fileData
}