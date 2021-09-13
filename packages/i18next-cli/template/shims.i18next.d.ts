// 该文件尽量不要人为修改  i18next-cli 会帮助自动引入语言包
import 'react-i18next';
const data = {};
declare module 'react-i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    returnEmptyString: false;
    resources: typeof data;
  }
}