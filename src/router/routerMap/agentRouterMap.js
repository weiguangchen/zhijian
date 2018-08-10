export default [{
    path: '/agent',
    name: 'agent',
    components: {
      default: resolve => require(['@/pages/agent/index'], resolve),
      // tab: tab
    },
    meta: {
      title: '代理商中心'
    }
  }, {
    path: '/addJms',
    name: 'addJms',
    components: {
      default: resolve => require(['@/pages/agent/add_jms'], resolve),
      // tab: tab
    },
    meta: {
      title: '添加加盟商'
    }
  }, {
    path: '/addAgent',
    name: 'addAgent',
    components: {
      default: resolve => require(['@/pages/agent/add_agent'], resolve),
      // tab: tab
    },
    meta: {
      title: '添加代理商'
    }
  }, {
    path: '/agentTixian',
    name: 'agentTixian',
    components: {
      default: resolve => require(['@/pages/agent/tixian'], resolve),
      // tab: tab
    },
    meta: {
      title: '余额提现'
    }
  }, {
    path: '/tixianList',
    name: 'tixianList',
    components: {
      default: resolve => require(['@/pages/agent/tixianList'], resolve),
      // tab: tab
    },
    meta: {
      title: '提现记录'
    }
  }, {
    path: '/tixianDetail',
    name: 'tixianDetail',
    components: {
      default: resolve => require(['@/pages/agent/tixianDetail'], resolve),
      // tab: tab
    },
    meta: {
      title: '提现详情'
    }
  }, {
    path: '/income',
    name: 'income',
    components: {
      default: resolve => require(['@/pages/agent/income'], resolve),
      // tab: tab
    },
    meta: {
      title: '收益'
    }
  }, {
    path: '/incomeList',
    name: 'incomeList',
    components: {
      default: resolve => require(['@/pages/agent/income_list'], resolve),
      // tab: tab
    },
  }, {
    path: '/agentList',
    name: 'agentList',
    components: {
      default: resolve => require(['@/pages/agent/agentList'], resolve),
      // tab: tab
    }
  }, {
    path: '/jmsList',
    name: 'jmsList',
    components: {
      default: resolve => require(['@/pages/agent/jmsList'], resolve),
      // tab: tab
    },
    meta: {
      title: '加盟商列表'
    }
  }, {
    path: '/jmsDetail',
    name: 'jmsDetail',
    components: {
      default: resolve => require(['@/pages/agent/jmsDetail'], resolve),
      // tab: tab
    }
  }, {
    path: '/wallet',
    name: 'wallet',
    components: {
      default: resolve => require(['@/pages/agent/wallet'], resolve),
      // tab: tab
    },
    meta: {
      title: '我的钱包'
    }
  }, {
    path: '/shoukuan',
    name: 'shoukuan',
    components: {
      default: resolve => require(['@/pages/agent/shoukuan'], resolve),
      // tab: tab
    },
    meta: {
      title: '收款'
    }
  }, {
    path: '/mineAgent',
    name: 'mineAgent',
    components: {
      default: resolve => require(['@/pages/agent/mineAgent'], resolve),
      // tab: tab
    },
    meta: {
      title: '我的代理商'
    }
  }, {
    path: '/mineJms',
    name: 'mineJms',
    components: {
      default: resolve => require(['@/pages/agent/mineJms'], resolve),
      // tab: tab
    },
    meta: {
      title: '我的加盟商'
    }
  }, {
    path: '/baobiao',
    name: 'baobiao',
    components: {
      default: resolve => require(['@/pages/agent/baobiao'], resolve),
      // tab: tab
    },
    meta: {
      title: '我的报表'
    }
  }, {
    path: '/agentSetting',
    name: 'agentSetting',
    components: {
      default: resolve => require(['@/pages/agent/setting/index'], resolve),
      // tab: tab
    },
    meta: {
      title: '设置'
    }
  }, {
    path: '/agentAddress',
    name: 'agentAddress',
    components: {
      default: resolve => require(['@/pages/agent/setting/address'], resolve),
      // tab: tab
    },
    meta: {
      title: '修改地址'
    }
  }, {
    path: '/agentName',
    name: 'agentName',
    components: {
      default: resolve => require(['@/pages/agent/setting/name'], resolve),
      // tab: tab
    },
    meta: {
      title: '修改昵称'
    }
  }, {
    path: '/agentPhone',
    name: 'agentPhone',
    components: {
      default: resolve => require(['@/pages/agent/setting/phone'], resolve),
      // tab: tab
    },
    meta: {
      title: '绑定新手机'
    }
  }, {
    path: '/agentYanzheng',
    name: 'agentYanzheng',
    components: {
      default: resolve => require(['@/pages/agent/setting/yanzheng'], resolve),
      // tab: tab
    },
    meta: {
      title: '身份验证'
    }
  },]