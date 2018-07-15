<template>
  <div class="page c-order">
    <div class="order-detail">
      <div class="order-time">
        <span v-if="orderDetail.status == 1">未使用订单</span>
        <span v-else-if="orderDetail.status == 0">未付款订单</span>
        <span v-else-if="orderDetail.status == 2">已完成订单</span>

        <!-- <span>剩余：20小时59分钟</span> -->
      </div>
      <!-- <div class="address">
        <div class="shr">
          <span class="sh-user">
            <i class="iconfont icon-weizhi1"></i>孙宇</span>
          <span class="sh-phone">18701032977</span>
        </div>
        <div class="add">地址：天津市河东区十一经路卓越大厦1号楼天津市河东区十一经路卓越大厦1号楼</div>
      </div> -->
      <div class="order-item">
        <div class="title">
          <span class="shop-name">
            <i class="iconfont icon-dianpu"></i>{{orderDetail.shop_name}}
            <i class="iconfont icon-jinru"></i>
          </span>
        </div>
        <div class="content" @click="toDetail(orderDetail.shop_fw_id)">
          <img :src="orderDetail.fw_img" alt="" class="thumb">
          <div class="text">{{orderDetail.fw_mingzi}}</div>
        </div>
        <div class="price">
          <span class="count">共1件商品</span>
          <span v-if="type == 0">需付款：¥{{orderDetail.order_price}}</span>
        </div>
      </div>
      <div class="order-info">
        <div class="num">订单编号：{{orderDetail.order_num}}</div>
        <div>下单时间：{{orderDetail.data}}</div>
      </div>
      <div class="xbtn">
        <span>消费码：{{orderDetail.pay_num}}</span>
        <div>
          <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 0">去支付</XButton>
          <XButton :mini='true' :plain='true' type='warn' class="btn" @click.native="pingjia(orderDetail.order_num)">去评价</XButton>
          <!-- <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 2">再次购买</XButton> -->
          <XButton :mini='true' :plain='true' type='warn' class="btn" :disabled='true' v-if="orderDetail.status == 3">退款中</XButton>
          <!-- <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 4">再次购买</XButton>
          <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 5">再次购买</XButton> -->
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {
    XButton
  } from "vux";
  export default {
    data() {
      return {
        orderDetail: {}
      };
    },
    created() {
      console.log(this.$route)
      var _this = this;
      if (this.type == 1) {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/order_content1", {
            params: {
              order_num: _this.order_num
            }
          })
          .then(res => {
            console.log(res);
            _this.orderDetail = res.data[0];
          });
      } else {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/order_content", {
            params: {
              order_num: _this.order_num
            }
          })
          .then(res => {
            console.log(res);
            _this.orderDetail = res.data[0];
          });
      }

    },
    methods: {
      pingjia(orderId) {
        console.log(orderId);
        this.$router.push({
          path:"/me/pingjia/" + orderId,
          query:{
            type:this.type
          }
        });
      },
      toDetail(id) {
        this.$toDetail(id);
      }
    },
    computed: {
      order_num() {
        return this.$route.query.order_num;
      },
      type() {
        return this.$route.query.type;
      }

    },
    components: {
      XButton
    }
  };

</script>

<style lang='scss'>
  .c-order {
    .order-detail {
      .order-time {
        display: flex;
        @include font-dpr(17px);
        padding: 0 0.4rem;
        align-items: center;
        justify-content: space-between;
        background: url(~img/public/order-bg.png) no-repeat;
        height: 1.6rem;
        color: #ffffff;
        margin-bottom: $bot;
      }
      .address {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: $bot;
        padding: 0 0.4rem;
        background: #ffffff;
        height: 2rem;
        .shr {
          display: flex;
          align-items: center;
          margin-bottom: 0.266667rem;
          @include font-dpr(14px);
          .sh-user {
            display: flex;
            align-items: center;
            margin-right: 1.066667rem;
            .iconfont {
              @include font-dpr(20px);
              color: #a7a7a7;
              margin-right: 0.266667rem;
            }
          }
        }
        .add {
          padding-left: 0.666667rem;
          color: #a7a7a7;
        }
      }
      .order-item {
        background: #ffffff;
        @include font-dpr(12px);
        margin-bottom: $bot;
        .title {
          color: #2b2b2b;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 0.866667rem;
          padding: 0 0.4rem;
          border-bottom: 1px solid #f0f0f0;
          .shop-name {
            .icon-dianpu {
              margin-right: 0.186667rem;
            }
            .icon-jinru {
              margin-left: 0.293333rem;
            }
            display: flex;
            align-items: center;
          }
          .status {
            color: #e14946;
          }
        }
        .content {
          display: flex;
          padding: 0.4rem;
          border-bottom: 1px solid #f0f0f0;
          .thumb {
            width: 2.666667rem;
            height: 2.133333rem;
            margin-right: 0.266667rem;
          }
          .text {
            display: flex;
            align-items: center;
            @include font-dpr(14px);
            line-height: 0.506667rem;
            flex: 1;
          }
        }
        .price {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 1.173333rem;
          border-bottom: 1px solid #f0f0f0;
          padding-right: 0.4rem;
          @include font-dpr(14px);
          .count {
            margin-right: 0.426667rem;
          }
        }
      }
      .order-info {
        margin-bottom: $bot;
        height: 1.4rem;
        color: #a6a6a6;
        padding-left: 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #ffffff;
        line-height: 1;
        .num {
          margin-bottom: 0.266667rem;
        }
      }
      .xbtn {
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        background: #ffffff;
        .btn {
          margin: 0 0 0 0.266667rem;
        }
      }
    }
  }

</style>
