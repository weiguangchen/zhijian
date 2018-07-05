/*
 * @Author: 魏广辰 
 * @Date: 2018-05-28 10:14:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-29 12:18:13
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 前台
// import tab from '@/components/tab/tab';
// import tab2 from '@/components/tab/shangHuTab';
// import index from '@/pages/index/index'
// import shangcheng from '@/pages/shangcheng/index';
// import shangpu from '@/pages/shangpu/index'
// import serviceClass from '@/pages/serviceClass/index';
// import serviceList from '@/pages/serviceList/index';
// import serviceDetail from "@/pages/serviceDetail/index";
// import huodongDetail from "@/pages/serviceDetail/huodong";
// import queren from '@/pages/queren/index';
// import huodongqueren from '@/pages/queren/huodong';
// import me from '@/pages/me/index';
// import youhuijuan from '@/pages/youhuijuan/index';
// import orderList from '@/pages/orderList/index';
// import orderDetail from '@/pages/orderList/orderDetail';
// import pingjia from '@/pages/pingjia/index';
// import pinglun from '@/pages/pinglun/index';
// import shopCar from '@/pages/shopCar/index';
// 代理商
// import agent from '@/pages/agent/index';
// import addJms from '@/pages/agent/add_jms';
// import addAgent from '@/pages/agent/add_agent';
// 图文详情页
// import twDetail from '@/pages/contentDetail/index';


// import applyShanghu from '@/pages/shanghuApply/index';
// import checkshenfen from '@/pages/checkshenfen/index'
// import shanghuCheck from '@/pages/checkshenfen/shanghuCheck'
// import checkwarning from '@/pages/checkshenfen/warning'
// 商户后台
// import shanghu from '@/pages/shanghu/index'
// import yanzheng from '@/pages/shanghu/yanzheng/index'
// import xfm from '@/pages/shanghu/yanzheng/xfm'
// import huodongyz from '@/pages/shanghu/yanzheng/huodong'
// import pingjias from '@/pages/shanghu/pingjias/index'
// import pingjiaList from '@/pages/shanghu/pingjias/pingjiaList'
/* 商户后台/我的 */
// import shanghume from '@/pages/shanghu/me/index1'
// import shanghumeindex from '@/pages/shanghu/me/index'
// import mendian from '@/pages/shanghu/me/mendian'
// import addFace from '@/pages/shanghu/me/addFace'
// import xmgl from '@/pages/shanghu/me/xmgl'
// import bianjiFw from '@/pages/shanghu/me/bianjiFw'
// import fwList from '@/pages/shanghu/me/fwList'
// import addhuodong from '@/pages/shanghu/me/addhuodong'
// import account from '@/pages/shanghu/me/account'
// import setAuthority from '@/pages/shanghu/me/authority'
// import addSonAccount from '@/pages/shanghu/me/addSonAccount'
/* 商户后台/经营 */
import shanghujingying from '@/pages/shanghu/jingying/index';
import jingyingindex from '@/pages/shanghu/jingying/index1'
import tongji from '@/pages/shanghu/jingying/tongji'
import orderGl from '@/pages/shanghu/jingying/orderlist'

import shangjia from '@/pages/shanghu/shangjia/index';
import huifupinglun from '@/components/huifupinglun/index';
// 登录等待页
import logining from '@/pages/logining/index';

