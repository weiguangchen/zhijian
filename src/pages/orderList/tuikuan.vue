<template>
  <div class="page tuikuan">
    <betterScroll>
      <Group>
        <Cell title='退款原因：'></Cell>
        <XTextarea autosize placeholder='填写退款原因（选填）' v-model="textarea"></XTextarea>
      </Group>
      <Group>
        <Cell title='退款来源：'></Cell>
        <Radio :options="tkType" v-model="tk" disabled></Radio>
      </Group>
      <Group>
        <Cell title='退款金额' class="price">{{price}}</Cell>
      </Group>
      <Group>
        <div class="order-item">
          <div class="title" @click="toMendian(orderDetail.face_face)">
            <span class="shop-name">
              <i class="iconfont icon-dianpu"></i>{{orderDetail.shop_name}}
              <i class="iconfont icon-jinru"></i>
            </span>
          </div>
          <div class="content" @click="toDetail(orderDetail.fw_id,orderDetail.face_face)">
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
      </Group>
    </betterScroll>
    <XButton type='warn' class="Xbtn" :disabled='submiting' @click.native='submit'>提交</XButton>
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';
  import {
    XButton,
    XTextarea,
    Group,
    Cell,
    Radio
  } from "vux";
  export default {
    data() {
      return {
        submiting: false,
        orderDetail: {},
        tkType: [{
          key: 0,
          value: '退款至您的支付账户'
        }, {
          key: 1,
          value: '退还服务致您的支付活动卡'
        }],
        tk: '',
        textarea: ''
      };
    },
    created() {
      var _this = this;
      this.tk = this.zf;
      this.get_info();
    },
    methods: {
      get_info() {
        if (this.zf == 1) {
          this.$axios
            .get("/Api/UserShow/order_content1", {
              params: {
                order_num: this.order_num
              }
            })
            .then(res => {
              console.log(res);
              this.orderDetail = res.data[0];

            });
        } else {
          this.$axios
            .get("/Api/UserShow/order_content", {
              params: {
                order_num: this.order_num
              }
            })
            .then(res => {
              console.log(res);
              this.orderDetail = res.data[0];
            });
        }
      },
      pingjia(orderId) {
        console.log(orderId);
        this.$router.push({
          path: "/me/pingjia/" + orderId,
          query: {
            type: this.zf
          }
        });
      },
      toDetail(id, faceId) {
        this.$router.push({
          path: '/serviceDetail/' + id + '/' + faceId
        });
      },
      toMendian(id) {
        this.$router.push({
          path: '/shangpu/' + id
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
            _this.$axios.get("/Api/Order/yes_ok", {
              params: {
                zf: _this.zf,
                id: _this.orderDetail.id
              }
            }).then(({
              data
            }) => {
              console.log(data)
              _this.$vux.alert.show({
                title: '提示',
                content: '已确认服务！',
                onHide() {
                  _this.$router.replace({
                    path: '/me/orderList/6'
                  })
                }
              })
            })
          }
        })

      },
      submit() {
        this.submiting = true;
        this.$axios.get('/Api/Tk/tui_kuan',{
            params:{
                zf:this.zf,
                order_id:this.order_num,
                ly:this.textarea
            }
        }).then(({data})=>{
            this.submiting = false;
            console.log(data)
        })
      }
    },
    computed: {
      order_num() {
        return this.$route.query.order_num;
      },
      zf() {
        return this.$route.query.type;
      },
      price() {
        return this.zf == 0 ? `￥${this.orderDetail.order_price}` : '活动卡支付';
      }
    },

    components: {
      XButton,
      XTextarea,
      Group,
      Cell,
      Radio,
      betterScroll
    }
  };

</script>

<style lang='scss'>
  .tuikuan {
      padding-bottom: 50px;
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
        background: #f3f3f3;
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
    .weui-textarea {
      font-size: .373333rem/* 28/75 */
      ;
      &::-webkit-input-placeholder {
        font-size: .373333rem/* 28/75 */
        ;
      }
    }
    .price{
        .weui-cell__ft{
            font-size: .373333rem /* 28/75 */;
            color: #dd3231;
        }
    }
    .vux-no-group-title {
      margin-top: 0;
      margin-bottom: $bot;
    }
    .vux-label {
      font-size: .373333rem/* 28/75 */
      ;
      font-weight: bold;
    }
    .weui-cell_radio {
      font-size: .373333rem/* 28/75 */
      ;
    }
    .Xbtn {
      position: fixed;
      left: 0;
      bottom: 0;
    }
  }

</style>
