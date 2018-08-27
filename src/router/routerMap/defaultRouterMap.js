export default [{
    path: '/',
    redirect: '/index',
    base: '/qd/',
  }, {
    path: '/index',
    name: 'index',
    components: {
      default: resolve => require(['@/pages/index/index'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    },
    meta: {
      title: '首页'
    }
  }, {
    path: '/shop',
    name: 'shangcheng',
    components: {
      default: resolve => require(['@/pages/shangcheng/index'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    },
    meta: {
      keepAlive: true,
      title: '商城'
    }
  }, {
    path: '/faxian',
    name: 'faxian',
    components: {
      default: resolve => require(['@/pages/faxian/index'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    },
    meta: {
      title: '发现'
    }
  }, {
    path: '/shangpu/:shangpuId',
    name: 'shangpu',
    components: {
      default: resolve => require(['@/pages/shangpu/index'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    },
    meta: {
      // keepAlive:true
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
    path: '/searchList',
    name: 'searchList',
    components: {
      default: resolve => require(['@/pages/serviceList/searchList'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    }
  }, {
    path: '/me',
    name: 'me',
    components: {
      default: resolve => require(['@/pages/me/index'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    },
    meta: {
      title: '个人中心'
    }
  }, {
    path: '/youhuijuan',
    name: 'youhuijuan',
    components: {
      default: resolve => require(['@/pages/youhuijuan/index'], resolve),
    },
    meta: {
      title: '优惠券'
    }
  }, {
    path: '/me/orderList/:orderStatus',
    name: 'orderList',
    components: {
      default: resolve => require(['@/pages/orderList/index'], resolve),
      tab: resolve => require(['@/components/tab/tab'], resolve)
    },
  }, {
    path: '/me/orderDetail',
    name: 'orderList',
    components: {
      default: resolve => require(['@/pages/orderList/orderDetail'], resolve)
      // tab: tab
    },
    meta: {
      title: '订单详情'
    }
  }, {
    path: '/me/tuikuan',
    name: 'orderList',
    components: {
      default: resolve => require(['@/pages/orderList/tuikuan'], resolve)
      // tab: tab
    },
    meta: {
      title: '申请退款'
    }
  }, {
    path: '/queren',
    name: 'queren',
    components: {
      default: resolve => require(['@/pages/queren/index'], resolve),
    },
    meta: {
      title: '确认订单'
    }
  }, {
    path: '/selectJuan',
    name: 'selectJuan',
    components: {
      default: resolve => require(['@/pages/queren/selectJuan'], resolve),
    },
    meta: {
      title: '使用优惠券'
    }
  }, {
    path: '/huodongqueren',
    name: 'huodongqueren',
    components: {
      default: resolve => require(['@/pages/queren/huodong'], resolve)
    },
    meta: {
      title: '确认订单'
    }
  }, {
    path: '/me/pingjia/:orderNum',
    name: 'pingjia',
    components: {
      default: resolve => require(['@/pages/pingjia/index'], resolve),
    },
    meta: {
      title: '评论'
    }
  }, {
    path: '/serviceDetail/:serviceId/:faceId',
    name: 'serviceDetail',
    component: resolve => require(["@/pages/serviceDetail/index"], resolve)
  }, {
    path: '/huodongDetail/:huodongId/:faceId',
    name: 'huodongDetail',
    component: resolve => require(["@/pages/serviceDetail/huodong"], resolve)
  }, {
    path: '/pinglun/:serviceId',
    name: 'pinglun',
    component: resolve => require(['@/pages/pinglun/index'], resolve),
    meta: {
      title: '评论列表'
    }
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
    },
  },
  {
    path: '/huifupinglun',
    name: 'huifupinglun',
    component: resolve => require(['@/components/huifupinglun/index'], resolve),
  },
  {
    path: '/logining',
    name: 'logining',
    component: resolve => require(['@/pages/logining/index'], resolve),
    meta: {
      title: '登录中'
    }
  },
  {
    path: '/checkshenfen',
    name: 'checkshenfen',
    component: resolve => require(['@/pages/checkshenfen/index'], resolve),
    meta: {
      title: '确认代理商'
    }
  },
  {
    path: '/checkShanghu',
    name: 'shanghuCheck',
    component: resolve => require(['@/pages/checkshenfen/shanghuCheck'], resolve),
    meta: {
      title: '确认商户'
    }
  },
  {
    path: '/checkServicer',
    name: 'checkServicer',
    component: resolve => require(['@/pages/checkshenfen/checkServicer'], resolve),
    meta: {
      title: '确认服务员'
    }
  },
  {
    path: '/warning',
    name: 'checkwarning',
    component: resolve => require(['@/pages/checkshenfen/warning'], resolve),
    meta: {
      title: '提示'
    }
  },
  {
    path: '/twDetail/:twId',
    name: 'twDetail',
    component: resolve => require(['@/pages/contentDetail/index'], resolve)
  }, {
    path: '/editAddress',
    name: 'editAddress',
    component: resolve => require(['@/pages/address/editAddress'], resolve),
  }, {
    path: '/addressList',
    name: 'addressList',
    component: resolve => require(['@/pages/address/addList'], resolve),
    meta: {
      title: '地址列表'
    }
  }, {
    path: '/collect',
    name: 'collect',
    component: resolve => require(['@/pages/collection/index'], resolve),
    meta: {
      title: '我的收藏'
    }
  }, {
    path: '/map',
    name: 'map',
    component: resolve => require(['@/pages/address/selectAdd'], resolve),
    meta: {
      title: '选择地址'
    }
  }, {
    path: '/yhj',
    name: 'yhj',
    component: resolve => require(['@/pages/yhj/index'], resolve),
    meta: {
      title: '我的优惠券'
    }
  }, {
    path: '/lqYhj',
    name: 'lqYhj',
    component: resolve => require(['@/pages/yhj/index1'], resolve),
    meta: {
      title: '优惠券'
    }
  }, {
    path: '/selectYhj',
    name: 'selectYhj',
    component: resolve => require(['@/pages/queren/selectYhj'], resolve),
    meta: {
      title: '选择优惠券'
    }
  },




]
