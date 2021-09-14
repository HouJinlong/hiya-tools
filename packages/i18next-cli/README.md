# `i18next-cli`

## 安装

> 安装(node版本>= 12) 我用的是 14.17.6

```
yarn global add @xc/i18next-cli 

 xci18n --help  

Usage: @xc/i18next-cli [options] [command]

Options:
  -v, --version                    output the version number
  -h, --help                       display help for command

Commands:
  init                             初始化@xc/i18next
  create <source> <name>           根据数据源创建语言包
  update <source> <langFileIndex>  根据数据源创建语言包
  xlsx <source>                    根据语言包生成xlsx文件
  help [command]                   display help for command
```
## 使用

### 1. 初始化

```
xci18n init
```
1. `package.json` 增加@xc/i18next react-i18next i18next 三个包
2. `shims.i18next.d.ts` 增加声明文件，并修改`tsconfig.json` 引入

### 2. 增加配置文件 `xci18next.json`

项目`package.json`同级增加配置文件`xci18next.json`
```
{
    "key":"key",
    "xlsxKeyMap":{
        "en":"英语",
        "ar":"阿拉伯语",
        "id":"印尼语",
        "th":"泰语",
        "vi":"越南语",
        "tr":"土耳其语",
        "ms":"马来语",
        "hk":"繁体中文"
    }
}
```

1. key xlsx文件作为key那列的header
2. xlsx文件语言列header与代码中语言的对应关系

> xlsx例子

| key        | 英语  |  阿拉伯语 |
| --------   | -----  | ----  |
| 标题     | 标题en |   标题ar     |
| 详情     | 详情en |   详情ar     |

### 3. xlsx转语言包


```
Usage: @xc/i18next-cli create [options] <source> <name>

根据数据源创建语言包

Arguments:
  source      来源(暂时只支持xlsx文件)
  name        语言包的名称,最好全中文

Options:
  -h, --help  display help for command
```
> 例如 
```
xci18n create ./水果机.xlsx  水果机
```
![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-13/20210913211611.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-13/20210913211611.png)

1. `shims.i18next.d.ts` 导入声明
2. 生成语言包文件
   ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-14/20210914101036.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-14/20210914101036.png)


### 3. 语言包转xlsx

```
Usage: @xc/i18next-cli xlsx [options] <source>

根据语言包生成xlsx文件

Arguments:
  source      语言包index.ts的路径

Options:
  -h, --help  display help for command
```

> 例如

```
xci18n xlsx ./i18n/index.ts
```

![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-14/20210914101415.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-14/20210914101415.png)

### 4. xlsx更新已有语言包

```
Usage: @xc/i18next-cli update [options] <source> <langFileIndex>

根据数据源创建语言包

Arguments:
  source         来源(暂时只支持xlsx文件)
  langFileIndex  语言包index.ts的路径

Options:
  -h, --help     display help for command

```

![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-14/20210914101655.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-14/20210914101655.png)