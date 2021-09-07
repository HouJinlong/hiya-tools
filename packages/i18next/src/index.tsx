import React,{useMemo} from 'react'
import i18next, {InitOptions} from 'i18next'
import {
  useTranslation,
  UseTranslationOptions,
  Namespace,
  DefaultNamespace,
  Fallback,
  UseTranslationResponse,
  I18nextProvider,
  initReactI18next,
  TranslationProps,
  Translation,
} from 'react-i18next'
import {config,Config} from './config'
import './i18next'
type XcNamespace = Fallback<string>;
export interface LanguageContainerProps{
  useLanguage?:Config['useLanguage'];
  defaultNS:XcNamespace;
  resources:InitOptions['resources'];
  InitOptions?:InitOptions
}

export const LanguageContainer: React.FC<LanguageContainerProps> = ({useLanguage, resources, defaultNS,InitOptions, ...other}) => {
  const [lng, setLng] = (useLanguage||config.useLanguage)()
  const i18n = useMemo(
    () => {
      const I18n = i18next.createInstance().use(initReactI18next)
      I18n.init({
        fallbackLng: config.fallbackLng,
        lng,
        defaultNS,
        resources,
        debug: config.debug,
        ...InitOptions,
      })
      I18n.xcChangeLanguage = setLng
      return I18n
    },
    [lng]
  )

  return <I18nextProvider i18n={i18n}>{other.children}</I18nextProvider>
}

export const LanguageContainerHoc = (data:LanguageContainerProps) => <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return (props: P): JSX.Element => {
    return (
      <LanguageContainer {...data}>
        <WrapComponent {...props} />
      </LanguageContainer>
    )
  }
}
// export interface GetResourcesArgument<
//   N,
//   K extends keyof N,
//   T extends XcNamespace
// > {
//   defaultNS: T
//   langs: N
// }
// type GetResourcesReturn<N, K extends keyof N, T extends XcNamespace> = {
//   [key in K]: {[namespace in T]: N[Extract<K, WW>]}
// }
// export function getResources<N, T extends XcNamespace, K extends keyof N>(
//   data: GetResourcesArgument<N, K, T>
// ): GetResourcesReturn<N, K, T> {
//   const ret = {}
//   Object.keys(data.langs).forEach(v => {
//     if (!ret[v]) {
//       ret[v] = {}
//     }
//     ret[v][data.defaultNS] = data.langs[v]
//   })
//   return ret as any
// }
export interface InitXcI18nextArgument<T extends XcNamespace>{
  defaultNS: T,
  resources: InitOptions['resources'],
  InitOptions?:InitOptions
}
export interface InitXcI18nextReturn<T extends XcNamespace>{
  useXcTranslation: {
    (options?: UseTranslationOptions): UseTranslationResponse<T>
  }
  XcLanguageContainerHoc:{
    (props?:{
      useLanguage?:Config['useLanguage']
      InitOptions?:InitOptions
    }):ReturnType<typeof LanguageContainerHoc>
  }
  XcTranslation:{
    (props:Omit<TranslationProps<T>, "ns">):any
  }
}
export function initXcI18next<T extends XcNamespace>(data:InitXcI18nextArgument<T>): InitXcI18nextReturn<T> {
  const useXcTranslation: InitXcI18nextReturn<T>['useXcTranslation'] = options => {
    return useTranslation(data.defaultNS, options)
  }
  const XcLanguageContainerHoc:InitXcI18nextReturn<T>['XcLanguageContainerHoc']=(props)=>{
      const {useLanguage,InitOptions=data.InitOptions} = props || {}
      return LanguageContainerHoc({
        useLanguage,
        defaultNS:data.defaultNS,
        resources:data.resources,
        InitOptions
      })
  }
  const XcTranslation:InitXcI18nextReturn<T>['XcTranslation'] = (props)=><Translation {...props} ns={data.defaultNS}/>
  return {
    useXcTranslation,
    XcTranslation,
    XcLanguageContainerHoc,
  }
}


export default {
  LanguageContainerHoc,
  LanguageContainer,
  config,
  // getResources,
  initXcI18next
}