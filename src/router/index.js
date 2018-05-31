/*
 * @Author: 魏广辰 
 * @Date: 2018-05-28 10:14:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-31 16:19:48
 */
import Vue from 'vue'
import Router from 'vue-router'
import tab from '@/components/tab/tab';
import tab2 from '@/components/tab/shangHuTab';
import index from '@/pages/index/index'
import shangpu from '@/pages/shangpu/index'
import serviceClass from '@/pages/serviceClass/index';
import serviceDetail from "@/pages/serviceDetail/index";
import me from '@/pages/me/index';
import agent from '@/pages/agent/index';
import pinglun from '@/pages/pinglun/index';

import shanghu from '@/pages/shanghu/index'
import yanzheng from '@/pages/shanghu/yanzheng/index'
import jingying from '@/pages/shanghu/jingying/index'
import tongji from '@/pages/shanghu/jingying/tongji'
import shanghume from '@/pages/shanghu/me/index'
import xmgl from '@/pages/shanghu/me/xmgl'
import shangjia from '@/pages/shanghu/shangjia/index';
import logining from '@/pages/logining/index';
Vue.use(Router)
import store from '@/store/index';
import axios from "axios";
import VueCookies from 'vue-cookies'

const router = new Router({
  linkActiveClass: 'active-router',
  routes: [{
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      beforeEnter: (to, from, next) => {
        if (to.path == '/index') {
          next();
        }
        if (getUrl('id')) {
          VueCookies.set('user', getUrl('id'));
          var url = delParam('http://192.168.31.75:8081?id=123/#/me', 'id');
          window.location.href = url;
        }
        next();
      },
      components: {
        default: index,
        tab: tab
      }
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
      path: '/me',
      name: 'me',
      components: {
        default: me,
        tab: tab
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
      path: '/pinglun',
      name: 'pinglun',
      component: pinglun
    }, {
      path: '/shangjia',
      name: 'shangjia',
      component: shangjia
    }, {
      path: '/shanghu',
      component: shanghu,
      children: [{
          path: 'yanzheng',
          component: yanzheng
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
          path: 'me',
          component: shanghume
        },
        {
          path: 'me/xmgl',
          component: xmgl
        },
        
      ]
    },
    {
      path: '/logining',
      name: 'logining',
      component: logining
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

router.beforeEach((to, from, next) => {
  var id = store.state.id;

  // if (!id && to.path != '/me') {
  //   // 未登录
  //   next('/me');
  // }else{
  //   // 登录中
  //   next();
  // }
  next();
  // if (getUrl('id') && to.path == '/') {
  //   VueCookies.set('url', getUrl('id'));
  //   var url = delParam('http://192.168.31.75:8081?id=123/#/me', 'id');
  //   router.replace(url)
  // }else{
  //   next();
  // }
  // if (to.path == '/me') {
  //   next();
  // }

  // if (!store.state.id) {
  //   next('/me');
  // }
})

export default router;
