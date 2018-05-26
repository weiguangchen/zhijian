import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入vuex仓库 */
import store from './store'
/* axios插件 */
import axios from "axios";
Vue.prototype.$axios = axios;
/* 引入flexible自适应 */
import 'lib-flexible/flexible.js'
/* 引入 */
// import globaljs from "@/assets/js/base.js";
// Vue.use(globaljs);


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
