import {useState} from 'react'
import {InitOptions} from 'i18next'
export interface Config{
    fallbackLng:InitOptions['fallbackLng'],
    useLanguage:()=>[string,(lang:string)=>void]
    debug:InitOptions['debug']
}
const fallbackLng = 'en'
const useLanguage: Config['useLanguage'] = () => {
    const [lang, setLang] = useState(fallbackLng)
    return [lang, (str: string) => setLang(str)]
}
export const config:Config = {
    fallbackLng,
    useLanguage,
    debug:false
}