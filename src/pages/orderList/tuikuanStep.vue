<template>
  <div class="page tuikuan-step">
    <Group class="info">
      <Cell title='商家名称'>{{orderDetail.shop_name}}</Cell>
      <Cell title='订单号码'>{{orderDetail.order_num}}</Cell>
      <Cell title='下单时间'>{{orderDetail.data}}</Cell>
      <Cell title='约定服务时间'>{{orderDetail.fwy_fw_time}}</Cell>
      <Cell title='退还服务'>{{orderDetail.fw_mingzi}}</Cell>
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

      <!-- <step :level='1' :orderDetail='orderDetail'>
        <span>111</span>
        <div>2222</div>
        <i>333</i>
      </step> -->

      <stepper :orderDetail='orderDetail' :zf='zf'>
        <!-- <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step>
         <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step> -->
      </stepper>

      <!-- <div class="mine-stepper">
        <div class="mine-step">
          <div class="mine-num">
            <span class="circle"></span>
            <span class="mine-label">提交成功</span>
          </div>
          <div class="mine-main">
            <div class="mine-line"></div>
            <div class="mine-content">
              <p>您的退款申请提交成功，等待商家回复 </p>
              <p>{{orderDetail.tui_one_time}}</p>
            </div>
          </div>
        </div>
        <div class="mine-step" v-if="orderDetail.tui_status == 0">
          <div class="mine-num">
            <span class="circle"></span>
            <span class="mine-label">商家回复</span>
          </div>
          <div class="mine-main">
            <div class="mine-line"></div>
            <div class="mine-content">
              <p>商家已拒绝您的退单申请 </p>
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
      </div> -->
    </div>
  </div>
</template>

<script>
  import stepper from './components/stepper.vue';
  import step from './components/step.vue';
  import betterScroll from '@/components/betterScroll';
  import {
    XButton,
    Group,
    Cell,

  } from "vux";
  export default {
    data() {
      return {
        orderDetail: {}
      };
    },
    created() {
      var _this = this;
      this.get_info();

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
      },
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
      }
    },
    computed: {
      order_num() {
        return this.$route.query.order_num;
      },
      zf() {
        return this.$route.query.zf;
      }

    },
    components: {
      XButton,
      Group,
      Cell,
      betterScroll,
      stepper,
      step
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
        margin-bottom: .533333rem/* 40/75 */
        ;
      }
  
      padding: 10px 15px;
      background: #ffffff;
      flex: 1;
    }

  }

</style>
