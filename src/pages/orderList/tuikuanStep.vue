<template>
  <div class="page tuikuan-step">
    <Group class="info">
      <Cell title='商家名称'>{{orderDetail.shop_name}}</Cell>
      <Cell title='订单号码'>{{orderDetail.order_num}}</Cell>
      <Cell title='下单时间'>{{orderDetail.data}}</Cell>
      <Cell title='约定服务时间'>{{orderDetail.fwy_fw_time}}</Cell>
      <Cell title='退还服务' v-if="zf == 1">{{orderDetail.fw_mingzi}}</Cell>
      <Cell title='退还账户' v-if="zf == 0">
        <span class="user">
          <img :src="orderDetail.user_content.headimgurl" alt="" class="avatar">{{orderDetail.user_content.nickname}}</span>
      </Cell>
      <Cell title='退款金额' v-if="zf == 0">
        <span class="price">￥{{orderDetail.order_price}}</span>
      </Cell>
    </Group>
    <div class="steps">
      <h1>退款流程</h1>


      <stepper v-if="orderDetail.tui_status == 0">
        <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step>
      </stepper>
      <stepper v-if="orderDetail.tui_status == 1">
        <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step>
        <step>商家回复
          <div slot="content">
            <p>商家已同意您的退款申请，等待平台审核 </p>
            <p>{{orderDetail.tui_two_time}}</p>
          </div>
        </step>
      </stepper>
      <stepper v-if="orderDetail.tui_status == 2">
        <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step>
        <step>商家回复
          <div slot="content">
            <p>商家已拒绝您的退款申请 </p>
            <p>{{orderDetail.tui_two_time}}</p>
          </div>
        </step>
        <step>退款失败
          <div slot="content">
            <p>您的退款失败，如有疑问请联系商家解决 </p>
          </div>
        </step>
      </stepper>
      <stepper v-if="orderDetail.tui_status == 3">
        <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step>
        <step>商家回复
          <div slot="content">
            <p>商家已同意您的退款申请，等待平台审核 </p>
            <p>{{orderDetail.tui_two_time}}</p>
          </div>
        </step>
        <template v-if="zf == 1">
          <step>审核结果
            <div slot="content">
              <p>您的退款申请已通过审核，稍后将为您退单 </p>
              <p>{{orderDetail.tui_three_time}}</p>
            </div>
          </step>
          <step>退款成功
            <div slot="content">
              <p>您的本次服务已退还至支付活动卡 </p>
            </div>
          </step>
        </template>
        <template v-else-if="zf == 0">
          <step>审核结果
            <div slot="content">
              <p>您的退款申请提交成功，稍后将为您退款。 </p>
              <p>{{orderDetail.tui_three_time}}</p>
            </div>
          </step>

          <step>退款中
            <div slot="content">
              <p>您的退款将在1-3个工作日之内退回您的支付账户 </p>
            </div>
          </step>
          <step>退款成功
            <div slot="content">
              <p>您的退款￥{{orderDetail.order_pirce}}已成功推至您的支付账户 </p>
            </div>
          </step>
        </template>

      </stepper>
      <stepper v-if="orderDetail.tui_status == 4">
        <step>提交成功
          <div slot="content">
            <p>您的退款申请提交成功，等待商家回复 </p>
            <p>{{orderDetail.tui_one_time}}</p>
          </div>
        </step>
        <step>商家回复
          <div slot="content">
            <p>商家已同意您的退款申请，等待平台审核 </p>
            <p>{{orderDetail.tui_two_time}}</p>
          </div>
        </step>
        <step>审核结果
          <div slot="content">
            <p>平台已拒绝您的退款申请 </p>
            <p>{{orderDetail.tui_three_time}}</p>
          </div>
        </step>
        <step>退款失败</step>
      </stepper>

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
      .user {
        display: flex;
        align-items: center;
        .avatar {
          width: .6rem/* 45/75 */
          ;
          height: .6rem/* 45/75 */
          ;
          border-radius: 50%;
          margin-right: .4rem/* 30/75 */
          ;
        }
      }
      .price {
        color: #dd3231;
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
