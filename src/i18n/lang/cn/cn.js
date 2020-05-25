import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import login from './login.json'
const cn = {
  message: {
    'hello': '你好，世界',
  },
  login,
  ...zhLocale
};

console.log(cn);
export default cn
