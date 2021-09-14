# `i18next-cli`

## 安装

> 安装(node版本>= 12) 我用的是 14.17.6

```
yarn global add @xc/i18next-cli 

xci18n -v
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