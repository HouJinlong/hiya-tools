
import fs from 'fs'
import { resolveCurrentDir,config } from '../path';
import i18nIndex from '../ast/i18nIndex';
import path from 'path';
import xlsx from 'xlsx'
export default function(source:string){
    const data = i18nIndex.parse(resolveCurrentDir(source))
    let langsData = {}
    const langKey = []
    let baseKey;
    Object.keys(config.xlsxKeyMap).map(v=>{
        langKey.push(config.xlsxKeyMap[v]);
        if(data.langs.includes(v)){
            if(!baseKey){
                baseKey = config.xlsxKeyMap[v]
            }
            langsData[config.xlsxKeyMap[v]] = require(path.join(resolveCurrentDir(source),'../',`/${v}.json`));
        }
    })
    let wbArr=[]
    Object.keys(langsData[baseKey]).forEach(v=>{
        let temp = {
            [config.key]:v
        }
        langKey.forEach(key=>{
            if(langsData[key]){
                temp[key] = langsData[key][v]
            }
        })
        wbArr.push(temp)
    })
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(wbArr,{
        header:[config.key,...langKey]
    })
    xlsx.utils.book_append_sheet(wb, ws, 'SheetJS')
    xlsx.writeFile(wb, data.defaultNS+'.xlsx')
} 