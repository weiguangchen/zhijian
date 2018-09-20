<template>
  <div class="page tuikuan-step">
    <betterScroll>
      <Group class="info">
        <Cell title='订单编号'>{{orderDetail.order_num}}</Cell>
        <Cell title='下单时间'>{{orderDetail.data}}</Cell>
        <Cell title='约定服务时间'>{{orderDetail.fwy_fw_time}}</Cell>
      </Group>
      <Group class="info">
        <Cell title='服务名称'>{{orderDetail.fw_mingzi}}</Cell>
        <Cell title='下单用户'>{{orderDetail.xingming}}</Cell>
        <Cell title='联系方式'>{{orderDetail.phone}}</Cell>
        <Cell title='地址'>{{orderDetail.adress}}</Cell>
        <Cell title='交易数量'>{{orderDetail.shop_num}}</Cell>
        <Cell title='交易金额'>{{orderDetail.fw_mingzi}}</Cell>
      </Group>
      <Group class="info">
        <XTextarea title='退款理由' :value='orderDetail.tui_ly' placeholder='无' disabled class="textarea"> </XTextarea>
      </Group>
      <div class="handler">
        <template v-if="orderDetail.tui_status == 0">
          <h3 v-if="zf == 1">退还服务到支付活动卡</h3>
          <template v-else>
            <Group class="info">
              <Cell title='退还金额'>￥{{orderDetail.order_price}}</Cell>
              <Cell title='退还账户'>
                <span class="user">
                  <img :src="orderDetail.user_content.headimgurl" alt="" class="avatar">{{orderDetail.user_content.nickname}}
                </span>
              </Cell>
            </Group>
          </template>
          <div class="btns">
            <XButton type='warn' :mini='true' @click.native="agree">同意</XButton>
            <XButton type='warn' :mini='true' @click.native='reject'>拒绝</XButton>
          </div>
        </template>
        <div class="stepper" v-else>
          <stepper v-if="orderDetail.tui_status == 1 && orderDetail.is_us == 1">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，等待回复。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>商家回复</p>
              <div slot="content">
                <p>商家已同意退单申请，等待平台审核</p>
                <p>{{orderDetail.tui_two_time}}</p>
              </div>
            </step>
          </stepper>
          <stepper v-if="orderDetail.tui_status == 1 && orderDetail.is_us == 0">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，请等待平台审核。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
          </stepper>

          <stepper v-if="orderDetail.tui_status == 2 && orderDetail.is_us == 1">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，请等待回复。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>商家回复</p>
              <div slot="content">
                <p>已拒绝退单申请</p>
                <p>{{orderDetail.tui_two_time}}</p>
              </div>
            </step>
            <step>
              <p>退单失败</p>
              <div slot="content">
                <p>本次退单失败。</p>
              </div>
            </step>
          </stepper>

          <stepper v-if="orderDetail.tui_status == 3  && orderDetail.is_us == 1 && zf == 1">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，等待回复。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>商家回复</p>
              <div slot="content">
                <p>已同意退单申请，等待平台审核</p>
                <p>{{orderDetail.tui_two_time}}</p>
              </div>
            </step>
            <step>
              <p>审核结果</p>
              <div slot="content">
                <p>退款申请已通过审核</p>
                <p>{{orderDetail.tui_three_time}}</p>
              </div>
            </step>
            <step>
              <p>退单成功</p>
              <div slot="content">
                <p>本次服务已退还至支付活动卡。</p>
              </div>
            </step>
          </stepper>
          <stepper v-if="orderDetail.tui_status == 3  && orderDetail.is_us == 0 && zf == 1">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，请等待平台审核。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>审核结果</p>
              <div slot="content">
                <p>退款申请已通过审核</p>
                <p>{{orderDetail.tui_three_time}}</p>
              </div>
            </step>
            <step>
              <p>退单成功</p>
              <div slot="content">
                <p>已经取消订单，并向用户退还服务至活动卡</p>
              </div>
            </step>
          </stepper>
          <stepper v-if="orderDetail.tui_status == 3  && orderDetail.is_us == 1 && zf == 0">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，等待回复。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>商家回复</p>
              <div slot="content">
                <p>商家已同意退单申请</p>
                <p>{{orderDetail.tui_two_time}}</p>
              </div>
            </step>
            <step>
              <p>审核结果</p>
              <div slot="content">
                <p>退款申请已通过审核</p>
                <p>{{orderDetail.tui_three_time}}</p>
              </div>
            </step>
            <step>
              <p>退款中</p>
              <div slot="content">
                <p>退款将在1-3个工作日之内退回支付账户</p>
              </div>
            </step>
            <step>
              <p>退单成功</p>
              <div slot="content">
                <p>退款已成功退至支付账户</p>
              </div>
            </step>
          </stepper>
          <stepper v-if="orderDetail.tui_status == 3  && orderDetail.is_us == 0 && zf == 0">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，请等待平台审核。</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>审核结果</p>
              <div slot="content">
                <p>退款申请已通过审核</p>
                <p>{{orderDetail.tui_three_time}}</p>
              </div>
            </step>
            <step>
              <p>退单成功</p>
              <div slot="content">
                <p>已经取消订单，并向用户全额退款</p>
              </div>
            </step>
          </stepper>


          <stepper v-if="orderDetail.tui_status == 4 && orderDetail.is_us == 1">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，等待平台审核</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>审核结果</p>
              <div slot="content">
                <p>退款申未通过审核</p>
                <p>{{orderDetail.tui_three_time}}</p>
              </div>
            </step>
            <step>
              <p>退单失败</p>
              <div slot="content">
                <p>本次退单失败</p>
              </div>
            </step>
          </stepper>
          <stepper v-if="orderDetail.tui_status == 4 && orderDetail.is_us == 0">
            <step>
              <p>提交成功</p>
              <div slot="content">
                <p>退单申请提交成功，等待平台审核</p>
                <p>{{orderDetail.tui_one_time}}</p>
              </div>
            </step>
            <step>
              <p>审核结果</p>
              <div slot="content">
                <p>退款申未通过审核</p>
                <p>{{orderDetail.tui_three_time}}</p>
              </div>
            </step>
            <step>
              <p>退单失败</p>
              <div slot="content">
                <p>本次退单失败</p>
              </div>
            </step>
          </stepper>
        </div>
        <!-- <template v-else-if='orderDetail.tui_status == 1'>
          <h3 v-if="zf == 1">已同意退还服务到支付活动卡</h3>
          <template v-else>
            <Group class="info">
              <Cell title='退还金额'>￥{{orderDetail.order_price}}</Cell>
              <Cell title='退还账户'>
                <span class="user">
                  <img :src="orderDetail.user_content.headimgurl" alt="" class="avatar">{{orderDetail.user_content.nickname}}
                </span>
              </Cell>
            </Group>
            <Group class="info">
              <Cell title='已同意退款'></Cell>
            </Group>
          </template>
        </template>
        <template v-else-if='orderDetail.tui_status == 2'>
          <h3 v-if="zf == 1">已拒绝退还服务到支付活动卡</h3>
          <template v-else>
            <Group class="info">
              <Cell title='退还金额'>￥{{orderDetail.order_price}}</Cell>
              <Cell title='退还账户'>
                <span class="user">
                  <img :src="orderDetail.user_content.headimgurl" alt="" class="avatar">{{orderDetail.user_content.nickname}}
                </span>
              </Cell>
            </Group>
            <Group class="info">
              <Cell title='已拒绝退款'></Cell>
            </Group>
          </template>
        </template> -->
      </div>


    </betterScroll>
  </div>
