<template>
  <div class="page tuikuan-step">
    <Group class="info">
      <Cell title='商家名称'>选车好听汽车维修保养生活馆</Cell>
      <Cell title='订单号码'>23903903223</Cell>
      <Cell title='下单时间'>2018-2323323</Cell>
      <Cell title='约定服务时间'>j2323232323232</Cell>
      <Cell title='退还服务'>fwhfiewfdhewufhewiufhewfuiew</Cell>
    </Group>
    <div class="steps">
      <h1>退款流程</h1>
      <iview-steps :current="0" direction="vertical">
          <iview-step title='提交成功'>
              123456
          </iview-step>
          <iview-step title='提交成功' content='6543211'>
          </iview-step>
          <iview-step title='提交成功'>
              123456
          </iview-step>
      </iview-steps>
      <!-- <mu-stepper  :active-step='1' orientation="vertical" :linear='false'>
          <mu-step >
              <mu-step-label>提交成功</mu-step-label>
              <mu-step-content>
                  <p>您的退款申请提交成功，请等待平台审核</p>
                  <p>2018.7.30 18:00:00</p>
              </mu-step-content>
          </mu-step>
          <mu-step>
              <mu-step-label>商家回复</mu-step-label>
              <mu-step-content>
                  <p>商家已同意您的退单申请。稍后将为您退单</p>
                  <p>2018.7.30 18:00:00</p>
              </mu-step-content>
          </mu-step>
          <mu-step>
              <mu-step-label>退款成功</mu-step-label>
              <mu-step-content>
                  <p>你的本次服务已退还至支付活动卡</p>
              </mu-step-content>
          </mu-step>
      </mu-stepper> -->
    </div>
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';
  import {
    XButton,
    Group,
    Cell
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
          .get("/Api/UserShow/order_content1", {
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
          .get("/Api/UserShow/order_content", {
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
      tuikuan() {
        this.$router.push({
          path: '/me/tuikuan',
          query: {
            order_num: this.order_num,
            type: this.zf
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
      Group,
      Cell,
      betterScroll
    }
  };

</script>

<style lang='scss'>
  .tuikuan-step {
    display: flex;
    flex-direction: column;
    .info {
      margin-bottom: $bot;
      .weui-cells {
        font-size: .373333rem/* 28/75 */
        ;
        margin-top: 0;
        font-weight: bold;
        &:after,
        &::before {
          display: none;
        }
      }
      .weui-cell {
        &::before {
          display: none;
        }
      }
      .weui-cell__ft {
        color: #000000;
        font-weight: normal;
      }
      .vux-cell-bd {
        width: 2.666667rem/* 200/75 */
        ;
        flex: none;
      }
    }
    .steps {
      h1 {
        font-size: .373333rem/* 28/75 */;
      }
      background: #ffffff;
      padding: 10px 15px;
      flex: 1;
    }
  }

</style>
