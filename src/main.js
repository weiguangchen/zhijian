import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入vuex仓库 */
import store from './store'
/* axios插件 */
import axios from "axios";
Vue.prototype.$axios = axios;
/* 引入微信jssdk */
import wx from 'weixin-js-sdk';
Vue.prototype.$wx = wx;

import 'vue-ydui/dist/ydui.base.css';
// import 'muse-ui/lib/styles/base.less';
import { Radio,Checkbox } from 'muse-ui';
// import 'muse-ui/lib/styles/theme.less';
Vue.component('mu-radio',Radio);
Vue.component('mu-checkbox',Checkbox);

import 'iview/dist/styles/iview.css';
import { Select , Option,Step,Steps  } from 'iview';
Vue.component('iview-select', Select);
Vue.component('iview-op', Option );
Vue.component('iview-step', Step );
Vue.component('iview-steps', Steps );

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// // or with options
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })

import VueHead from 'vue-head'
Vue.use(VueHead)
/* 引入flexible自适应 */
import 'lib-flexible/flexible.js'
/* 移动端调试插件 */
import eruda from 'eruda';
Vue.prototype.$eruda = eruda;
/* 点击延迟 */
const FastClick = require('fastclick')
FastClick.attach(document.body)
/* vue-cookie */
import VueCookies from 'vue-cookies'
Vue.prototype.$cookies = VueCookies;

/* 引入全局js */
import globaljs from "@/assets/js/global.js";
Vue.use(globaljs);

import  { AlertPlugin,ConfirmPlugin,LoadingPlugin,ToastPlugin  } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
import 'babel-polyfill'


//挂载swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);

/* 虚拟数字键盘 */
// import wcKeyBoard from 'wc-keyboard'
// import 'wc-keyboard/style.css'
// Vue.use(wcKeyBoard);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

