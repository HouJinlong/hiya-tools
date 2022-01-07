import chalk from 'chalk';
import fs from 'fs';
import { json } from 'stream/consumers';
import { config } from '../config';
import {createLang} from '../utils'
import shimsAst from '../ast/shims';
import inquirer from 'inquirer';
export default function (){
    const AllNamespac = shimsAst.getAllNamespace()
    const questions = [
    {
        type: 'input',
        name: 'name',
        message: "唯一的语言包名称",
        validate(value) {
            if(AllNamespac.includes(value)){
                return `${value} 已存在请换一个名称`;
            }else{
                if(value){
                    return true
                }else{
                    return `不能为空`
                }
            }
        },
    },
    {
        type: 'input',
        name: 'url',
        message: "谷歌文档的共享地址",
        validate(value) {
            if(value){
                return true
            }else{
                return `不能为空`
            }
        },
    },
    {
        type: 'input',
        name: 'data',
        message: "谷歌文档的发布地址",
        validate(value) {
            if(value){
                return true
            }else{
                return `不能为空`
            }
        },
    },
    {
        type: 'list',
        name: 'fallbackLng',
        message: '请选择默认语言?',
        choices: Object.keys(config.xlsxKeyMap),
      },
   ];
    
    inquirer.prompt(questions).then((answers) => {
        console.log('正在读取数据...');
        createLang({
            dataUrl:answers.data,
            data:{
                defaultNS:answers.name,
                configStr:`
                const config = {
                    url: '${answers.url}',
                    data: '${answers.data}',
                    typeLang:${answers.fallbackLng},
                    initOptions: {
                      fallbackLng: '${answers.fallbackLng}',
                    },
                  }
                `,

            }
        })
    });
} 
