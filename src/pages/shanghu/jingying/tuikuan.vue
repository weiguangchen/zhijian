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
        <Cell title='交易金额' v-if="zf == 0">{{orderDetail.order_price}}</Cell>
        <Cell title='支付方式' v-else-if="zf == 1">活动卡支付</Cell>
      </Group>
      <Group class="info">
        <Cell title='退款理由'></Cell>
        <XTextarea class="textarea" v-model="ly" placeholder='请填写退款理由'></XTextarea>
        <div class="btn">
          <XButton :mini='true' type='warn' @click.native='tijiao'>提交</XButton>
        </div>

      </Group>



    </betterScroll>
  </div>
</template>

<script>
  //   import stepper from '@/components/stepper.vue';
  //   import step from './components/step.vue';
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
        orderDetail: {},
        ly: ''
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
      },
      tijiao() {
        var _this = this;
        if (!this.ly) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写退款理由'
          })
        } else {
          this.$axios.get('/Api/Tk/shop_tui', {
            params: {
              zf: this.zf,
              order_id: this.order_num,
              ly: this.ly
            }
          }).then(({
            data
          }) => {
            console.log(data);
            if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: '退单成功',
                onHide() {
                  _this.$router.replace({
                    path: '/shanghu/jingying/tuikuanList'
                  })
                }
              })
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '退单失败'
              })
            }

          })
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
      XTextarea
      //   stepper,
      //   step
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
        padding: .213333rem
          /* 16/75 */
          .426667rem
          /* 32/75 */
        ;

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
        margin: .426667rem
          /* 32/75 */
        ;
        border: 1px solid #cdcdcd;
      }

      .btn {
        display: flex;
        justify-content: center;
      }
    }



  }

</style>
