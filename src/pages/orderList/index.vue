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
              <!-- <span class="iconfont icon-lajixiang" v-else-if="item.status == 2 || item.status == 7"></span> -->
              <span class="status" v-else-if="item.status == 3">待处理</span>
              <span class="status" v-else-if="item.status == 4">
                <template v-if="item.is_us && item.is_us == 0">商户退款</template>
                <template v-if="item.is_us && item.is_us == 1">用户退款</template> 
              </span>
              <span class="status" v-else-if="item.status == 5">已过期</span>
              <span class="status" v-else-if="item.status == 2 || item.status == 7">已完成</span>
            </div>
            <div class="content" @click="toOrderDetail(item.order_num,item.zf)">
              <img :src="item.fw_img" alt="" class="thumb">
              <div class="text">
                <span class="fw-mingzi">{{item.fw_mingzi}}</span>
                <div class="sub-content">{{item.sub_content}}</div>
              </div>
            </div>
            <div class="price">
              <span class="date">{{item.date}}</span>

              <span>
                <span class="count">共1件商品</span>
                <template v-if="item.zf != 1">实付款：¥{{item.order_price}}</template>
                <template v-else>活动卡支付</template>
              </span>
            </div>
            <div class="xbtn">
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 3" @click.native="toTuikuan(item.order_num,item.zf)">查看进度</XButton>
              <!-- <template v-if="item.status == 1">
                <XButton :mini='true' :plain='true' type='warn' class="btn">去使用</XButton>
                <XButton :mini='true' :plain='true' type='warn' class="btn" @click.native="pingjia(item.order_num,item.zf)">去评价</XButton>
              </template> -->
              <!-- <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 1">去退款</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 2" @click.native="buy(item.shop_fw_id)">再次购买</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" :disabled='true' v-if="item.status == 3">退款中</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 4"  @click.native="buy(item.shop_fw_id)">再次购买</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="item.status == 5"  @click.native="buy(item.shop_fw_id)">再次购买</XButton> -->
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
    mapMutations
  } from 'vuex';
  import betterScroll from '@/components/betterScroll'
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
      // this.SET_ISLOADING(true);
      // this.$eruda.init();
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
    mounted() {
      this.resetList();

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
      Layout,
      betterScroll
    },
    methods: {
      ...mapMutations(['SET_ISLOADING']),
      toOrderDetail(order_num, type) {
        if (this.orderStatus == 4) {
          // 已退款
          this.$router.push({
            path: '/me/tuikuanStep',
            query: {
              order_num,
              zf:type
            }
          })
        } else {
          this.$router.push({
            path: "/me/orderDetail",
            query: {
              type,
              order_num
            }
          });
        }

      },
      getOrderList() {
        var _this = this;

        console.log('id')
        console.log(this.id)
        // jf=0微信支付if=1卡支付
        return this.$axios
          .get("/Api/UserShow/get_order", {
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
            // this.SET_ISLOADING(false);
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
      pingjia(orderId, type) {
        console.log(orderId);
        this.$router.push({
          path: "/me/pingjia/" + orderId,
          query: {
            type
          }
        });
      },
      loadList() {
        console.log("到底了");
        this.getOrderList().then(res => {
          this.orderList = this.orderList.concat(res.list);
        });
      },
      buy(id) {
        console.log(id)
        this.$router.push({
          path: '/serviceDetail/' + id
        })
      },
      toTuikuan(order_num, zf) {
        this.$router.push({
          path: '/me/tuikuanStep',
          query: {
            order_num,
            zf
          }
        })
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
          height: 2.666667rem;
          margin-right: 0.266667rem;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @include font-dpr(14px);
          line-height: 0.506667rem;
          flex: 1;
          padding-top: .266667rem
            /* 20/75 */
          ;

          .fw-mingzi {
            font-size: .346667rem
              /* 26/75 */
            ;
            font-weight: bold;
          }

          .sub-content {
            font-size: .293333rem
              /* 22/75 */
            ;
          }
        }
      }

      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.173333rem;
        border-bottom: 1px solid #f0f0f0;
        padding: 0 0.4rem;
        @include font-dpr(14px);

        .count {
          margin-right: 0.426667rem;
        }

        .date {
          font-size: .32rem
            /* 24/75 */
          ;
          color: #a6a6a6;
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
