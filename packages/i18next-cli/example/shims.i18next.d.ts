// 该文件尽量不要人为修改  i18next-cli 会帮助自动引入语言包
import 'react-i18next';
import 测试 from "./i18n/index";
import test1 from "./i18n/index";
const data = {
  测试: 测试.typeLang,
  test1: test1.typeLang
};
declare module 'react-i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    returnEmptyString: false;
    resources: typeof data;
  }
}