</template>

<script>
  import stepper from '@/pages/orderList/components/stepper';
  import step from '@/pages/orderList/components/step';
  import betterScroll from '@/components/betterScroll';
  import {
    XButton,
    Group,
    Cell,
    XTextarea
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
      agree() {
        var _this = this;
        this.$axios.get('/Api/Shop/sp_tui', {
          params: {
            zf: this.zf,
            order_id: this.order_num,
            tui_status: 1
          }
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            this.$vux.alert.show({
              title: '提示',
              content: '已同意',
              onHide() {
                _this.get_info();

              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: data.log,
            })
          }
        })
      },
      reject() {
        var _this = this;
        this.$axios.get('/Api/Shop/sp_tui', {
          params: {
            zf: this.zf,
            order_id: this.order_num,
            tui_status: 2
          }
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            this.$vux.alert.show({
              title: '提示',
              content: '已拒绝',
              onHide() {
                _this.get_info();

              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: data.log,
            })
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
      XTextarea,
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
        font-size: .373333rem
          /* 28/75 */
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
        width: 2.666667rem
          /* 200/75 */
        ;
        flex: none;
      }

      textarea:disabled {
        background: #ffffff;
      }

      .textarea {
        .weui-label {
          width: 2.666667rem
            /* 200/75 */
             !important;
          flex: none;
        }
      }
    }

    .handler {
      background: #ffffff;

      h3 {
        padding: 10px 15px;
        font-size: .453333rem
          /* 34/75 */
        ;
      }

      .btns {
        margin-top: 1.5rem;
        display: flex;
        justify-content: space-around;

        .weui-btn+.weui-btn {
          margin-top: 0;
        }
      }

      .user {
        display: flex;
        align-items: center;
      }

      .avatar {
        width: .64rem
          /* 48/75 */
        ;
        margin-right: .4rem
          /* 30/75 */
        ;
        border-radius: 50%;
      }

      .stepper {
        padding: 10px 15px;
      }
    }

    .steps {
      h1 {
        font-size: .373333rem
          /* 28/75 */
        ;
        margin-bottom: .533333rem
          /* 40/75 */
        ;
      }

      padding: 10px 15px;
      background: #ffffff;
      flex: 1;
    }

  }

</style>