// 插件
import store from '@/store/index';
import muta from '@/store/mutations';
import axios from "axios";
import VueCookies from 'vue-cookie'
import {
  API_URL,
  default_url
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
  redirect: '/index',
  base: '/qd/',
}, {
  path: '/index',
  name: 'index',
  components: {
    default: resolve => require(['@/pages/index/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/shop',
  name: 'shangcheng',
  components: {
    default: resolve => require(['@/pages/shangcheng/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  },
  meta:{
    keepAlive:true
  }
}, {
  path: '/faxian',
  name: 'faxian',
  components: {
    default:resolve => require(['@/pages/faxian/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  },
}, {
  path: '/shangpu/:shangpuId',
  name: 'shangpu',
  components: {
    default: resolve => require(['@/pages/shangpu/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/serviceClass/:classId',
  name: 'serviceClass',
  components: {
    default: resolve => require(['@/pages/serviceClass/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/serviceList/:classId',
  name: 'serviceList',
  components: {
    default: resolve => require(['@/pages/serviceList/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/me',
  name: 'me',
  components: {
    default: resolve => require(['@/pages/me/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/youhuijuan',
  name: 'youhuijuan',
  components: {
    default: resolve => require(['@/pages/youhuijuan/index'], resolve),
  }
}, {
  path: '/me/orderList/:orderStatus',
  name: 'orderList',
  components: {
    default: resolve => require(['@/pages/orderList/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/me/orderDetail',
  name: 'orderList',
  components: {
    default: resolve => require(['@/pages/orderList/orderDetail'], resolve)
    // tab: tab
  }
}, {
  path: '/queren',
  name: 'queren',
  components: {
    default: resolve => require(['@/pages/queren/index'], resolve),
  }
}, {
  path: '/huodongqueren',
  name: 'queren',
  components: {
    default: resolve => require(['@/pages/queren/huodong'], resolve)
  }
}, {
  path: '/me/pingjia/:orderNum',
  name: 'pingjia',
  components: {
    default: resolve => require(['@/pages/pingjia/index'], resolve),
  }
}, {
  path: '/agent',
  name: 'agent',
  components: {
    default: resolve => require(['@/pages/agent/index'], resolve),
    // tab: tab
  }
}, {
  path: '/addJms',
  name: 'addJms',
  components: {
    default: resolve => require(['@/pages/agent/add_jms'], resolve),
    // tab: tab
  }
}, {
  path: '/addAgent',
  name: 'addAgent',
  components: {
    default: resolve => require(['@/pages/agent/add_agent'], resolve),
    // tab: tab
  }
}, {
  path: '/serviceDetail/:serviceId',
  name: 'serviceDetail',
  component: resolve => require(["@/pages/serviceDetail/index"], resolve)
}, {
  path: '/huodongDetail/:huodongId',
  name: 'huodongDetail',
  component: resolve => require(["@/pages/serviceDetail/huodong"], resolve)
}, {
  path: '/pinglun/:serviceId',
  name: 'pinglun',
  component: resolve => require(['@/pages/pinglun/index'], resolve)
}, {
  path: '/shangjia',
  name: 'shangjia',
  component: resolve => require(['@/pages/shanghu/shangjia/index'], resolve)
}, {
  path: '/applyShanghu',
  name: 'applyShanghu',
  components: {
    default: resolve => require(['@/pages/shanghuApply/index'], resolve),
    tab: resolve => require(['@/components/tab/tab'], resolve)
  }
}, {
  path: '/shopCar',
  name: 'shopCar',
  components: {
    default: resolve => require(['@/pages/shopCar/index'], resolve),
    // tab: tab
  }
},
{
  path: '/huifupinglun',
  name: 'huifupinglun',
  component: resolve => require(['@/components/huifupinglun/index'], resolve)
},
{
  path: '/logining',
  name: 'logining',
  component: resolve => require(['@/pages/logining/index'], resolve),
},
{
  path: '/checkshenfen',
  name: 'checkshenfen',
  component: resolve => require(['@/pages/checkshenfen/index'], resolve),
},
{
  path: '/shanghuCheck',
  name: 'shanghuCheck',
  component: resolve => require(['@/pages/checkshenfen/shanghuCheck'], resolve),
},
{
  path: '/warning',
  name: 'checkwarning',
  component: resolve => require(['@/pages/checkshenfen/warning'], resolve)
},
{
  path: '/twDetail/:twId',
  name: 'twDetail',
  component: resolve => require(['@/pages/contentDetail/index'], resolve)
},
// {
//   path: '/shanghu',
//   component: resolve => require(['@/pages/shanghu/index'], resolve),
//   name: 'shanghu',
//   meta: {
//     role: 0
//   },
//   children: []
// }
{
  path: '/shanghu',
  component: resolve => require(['@/pages/shanghu/index'], resolve),
  name: 'shanghu',
  meta: {
    role: ['shanghu']
  },
  children: [{
    path: 'yanzheng',
    component: resolve => require(['@/pages/shanghu/yanzheng/index'], resolve),
    name: 'yanzheng',
    meta: {
      role: 1
    },
    children: [{
      path: 'index',
      name: 'yanzhengindex',
      component: resolve => require(['@/pages/shanghu/yanzheng/index1'], resolve),
      meta: {
        role: 999,
        menu: []
      },
    }, {
      path: 'xfm',
      name: 'yanzhengxfm',
      component: resolve => require(['@/pages/shanghu/yanzheng/xfm'], resolve),
      meta: {
        role: 11
      },
    }, {
      path: 'huodong',
      name: 'yanzhenghuodong',
      component: resolve => require(['@/pages/shanghu/yanzheng/huodong'], resolve),
      meta: {
        role: 12
      },
    }]
  },
  {
    path: 'pingjias',
    name: 'pingjias',
    component: resolve => require(['@/pages/shanghu/pingjias/index'], resolve),
    meta: {
      role: 2
    },
    children: [{
      path: 'index',
      name: 'pingjiaindex',
      component: resolve => require(['@/pages/shanghu/pingjias/index1'], resolve),
      meta: {
        role: 999,
        menu: []
      },
    }, {
      path: 'pingjias',
      name: 'allpingjias',
      component: resolve => require(['@/pages/shanghu/pingjias/pingjias'], resolve),
      meta: {
        role: 21
      },
    }, {
      path: 'pingjiaList/:pingjiaId',
      name: 'pingjiaList',
      component: resolve => require(['@/pages/shanghu/pingjias/pingjiaList'], resolve),
      meta: {
        role: 21
      },
    },]
  },

  {
    path: 'jingying',
    name: 'jingying',
    component: resolve => require(['@/pages/shanghu/jingying/index'], resolve),
    meta: {
      role: 3,
    },
    children: [{
      path: 'index',
      name: 'index',
      component: resolve => require(['@/pages/shanghu/jingying/index1'], resolve),
      meta: {
        role: 999,
        menu: []
      }
    }, {
      path: 'tongji',
      name: 'tongji',
      component: resolve => require(['@/pages/shanghu/jingying/tongji'], resolve),
      meta: {
        role: 31
      }
    }, {
      path: 'orderGl',
      name: 'orderGl',
      component: resolve => require(['@/pages/shanghu/jingying/orderlist'], resolve),
      meta: {
        role: 32
      }
    },{
      path: 'orderDetail',
      name: 'shanghuOrderDetail',
      component: resolve => require(['@/pages/shanghu/jingying/orderDetail'], resolve),
      meta: {
        role: 32
      }
    },]

  },


  {
    path: 'me',
    name: 'shanghume',
    component: resolve => require(['@/pages/shanghu/me/index1'], resolve),
    meta: {
      role: 4
    },
    children: [{
      path: 'index',
      name: 'shanghumeindex',
      component: resolve => require(['@/pages/shanghu/me/index'], resolve),
      meta: {
        role: 999,
        menu: []
      }
    }, {
      path: 'xmgl',
      name: 'shanghumexmgl',
      component: resolve => require(['@/pages/shanghu/me/xmgl'], resolve),
      meta: {
        role: 41
      }
    }, {
      path: 'bianjiFw/:fwId',
      name: 'bianjiFw',
      component: resolve => require(['@/pages/shanghu/me/bianjiFw'], resolve),
      meta: {
        role: 42
      }
    }, {
      path: 'fwList',
      name: 'shanghumefwlist',
      component: resolve => require(['@/pages/shanghu/me/fwList'], resolve),
      meta: {
        role: 42
      }
    }, {
      path: 'mendian',
      name: 'shanghumemendian',
      component: resolve => require(['@/pages/shanghu/me/mendian'], resolve),
      meta: {
        role: 44
      }
    }, {
      path: 'addhuodong',
      name: 'shanghumeaddhuodong',
      component: resolve => require(['@/pages/shanghu/me/addhuodong'], resolve),
      meta: {
        role: 43
      }
    }, {
      path: 'hdList',
      name: 'hdList',
      component: resolve => require(['@/pages/shanghu/me/hdList'], resolve),
      meta: {
        role: 43
      }
    }, {
      path: 'addFace',
      name: 'shanghumeaddface',
      component: resolve => require(['@/pages/shanghu/me/addFace'], resolve),
      meta: {
        role: 44
      }
    }, {
      path: 'account',
      name: 'account',
      component: resolve => require(['@/pages/shanghu/me/account'], resolve),
      meta: {
        role: 45
      }
    }, {
      path: 'setAuthority',
      name: 'setAuthority',
      component: resolve => require(['@/pages/shanghu/me/authority'], resolve),
      meta: {
        role: 45
      }
    }, {
      path: 'addSonAccount',
      name: 'addSonAccount',
      component: resolve => require(['@/pages/shanghu/me/addSonAccount'], resolve),
      meta: {
        role: 45
      }
    }],

  }
  ]
}
]

/*  
    权限列表
    1验证管理
    11验证消费码12验证活动
    2评价管理
    21消费评价22活动评价
    3经营管理
    31消费统计32订单管理33活动统计
    4商户中心
    41项目管理42编辑服务43添加活动44门店管理45账户管理
*/

export const asyncRouterMaps = [{
  path: 'yanzheng',
  component: resolve => require(['@/pages/shanghu/yanzheng/index'], resolve),
  name: 'yanzheng',
  meta: {
    role: 1
  },
  children: [{
    path: 'index',
    name: 'yanzhengindex',
    component: resolve => require(['@/pages/shanghu/yanzheng/index1'], resolve),
    meta: {
      role: 999,
      menu: []
    },
  }, {
    path: 'xfm',
    name: 'yanzhengxfm',
    component: resolve => require(['@/pages/shanghu/yanzheng/xfm'], resolve),
    meta: {
      role: 11
    },
  }, {
    path: 'huodong',
    name: 'yanzhenghuodong',
    component: resolve => require(['@/pages/shanghu/yanzheng/huodong'], resolve),
    meta: {
      role: 12
    },
  }]
},
{
  path: 'pingjias',
  name: 'pingjias',
  component: resolve => require(['@/pages/shanghu/pingjias/index'], resolve),
  meta: {
    role: 2
  },
  children: [{
    path: 'index',
    name: 'pingjiaindex',
    component: resolve => require(['@/pages/shanghu/pingjias/index1'], resolve),
    meta: {
      role: 999,
      menu: []
    },
  }, {
    path: 'pingjias',
    name: 'allpingjias',
    component: resolve => require(['@/pages/shanghu/pingjias/pingjias'], resolve),
    meta: {
      role: 21
    },
  }, {
    path: 'pingjiaList/:pingjiaId',
    name: 'pingjiaList',
    component: resolve => require(['@/pages/shanghu/pingjias/pingjiaList'], resolve),
    meta: {
      role: 21
    },
  },]
},

{
  path: 'jingying',
  name: 'jingying',
  component: resolve => require(['@/pages/shanghu/jingying/index'], resolve),
  meta: {
    role: 3,
  },
  children: [{
    path: 'index',
    name: 'index',
    component: resolve => require(['@/pages/shanghu/jingying/index1'], resolve),
    meta: {
      role: 999,
      menu: []
    }
  }, {
    path: 'tongji',
    name: 'tongji',
    component: resolve => require(['@/pages/shanghu/jingying/tongji'], resolve),
    meta: {
      role: 31
    }
  }, {
    path: 'orderGl',
    name: 'orderGl',
    component: resolve => require(['@/pages/shanghu/jingying/orderlist'], resolve),
    meta: {
      role: 32
    }
  },]

},


{
  path: 'me',
  name: 'shanghume',
  component: resolve => require(['@/pages/shanghu/me/index1'], resolve),
  meta: {
    role: 4
  },
  children: [{
    path: 'index',
    name: 'shanghumeindex',
    component: resolve => require(['@/pages/shanghu/me/index'], resolve),
    meta: {
      role: 999,
      menu: []
    }
  }, {
    path: 'xmgl',
    name: 'shanghumexmgl',
    component: resolve => require(['@/pages/shanghu/me/xmgl'], resolve),
    meta: {
      role: 41
    }
  }, {
    path: 'bianjiFw/:fwId',
    name: 'bianjiFw',
    component: resolve => require(['@/pages/shanghu/me/bianjiFw'], resolve),
    meta: {
      role: 42
    }
  }, {
    path: 'fwList',
    name: 'shanghumefwlist',
    component: resolve => require(['@/pages/shanghu/me/fwList'], resolve),
    meta: {
      role: 42
    }
  }, {
    path: 'mendian',
    name: 'shanghumemendian',
    component: resolve => require(['@/pages/shanghu/me/mendian'], resolve),
    meta: {
      role: 44
    }
  }, {
    path: 'addhuodong',
    name: 'shanghumeaddhuodong',
    component: resolve => require(['@/pages/shanghu/me/addhuodong'], resolve),
    meta: {
      role: 43
    }
  }, {
    path: 'addFace',
    name: 'shanghumeaddface',
    component: resolve => require(['@/pages/shanghu/me/addFace'], resolve),
    meta: {
      role: 44
    }
  }, {
    path: 'account',
    name: 'account',
    component: resolve => require(['@/pages/shanghu/me/account'], resolve),
    meta: {
      role: 45
    }
  }, {
    path: 'setAuthority',
    name: 'setAuthority',
    component: resolve => require(['@/pages/shanghu/me/authority'], resolve),
    meta: {
      role: 45
    }
  }, {
    path: 'addSonAccount',
    name: 'addSonAccount',
    component: resolve => require(['@/pages/shanghu/me/addSonAccount'], resolve),
    meta: {
      role: 45
    }
  }],

}
]



function filterRouter(obj, map) {
  obj.map(m => {
    if (m.children) {
      filterRouter()
    }
  })
}

const router = new Router({
  linkActiveClass: 'active-router',
  mode: 'history',
  routes: defaultRouterMaps,
  scrollBehavior(to, from, savedPosition) {
    // console.log('滚动')
    // console.log(savedPosition)
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
  }
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
    var url = default_url + to.fullPath;
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
    // window.location.href = 'http://localhost:8081' + url;
    // window.location.href = 'http://192.168.31.75:8081' + url;
    // window.location.href = default_url + url;
  }


  var userId = VueCookies.get("user");
  if (!userId) {
    VueCookies.set('enterBeforeUrl', to.fullPath);
    console.log(window.location.href)
    var windowUrl = window.location.href;var state;
    console.log(/\/http:qd.daonian.cn/.test(windowUrl))
    if(/http:\/\/qd.daonian.cn/.test(windowUrl)){
      // 线上
      state = 0; 
    }else{
      // 线下
      state = 1;
    }
    // 没有cookies
    // state=1是线下环境state=0线上环境
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe73b53fb0770a6a3&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state="+state+"#wechat_redirect";
  } else {
    // 有cookies
    // 获取用户信息

    axios.get(API_URL + '/api/Show/get_user', {
      params: {
        id: userId
      }
    }).then(res => {
      console.log('获取信息')
      console.log(res)
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
    })
      .then(res => {
        // if (store.state.routerMap.length <= 0) {
        //   // 没有生成权限
        //   // 根据权限获取路由
        //   var qx = store.state.userinfo.qx[0].content;
        //   if (qx) {
        //     qx = JSON.parse(qx)
        //   }
        //   console.log('权限')
        //   console.log(qx)
        //   var routerQxMap = [];
        //   for (let i = 0; i < qx.length; i++) {
        //     var routeritem = {};
        //     for (let f = 0; f < asyncRouterMaps.length; f++) {
        //       if (qx[i].id == asyncRouterMaps[f].meta.role) {
        //         routeritem.path = asyncRouterMaps[f].path;
        //         routeritem.name = asyncRouterMaps[f].name;
        //         routeritem.meta = asyncRouterMaps[f].meta;
        //         routeritem.component = asyncRouterMaps[f].component;
        //         if (qx[i].son.length > 0) {
        //           var children = [];

        //           for (let s = 0; s < qx[i].son.length; s++) {
        //             for (let c = 0; c < asyncRouterMaps[f].children.length; c++) {
        //               if (qx[i].son[s] == asyncRouterMaps[f].children[c].meta.role) {
        //                 children.push(asyncRouterMaps[f].children[c])
        //               }
        //             }
        //           }

        //           for (let c = 0; c < asyncRouterMaps[f].children.length; c++) {
        //             if (asyncRouterMaps[f].children[c].meta.role == 999) {
        //               asyncRouterMaps[f].children[c].meta.menu = qx[i].son
        //               children.push(asyncRouterMaps[f].children[c])
        //             }
        //           }

        //           routeritem.children = children

        //         }
        //       }
        //     }
        //     routerQxMap.push(routeritem)
        //   }

        //   console.log('生成权限')
        //   console.log(routerQxMap)
        //   var shanghuRouter = {
        //     path: '/shanghu',
        //     component: resolve => require(['@/pages/shanghu/index'], resolve),
        //     name: 'shanghu'
        //   }
        //   shanghuRouter.children = routerQxMap;
        //   shanghuRouter = [].concat(shanghuRouter);
        //   // 添加到路由树中
        //   console.log(shanghuRouter)
        //   router.addRoutes(shanghuRouter)
        //   // 把路由权限存到vuex
        //   muta.SET_ROUTER(store.state, shanghuRouter)
        // }





        if (/^\/agent/.test(to.fullPath)) {
          console.log('判断代理商')
          console.log('1')
          // 进入代理商页
          if (store.state.userinfo.is_dl == 1) {
            console.log('2')
            // 是分销商            
            next()
          } else {
            console.log('3')
            next('/checkshenfen');


          }
        } else if (/^\/shanghu/.test(to.fullPath)) {
          console.log('判断商户')
          console.log('1')
          // 进入商户页

          if (store.state.userinfo.is_shop == 1) {
            console.log('2')
            // 是商户
            var routerMap = JSON.parse(store.state.userinfo.qx[0].content);
            console.log('路由权限')
            console.log(routerMap);
            if (!store.state.routerMap) {
              // 未设定路由权限

            } else {

            }

            next()
          } else {
            // 不是商户
            console.log('3')
            next('/shanghuCheck');
          }
        }

        // next();

      })
  }



  // next();





})


router.afterEach(route => {
  /* 隐藏加载中动画 */
  muta.SET_ISLOADING(store.state, false);
});

export default router;
