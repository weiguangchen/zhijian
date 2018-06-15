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

import VueHead from 'vue-head'
Vue.use(VueHead)
/* 引入flexible自适应 */
import 'lib-flexible/flexible.js'

import eruda from 'eruda';
Vue.prototype.$eruda = eruda;
/* 点击延迟 */
const FastClick = require('fastclick')
FastClick.attach(document.body)

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
/* vux组件 */
// import { Tabbar, TabbarItem } from 'vux'
// Vue.component('tabbar', Tabbar);
// Vue.component('tabbar-item', TabbarItem);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

