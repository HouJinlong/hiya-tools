import { getResources, initXcI18next, InitXcI18nextReturn } from '@xc/i18next';
import en from './en.json';
import ar from './ar.json';
import id from './id.json';
import th from './th.json';
import vi from './vi.json';
export const defaultNS = ('test1' as const);
const config = {
  url: '2',
  data: '3',
  typeLang: en,
  initOptions: {
    fallbackLng: 'en'
  }
};
const langs = {
  en,
  ar,
  id,
  th,
  vi
};
export const resources = getResources({
  typeLang: config.typeLang,
  langs,
  defaultNS
});
export const XcI18next: InitXcI18nextReturn<typeof defaultNS> = initXcI18next({
  defaultNS,
  resources,
  initOptions: config.initOptions
});
export default {
  typeLang: config.typeLang
};