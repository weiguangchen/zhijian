export const API_URL = 'http://zj.daonian.cn';
export const default_url = 'http://qd.daonian.cn';
const $toDetail = function (id) {
  var _this = this;
  this.$router.push({
    path: "/serviceDetail/" + id,
  });
}

const wxConfig = function () {
  var _this = this;
  this.$axios
    .get(_this.API_URL + "/api/wechat/sharewx", {
      params: {
        url: _this.ios_wx_url
      }
    })
    .then(res => {
      console.log('请求jssdk票据')
      console.log(res);
      return res.data;
    })
    .then(res => {
      this.$wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wxe73b53fb0770a6a3", // 必填，公众号的唯一标识
        timestamp: res.time, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          "chooseImage",
          "previewImage",
          "uploadImage",
          "getLocalImgData",
          "getLocation",
          "openLocation"
        ] // 必填，需要使用的JS接口列表
      });
    });
}

export function setMetaTitle(title) {
  document.title = title
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', 'static/img/blank.png')
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}


export default {
  install(Vue) {
    Vue.prototype.API_URL = API_URL;
    Vue.prototype.$toDetail = $toDetail;
    Vue.prototype.wxConfig = wxConfig;
    Vue.prototype.setMetaTitle = setMetaTitle;
  }
};
