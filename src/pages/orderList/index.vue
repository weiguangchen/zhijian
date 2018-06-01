<template>
    <div class="page">
        <ViewBox v-if="orderList.length>0">
            <div class="order-item" v-for="(item,index) in orderList" :key="index">
                <div class="title">
                    <span class="shop-name">
                        <i class="iconfont icon-dianpu"></i>{{item.shop_name}}
                        <i class="iconfont icon-jinru"></i>
                    </span>
                    <span class="status" v-if="item.status == 0">等待付款</span>
                    <span class="status" v-else-if="item.status == 1">未使用</span>
                    <span class="iconfont icon-lajixiang" v-else-if="item.status == 2" ></span>
                    <span class="status" v-else-if="item.status == 3">申请退款中</span>
                    <span class="status" v-else-if="item.status == 4">已退款</span>
                    <span class="status" v-else-if="item.status == 5">已过期</span>
                </div>
                <div class="content">
                    <img :src="item.fw_img" alt="" class="thumb">
                    <div class="text">{{item.fw_mingzi}}</div>
                </div>
                <div class="price">
                    <span class="count">共1件商品</span>
                    <span>需付款：¥{{item.order_price}}</span>
                </div>
                <div class="xbtn">
                    <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 0">去支付</XButton>
                    <template v-if="item.status == 1">
                        <XButton :mini='true' :plain='true' type='warn' class="btn" >去使用</XButton>
                        <XButton :mini='true' :plain='true' type='warn' class="btn" @click.native="pingjia(item.order_num)">去评价</XButton>
                    </template>
                    <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 2">再次购买</XButton>
                    <XButton :mini='true' :plain='true' type='warn' class="btn" :disabled='true' v-if="item.status == 3">退款中</XButton>
                    <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 4">再次购买</XButton>
                    <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 5">再次购买</XButton>
                </div>
            </div>
        </ViewBox>
        <div v-else>
            暂无订单
        </div>
    </div>
</template>

<script>
import checkLogin from "@/mixins/checkLogin.js";
import { XButton, ViewBox } from "vux";
export default {
  data() {
    return {
      p: 1,
      orderList: []
    };
  },
  created() {
    this.resetList();
  },
  watch: {
    $route() {
      this.resetList();
    }
  },
  components: {
    XButton,
    ViewBox
  },
  methods: {
    getOrderList() {
      var _this = this;
      return this.$axios
        .get(this.API_URL + "/Api/UserShow/get_order", {
          params: {
            uid: _this.id,
            status: _this.orderStatus,
            num: 8,
            p: 1
          }
        })
        .then(({ data }) => {
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
    pingjia(orderId){
        console.log(orderId)
        this.$router.push('/me/pingjia/'+orderId)
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
        margin-left: 0.293333rem;
      }
      display: flex;
      align-items: center;
    }
    .status{
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
      margin: 0 .266667rem 0 0;
    }
  }
}
</style>