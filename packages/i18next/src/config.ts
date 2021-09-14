import {useState} from 'react'
import {InitOptions} from 'i18next'
export interface Config {
    useLanguage:()=>[string,(lang:string)=>void]
    initOptions:InitOptions
}
const fallbackLng = 'en'
const useLanguage: Config['useLanguage'] = () => {
    const [lang, setLang] = useState(fallbackLng)
    return [lang, (str: string) => setLang(str)]
}
export const config:Config = {
    useLanguage,
    initOptions:{
        fallbackLng,
        debug:false
    }
}