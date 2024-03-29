import React,{useMemo} from 'react'
import i18next, {InitOptions,i18n} from 'i18next'
import hoistStatics from 'hoist-non-react-statics'
import {
  useTranslation,
  UseTranslationOptions,
  Fallback,
  TFunction,
  I18nextProvider,
  initReactI18next,
  TranslationProps,
  Translation,
  TFuncKey,
  TransProps,
  Trans,
} from 'react-i18next'
import {config,Config} from './config'
import './i18next'
type XcNamespace = Fallback<string>;
export interface LanguageContainerProps{
  useLanguage?:Config['useLanguage'];
  defaultNS:XcNamespace;
  resources:InitOptions['resources'];
  initOptions?:InitOptions
  children:(I18n:i18n)=>any
}

export const LanguageContainer: React.FC<LanguageContainerProps> = ({useLanguage, resources, defaultNS,initOptions,children}) => {
  const [lng, setLng] = (useLanguage||config.useLanguage)()
  const i18n = useMemo(
    () => {
      const I18n = i18next.createInstance().use(initReactI18next)
      I18n.init({
        ...config.initOptions,
        ...initOptions,
        lng,
        defaultNS,
        resources,
      })
      I18n.xcChangeLanguage = setLng
      return I18n
    },
    [lng]
  )

  return <I18nextProvider i18n={i18n}>{children(i18n)}</I18nextProvider>
}

export const LanguageContainerHoc = (data:Omit<LanguageContainerProps,'children'>) => <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  const C = (props: P): JSX.Element => {
    return (
      <LanguageContainer {...data}>
        {(i18n)=><WrapComponent {...props} i18n={i18n}/>}
      </LanguageContainer>
    )
  }
  return hoistStatics(
    C,
    WrapComponent
  )
}
export interface GetResourcesArgument<O, T extends XcNamespace,N,K extends keyof N>{
  typeLang:O
  defaultNS: T
  langs:any
}
export type GetResourcesReturn<O, T extends XcNamespace, N, K extends keyof N> = {
  [key in K]: {
      [namespace in T]:O
  }
}
export function getResources<O,T extends XcNamespace,N, K extends keyof N>(data:GetResourcesArgument<O,T,N,K>):GetResourcesReturn<O,T,N,K>{
  const ret = {}
  Object.keys(data.langs).forEach(v => {
      if (!ret[v]) {
      ret[v] = {}
      }
      ret[v][data.defaultNS] = data.langs[v]
  })
  return ret as any
}

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
  useXcTranslation: {
    (options?: UseTranslationOptions): [UseXcTranslationReturn<T>['t'], UseXcTranslationReturn<T>['i18n'], UseXcTranslationReturn<T>['ready'],UseXcTranslationReturn<T>['getImg']] & UseXcTranslationReturn<T>;
  }
  XcLanguageContainerHoc:{
    (props?:{
      useLanguage?:Config['useLanguage']
      initOptions?:InitOptions
    }):ReturnType<typeof LanguageContainerHoc>
  }
  XcTranslation:{
    (props:Omit<TranslationProps<T>, "ns">):any
  },
  XcTrans:{
    <K extends TFuncKey<T> extends infer A ? A : never>(props:Omit<TransProps<K,T>, "ns">):any
  }
}
export function initXcI18next<T extends XcNamespace>(data:InitXcI18nextArgument<T>): InitXcI18nextReturn<T> {
  const useXcTranslation: InitXcI18nextReturn<T>['useXcTranslation'] = options => {
    const ret:any = useTranslation(data.defaultNS, options)
    const getImg = (getImgs: __WebpackModuleApi.RequireContext)=>{
      let src = getImgs.keys().find(v => {
        return v.indexOf(ret.i18n.language) !== -1
      })
      if(!src){
        src = getImgs.keys().find(v => {
          return v.indexOf(ret.i18n.options.fallbackLng[0]) !== -1
        })
      }
      return src && getImgs(src)
    }
    ret.push(getImg)
    ret.getImg = getImg
    return ret
  }
  const XcLanguageContainerHoc:InitXcI18nextReturn<T>['XcLanguageContainerHoc']=(props)=>{
      const {useLanguage,initOptions=data.initOptions} = props || {}
      return LanguageContainerHoc({
        useLanguage,
        defaultNS:data.defaultNS,
        resources:data.resources,
        initOptions
      })
  }
  const XcTranslation:InitXcI18nextReturn<T>['XcTranslation'] = (props)=><Translation {...props} ns={data.defaultNS}/>
  const XcTrans:InitXcI18nextReturn<T>['XcTrans'] = (props)=> <Trans {...props} ns={data.defaultNS}/> 
  return {
    useXcTranslation,
    XcTranslation,
    XcLanguageContainerHoc,
    XcTrans
  }
}


export default {
  LanguageContainerHoc,
  LanguageContainer,
  config,
  getResources,
  initXcI18next
}