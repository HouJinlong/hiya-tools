# `i18next`

ts4.1以上，我用的是 Version 4.4.3

> 基于react-18nnext进行使用包装


[yalc](https://github.com/wclr/yalc) 

[react-18nnext](https://react.i18next.com/)  11.12.0

[i18next](https://www.i18next.com/) 21.3.2

## 使用

### 1. 前置准备

使用 @xc/i18next-cli 初始化并生成语言包


### 2.使用语言包


```
import {XcI18next} from './i18n'
const {useXcTranslation, XcLanguageContainerHoc, XcTranslation} = XcI18next

const Index = props => {
  const {t, i18n,getImg} = useXcTranslation()
  return (
    <div >
      {t('标题')}
      <XcTranslation>
        {(tfn, e) => {
          return <p>{tfn('标题')}</p>
        }}
      </XcTranslation>
      <img
        src={getImg(require.context('./images/banner', false))}
        alt=""
      />
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
// 语言初始化与修改方法的hook
XcI18next.config.useLanguage = useLanguage

// https://www.i18next.com/overview/configuration-options
XcI18next.config.initOptions.debug = true
XcI18next.config.initOptions.fallbackLng = "en"
XcI18next.config.initOptions.interpolation={
  prefix:"${",
  suffix:"}"
}
```
2. `initXcI18next` 
> 对`XcTrans`, `useTranslation` , `XcLanguageContainerHoc`, `Translation`进行包装，固定语言包（命名空间）使得参数非必传，使用更方便

```

export interface InitXcI18nextArgument<T extends XcNamespace>{
  defaultNS: T,
  resources: InitOptions['resources'],
  initOptions?:InitOptions
}
interface UseXcTranslationReturn<T extends XcNamespace>{
  t: TFunction<T>;
  i18n: i18n;
  ready: boolean;
  getImg:(getImgs: __WebpackModuleApi.RequireContext)=>any;
}


export interface InitXcI18nextReturn<T extends XcNamespace>{
  // 包装过的 `useTranslation` 并增加了getImg获取多语言图片的方法
  useXcTranslation: {
    (options?: UseTranslationOptions): [UseXcTranslationReturn<T>['t'], UseXcTranslationReturn<T>['i18n'], UseXcTranslationReturn<T>['ready'],UseXcTranslationReturn<T>['getImg']] & UseXcTranslationReturn<T>;
  }
  // 包装过的 `XcLanguageContainerHoc`
  XcLanguageContainerHoc:{
    (props?:{
      useLanguage?:Config['useLanguage']
      initOptions?:InitOptions
    }):ReturnType<typeof LanguageContainerHoc>
  }
  // 包装过的 `Translation`   
  XcTranslation:{
    (props:Omit<TranslationProps<T>, "ns">):any
  }
  // 包装过的 `XcTrans`   
  XcTrans:{
    <K extends TFuncKey<T> extends infer A ? A : never>(props:Omit<TransProps<K,T>, "ns">):any
  }
}
```

3. `XcLanguageContainerHoc` 
> 通过使用`I18nextProvider` 与`i18next.createInstance`生成在当前基于一个语言包的独立`i18n`,使得每个页面或每个组件都可以独立配置多语言

```
export interface LanguageContainerProps{
  useLanguage?:Config['useLanguage'];
  defaultNS:XcNamespace;
  resources:InitOptions['resources'];
  initOptions?:InitOptions
}
```
