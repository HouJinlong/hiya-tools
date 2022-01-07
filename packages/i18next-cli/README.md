# `i18next-cli`

> 使用用 [google docs](https://docs.google.com/) 规范翻译编辑到代码使用的流程

## 安装

> 安装(node版本>= 12) 我用的是 14.17.6

```
yarn global add @xc/i18next-cli 

xci18n --help  

config: /Users/zuiyou/work/hiya/xci18next.json
Usage: @xc/i18next-cli [options] [command]

Options:
  -v, --version           output the version number
  -h, --help              display help for command

Commands:
  init                    初始化@xc/i18next
  create                  根据配置创建语言包
  update <langFileIndex>  更新指定语言包
  xlsx <source>           根据语言包生成xlsx文件
  help [command]          display help for command
```
> `config` 为cli工具运行所需的配置文档，会一层层目录往上找，只要项目根目录放一份`xci18next.json`就行,必须存在，不存在报错
## 使用

### 1. 项目初始化(执行一次就行)

```
xci18n init
```
1. `package.json` 增加@xc/i18next react-i18next i18next 三个包
2. `shims.i18next.d.ts` 增加声明文件，并修改`tsconfig.json` 引入

### 2. 增加配置文件 `xci18next.json`

项目`package.json`同级增加配置文件`xci18next.json`
```
{
  "key": "不要修改第一行的名字！！！",
  "xlsxKeyMap": {
    "en": "英语",
    "ar": "阿拉伯语",
    "id": "印尼语",
    "th": "泰语",
    "vi": "越南语",
    "tr": "土耳其语",
    "ms": "马来语",
    "hk": "繁体中文",
    "hi": "印地语"
  }
}
```

1. key xlsx文件作为key那列的header
2. xlsx文件语言列header与代码中语言的对应关系

> xlsx例子

| 不要修改第一行的名字！！！        | 英语  |  阿拉伯语 |
| --------   | -----  | ----  |
| 标题     | 标题en |   标题ar     |
| 详情     | 详情en |   详情ar     |

### 3. 准备 google docs

1. 访问 [https://docs.google.com/spreadsheets/u/0/](https://docs.google.com/spreadsheets/u/0//)
2. 新建电子表格
3. 根据配置的`xci18next.json`填充header 
   ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107155046.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107155046.png)
4. 点右上角共享，并更改权限【知道连接任何人(为了方便，也可以做权限控制)为编辑者】复制地址 得到 `谷歌文档的共享地址`
  ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107154745.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107154745.png)
  ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107154839.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107154839.png)
5. 点左上角`文件->共享->发布到网络` 得到 `谷歌文档的发布地址`
   ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107155207.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107155207.png)    
  ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107160756.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107160756.png)
  ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107160825.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107160825.png)
6. 将`谷歌文档的共享地址`交给产品和翻译同学编辑
   ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161232.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161232.png)

### 4. xlsx转语言包


```
config: /Users/zuiyou/work/hiya/xci18next.json
Usage: @xc/i18next-cli create [options]

根据配置创建语言包

Options:
  -h, --help  display help for command
```
> 例如 

```
 xci18n create 
```

![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161329.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161329.png)

1. `shims.i18next.d.ts` 导入声明
2. 生成语言包文件
   ![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161403.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161403.png)
### 5. 语言包转xlsx

```
config: /Users/zuiyou/work/hiya/xci18next.json
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

![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161624.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107161624.png)

### 6. 更新已有语言包

```
config: /Users/zuiyou/work/hiya/xci18next.json
Usage: @xc/i18next-cli update [options] <langFileIndex>

更新指定语言包

Arguments:
  langFileIndex  语言包index.ts的路径

Options:
  -h, --help     display help for command

```
> 例如

```
xci18n update ./i18n/index.ts
```
![https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107162142.png](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2022-01-07/20220107162142.png)