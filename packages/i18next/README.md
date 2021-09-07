# `i18next`

> 基于react-18nnext进行使用峰值

## 使用
1. 安装依赖
```
yarn add @xc/i18next react-i18next i18next  
```
2. 增加ts提示文件（可脚本化，例如@xc/i18next-cli init）

```
// shims.i18next.d.ts

import 'react-i18next'
import 猜宝箱 from './src/pages/404/i18n/index'

const data = {
  ...猜宝箱.resources.en,
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    returnNull: false
    returnEmptyString: false
    resources: typeof data
  }
}
```
3. 添加语言包（可脚本化 @xc/i18next-cli create "猜宝箱"）
   
![](https://cdn.jsdelivr.net/gh/HouJinlong/pic@master/2021-09-07/20210907105630.png)

```
// ar.json
{
    "标题":"标题ar"
}
// en.json
{
    "标题":"标题en"
}
```
```
// index.ts 
/* eslint-disable no-bitwise */
// import React from 'react'
import {initXcI18next, InitXcI18nextReturn} from '@xc/i18next'
import en from './en.json'
import ar from './ar.json'

export const defaultNS = '猜宝箱' as const
export const resources: {
  [key in 'en' | 'ar']: {[key in typeof defaultNS]: typeof en}
} = {
  en: {
    [defaultNS]: en,
  },
  ar: {
    [defaultNS]: ar,
  },
}

export const XcI18next: InitXcI18nextReturn<typeof defaultNS> = initXcI18next({
  defaultNS,
  resources,
})

export default {
  defaultNS,
  resources,
  XcI18next,
}

```
4. 使用从语言包中导入

```
import {XcI18next} from './i18n'
const {useXcTranslation, XcLanguageContainerHoc, XcTranslation} = XcI18next

const Index = props => {
  const {t, i18n} = useXcTranslation()
  return (
    <div >
      {t('标题')}
      <XcTranslation>
        {(tfn, e) => {
          return <p>{tfn('标题')}</p>
        }}
      </XcTranslation>
    </div>
  )
}

export default XcLanguageContainerHoc()(Index)

```

## 参数说明

1. 全局配置

```
import i18next from '@xc/i18next'
const useLanguage = () => {
  const [lang, setLang] = useState('en')
  return [lang, str => setLang(str)]
}
// 语言初始化，与修改方法
i18next.config.useLanguage = useLanguage
// 默认语言
i18next.config.fallbackLng = 'en'
// i18next调试
i18next.config.debug = true
```
2. `initXcI18next` 
> 对`useTranslation` , `XcLanguageContainerHoc`, `Translation`进行包装，使得参数非必传，使用更方便

```
export interface InitXcI18nextArgument<T extends XcNamespace>{
  defaultNS: T,                         // 语言包（命名空间）
  resources: InitOptions['resources'],  // 语言json
  InitOptions?:InitOptions              // i18next.init 参数
}

export interface InitXcI18nextReturn<T extends XcNamespace>{
  // 包装过的 `useTranslation`   
  useXcTranslation: {
    (options?: UseTranslationOptions): UseTranslationResponse<T>
  }
  // 包装过的 `XcLanguageContainerHoc`
  XcLanguageContainerHoc:{
    (props?:{
      useLanguage?:Config['useLanguage']
      InitOptions?:InitOptions
    }):ReturnType<typeof LanguageContainerHoc>
  }
  // 包装过的 `Translation`   
  XcTranslation:{
    (props:Omit<TranslationProps<T>, "ns">):any
  }
}
```


3. `XcLanguageContainerHoc` 
> 通过使用`I18nextProvider` 与`i18next.createInstance`生成在当前基于一个语言包的独立`i18n`,使得每个页面或每个组件都可以独立配置多语言

```
export interface LanguageContainerProps{
  useLanguage?:Config['useLanguage'];   // 可选，不写默认使用全局配置
  defaultNS:any;                        // 使用语言包（命名空间）
  resources:InitOptions['resources'];   // 语言json
  InitOptions?:InitOptions              //  i18next.init 参数
}
```
