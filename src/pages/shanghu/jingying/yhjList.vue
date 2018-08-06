<template>
  <betterScroll @pullingUp='pullingUp' ref='scroll'>
    <div class="order-gl">
      <bigTitle title="管理优惠券" @showPopup='showPopup' :icon='false' :right='true'>
        <iview-select slot="right" class="select-wrapper" size='large' placeholder='请选择订单类型' v-model="orderType" @on-change='changeType'>
          <iview-op value='6'>全部订单({{orderStatus.all}})</iview-op>
          <iview-op value='1'>未派单订单({{orderStatus.wp}})</iview-op>
          <iview-op value='2'>已派发订单({{orderStatus.yp}})</iview-op>
          <iview-op value='3'>已接单订单({{orderStatus.yj}})</iview-op>
          <iview-op value='4'>已完成订单({{orderStatus.ywc}})</iview-op>
          <iview-op value='5'>正在退款订单</iview-op>
        </iview-select>
      </bigTitle>
      <div class="yhj-item">
        <div class="info">
          <div>
            <span class="tit">名称：</span>
            <span>洗车优惠劵</span>
          </div>
          <div>
            <span class="tit">面额：</span>
            <span>20元</span>
          </div>
          <div>
            <span class="tit">有效期：</span>
            <span>10天</span>
          </div>
          <div>
            <span class="tit">条件：</span>
            <span>
              <span>满减</span>
              <span>指定类型</span>
              <span>指定服务</span>
            </span>
          </div>
          <div>
            <span class="tit">数量：</span>
            <span>1000张</span>
          </div>
        </div>
        <div class="total">
          <span class="active">领取：100张</span>
          <span>使用：80张</span>
          <span>过期：20张</span>
        </div>


      </div>
    </div>
  </betterScroll>

</template>

<script>
  import betterScroll from '@/components/betterScroll/scroll';
  import {
    Step,
    StepItem
  } from 'vue-ydui/dist/lib.px/step';
  import {
    ViewBox
  } from "vux";
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        orderStatus: {},
        orderType: 6,
        list: [],
        p: 1
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_order_list();
      this.get_order_total();
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      changeType(val) {
        console.log(val)
        this.$refs.scroll.openPullUp();
        this.list = [];
        this.p = 1;
        this.get_order_list();
      },
      toDetail(id, zf) {
        this.$router.push({
          path: '/shanghu/jingying/orderDetail',
          query: {
            id,
            zf
          }
        })
      },
      getStep(status) {
        if (status == 1) {
          return 1
        } else if (status == 2) {
          return 2
        } else if (status == 3) {
          return 3
        } else if (status == 4) {
          return 4
        }
      },
      get_order_list() {
        var _this = this;
        return this.$axios
          .get("/Api/ShopFw/get_order", {
            params: {
              fw_shop_id: this.userinfo.shop[0].id,
              status: 6,
              paidan_status: this.orderType,
              num: 10,
              p: this.p
            }
          })
          .then(({
            data
          }) => {
            if (data.ok == 1) {
              console.log("还有数据");
              this.p = this.p + 1;
            } else if (data.ok == 0) {
              console.log("没数据了");
              this.$refs.scroll.closePullUp();
            }
            this.$refs.scroll.pullupLoadend();
            this.list = this.list.concat(data.list);
          });
      },
      get_order_total() {
        this.$axios.get('/Api/ShopCore/get_status', {
          params: {
            shop_id: this.userinfo.shop[0].id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.orderStatus = data;
        })
      },
      pullingUp() {
        this.get_order_list();
        this.$refs.scroll.finishPullupload();

      }
    },
    computed: {

    },
    components: {
      bigTitle,
      ViewBox,
      Step,
      StepItem,
      betterScroll
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-gl {
    line-height: 1;
    background: #f0f0f0;
    .select-wrapper {
      font-size: .373333rem/* 28/75 */
      ;
    }
    .yhj-item {
      margin-bottom: $bot;
      padding-left: .4rem/* 30/75 */
      ;
      background: #ffffff;
      font-size: .373333rem/* 28/75 */
      ;
      .info {
        line-height: .986667rem/* 74/75 */
        ;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: .4rem/* 30/75 */
        ;
        margin-bottom: .533333rem/* 40/75 */
        ;
        .tit {
          flex: none;
          width: 1.666667rem/* 125/75 */
          ;
        }
        &>div {
          display: flex;
        }
      }
      .total {
        padding-right: .4rem/* 30/75 */
        ;
        display: flex;
        justify-content: space-between;
        &>span {
          display: inline-block;
          padding: .133333rem/* 10/75 */
          ;
        }
        .active {
          border-radius: .186667rem/* 14/75 */
          ;
          box-shadow: 0 4px 10px rgba(#000000, .4);
          color: #11be7a;
        }
      }
    }
  }

</style>
