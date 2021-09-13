
import fs from 'fs'
import {PathConfig,appDirectory,shimsName} from '../path'
import spawn from 'cross-spawn'
import chalk from 'chalk';
export default function (){
    // 安装依赖
    console.log('开始初始化...');
    console.log(appDirectory);
    spawn.sync('yarn', ['add','@xc/i18next','--cwd', appDirectory], { stdio: 'inherit' });
    console.log(chalk.bold.green(`依赖安装成功`));
    // 添加类型文件
    fs.writeFileSync(PathConfig.shims.output,fs.readFileSync(PathConfig.shims.input,'utf-8'))
    console.log(chalk.bold.green(`shims.i18next.d.ts 已生成`));
    // 更新tsconfig.json
    let data = JSON.parse(fs.readFileSync(PathConfig.tsconfig.input,'utf-8'))
    data.include.push(shimsName)
    fs.writeFileSync(PathConfig.tsconfig.output,JSON.stringify(data,null,2))
    console.log(chalk.bold.green(`tsconfig.json 已更新`));
} 