<template>
  <div class="page order-list-box">
    <Layout>
      <InfiniteScroll :callback="loadList" ref="infinitescroll">
        <div class="order-list" slot="list">
          <div class="order-item" v-for="(item,index) in orderList" :key="index">
            <div class="title">
              <span class="shop-name">
                <i class="iconfont icon-dianpu"></i>{{item.shop_name}}
                <i class="iconfont icon-jinru"></i>
              </span>
              <!-- <span class="status" v-if="item.status == 0">等待付款</span> -->
              <span class="status" v-if="item.status == 1">未使用</span>
              <span class="iconfont icon-lajixiang" v-else-if="item.status == 2"></span>
              <span class="status" v-else-if="item.status == 3">申请退款中</span>
              <span class="status" v-else-if="item.status == 4">已退款</span>
              <span class="status" v-else-if="item.status == 5">已过期</span>
            </div>
            <div class="content" @click="toOrderDetail(item.order_num,item.zf)">
              <img :src="item.fw_img" alt="" class="thumb">
              <div class="text">{{item.fw_mingzi}}</div>
            </div>
            <div class="price">
              <span class="count">共1件商品</span>
              <span v-if="item.zf != 1">需付款：¥{{item.order_price}}</span>
            </div>
            <div class="xbtn">
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 0">去支付</XButton>
              <template v-if="item.status == 1">
                <!-- <XButton :mini='true' :plain='true' type='warn' class="btn">去使用</XButton> -->
                <XButton :mini='true' :plain='true' type='warn' class="btn" @click.native="pingjia(item.order_num,item.zf)">去评价</XButton>
              </template>
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 2">再次购买</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" :disabled='true' v-if="item.status == 3">退款中</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 4">再次购买</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 5">再次购买</XButton>
            </div>
          </div>
        </div>
        <span slot="doneTip">暂无更多订单</span>
      </InfiniteScroll>
    </Layout>
  </div>
</template>

<script>
  import {
    InfiniteScroll
  } from "vue-ydui/dist/lib.px/infinitescroll";
  import {
    Layout
  } from "vue-ydui/dist/lib.px/layout";
  import checkLogin from "@/mixins/checkLogin.js";
  import {
    XButton,
    ViewBox
  } from "vux";
  export default {
    data() {
      return {
        p: 1,
        orderList: []
      };
    },
    created() {
      this.resetList();
      console.log("orderStatus:" + this.orderStatus);

      if (this.orderStatus == 6) {
        document.title = "全部订单";
      } else if (this.orderStatus == 2) {
        document.title = "已完成订单";
      } else if (this.orderStatus == 1) {
        document.title = "未使用订单";
      } else if (this.orderStatus == 0) {
        document.title = "未付款订单";
      } else if (this.orderStatus == 2) {
        document.title = "未评论订单";
      } else if (this.orderStatus == 7) {
        document.title = "已评论订单";
      }
    },
    watch: {
      $route(to, from) {
        console.log(to);
        // this.resetList();
      }
    },
    components: {
      XButton,
      ViewBox,
      InfiniteScroll,
      Layout
    },
    methods: {
      toOrderDetail(order_num, type) {
        this.$router.push({
          path: "/me/orderDetail",
          query: {
            type,
            order_num
          }
        });
      },
      getOrderList() {
        var _this = this;
        // jf=0微信支付if=1卡支付
        return this.$axios
          .get(this.API_URL + "/Api/UserShow/get_order", {
            params: {
              uid: _this.id,
              status: _this.orderStatus,
              num: 8,
              p: _this.p
            }
          })
          .then(({
            data
          }) => {
            console.log(this);
            if (data.ok == 1) {
              _this.p++;
            } else if (data.ok == 0) {
              _this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
            }
            _this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
            return data;
          });
      },
      appendList() {
        this.getOrderList().then(res => {
          this.orderList = this.orderList.concat(res.list);
        });
      },
      resetList() {
        this.getOrderList().then(res => {
          this.orderList = res.list;
        });
      },
      pingjia(orderId,type) {
        console.log(orderId);
        this.$router.push({
          path:"/me/pingjia/" + orderId,
          query:{
            type
          }
        });
      },
      loadList() {
        console.log("到底了");
        this.getOrderList().then(res => {
          this.orderList = this.orderList.concat(res.list);
        });
      }
    },
    computed: {
      orderStatus() {
        return this.$route.params.orderStatus;
      }
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-list-box {
    box-sizing: border-box;
    padding-bottom: 50px;
  }

  .order-list {
    .order-item {
      background: #ffffff;
      margin-top: $bot;
      @include font-dpr(12px);
      .title {
        color: #2b2b2b;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.866667rem;
        padding: 0 0.4rem;
        .shop-name {
          .icon-dianpu {
            margin-right: 0.186667rem;
          }
          .icon-jinru {
            @include font-dpr(12px);
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
        background: #f1f2f6;
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
      .xbtn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 1.173333rem;
        padding-right: 0.4rem;
        .btn {
          margin: 0 0 0 0.266667rem;
        }
      }
    }
  }

</style>
