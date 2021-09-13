import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAstSync } from "@babel/core";
import * as t from "@babel/types";
import fs from "fs";
import {PathConfig} from '../path'

class ShimsAst {
  filePath = PathConfig.shims.output
  constructor(){

  }
  getSourceCode(){
    const code = fs.readFileSync(this.filePath, "utf-8")
    return  {
      code,
      ast:parse(code, {
        sourceType: "module",
        plugins: ["typescript"],
      })
    };
  }
  addNamespace(name,src){
      const data = this.getSourceCode()
      traverse(data.ast, {
        ObjectExpression: function (path) {
            if(path.parent.id.name==="data"){
                const allNamespace = path.node.properties.map((v) => {
                    return v.key.name;
                });
                path.replaceWith(
                    t.objectExpression([...allNamespace,name].map(v=>{
                        return t.objectProperty(
                          t.identifier(v),
                          t.memberExpression(
                            t.identifier(v),
                            t.identifier("typeLang")
                          )
                        )
                    }))
                )
                path.skip()
            }
        },
        VariableDeclaration:function(path){
            if(path.node.declarations[0].id.name="data"){
                path.insertBefore(
                    t.importDeclaration([t.importDefaultSpecifier(t.identifier(name))], t.stringLiteral(src))
                )
            }
        }
     });
    fs.writeFileSync(this.filePath,transformFromAstSync(data.ast,data.code).code)
  }
  getAllNamespace():string[]{
      let allNamespace=[];
      const data = this.getSourceCode()
      traverse(data.ast, {
        ObjectExpression: function (path) {
            if(path.parent.id.name==="data"){
                allNamespace = path.node.properties.map((v) => {
                    return v.key.name;
                });
                path.skip()
            }
        }
     });
     return allNamespace
  }
}
export default new ShimsAst()