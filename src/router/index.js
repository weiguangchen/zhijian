/*
 * @Author: 魏广辰 
 * @Date: 2018-05-28 10:14:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-08 16:39:22
 */
import Vue from 'vue'
import Router from 'vue-router'
import tab from '@/components/tab/tab';
import tab2 from '@/components/tab/shangHuTab';
import index from '@/pages/index/index'
import shangcheng from '@/pages/shangcheng/index';
import shangpu from '@/pages/shangpu/index'
import serviceClass from '@/pages/serviceClass/index';
import serviceList from '@/pages/serviceList/index';
import serviceDetail from "@/pages/serviceDetail/index";
import queren from '@/pages/queren/index';
import me from '@/pages/me/index';
import orderList from '@/pages/orderList/index';
import orderDetail from '@/pages/orderList/orderDetail';
import pingjia from '@/pages/pingjia/index';
import agent from '@/pages/agent/index';
import pinglun from '@/pages/pinglun/index';
import shopCar from '@/pages/shopCar/index';

import applyShanghu from '@/pages/shanghuApply/index';

import shanghu from '@/pages/shanghu/index'
import yanzheng from '@/pages/shanghu/yanzheng/index'
import xfm from '@/pages/shanghu/yanzheng/xfm'
import huodongyz from '@/pages/shanghu/yanzheng/huodong'
import pingjias from '@/pages/shanghu/pingjias/index'
import pingjiaList from '@/pages/shanghu/pingjias/pingjiaList'
import jingying from '@/pages/shanghu/jingying/index'
import tongji from '@/pages/shanghu/jingying/tongji'
import orderGl from '@/pages/shanghu/jingying/orderlist'
import shanghume from '@/pages/shanghu/me/index'
import mendian from '@/pages/shanghu/me/mendian'
import addFace from '@/pages/shanghu/me/addFace'
import xmgl from '@/pages/shanghu/me/xmgl'
import fwList from '@/pages/shanghu/me/fwList'
import shangjia from '@/pages/shanghu/shangjia/index';
import huifupinglun from '@/components/huifupinglun/index';
import logining from '@/pages/logining/index';
Vue.use(Router)
import store from '@/store/index';
import muta from '@/store/mutations';
import axios from "axios";
import VueCookies from 'vue-cookie'
import {
  API_URL
} from '@/assets/js/global.js';
const router = new Router({
  linkActiveClass: 'active-router',
  mode:'history',
  routes: [{
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      // beforeEnter: (to, from, next) => {
      //   // if (to.path == '/index') {
      //   //   next();
      //   // }
      //   if (getUrl('id')) {
      //     VueCookies.set('user', getUrl('id'));
      //     var url = delParam(window.location.href, 'id');
      //     window.location.href = url;
      //   }
      //   next();
      // },
      components: {
        default: index,
        tab: tab
      }
    }, {
      path: '/shop',
      name: 'shangcheng',
      components: {
        default: shangcheng,
        tab: tab
      },
    }, {
      path: '/shangpu/:shangpuId',
      name: 'shangpu',
      components: {
        default: shangpu,
        tab: tab
      }
    }, {
      path: '/serviceClass/:classId',
      name: 'serviceClass',
      components: {
        default: serviceClass,
        tab: tab
      }
    }, {
      path: '/serviceList/:classId',
      name: 'serviceList',
      components: {
        default: serviceList,
        tab: tab
      }
    }, {
      path: '/me',
      name: 'me',
      components: {
        default: me,
        tab: tab
      }
    }, {
      path: '/me/orderList/:orderStatus',
      name: 'orderList',
      components: {
        default: orderList,
        tab: tab
      }
    }, {
      path: '/me/orderDetail/:orderNum',
      name: 'orderList',
      components: {
        default: orderDetail,
        // tab: tab
      }
    }, {
      path: '/queren',
      name: 'queren',
      components: {
        default: queren,
      }
    }, {
      path: '/me/pingjia/:orderNum',
      name: 'pingjia',
      components: {
        default: pingjia,
      }
    }, {
      path: '/agent',
      name: 'agent',
      components: {
        default: agent,
        tab: tab
      }
    }, {
      path: '/serviceDetail/:serviceId',
      name: 'serviceDetail',
      component: serviceDetail
    }, {
      path: '/pinglun/:serviceId',
      name: 'pinglun',
      component: pinglun
    }, {
      path: '/shangjia',
      name: 'shangjia',
      component: shangjia
    }, {
      path: '/applyShanghu',
      name: 'applyShanghu',
      components: {
        default: applyShanghu,
        tab: tab
      }
    }, {
      path: '/shopCar',
      name: 'shopCar',
      components: {
        default: shopCar,
        // tab: tab
      }
    },
    {
      path: '/shanghu',
      component: shanghu,
      children: [{
          path: 'yanzheng',
          component: yanzheng,
          children: [{
            path: 'xfm',
            component: xfm
          }, {
            path: 'huodong',
            component: huodongyz
          }]
        },
        // {
        //   path: 'huodong',
        //   component: huodongyz
        // },
        {
          path: 'pingjias',
          component: pingjias
        },
        {
          path: 'pingjiaList/:pingjiaId',
          component: pingjiaList
        },
        {
          path: 'jingying',
          component: jingying
        },
        {
          path: 'jingying/tongji',
          component: tongji
        },
        {
          path: 'jingying/orderGl',
          component: orderGl
        },
        {
          path: 'me',
          component: shanghume
        },
        {
          path: 'me/xmgl',
          component: xmgl
        },
        {
          path: 'me/fwList',
          component: fwList
        },
        {
          path: 'me/mendian',
          component: mendian
        },
        {
          path: 'me/addFace',
          component: addFace
        },
      ]
    },
    {
      path: '/huifupinglun',
      name: 'huifupinglun',
      component: huifupinglun
    },
    {
      path: '/logining',
      name: 'logining',
      component: logining,
    }
  ]
})



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

