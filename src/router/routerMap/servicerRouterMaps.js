const servicerRouterMaps = [{
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
          path: 'index',
          name: 'shanghumeindex',
          component: resolve => require(['@/pages/shanghu/me/index'], resolve),
          meta: {
            role: 999,
            menu: []
          }
        }, {
          path: 'mendian',
          name: 'shanghumemendian',
          component: resolve => require(['@/pages/shanghu/me/mendian'], resolve),
          meta: {
            role: 44
          }
        },   {
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
  }]