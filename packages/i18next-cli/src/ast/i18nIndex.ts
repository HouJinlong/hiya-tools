import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAstSync } from "@babel/core";
import generate from "@babel/generator";
import template from "@babel/template";
import * as t from "@babel/types";
import fs from "fs";
import {PathConfig} from '../path'

class i18nIndex {
  constructor(){

  }
  getSourceCode(langs,name){
    const importLangs = langs.map(v=>{
        return `import ${v} from './${v}.json';`
    }).join('\n')
    const buildRequire = template(`
    import {initXcI18next, InitXcI18nextReturn, getResources} from '@xc/i18next'

    ${importLangs}

    export const defaultNS = '${name}' as const
    const typeLang = en

    const langs = {
        ${langs.join(',')}
    }

    export const resources = getResources({
        typeLang,
        langs,
        defaultNS,
    })

    export const XcI18next: InitXcI18nextReturn<typeof defaultNS> = initXcI18next({
        defaultNS,
        resources,
    })

    export default {
        typeLang
    }
    `,{
        sourceType: "module",
        plugins: ["typescript"],
    });

    const ast = buildRequire({});
    return generate(t.program(ast)).code
  }
  parse(filePath){
    const ast = parse(fs.readFileSync(filePath,'utf-8'), {
        sourceType: "module",
        plugins: ["typescript"],
    })
    let langs =[]
    let defaultNS =""
    traverse(ast, {
        VariableDeclarator: function (path) {
            if(path.node.id.name==="langs"){
                langs = path.node.init.properties.map((v) => {
                    return v.key.name;
                });
                path.skip()
            }
        },
        TSAsExpression:function(path){
            defaultNS=path.node.expression.value;
            path.skip()
        }
     });
     return {
        defaultNS,
        langs
     }
  }
}
export default new i18nIndex()