import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


// 插件
import store from '@/store/index';
import muta from '@/store/mutations';
import axios from "axios";
import VueCookies from 'vue-cookie'
import {
  API_URL,
  production_url
} from '@/assets/js/global.js';
import wx from 'weixin-js-sdk';

function getUrl(para) {
  var paraArr = location.search.substring(1).split('&');
  for (var i = 0; i < paraArr.length; i++) {
    if (para == paraArr[i].split('=')[0]) {
      return paraArr[i].split('=')[1];
    }
  }
  return '';
}

function delParam(url, paramKey) {
  var urlParam = url.substr(url.indexOf("?") + 1);
  var beforeUrl = url.substr(0, url.indexOf("?"));
  var nextUrl = "";

  var arr = new Array();
  if (urlParam != "") {
    var urlParamArr = urlParam.split("&");

    for (var i = 0; i < urlParamArr.length; i++) {
      var paramArr = urlParamArr[i].split("=");
      if (paramArr[0] != paramKey) {
        arr.push(urlParamArr[i]);
      }
    }
  }

  if (arr.length > 0) {
    nextUrl = "?" + arr.join("&");
  }
  url = beforeUrl + nextUrl;
  return url;
}

function wxConfig(url) {
  var _this = this;
  console.log('请求jssdk票据')
  console.log(url)
  console.log(encodeURIComponent(url))
  axios
    .get(API_URL + "/api/wechat/sharewx", {
      params: {
        url: encodeURIComponent(url)
      }
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
          "openLocation",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ] // 必填，需要使用的JS接口列表
      });
    });

  // wx.ready(function () {

  //   wx.checkJsApi({
  //     jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'getLocalImgData', 'getLocation', 'openLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //     success: function (res) {
  //       // 以键值对的形式返回，可用的api值true，不可用为false
  //       // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
  //       console.log('检测微信jssdk是否可用')
  //       console.log(res);
  //     }
  //   });

  // })

}

function getPosition() {
  return new Promise((resolve, reject) => {
    var geolocation = new qq.maps.Geolocation('62KBZ-2WXKQ-5GI53-GDT33-LKMPV-34FWO', 'mykey');
    geolocation.getLocation(resolve);
  })

}
// 默认路由
import defaultRouterMaps from './routerMap/defaultRouterMap.js';
// 商户路由
import adminRouterMaps from './routerMap/adminRouterMap.js';
// 服务员路由
import servicerRouterMaps from './routerMap/servicerRouterMap.js'
// 代理商路由
import agentRouterMaps from './routerMap/agentRouterMap.js'



const router = new Router({
  linkActiveClass: 'active-router',
  mode: 'history',
  routes: defaultRouterMaps
})

// 进入每个url时判断是否登录
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  muta.SET_ISLOADING(store.state, true);
  var id = store.state.id;
  var userinfo = store.state.userinfo;


  // 判断设备授权jssdk
  if (window.__wxjs_is_wkwebview) {
    // ios微信
    if (store.state.entryUrl == '') {
      var url = window.location.href.split('#')[0];
      muta.SET_ENTRYURL(store.state, url);
    }
    wxConfig(store.state.entryUrl);
  } else {
    // 安卓微信    
    var url = production_url + to.fullPath;
    wxConfig(url);
  }

  // 授权登录回调
  if (to.query.id && /^\/logining/.test(to.fullPath)) {
    VueCookies.set('user', to.query.id);
    var url = VueCookies.get('enterBeforeUrl');
    console.log('进入地址:' + url)
    router.replace({
      path: url
    })
  }




  var userId = VueCookies.get("user");
  if (!userId) {
    // 没有cookies
    // // 进入后台判断是商户还是服务员   0商户1服务员
    VueCookies.set('enterBeforeUrl', to.fullPath);
    console.log(window.location.href)
    var windowUrl = window.location.href;
    var state;
    if (/http:\/\/qd.daonian.cn/.test(windowUrl)) {
      // 线上
      state = 0;
    } else {
      // 线下
      state = 1;
    }

    // state=1是线下环境state=0线上环境
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe73b53fb0770a6a3&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state=" + state + "#wechat_redirect";
  } else {
    // 有cookies
    // 获取用户信息

    axios.get('/Api/Show/get_user', {
      params: {
        id: userId
      }
    }).then(res => {
      console.log('获取信息')
      console.log(res)
      if (res.data[0].is_user == 1) {
        console.log('用户有效')
        // 该用户有效
        muta.SAVE_ID(store.state, userId);
        muta.SAVE_USERINFO(store.state, res.data[0]);
        // next();
        // 创建路由树
        if (!store.state.routerStatus) {
          if (store.state.userinfo.shenfen == 0) {
            console.log('是最高权限');
            router.addRoutes(adminRouterMaps);
          }
          if (store.state.userinfo.is_dl == 1) {
            console.log('是代理商');
            router.addRoutes(agentRouterMaps);
          }
          if (store.state.userinfo.shenfen == 1) {
            console.log('是服务员');
            router.addRoutes(servicerRouterMaps);
          }
          muta.SET_ROUTER_STATUS(store.state, true);

        }


        if (/^\/agent/.test(to.fullPath)) {
          console.log('判断代理商')
          console.log('1')
          // 进入代理商页
          if (store.state.userinfo.is_dl == 1) {
            console.log('2')
            // 是代理商           
            next()
          } else {
            // 不是代理商
            console.log('3')
            next('/checkshenfen');


          }
        } else if (/^\/shanghu/.test(to.fullPath)) {
          console.log('判断商户')
          console.log('1')
          // 进入商户页

          if (store.state.userinfo.is_shop == 1) {
            console.log('2')
            next()

          } else {
            next('/checkShanghu');

          }
        } else if (/^\/fuwuyuan/.test(to.fullPath)) {
          // 是服务员
          if (store.state.userinfo.is_fuwuyuan == 1) {
            // 服务员
            next()
          } else {
            // 不是商户
            next('/checkServicer');
          }
        }
      } else {
        // 该用户无效
        console.log('无效cookie，删除')
        VueCookies.delete('user');
        muta.SAVE_ID(store.state, '');
        muta.SAVE_USERINFO(store.state, {});
        next('/index');
      }

    })
  }



  // 获取定位
  console.log('store.location')
  console.log(store.state.location)
  if (!store.state.location) {
    getPosition().then(res => {
      console.log('获取到定位')
      console.log(res)
      muta.SET_LOCATION(store.state, res)
      console.log(111)
      console.log(store.state.location)
      next();
    })
  } else {
    next();
  }

  next();


})


router.afterEach(route => {
  /* 隐藏加载中动画 */
  muta.SET_ISLOADING(store.state, false);
});

export default router;
