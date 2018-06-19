<template>
  <div>
    登录中
  </div>
</template>

<script>
import router from '@/router/index';
import store from "@/store/index";
import muta from "@/store/mutations";
import axios from "axios";
import VueCookies from "vue-cookie";
import { API_URL } from "@/assets/js/global.js";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {};
  },
  // created() {
  //   document.title = "登录中";
  //   var id = store.state.id;
  //   var userinfo = store.state.userinfo;
  //   var userId = VueCookies.get("user");


  //   if (!userId) {
  //     // 没有cookies
  //     window.location.href =
  //       "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe73b53fb0770a6a3&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  //   } else {
  //     // 有cookies
  //     // 获取用户信息
  //     axios
  //       .get(API_URL + "/api/Show/get_user", {
  //         params: {
  //           id: userId
  //         }
  //       })
  //       .then(res => {
  //         if (res.data[0].is_user == 1) {
  //           // 该用户有效
  //           muta.SAVE_ID(store.state, userId);
  //           muta.SAVE_USERINFO(store.state, res.data[0]);
  //           next();
  //         } else {
  //           // 该用户无效
  //           console.log("无效cookie，删除");
  //           VueCookies.delete("user");
  //           muta.SAVE_ID(store.state, "");
  //           muta.SAVE_USERINFO(store.state, {});
  //           next("/index");
  //         }
  //       })
  //       .then(res => {
  //         // console.log("判断代理商");
  //         // if (/^\/agent/.test(to.fullPath)) {
  //         //   // 进入代理商页
  //         //   if (store.state.userinfo.is_dl == 1) {
  //         //     // 是分销商
  //         //     next("/agent");
  //         //   } else {
  //         //     // 不是代理商
  //         //     if (!store.state.uphone) {
  //         //       // 未验证手机号
  //         //       next("/checkshenfen?checkType=daili");
  //         //     } else {
  //         //       // 已验证手机号
  //         //       next("/index");
  //         //     }
  //         //   }
  //         // }
  //       });
  //   }
  // },
  // beforeRouteEnter (to, from, next) {
  //   if(to.query.id && /^\/logining/.test(to.fullPath)){
  //     console.log('处理url,将id存入cookie')
  //     // url中包含用户id
  //     VueCookies.set('user', to.query.id);
  //     var url = VueCookies.get('enterBeforeUrl');
  //     router.push(url);       
  //     VueCookies.set('enterBeforeUrl','');
  //   }
  // },
  components: {}
};
</script>

<style lang='scss'>
</style>