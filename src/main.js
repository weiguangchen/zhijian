import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入vuex仓库 */
import store from './store'
/* axios插件 */
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://zj.daonian.cn';
// axios.defaults.baseURL = 'http://zjdw.liuhetc.cn';
/* 引入微信jssdk */
import wx from 'weixin-js-sdk';
Vue.prototype.$wx = wx;

import 'vue-ydui/dist/ydui.base.css';
// import 'muse-ui/lib/styles/base.less';
import {
  Loading
} from 'vue-ydui/dist/lib.px/dialog';
Vue.prototype.$dialog = {
  loading: Loading,
};


import {
  Radio,
  Checkbox,
  Popover,
  List,
} from 'muse-ui';
// import 'muse-ui/lib/styles/theme.less';
Vue.component('mu-radio', Radio);
Vue.component('mu-checkbox', Checkbox);
Vue.component('mu-popover', Popover)
Vue.component('mu-list', List)
Vue.component('mu-list-item', List.ListItem)


import 'iview/dist/styles/iview.css';
import {
  Select,
  Option,
  Step,
  Steps,
  DatePicker,
  Tag,
  Button
} from 'iview';
Vue.component('iview-select', Select);
Vue.component('iview-op', Option);
Vue.component('iview-step', Step);
Vue.component('iview-steps', Steps);
Vue.component('iview-date', DatePicker);
Vue.component('iview-date', DatePicker);
Vue.component('iview-tag', Tag);
Vue.component('iview-button', Button);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// // or with options
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })

import moment from 'moment';
Vue.prototype.$moment = moment;

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

import {
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  ToastPlugin,
  DatetimePlugin 
} from 'vux'
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
import 'babel-polyfill'


//挂载swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);

import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
