<template>
  <div class="page">
    <ViewBox>
      <div class="me-box">
        <div class="title">
          <span class="left"></span>
          <span class="middle">{{agentTitle}}代理</span>
          <span class="right">
            <span class="iconfont icon-shezhi" @click="setting"></span>
          </span>
        </div>
        <div class="me-info">
          <div class="avatar-box">
            <img :src="userinfo.headimgurl" alt="" class="avatar">
            <div class="name">{{userinfo.nickname}}</div>
            <div class="level">{{level}}</div>
          </div>
          <div class="num-info">
            <div class="num">
              <div class="tit">余额</div>
              <div class="count">{{userinfo.user_money}}</div>
              <XButton :mini='true' type='warn' @click.native="tixian">提现</XButton>
            </div>
            <div class="num" v-if="userinfo.dl">
              <div class="tit">收益</div>
              <div class="count">{{userinfo.dl[0].dl_money}}</div>
              <XButton :mini='true' type='warn' @click.native='toIncome'>查看</XButton>
            </div>
          </div>
        </div>
      </div>
      <div class="order-term">
        <div class="title">我的团队</div>
        <div class="order-terms" v-if="userinfo.dl">
          <div class="order-term-item" v-if="userinfo.dl[0].dl_jb == 1" @click="agentList(1)">
            <div class="icon">
              <span class="iconfont icon-shijidaili"></span>
            </div>
            <div class="text">市级代理</div>
          </div>
          <div class="order-term-item" v-if="userinfo.dl[0].dl_jb == 1||userinfo.dl[0].dl_jb == 2" @click="agentList(2)">
            <div class="icon">
              <span class="iconfont icon-quxiandaili"></span>
            </div>
            <div class="text">区县代理</div>
          </div>
          <div class="order-term-item" @click="jmsList">
            <div class="icon">
              <span class="iconfont icon-jiamengshang"></span>
            </div>
            <div class="text">加盟商</div>
          </div>

        </div>
      </div>
      <div class="oplist">
        <Group v-if="userinfo.dl">
          <Cell title='添加代理商' :is-link='true' link='/addAgent' v-if="userinfo.dl[0].dl_jb != 3 ">
          </Cell>
          <Cell title='添加加盟商' :is-link='true' link='/addJms' v-if="userinfo.dl[0].dl_jb == 3 " @click="add_jms">
          </Cell>
          <Cell title='我的代理商' :is-link='true' link='/mineAgent' v-if="userinfo.dl[0].dl_jb == 1 || userinfo.dl[0].dl_jb == 2">
          </Cell>
          <Cell title='我的加盟商' :is-link='true' link='/mineJms'>
          </Cell>
          <Cell title='我的报表' :is-link='true' link='/baobiao'>
          </Cell>
          <Cell title='我的钱包' :is-link='true' link='/wallet'>
          </Cell>

        </Group>
      </div>
    </ViewBox>
  </div>
</template>

<script>
  import {
    XButton,
    Group,
    Cell,
    ViewBox
  } from "vux";
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {};
    },
    methods: {
      add_jms() {
        this.$router.push("/addJms");
      },
      tixian() {
        this.$router.push({
          path: "/agentTixian"
        });
      },
      toIncome() {
        this.$router.push({
          path: "/income"
        });
      },
      agentList(type) {
        this.$router.push({
          path: "/agentList",
          query: {
            type
          }
        });
      },
      jmsList() {
        this.$router.push({
          path: "/jmsList"
        });
      },
      setting() {
        this.$router.push({
          path: '/agentSetting'
        })
      }
    },
    computed: {
      level() {
        if (this.userinfo && this.userinfo.dl) {
          if (this.userinfo.dl[0].dl_jb == 1) {
            return "股东代理";
          } else if (this.userinfo.dl[0].dl_jb == 2) {
            return "市级代理";
          } else if (this.userinfo.dl[0].dl_jb == 3) {
            return "区级代理";
          }
        }
      },
      agentTitle() {
        if (this.userinfo && this.userinfo.dl) {
          if (this.userinfo.dl[0].dl_jb == 1) {
            return "股东";
          } else if (this.userinfo.dl[0].dl_jb == 2) {
            return `${this.userinfo.dl[0].sheng}`;
          } else if (this.userinfo.dl[0].dl_jb == 3) {
            return `${this.userinfo.dl[0].shi}`;
          }
        }


      }
    },
    components: {
      XButton,
      Group,
      Cell,
      ViewBox
    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style lang='scss'>
  .me-box {
    background-color: #ffffff;
    height: 6.4rem;
    position: relative;
    background-image: url(~img/me/top-bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    .title {
      display: flex;
      align-items: center;
      height: 1.253333rem;
      @include font-dpr(18px);
      color: #292929;
      .left,
      .right,
      .middle {
        text-align: center;
      }
      .left,
      .right {
        width: 1.333333rem;
      }
      .middle {
        flex: 1;
      }
    }
    .me-info {
      position: absolute;
      background: #ffffff;
      top: 2.226667rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      width: 9.2rem;
      height: 4.106667rem;
      border-radius: 0.133333rem;
      box-shadow: 0 1px 1px 1px rgba(#000000, 0.09);
      .avatar-box {
        position: absolute;
        color: #2b2b2b;
        text-align: center;
        left: 50%;
        top: -1.066667rem;
        transform: translateX(-50%);
        line-height: 1;
        .avatar {
          width: 2.133333rem;
          height: 2.133333rem;
          margin-bottom: 0.213333rem;
          border-radius: 50%;
        }
        .name {
          @include font-dpr(14px);
          margin-bottom: 12px;
        }
        .level {
          @include font-dpr(12px);
        }
      }
      .num-info {
        margin-top: 1.36rem;
        display: flex;
        text-align: center;
        .num {
          flex: 1;
          line-height: 1;
          .tit {
            @include font-dpr(14px);
            margin-bottom: 0.4rem;
          }
          .count {
            @include font-dpr(14px);
            margin-bottom: 0.373333rem;
          }
        }
      }
    }
  }

  .order-term {
    background: #ffffff;
    color: #2b2b2b;
    padding-bottom: 0.4rem;
    .title {
      @include font-dpr(15px);
      padding: 0.426667rem 0 0.426667rem 0.426667rem;
    }
    .order-terms {
      display: flex;
      .order-term-item {
        text-align: center;
        flex: 1;
        line-height: 1;
        .icon {
          @include font-dpr(22px);
          margin-bottom: 0.32rem;
        }
        .text {
          @include font-dpr(12px);
        }
      }
    }
  }

  .oplist {
    .point {
      @include font-dpr(12px);
      color: #ffffff;
      background: #de3232;
      border-radius: 0.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      padding: 0 0.2rem;
      margin-right: 0.4rem;
    }
  }

</style>
