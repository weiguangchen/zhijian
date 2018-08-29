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
      <!-- <mu-stepper :active-step='1' orientation="vertical" >
        <mu-step>
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
      <div class="mine-stepper">
        <div class="mine-step">
          <div class="mine-num">
            <span class="circle"></span>
            <span class="mine-label">自动退款</span>
          </div>
          <div class="mine-main">
            <div class="mine-line"></div>
            <div class="mine-content">
              <p>您访问富瀚微复合物费覅额分解我分解为IE服务魏就饿哦附件为附件为偶发金额为 </p>
              <p>2392309209320329392039099099</p>
            </div>
          </div>
        </div>
        <div class="mine-step">
          <div class="mine-num">
            <span class="circle"></span>
            <span class="mine-label">自动退款</span>
          </div>
          <div class="mine-main">
            <div class="mine-line"></div>
            <div class="mine-content">
              <p>您访问富瀚微复合物费覅额分解我分解为IE服务魏就饿哦附件为附件为偶发金额为 </p>
              <p>2392309209320329392039099099</p>
            </div>
          </div>
        </div>
        <div class="mine-step">
          <div class="mine-num mine-num-active">
            <span class="circle"></span>
            <span class="mine-label">自动退款</span>
          </div>
          <div class="mine-main">
            <div class="mine-content">
              <p>您访问富瀚微复合物费覅额分解我分解为IE服务魏就饿哦附件为附件为偶发金额为 </p>
              <p>2392309209320329392039099099</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';
  import {
    XButton,
    Group,
    Cell,
    Flow,
    FlowState,
    FlowLine
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
      betterScroll,
      Flow,
      FlowState,
      FlowLine
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
        font-size: .373333rem/* 28/75 */
        ;
        margin-bottom: .533333rem /* 40/75 */;
      }
      .mine-stepper {
        .mine-step {
          // display: flex;
          .mine-num {
            line-height: 1;
            display: flex;
            align-items: center;
            font-size: .346667rem/* 26/75 */
            ;
            .circle {
              width: .533333rem/* 40/75 */
              ;
              display: flex;
              justify-content: center;
              &::before {
                content: '';
                display: block;
                width: .32rem/* 24/75 */
                ;
                height: .32rem/* 24/75 */
                ;
                border-radius: 50%;
                background: #bfbfbf;
              }

            }

          }
          .mine-num-active{
            color: #48b2e7;
            .circle{
              &::before{
                 background: #48b2e7;
              }
             
            }
          }
          .mine-main {
            position: relative;
            width: 6.666667rem/* 500/75 */
            ;
            color: #aaaaaa;
            display: flex;
            flex: 1;
            padding: .266667rem/* 20/75 */
            0 .266667rem/* 20/75 */
            .533333rem/* 40/75 */
            ;
            .mine-line {
              position: absolute;
              height: 100%;
              width: 1px;
              top: 0;
              left: .266667rem/* 20/75 */
              ;
              border-left: 1px solid #bfbfbf;


            }
          }
        }

      }
      padding: 10px 15px;
      background: #ffffff;
      flex: 1;
    }

  }

</style>
