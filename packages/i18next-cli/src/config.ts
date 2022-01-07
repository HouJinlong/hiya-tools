import path from 'path'
import findup from "findup-sync";
import chalk from 'chalk';

export const currentDir = process.cwd()
// 当前项目的根目录
export const appDirectory = path.join(findup('package.json'),'../')
// 找到配置文件
const xci18nextConfigPath = findup('xci18next.json')
if(!xci18nextConfigPath){
    throw new Error('未找到xci18next.json配置文件')
}
console.log(chalk.bold.green('config:'),xci18nextConfigPath);
export const config = require(xci18nextConfigPath);
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
    }
}