// 进入每个url时判断是否登录
router.beforeEach((to, from, next) => {
  var id = store.state.id;
  var userId = VueCookies.get("user");
  console.log('to:')
  console.log(to)
  if (to.query.id && /^\/logining/.test(to.fullPath)) {
    VueCookies.set('user', to.query.id);
    // window.location.href = '192.169.31.75:8081';
    window.location.href = 'http://qd.daonian.cn/';
  }

  if (!userId) {
    // 没有cookies
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe73b53fb0770a6a3&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  } else {
    // 有cookies
    axios.get(API_URL + '/api/Show/get_user', {
      params: {
        id: userId
      }
    }).then(res => {
      console.log(res);
      console.log(muta)
      if (res.data[0].is_user == 1) {
        // 该用户有效
        muta.SAVE_ID(store.state, userId);
        muta.SAVE_USERINFO(store.state, res.data[0]);
        next();

      } else {
        // 该用户无效
        console.log('无效cookie，删除他')
        VueCookies.delete('user');
        muta.SAVE_ID(store.state, '');
        muta.SAVE_USERINFO(store.state, {});
        next('/index');
      }
    });
  }




  // 进入后台验证
  // if (/^\/shanghu/.test(to.fullPath)) {
  //   // 判断是否是商户
  //   if (store.state.userinfo.shop_status != 1) {
  //     console.log('不是商户')
  //     next({
  //       path: '/'
  //     });
  //   } else {
  //     console.log('是商户')
  //     next();
  //   }
  // }


  // if (userId) {
  //   console.log("存在cookie");
  //   // if (!id) {
  //   //   console.log('未登录')
  //   // 每次进入页面重新拉取一下用户信息
  //   axios.get(API_URL + '/api/Show/get_user', {
  //     params: {
  //       id: userId
  //     }
  //   }).then(res => {
  //     console.log(res);
  //     console.log(muta)
  //     if (res.data[0].is_user == 1) {
  //       muta.SAVE_ID(store.state, userId);
  //       muta.SAVE_USERINFO(store.state, res.data[0]);
  //       next();

  //     } else {
  //       VueCookies.delete('user');
  //       muta.SAVE_ID(store.state, '');
  //       muta.SAVE_USERINFO(store.state, {});
  //       next('/me');
  //     }


  //   });
  //   // } else {
  //   //   next();
  //   // }
  // } else {
  //   console.log("不存在cookie");

  //   next();

  // }

})

export default router;
