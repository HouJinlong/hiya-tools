import fs from "fs";
import chalk from "chalk";
import Papa from "papaparse";
import axios from "axios";
import xlsx from "xlsx";
import i18nIndexAst from "./ast/i18nIndex";
import shimsAst from "./ast/shims";
import {
  config,
  dirName,
  resolveCurrentDir,
  relativeApp,
  PathConfig,
} from "./config";

interface DataType{
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
export function createLangForUrl(data: {
  dataUrl: string;
  data: DataType;
}) {
  const dataUrl = data.dataUrl.replace("pubhtml", "pub?output=csv");
  axios
    .get(dataUrl)
    .then((res) => {
      Papa.parse(res.data, {
        header: true,
        complete: (results) => {
          if (Object.keys(results.data[0]).includes(config.key)) {
            createLang(results.data, data.data);
          } else {
            console.log(
              chalk.bold.red("读取数据有问题，请校验该地址下载的 csv 文件:"),
              dataUrl
            );
          }
        },
      });
    })
    .catch((error) => {
      console.warn(error);
      console.log(
        chalk.bold.red("读取失败请确保该地址可正常访问且下载 csv 文件:"),
        dataUrl
      );
    });
}

export function createLangForXlsx(data: {
  xlsx: string;
  data: DataType;
}) {
  // 读取
  const file = fs.readFileSync(resolveCurrentDir(data.xlsx));
  console.log(chalk.bold.green("文件读取成功正在生成语言包..."));
  var wb = xlsx.read(file, { type: "buffer" });
  const xlsxData = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  if (Object.keys(xlsxData[0]).includes(config.key)) {
    createLang(xlsxData, data.data);
  } else {
    console.log(
      chalk.bold.red("读取数据有问题，请校验该文件:"),
      data.xlsx
    );
  }
}

export function createLang(
  xlsxData: any,
  data: DataType
) {
  console.log(chalk.bold.green("读取成功"));
  console.log("正在生成语言包...");
  // 生成json
  try {
    fs.accessSync(resolveCurrentDir(dirName));
  } catch (error) {
    fs.mkdirSync(resolveCurrentDir(dirName));
  }
  let langs = [];
  Object.keys(config.xlsxKeyMap).forEach((v) => {
    if (createLangFile(xlsxData, v)) {
      langs.push(v);
    }
  });
  fs.writeFileSync(
    PathConfig.i18nIndex.output,
    i18nIndexAst.getSourceCode(langs, {
      ...data,
      langs,
    })
  );
  // 生成入口文件
  console.log(chalk.bold.green(`./${dirName}/index.ts   已生成`));
  if (!data.config) {
    // 类型添加
    shimsAst.addNamespace(
      data.defaultNS,
      relativeApp(resolveCurrentDir(`${dirName}/index`))
    );
    console.log(chalk.bold.green(`已在 shims.i18next.d.ts 中添加类型提示`));
  }
}
export function createLangFile(data, lang) {
  const langXlsxKey = config.xlsxKeyMap[lang];
  let fileData = {};
  let err = [];
  data.forEach((v) => {
    if (v[config.key] && !fileData[v[config.key]]) {
      let value =v[langXlsxKey] 
      if (value) {
        value = String(value);
        fileData[v[config.key]] = config.placeholder === value ? "" : value;
      } else {
        err.push(v[config.key]);
      }
    }
  });
  if (Object.keys(fileData).length === 0) {
    return false;
  }

  fs.writeFileSync(
    resolveCurrentDir(`${dirName}/${lang}.json`),
    JSON.stringify(fileData, null, 2)
  );
  console.log(chalk.bold.green(`./${dirName}/${lang}.json   生成`));
  if (err.length) {
    console.log(chalk.bold.yellow(`${langXlsxKey}  缺少  ${err}`));
  }
  return true;
}
