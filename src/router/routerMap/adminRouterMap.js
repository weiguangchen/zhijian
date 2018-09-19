export default [{
  path: '/shanghu',
  components: {
    default: resolve => require(['@/pages/shanghu/index'], resolve),
    tab: resolve => require(['@/components/tab/shangHuTab'], resolve),
  },
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
          menu: [],
          title: ''
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
      }, ]
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
          menu: [],
          index:true
        }
      }, {
        path: 'tongji',
        name: 'tongji',
        component: resolve => require(['@/pages/shanghu/jingying/tongji'], resolve),
        meta: {
          role: 31
        }
      }, {
        path: 'hdcard',
        name: 'hdcard',
        component: resolve => require(['@/pages/shanghu/jingying/hdcard'], resolve),
        meta: {
          role: 31
        }
      },{
        path: 'hdTongji',
        name: 'hdTongji',
        component: resolve => require(['@/pages/shanghu/jingying/hdTongji'], resolve),
        meta: {
          role: 31
        }
      }, {
        path: 'mendianTongji',
        name: 'mendianTongji',
        component: resolve => require(['@/pages/shanghu/jingying/mendianTongji'], resolve),
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
        path: 'orderStep',
        name: 'orderStep',
        component: resolve => require(['@/pages/orderList/tuikuanStep'], resolve),
        meta: {
          role: 32
        }
      },{
        path: 'tuikuan',
        name: 'tuikuan',
        component: resolve => require(['@/pages/shanghu/jingying/tuikuan'], resolve),
        meta: {
          role: 32
        }
      },{
        path: 'tuikuanList',
        name: 'tuikuanList',
        component: resolve => require(['@/pages/shanghu/jingying/tuikuanList'], resolve),
        meta: {
          role: 32
        }
      }, {
        path: 'tuikuanDetail',
        name: 'tuikuanDetail',
        component: resolve => require(['@/pages/shanghu/jingying/tuikuanDetail'], resolve),
        meta: {
          role: 32
        }
      },{
        path: 'cardOrderList',
        name: 'cardOrderList',
        component: resolve => require(['@/pages/shanghu/jingying/cardOrderList'], resolve),
        meta: {
          role: 32
        }
      }, {
        path: 'cardOrderDetail',
        name: 'cardOrderDetail',
        component: resolve => require(['@/pages/shanghu/jingying/cardOrderDetail'], resolve),
        meta: {
          role: 32
        }
      },  {
        path: 'orderDetail',
        name: 'shanghuOrderDetail',
        component: resolve => require(['@/pages/shanghu/jingying/orderDetail'], resolve),
        meta: {
          role: 32
        }
      },  {
        path: 'fwgl',
        name: 'shanghumefwgl',
        component: resolve => require(['@/pages/shanghu/jingying/fwgl'], resolve),
        meta: {
          role: 41
        }
      }, {
        path: 'xmgl',
        name: 'shanghumexmgl',
        component: resolve => require(['@/pages/shanghu/jingying/xmgl'], resolve),
        meta: {
          role: 41
        }
      }, {
        path: 'fwList',
        name: 'shanghumefwlist',
        component: resolve => require(['@/pages/shanghu/jingying/fwList'], resolve),
        meta: {
          role: 42
        }
      }, {
        path: 'bianjiFw/:fwId',
        name: 'bianjiFw',
        component: resolve => require(['@/pages/shanghu/jingying/bianjiFw'], resolve),
        meta: {
          role: 42
        }
      }, {
        path: 'addhuodong',
        name: 'shanghumeaddhuodong',
        component: resolve => require(['@/pages/shanghu/jingying/addhuodong'], resolve),
        meta: {
          role: 43
        }
      }, {
        path: 'hdList',
        name: 'hdList',
        component: resolve => require(['@/pages/shanghu/jingying/hdList'], resolve),
        meta: {
          role: 43
        }
      }, {
        path: 'createdYhj',
        name: 'createdYhj',
        component: resolve => require(['@/pages/shanghu/jingying/createdYhj'], resolve),
        meta: {
          role: 43
        }
      }, {
        path: 'yhjList',
        name: 'yhjList',
        component: resolve => require(['@/pages/shanghu/jingying/yhjList'], resolve),
        meta: {
          role: 43
        }
      }, {
        path: 'yhjHandle',
        name: 'yhjHandle',
        component: resolve => require(['@/pages/shanghu/jingying/yhjHandle'], resolve),
        meta: {
          role: 43
        }
      }, ]

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
        path: 'mendian',
        name: 'shanghumemendian',
        component: resolve => require(['@/pages/shanghu/me/mendian'], resolve),
        meta: {
          role: 44
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
      }, {
        path: 'caiwu',
        name: 'caiwu',
        component: resolve => require(['@/pages/shanghu/me/caiwu'], resolve),
        meta: {
          role: 45
        }
      }, {
        path: 'zonge',
        name: 'zonge',
        component: resolve => require(['@/pages/shanghu/me/zonge'], resolve),
        meta: {
          role: 45
        }
      }, {
        path: 'tixian',
        name: 'tixian',
        component: resolve => require(['@/pages/shanghu/me/tixian'], resolve),
        meta: {
          role: 45
        }
      }, {
        path: 'tixianList',
        name: 'tixianList',
        component: resolve => require(['@/pages/shanghu/me/tixianList'], resolve),
        meta: {
          role: 45
        }
      }, {
        path: 'tixianDetail',
        name: 'tixianDetail',
        component: resolve => require(['@/pages/shanghu/me/tixianDetail'], resolve),
        meta: {
          role: 45
        }
      }, {
        path: 'shoukuan',
        name: 'shoukuan',
        component: resolve => require(['@/pages/shanghu/me/shoukuan'], resolve),
        meta: {
          role: 45
        }
      }, {
        path: 'shoukuanList',
        name: 'shoukuanList',
        component: resolve => require(['@/pages/shanghu/me/shoukuanList'], resolve),
        meta: {
          role: 45
        }
      },{
        path: 'setting',
        name: 'setting',
        component: resolve => require(['@/pages/shanghu/me/setting/index'], resolve),
        meta: {
          title:'设置'
        },
      },{
        path: 'phone',
        name: 'phone',
        component: resolve => require(['@/pages/shanghu/me/setting/phone'], resolve),
        meta: {
          title:'修改手机号'
        }
      },{
        path: 'yanzheng',
        name: 'yanzheng',
        component: resolve => require(['@/pages/shanghu/me/setting/yanzheng'], resolve),
        meta: {
          title:'验证身份'
        }
      },{
        path: 'name',
        name: 'name',
        component: resolve => require(['@/pages/shanghu/me/setting/name'], resolve),
        meta: {
          title:'修改姓名'
        }
      },{
        path: 'address',
        name: 'address',
        component: resolve => require(['@/pages/shanghu/me/setting/address'], resolve),
        meta: {
          title:'修改地址'
        }
      }],

    }
  ]
}]
