import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAstSync } from "@babel/core";
import generate from "@babel/generator";
import template from "@babel/template";
import * as t from "@babel/types";
import fs from "fs";
import { PathConfig } from "../config";

class i18nIndex {
  constructor() {}
  getSourceCode(langs, data) {
    const importLangs = langs
      .map((v) => {
        return `import ${v} from './${v}.json';`;
      })
      .join("\n");
    const buildRequire = template(
      `
import {getResources, initXcI18next, InitXcI18nextReturn} from '@xc/i18next'

${importLangs}

export const defaultNS = '${data.defaultNS}' as const

${data.configStr}

const langs = {
  ${data.langs.join(",")}
}
export const resources = getResources({
  typeLang: config.typeLang,
  langs,
  defaultNS,
})

export const XcI18next: InitXcI18nextReturn<typeof defaultNS> = initXcI18next({
  defaultNS,
  resources,
})
export default {
  typeLang: config.typeLang,
}
    `,
      {
        sourceType: "module",
        plugins: ["typescript"],
        placeholderPattern: false
      }
    );

    const ast = buildRequire({});
    return generate(t.program(ast)).code;
  }
  parse(filePath) {
    const ast = parse(fs.readFileSync(filePath, "utf-8"), {
      sourceType: "module",
      plugins: ["typescript"],
    });
    let defaultNS = "";
    let configStr = "";
    let langs = [];
    let config = {
      url: "",
      data: "",
    };
    traverse(ast, {
      VariableDeclarator: function (path) {
        if (path.node.id.name === "config") {
          configStr = generate(path.parentPath.node).code;
          path.node.init.properties.forEach((v) => {
            if(Object.keys(config).includes(v.key.name)){
              config[v.key.name] = v.value.value
            }
          });
          path.skip();
        }
        if (path.node.id.name === "langs") {
            langs = path.node.init.properties.map((v) => {
              return v.key.name;
            });
            path.skip();
        }
      },
      TSAsExpression: function (path) {
        defaultNS = path.node.expression.value;
        path.skip();
      },
    });
    return {
      defaultNS,
      configStr,
      config,
      langs,
    };
  }
}

export default new i18nIndex();
