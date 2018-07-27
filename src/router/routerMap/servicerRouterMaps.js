export default [{
  path: '/fuwuyuan',
  components: {
    default: resolve => require(['@/pages/shanghu/index'], resolve),
    tab: resolve => require(['@/components/tab/waiterTab'], resolve),
  },
  name: 'fuwuyuan',
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
        component: resolve => require(['@/pages/fuwuyuan/jingying/servicerOrderList'], resolve),
        meta: {
          role: 32
        }
      }, {
        path: 'orderDetail/:id/:zf',
        name: 'orderDetail',
        component: resolve => require(['@/pages/fuwuyuan/jingying/servicerOrderDetail'], resolve),
        meta: {
          role: 32
        }
      }]

    },


    {
      path: 'me',
      name: 'shanghume',
      component: resolve => require(['@/pages/fuwuyuan/me/index'], resolve),
      meta: {
        role: 4
      },
      children: [{
        path: 'safe',
        name: 'safe',
        component: resolve => require(['@/pages/fuwuyuan/me/safe'], resolve),
        meta: {
          title: '安全中心'
        }
      }, {
        path: 'index',
        name: 'fuwuyuanindex',
        component: resolve => require(['@/pages/fuwuyuan/me/index1'], resolve),
        meta: {
          title: '个人中心'
        }
      }, {
        path: 'name',
        name: 'name',
        component: resolve => require(['@/pages/fuwuyuan/me/name'], resolve),
        meta: {
          title: '个人中心'
        }
      }, {
        path: 'phone',
        name: 'phone',
        component: resolve => require(['@/pages/fuwuyuan/me/phone'], resolve),
        meta: {
          title: '个人中心'
        }
      }, {
        path: 'yanzheng',
        name: 'yanzheng',
        component: resolve => require(['@/pages/fuwuyuan/me/yanzheng'], resolve),
        meta: {
          title: '个人中心'
        }
      }, {
        path: 'orderList',
        name: 'orderList',
        component: resolve => require(['@/pages/fuwuyuan/me/orderList'], resolve),
        meta: {
          title: '个人中心'
        }
      }],

    }
  ]
}]
