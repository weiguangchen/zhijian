const authList = [{
    id: 1,
    name: '验证管理',
    son: [{
        id: 11,
        name: '验证消费券'
      },
      {
        id: 12,
        name: '验证优惠码'
      }, {
        id: 13,
        name: '验证活动报名'
      }
    ]
  },
  {
    id: 2,
    name: '评价管理',
    son: [{
        id: 21,
        name: '消费评价'
      },
      {
        id: 22,
        name: '优惠券点评'
      }, {
        id: 23,
        name: '活动点评'
      }
    ]
  },
  {
    id: 3,
    name: '经营管理',
    son: [{
        id: 31,
        name: '活动统计'
      },
      {
        id: 32,
        name: '消费统计'
      }, {
        id: 33,
        name: '订单管理'
      }
    ]
  },
  {
    id: 4,
    name: '商户中心',
    son: [{
        id: 41,
        name: '项目管理'
      },
      {
        id: 42,
        name: '新建项目'
      }, {
        id: 43,
        name: '门店管理'
      }, {
        id: 44,
        name: '账户管理'
      }, {
        id: 45,
        name: '财务管理'
      }

    ]
  }
]


export default authList;