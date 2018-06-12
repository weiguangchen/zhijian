<template>
    <div>
        登录中
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    document.title = "登录中";
    // if (!this.$cookie.get("user")) {
    //   let ua = window.navigator.userAgent.toLowerCase();
    //   if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //     // 跳转到微信授权页面
    //     window.location.href = this.webUrl + "/Wap/User/getOpenid";
    //   }
    // } else {
    //   // 如果有token 但是vuex中没有用户登录信息则做登录操作
    //   this.login();
    // }
    // // 跳转到微信授权页面
    // window.location.href =
    //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9ee7e36e84d8478&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  },
  components: {}
};
</script>

<style lang='scss'>
</style>