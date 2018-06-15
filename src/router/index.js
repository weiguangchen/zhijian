/*
 * @Author: 魏广辰 
 * @Date: 2018-05-28 10:14:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-15 15:42:07
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 前台
import tab from '@/components/tab/tab';
import tab2 from '@/components/tab/shangHuTab';
import index from '@/pages/index/index'
import shangcheng from '@/pages/shangcheng/index';
import shangpu from '@/pages/shangpu/index'
import serviceClass from '@/pages/serviceClass/index';
import serviceList from '@/pages/serviceList/index';
import serviceDetail from "@/pages/serviceDetail/index";
import huodongDetail from "@/pages/serviceDetail/huodong";
import queren from '@/pages/queren/index';
import me from '@/pages/me/index';
import youhuijuan from '@/pages/youhuijuan/index';
import orderList from '@/pages/orderList/index';
import orderDetail from '@/pages/orderList/orderDetail';
import pingjia from '@/pages/pingjia/index';
import agent from '@/pages/agent/index';
import pinglun from '@/pages/pinglun/index';
import shopCar from '@/pages/shopCar/index';

import applyShanghu from '@/pages/shanghuApply/index';
import checkshenfen from '@/pages/checkshenfen/index'
import checkwarning from '@/pages/checkshenfen/warning'
// 商户后台
import shanghu from '@/pages/shanghu/index'
import yanzheng from '@/pages/shanghu/yanzheng/index'
import xfm from '@/pages/shanghu/yanzheng/xfm'
import huodongyz from '@/pages/shanghu/yanzheng/huodong'
import pingjias from '@/pages/shanghu/pingjias/index'
import pingjiaList from '@/pages/shanghu/pingjias/pingjiaList'
import jingying from '@/pages/shanghu/jingying/index'
import tongji from '@/pages/shanghu/jingying/tongji'
import orderGl from '@/pages/shanghu/jingying/orderlist'
// 商户后台/我的
import shanghume from '@/pages/shanghu/me/index1'
import shanghumeindex from '@/pages/shanghu/me/index'
import mendian from '@/pages/shanghu/me/mendian'
import addFace from '@/pages/shanghu/me/addFace'
import xmgl from '@/pages/shanghu/me/xmgl'
import bianjiFw from '@/pages/shanghu/me/bianjiFw'
import fwList from '@/pages/shanghu/me/fwList'
import addhuodong from '@/pages/shanghu/me/addhuodong'


import shangjia from '@/pages/shanghu/shangjia/index';
import huifupinglun from '@/components/huifupinglun/index';
import logining from '@/pages/logining/index';

// 插件
import store from '@/store/index';
import muta from '@/store/mutations';
import axios from "axios";
import VueCookies from 'vue-cookie'
import {
  API_URL
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
  axios
    .get(API_URL + "/api/wechat/sharewx", {
      params: {
        url
      }
    })
    .then(res => {
      console.log('请求jssdk票据')
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
          "openLocation"
        ] // 必填，需要使用的JS接口列表
      });
    });
}



export const defaultRouterMaps = [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
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
    path: '/faxian',
    name: 'faxian',
    components: {
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
    path: '/youhuijuan',
    name: 'youhuijuan',
    components: {
      default: youhuijuan,
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
      // tab: tab
    }
  }, {
    path: '/serviceDetail/:serviceId',
    name: 'serviceDetail',
    component: serviceDetail
  }, {
    path: '/huodongDetail/:huodongId',
    name: 'huodongDetail',
    component: huodongDetail
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
    path: '/huifupinglun',
    name: 'huifupinglun',
    component: huifupinglun
  },
  {
    path: '/logining',
    name: 'logining',
    component: logining,
  },
  {
    path: '/checkshenfen',
    name: 'checkshenfen',
    component: checkshenfen,
    children:[{
      path:'warning',
      name:'checkwarning',
      component:checkwarning
    }]
  },
  {
    path: '/shanghu',
    component: shanghu,
    name: 'shanghu',
    // meta: {
    //   role: ['shanghu']
    // },
    children: [{
        path: 'yanzheng',
        component: yanzheng,
        name: 'yanzheng',
        // meta: {
        //   role: ['shanghu']
        // },
        children: [{
          path: 'xfm',
          name: 'yanzhengxfm',
          component: xfm,
          meta: {
            role: ['shanghu']
          },
        }, {
          path: 'huodong',
          name: 'yanzhenghuodong',
          component: huodongyz,
          meta: {
            role: ['shanghu']
          },
        }]
      },
      {
        path: 'pingjias',
        name: 'pingjias',
        component: pingjias,
        // meta: {
        //   role: ['shanghu']
        // },
      },
      {
        path: 'pingjiaList/:pingjiaId',
        name: 'pingjiaList',
        component: pingjiaList,
        // meta: {
        //   role: ['shanghu']
        // },
      },
      {
        path: 'jingying',
        name: 'jingying',
        component: jingying,
        // meta: {
        //   role: ['shanghu']
        // },
      },
      {
        path: 'jingying/tongji',
        name: 'tongji',
        component: tongji,
        // meta: {
        //   role: ['shanghu']
        // }
      },
      {
        path: 'jingying/orderGl',
        name: 'orderGl',
        component: orderGl,
        // meta: {
        //   role: ['shanghu']
        // }
      },
      {
        path: 'me',
        name: 'shanghume',
        component: shanghume,
        // meta: {
        //   role: ['shanghu']
        // },
        children: [{
          path: 'index',
          name: 'shanghumeindex',
          component: shanghumeindex,
          // meta: {
          //   role: ['shanghu']
          // }
        }, {
          path: 'xmgl',
          name: 'shanghumexmgl',
          component: xmgl,
          // meta: {
          //   role: ['shanghu']
          // }
        }, {
          path: 'bianjiFw/:fwId',
          name: 'bianjiFw',
          component: bianjiFw,
          // meta: {
          //   role: ['shanghu']
          // }
        }, {
          path: 'fwList',
          name: 'shanghumefwlist',
          component: fwList,
          // meta: {
          //   role: ['shanghu']
          // }
        }, {
          path: 'mendian',
          name: 'shanghumemendian',
          component: mendian,
          // meta: {
          //   role: ['shanghu']
          // }
        }, {
          path: 'addhuodong',
          name: 'shanghumeaddhuodong',
          component: addhuodong,
          // meta: {
          //   role: ['shanghu']
          // }
        }, {
          path: 'addFace',
          name: 'shanghumeaddface',
          component: addFace,
          // meta: {
          //   role: ['shanghu']
          // }
        }],

      }
    ]
  }
]

export const asyncRouterMaps = [{
  path: '/shanghu',
  component: shanghu,
  meta: {
    role: ['shanghu']
  },
  children: [{
      path: 'yanzheng',
      component: yanzheng,
      meta: {
        role: ['shanghu']
      },
      children: [{
        path: 'xfm',
        component: xfm,
        meta: {
          role: ['shanghu']
        },
      }, {
        path: 'huodong',
        component: huodongyz,
        meta: {
          role: ['shanghu']
        },
      }]
    },
    {
      path: 'pingjias',
      component: pingjias,
      meta: {
        role: ['shanghu']
      },
    },
    {
      path: 'pingjiaList/:pingjiaId',
      component: pingjiaList,
      meta: {
        role: ['shanghu']
      },
    },
    {
      path: 'jingying',
      component: jingying,
      meta: {
        role: ['shanghu']
      },
    },
    {
      path: 'jingying/tongji',
      component: tongji,
      meta: {
        role: ['shanghu']
      }
    },
    {
      path: 'jingying/orderGl',
      component: orderGl,
      meta: {
        role: ['shanghu']
      }
    },
    {
      path: 'me',
      component: shanghume,
      meta: {
        role: ['shanghu']
      }
    },
    {
      path: 'me/xmgl',
      component: xmgl,
      meta: {
        role: ['shanghu']
      }
    },
    {
      path: 'me/fwList',
      component: fwList,
      meta: {
        role: ['shanghu']
      }
    },
    {
      path: 'me/mendian',
      component: mendian,
      meta: {
        role: ['shanghu']
      }
    },
    {
      path: 'me/addFace',
      component: addFace,
      meta: {
        role: ['shanghu']
      }
    },
  ]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]


const router = new Router({
  linkActiveClass: 'active-router',
  mode: 'history',
  routes: defaultRouterMaps
})

// 进入每个url时判断是否登录
router.beforeEach((to, from, next) => {

  var id = store.state.id;
  var userinfo = store.state.userinfo;
  var userId = VueCookies.get("user");
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
    var url = window.location.href;
    wxConfig(url);
  }

  // 授权登录回调
  if (to.query.id && /^\/logining/.test(to.fullPath)) {
    VueCookies.set('user', to.query.id);
    // window.location.href = 'http://192.168.31.75:8081/';
    window.location.href = VueCookies.get('enter_url');
    // window.location.href = 'http://qd.daonian.cn';
  }


  // if (!/^\/shanghu/.test(to.fullPath)) {
  if (!userId) {
    VueCookies.set('enter_url', window.location.href);
    // 没有cookies
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe73b53fb0770a6a3&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  } else {
    // 有cookies
    // 获取用户信息
    axios.get(API_URL + '/api/Show/get_user', {
      params: {
        id: userId
      }
    }).then(res => {
      if (res.data[0].is_user == 1) {
        // 该用户有效
        muta.SAVE_ID(store.state, userId);
        muta.SAVE_USERINFO(store.state, res.data[0]);
        next();

      } else {
        // 该用户无效
        console.log('无效cookie，删除')
        VueCookies.delete('user');
        muta.SAVE_ID(store.state, '');
        muta.SAVE_USERINFO(store.state, {});
        next('/index');
      }
    }).then(res => {
      if (/^\/agent/.test(to.fullPath)) {
        // 进入代理商页
        if (store.state.userinfo.is_dl == 1) {
          // 是分销商
          next('/agent')
        } else {
          // 不是代理商
          if (!store.state.uphone) {
            // 未验证手机号
            next('/checkshenfen?checkType=daili');
          } else {
            // 已验证手机号
            next('/index')
          }

        }
      }
    })



  }





  // 进入后台验证
  // if (/^\/shanghu/.test(to.fullPath)) {
  //   // 判断是否是商户
  //   if (store.state.userinfo.shop_status != 1) {
  //     console.log('不是商户')
  //     next({
  //       path: '/',
  //       replace:true
  //     });
  //   } else {
  //     console.log('是商户')
  //     next();
  //   }
  // }



})

export default router;
