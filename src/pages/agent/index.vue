<template>
    <div class="page">
        <ViewBox>
            <div class="me-box">
                <div class="title">
                    <span class="left"></span>
                    <span class="middle">个人中心</span>
                    <span class="right">
                        <span class="iconfont icon-shezhi"></span>
                    </span>
                </div>
                <div class="me-info">
                    <div class="avatar-box">
                        <img :src="userinfo.headimgurl" alt="" class="avatar">
                        <div class="name">{{userinfo.nickname}}</div>
                        <div class="level" v-if="userinfo.dl[0].dl_jb == 1">股东代理</div>
                        <div class="level" v-else-if="userinfo.dl[0].dl_jb == 2">市级代理</div>
                        <div class="level" v-else-if="userinfo.dl[0].dl_jb == 3">区级代理</div>
                    </div>
                    <div class="num-info">
                        <div class="num">
                            <div class="tit">余额</div>
                            <div class="count">1080.10</div>
                            <XButton :mini='true' type='warn'>提现</XButton>
                        </div>
                        <div class="num">
                            <div class="tit">佣金</div>
                            <div class="count">210.00</div>
                            <XButton :mini='true' type='warn'>查看</XButton>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-term">
                <div class="title">我的订单</div>
                <div class="order-terms">
                    <div class="order-term-item" v-if="userinfo.dl[0].dl_jb == 1">
                        <div class="icon">
                            <span class="iconfont icon-shijidaili"></span>
                        </div>
                        <div class="text">市级代理</div>
                    </div>
                    <div class="order-term-item" v-if="userinfo.dl[0].dl_jb == 1||userinfo.dl[0].dl_jb == 2">
                        <div class="icon">
                            <span class="iconfont icon-quxiandaili"></span>
                        </div>
                        <div class="text">区县代理</div>
                    </div>
                    <div class="order-term-item" @click="add_jms" v-if="userinfo.dl[0].dl_jb == 3">
                        <div class="icon">
                            <span class="iconfont icon-jiamengshang"></span>
                        </div>
                        <div class="text">加盟商</div>
                    </div>

                </div>
            </div>
            <div class="oplist">
                <Group>
                    <Cell title='添加代理商' :is-link='true' link='/addAgent' v-if="userinfo.dl[0].dl_jb != 3 ">
                    </Cell>
                    <Cell title='我的代理商' :is-link='true'>
                    </Cell>
                    <Cell title='我的加盟商' :is-link='true'>
                    </Cell>
                    <Cell title='我的报表' :is-link='true'>
                    </Cell>
                    <Cell title='我的钱包' :is-link='true'>
                    </Cell>
                </Group>
            </div>
        </ViewBox>
    </div>
</template>

<script>
import { XButton, Group, Cell, ViewBox } from "vux";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {};
  },
  methods: {
    add_jms() {
      this.$router.push("/addJms");
    }
  },
  components: { XButton, Group, Cell, ViewBox },
  mixins: [checkLogin]
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
    z-index: 200;
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