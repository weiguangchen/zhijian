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
                <div class="me-info" v-if="id">
                    <div class="avatar-box">
                        <img :src="userinfo.headimgurl" alt="" class="avatar">
                        <div class="name">{{userinfo.nickname}}</div>
                        <div class="level">普通会员</div>

                    </div>
                    <div class="num-info">
                        <div class="num">
                            <div class="tit">余额</div>
                            <div class="count">{{userinfo.user_money}}</div>
                            <XButton :mini='true' type='warn'>充值</XButton>
                        </div>
                        <div class="num">
                            <div class="tit">积分</div>
                            <div class="count">{{userinfo.user_jf}}</div>
                            <XButton :mini='true' type='warn'>兑换</XButton>
                        </div>
                    </div>
                </div>
                <div class="nologin me-info" v-else>
                    <div class="avatar-box">
                        <img src="~img/public/nologin.png" alt="" class="avatar">
                    </div>
                    <XButton type='warn' class='login' @click.native="login">点击使用微信登录</XButton>
                </div>
            </div>
            <div class="order-term" v-if="id">
                <div class="title">我的订单</div>
                <div class="order-terms">
                    <div class="order-term-item" @click="toOrderList(0)">
                        <div class="icon">
                            <span class="iconfont icon-weifukuan"></span>
                        </div>
                        <div class="text">未付款</div>
                    </div>
                    <div class="order-term-item" @click="toOrderList(1)">
                        <div class="icon">
                            <span class="iconfont icon-weishiyong"></span>
                        </div>
                        <div class="text">未使用</div>
                    </div>
                    <div class="order-term-item" @click="toOrderList(2)">
                        <div class="icon">
                            <span class="iconfont icon-yiwancheng"></span>
                        </div>
                        <div class="text">已完成</div>
                    </div>
                    <div class="order-term-item">
                        <div class="icon">
                            <span class="iconfont icon-tuikuandan"></span>
                        </div>
                        <div class="text">退款单</div>
                    </div>
                    <div class="order-term-item" @click="toOrderList(6)">
                        <div class="icon">
                            <span class="iconfont icon-quanbu"></span>
                        </div>
                        <div class="text">全部</div>
                    </div>
                </div>
            </div>
            <div class="oplist" v-if="id">
                <Group>
                    <Cell title='申请成为商户' link="shanghuApply">
                        <span class="iconfont icon-jinru"></span>
                    </Cell>
                    <Cell title='历史收藏'>
                        <span class="iconfont icon-jinru"></span>
                    </Cell>
                    <Cell title='我的优惠券'>
                        <span class="iconfont icon-jinru"></span>
                    </Cell>
                    <Cell title='待评价服务'>
                        <span class="iconfont icon-jinru"></span>
                    </Cell>
                    <Cell title='我的二维码'>
                        <span class="iconfont icon-jinru"></span>
                    </Cell>
                </Group>
            </div>
        </ViewBox>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { XButton, Group, Cell, ViewBox } from "vux";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    login() {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9ee7e36e84d8478&redirect_uri=http%3a%2f%2fzj.daonian.cn%2fApi%2fwechat%2fgetOpenId&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    },
    toOrderList(status) {
      this.$router.push("/me/orderList/" + status);
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
  .nologin {
    .login {
      margin-top: 2.16rem;
      @include font-dpr(15px);
      color: #fefefe;
      width: 5.013333rem;
      border-radius: 0.533333rem;
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
</style>