import pkgDir from 'pkg-dir'
import chalk from 'chalk';
import path from 'path'
import fs,{PathOrFileDescriptor} from 'fs'
export const currentDir = process.cwd()
export const appDirectory = pkgDir.sync(process.cwd())
export const cliAppDirectory = pkgDir.sync(__dirname)

export const resolveCurrentDir = (relativePath:string) => path.resolve(currentDir, relativePath)
export const resolveApp = (relativePath:string) => path.resolve(appDirectory, relativePath)
export const relativeApp = (relativePath:string) => `./${path.relative(appDirectory, relativePath)}`
export const resolveCliApp = (relativePath:string) => path.resolve(__dirname, '..', relativePath)


export const shimsName = 'shims.i18next.d.ts'

export const dirName = 'i18n'
export const PathConfig = {
    'shims':{
        'input':resolveCliApp(`./template/${shimsName}`),
        'output':resolveApp(`./${shimsName}`)
    },
    'i18nIndex':{
        'output':resolveCurrentDir(`${dirName}/index.ts`)
    },
    "tsconfig":{
        'input':resolveApp('./tsconfig.json'),
        'output':resolveApp('./tsconfig.json'),
    },
    "xci18nextConfig":{
        'input':resolveApp('./xci18next.json'),
    }
}

export const config = require(PathConfig.xci18nextConfig.input);

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