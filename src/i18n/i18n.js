import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './lang';

/*
*  这个是将elementUI进行国际化
* */
import locale from 'element-ui/lib/locale';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.lang || 'en',
  messages
});

locale.i18n((key, value) => i18n.t(key, value)); //重点：为了实现element插件的多语言切换

export default i18n;
