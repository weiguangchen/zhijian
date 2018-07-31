<template>
  <div class="page c-order">
    <betterScroll>
      <div class="order-detail">
        <div class="order-time">
          <span v-if="orderDetail.status == 1">未使用订单</span>
          <span v-else-if="orderDetail.status == 2 || orderDetail.status == 7">已完成订单</span>
          <span v-else-if="orderDetail.status == 0">未付款订单</span>
        </div>
        <div class="address">
          <div class="shr">
            <span class="sh-user">
              <i class="iconfont icon-weizhi1"></i>{{orderDetail.xingming}}</span>
            <span class="sh-phone">{{orderDetail.phone}}</span>
          </div>
          <div class="add">地址：{{orderDetail.adress}}</div>
          <div class="add">车辆信息：{{orderDetail.car_card}}&nbsp;&nbsp;{{orderDetail.car_color}}&nbsp;&nbsp;{{orderDetail.car_xing}}&nbsp;&nbsp;</div>
        </div>
        <div class="order-item">
          <div class="title" @click="toMendian(orderDetail.fw_shop_id)">
            <span class="shop-name">
              <i class="iconfont icon-dianpu"></i>{{orderDetail.shop_name}}
              <i class="iconfont icon-jinru"></i>
            </span>
          </div>
          <div class="content" @click="toDetail(orderDetail.shop_fw_id)">
            <img :src="orderDetail.fw_img" alt="" class="thumb">
            <div class="text">
              <span class="fw-mingzi">{{orderDetail.fw_mingzi}}</span>
              <div class="sub-content">{{orderDetail.cub_content}}</div>
            </div>
          </div>
          <div class="price">
            <span class="count">共1件商品</span>
            <span v-if="zf == 0">需付款：¥{{orderDetail.order_price}}</span>
          </div>
        </div>
        <div class="order-info">
          <div class="num">订单编号：{{orderDetail.order_num}}</div>
          <div>下单时间：{{orderDetail.data}}</div>
        </div>
        <div class="qh-img" v-if="orderDetail.q_img && orderDetail.h_img">
          <h2>服务前照片</h2>
          <div class="fw-imgs">
            <div class="img-box" v-for="(item,index) in orderDetail.q_img" :key="index" @click='previewImg(item,orderDetail.q_img)'>
              <img :src="item" alt="" class="img">
            </div>
          </div>
          <h2>服务后照片</h2>
          <div class="fw-imgs">
            <div class="img-box" v-for="(item,index) in orderDetail.h_img" :key="index" @click='previewImg(item,orderDetail.h_img)'>
              <img :src="item" alt="" class="img">
            </div>
          </div>
          <div class="qr-btn" v-if="orderDetail.status  == 1">
            <div>
              <XButton :mini='true' :plain='true' type='warn' @click.native="queren">确认服务</XButton>
            </div>
          </div>
        </div>
        <div class="xbtn">
          <span>消费码：{{orderDetail.pay_num}}</span>
          <div>
            <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 0">去支付</XButton>
            <XButton :mini='true' :plain='true' type='warn' class="btn" @click.native="pingjia(orderDetail.order_num)" v-if="orderDetail.status == 2">去评价</XButton>
            <!-- <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 2">再次购买</XButton> -->
            <XButton :mini='true' :plain='true' type='warn' class="btn" :disabled='true' v-if="orderDetail.status == 3">退款中</XButton>
            <!-- <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 4">再次购买</XButton>
          <XButton :mini='true' :plain='true' type='warn' class="btn" v-if="orderDetail.status == 5">再次购买</XButton> -->
          </div>

        </div>
      </div>
    </betterScroll>


  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';
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
      if (this.zf == 1) {
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
          path: "/me/pingjia/" + orderId,
          query: {
            type: this.zf
          }
        });
      },
      toDetail(id) {
        // this.$toDetail(id);
      },
      toMendian(id){
        this.$router.push({
          path:'/shangpu/'+id
        })
      },
      previewImg(curimg, allimg) {
        this.$wx.previewImage({
          current: curimg, // 当前显示图片的http链接
          urls: allimg // 需要预览的图片http链接列表
        });
      },
      queren() {
        var _this = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认服务？',
          onCancel() {},
          onConfirm() {
            _this.$axios.get(_this.API_URL + "/Api/Order/yes_ok", {
              params: {
                zf: _this.zf,
                id: _this.orderDetail.id
              }
            }).then(({
              data
            }) => {
              console.log(data)
              _this.$vux.alert.show({
                title:'提示',
                content:'已确认服务！',
                onHide(){
                  _this.$router.replace({
                    path:'/me/orderList/6'
                  })
                }
              })
            })
          }
        })

      }
    },
    computed: {
      order_num() {
        return this.$route.query.order_num;
      },
      zf() {
        return this.$route.query.type;
      }

    },
    components: {
      XButton,
      betterScroll
    }
  };

</script>

<style lang='scss' scoped>
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
        padding: .266667rem/* 20/75 */
        0.4rem;
        background: #ffffff;
        min-height: 2rem;
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
        .add,
        .card {
          padding-left: 0.666667rem;
          color: #a7a7a7;
          line-height: 1.4;
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
              font-size: .346667rem/* 26/75 */
              ;
              margin-right: 0.186667rem;
            }
            .icon-jinru {
              margin-left: 0.293333rem;
              font-size: .16rem/* 12/75 */
              ;
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
            flex-direction: column;
            justify-content: space-between;
            @include font-dpr(14px);
            line-height: 0.506667rem;
            flex: 1;
            padding-top: .266667rem/* 20/75 */
            ;
            .fw-mingzi {
              font-size: .346667rem/* 26/75 */
              ;
              font-weight: bold;
            }
            .sub-content {
              font-size: .293333rem/* 22/75 */
              ;
            }
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
          font-weight: bold;
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
      .qh-img {
        padding: .4rem/* 30/75 */
        ;
        background: #ffffff;
        ;
        margin-bottom: $bot;
        h2 {
          font-size: .373333rem/* 28/75 */
          ;
          margin-bottom: .4rem/* 30/75 */
          ;
        }
        .fw-imgs {
          margin-bottom: .533333rem/* 40/75 */
          ;
          &:after {
            content: '';
            display: block;
            clear: both;
          }
          .img-box {
            float: left;
            width: 1.533333rem/* 115/75 */
            ;
            height: 1.533333rem/* 115/75 */
            ;
            overflow: hidden;
            margin-right: .933333rem/* 70/75 */
            ;
            .img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .qr-btn {
          display: flex;
          justify-content: flex-end;
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
