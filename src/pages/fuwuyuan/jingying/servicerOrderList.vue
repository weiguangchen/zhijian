<template>
  <!-- <div class="shanghu-page">
        <ViewBox> -->
  <div>
    <bigTitle title="订单管理" @showPopup='showPopup' :icon='false' :right='true'>
      <iview-select slot="right" class="select-wrapper" size='large' placeholder='请选择订单类型' v-model="orderType" @on-change='changeType'>
        <iview-op value=''>全部订单</iview-op>
        <iview-op value='2'>未接订单</iview-op>
        <iview-op value='3'>未完成订单</iview-op>
        <iview-op value='4'>已完成订单</iview-op>
      </iview-select>
    </bigTitle>
    <div class="order-gl">
      <div class="order-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.id,item.zf)">
        <div class="order-num">
          <div>订单号：{{item.order_num}}</div>
          <div>交易时间：{{item.date}}</div>
          <Step :current='getStep(item.paidan_status)' class="step-wrapper">
            <StepItem>
              <span slot="top">未接单</span>
            </StepItem>
            <StepItem>
              <span slot="top">已接单</span>
            </StepItem>
            <StepItem>
              <span slot="top">已完成</span>
            </StepItem>
          </Step>
        </div>
        <div class="order-info">
          <img :src="item.fw_img" alt="" class="img">
          <div class="info">
            <div class="mingzi">{{item.fw_mingzi}}</div>
            <div class="mingzi">下单会员：{{item.nickname}}</div>
            <div class="mingzi">手机号：{{item.phone}}</div>
          </div>
        </div>
        <div class="count">
          <div class="count-item" v-if="item.zf != 1">
            结算价：¥{{item.order_jprice}}
          </div>
          <div class="count-item" v-if="item.zf != 1">
            数量：{{item.shop_num}}
          </div>
          <div class="count-item">
            <div v-if="item.status == 0">状态：
              <span class="warn">未支付</span>
            </div>
            <div v-else-if="item.status == 1">状态：未使用</div>
            <div v-else-if="item.status == 2">状态：
              <span class="success">已使用</span>
            </div>
            <div v-else-if="item.status == 3">状态：申请退款</div>
            <div v-else-if="item.status == 4">状态：已退款</div>
            <div v-else-if="item.status == 5">状态：已过期</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- </ViewBox>

    </div> -->
</template>

<script>
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
        orderType: '',
        list: [],
        p: 1
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_order().then(res => {
        this.list = res.list;
      })
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      toDetail(id, zf) {
        console.log('/fuwuyuan/jingying/orderDetail')
        
        this.$router.push({
          path: '/fuwuyuan/jingying/orderDetail/'+id+'/'+zf,
        })
      },
      changeType(val) {
        this.get_order().then(res => {
          this.list = res.list;
        })
      },
      get_order() {
        return this.$axios
          .get(this.API_URL + "/Api/order/fwy_order", {
            params: {
              phone: this.userinfo.uphone,
              paidan_status: this.orderType,
              num: 8,
              p: 1
            }
          })
          .then(({
            data
          }) => {
            return data;
          });
      },
      getStep(status) {
        if (status == 2) {
          return 1
        } else if (status == 3) {
          return 2
        } else if (status == 4) {
          return 3
        }
      }
    },
    computed: {

    },
    components: {
      bigTitle,
      ViewBox,
      Step,
      StepItem
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-gl {
    line-height: 1;
    background: #f0f0f0;
    .order-item {
      padding-left: 0.533333rem;
      background: #ffffff;
      @include font-dpr(12px);
      box-sizing: border-box;
      padding-top: 0.56rem;
      padding-bottom: 0.533333rem;
      margin-bottom: 0.266667rem;
      .order-num {
        border-bottom: 1px solid #f0f0f0;
        &>div {
          margin-bottom: 0.266667rem;
        }
        .step-wrapper {
          margin-left: -.533333rem/* 40/75 */
          ;
        }
      }
      .order-info {
        padding: 0.266667rem 0;
        display: flex;
        .img {
          width: 2.666667rem;
          height: 2.133333rem;
          border-radius: 0.133333rem;
          margin-right: 0.24rem;
        }

        .info {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-around;
        }
      }

      .count {
        display: flex;
        .count-item {
          flex: 1;
          .warn {
            color: #dc3330;
          }
          .success {
            color: #1e7c28;
          }
        }
      }
    }
  }

</style>
