<script>
  import step from './step.vue';
  export default {
    data() {
      return {

      }
    },
    props: {
      orderDetail: {
        default () {
          return {}
        }
      },
      zf: {}
    },
    render(createElement) {


      var tijiao = createElement(step, {
        props: {
          title: "提交成功",
          content: "您的退款申请提交成功，等待商家回复。",
          time: this.orderDetail.tui_one_time
        }
      })
      var shopAgree = createElement(step, {
        props: {
          title: "商家回复",
          content: "商家已同意您的退款申请,请等待平台审核。",
          time: this.orderDetail.tui_two_time
        }
      })
      var shopReject = createElement(step, {
        props: {
          title: "商家回复",
          content: "商家已拒绝您的退款申请。",
          time: this.orderDetail.tui_two_time
        }
      })
      var platAgree = createElement(step, {
        props: {
          title: "审核结果",
          content: "您的退款申请已通过审核,稍后将为您退单",
          time: this.orderDetail.tui_three_time
        }
      })
      var platReject = createElement(step, {
        props: {
          title: "审核结果",
          content: "平台已拒绝您的退款申请。",
          time: this.orderDetail.tui_three_time
        }
      })
      var success = createElement(step, {
        props: {
          title: "退款成功",
          content: "你的本次服务已退还至支付活动卡",
          time: this.orderDetail.tui_one_time
        }
      })
      var fail = createElement(step, {
        props: {
          title: "退单失败",
          content: "您的本次退单失败",
          time: this.orderDetail.tui_one_time
        }
      })
      var tuikuaning = createElement(step, {
        props: {
          title: "退款中",
          content: "您的退款将在1-3个工作日之内退回您的支付账户",
          time: ''
        }
      })

      var VNode = [];
      if (this.orderDetail.tui_status == 0) {
        //   提交成功
        var tijiao = createElement(step, {
          props: {
            title: "提交成功",
            content: "您的退款申请提交成功，等待商家回复。",
            time: this.orderDetail.tui_one_time,
            active: true
          }
        })
        VNode = [tijiao]
      } else if (this.orderDetail.tui_status == 1) {
        //   商家同意
        var shopAgree = createElement(step, {
          props: {
            title: "商家回复",
            content: "商家已同意您的退款申请,请等待平台审核。",
            time: this.orderDetail.tui_two_time,
            active: true
          }
        })
        VNode = [tijiao, shopAgree]
      } else if (this.orderDetail.tui_status == 2) {
        //   商家拒绝
        var fail = createElement(step, {
          props: {
            title: "退单失败",
            content: "您的本次退单失败",
            time: this.orderDetail.tui_one_time,
            active: true
          }
        })
        VNode = [tijiao, shopReject, fail]
      } else if (this.orderDetail.tui_status == 3) {
        //   平台同意
        var success = createElement(step, {
          props: {
            title: "退款成功",
            content: "你的本次服务已退还至支付活动卡",
            time: this.orderDetail.tui_one_time,
            active: true
          }
        })
        if (this.zf == 0) {
          // 花钱购买
          VNode = [tijiao, shopAgree, platAgree, tuikuaning, success]
        } else {
          // 使用优惠券
          VNode = [tijiao, shopAgree, platAgree, success]

        }
      } else if (this.orderDetail.tui_status == 4) {
        //   平台拒绝
        var fail = createElement(step, {
          props: {
            title: "退单失败",
            content: "您的本次退单失败",
            time: this.orderDetail.tui_one_time,
            active: true
          }
        })
        VNode = [tijiao, shopAgree, platReject, fail]
      }


      return createElement('div', {
        'class': 'mine-stepper'
      }, VNode)


    },
    components: {
      step
    },
    methods: {

    }
  }

</script>

<style lang='scss'>
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
      .mine-num-active {
        color: #48b2e7;
        .circle {
          &::before {
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

</style>
