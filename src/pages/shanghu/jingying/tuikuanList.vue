<template>
  <div class="order-gl">
    <bigTitle title="退款单管理" @showPopup='showPopup' :icon='false' :right='true'>
      <iview-select slot="right" class="select-wrapper" size='large' placeholder='请选择订单类型' v-model="status" @on-change='changeType'>
        <iview-op value='0'>全部订单</iview-op>
        <iview-op value='5'>未处理订单</iview-op>
        <iview-op value='1'>商户已同意</iview-op>
        <iview-op value='2'>商户已拒绝</iview-op>
        <iview-op value='3'>平台已同意</iview-op>
        <iview-op value='4'>平台已拒绝</iview-op>
      </iview-select>
    </bigTitle>
    <div class="list">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div class="order-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.order_num,item.zf)">
          <div class="order-num">
            <div>订单号：{{item.order_num}}</div>
            <div>交易时间：{{item.date}}</div>
            <div>约定服务时间：{{item.fwy_fw_time}}</div>
            <Step :current='item.paidan_status' class="step-wrapper">
              <StepItem>
                <span slot="top">未派单</span>
              </StepItem>
              <StepItem>
                <span slot="top">已派单</span>
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
              <div class="mingzi">下单会员：{{item.xingming}}</div>
              <div class="mingzi">手机号：{{item.dianhua}}</div>
            </div>
          </div>
          <div class="count">
            <div class="count-item" v-if="item.zf != 1">
              结算价：¥{{item.order_jprice}}
            </div>
            <div class="count-item">
              数量：{{item.shop_num}}
            </div>
            <div class="count-item">
              <template v-if="item.tui_status == 0">状态：
                <span class="warn">商家未处理</span>
              </template>
              <template v-else-if="item.tui_status == 1">状态：
                <span class="success">商家已同意</span>
              </template>
              <template v-else-if="item.status == 2">状态：
                <span class="warn">商家已拒绝</span>
              </template>
              <template v-else-if="item.status == 3">状态：
                <span class="success">平台已同意</span>
              </template>
              <template v-else-if="item.status == 4">状态：
                <span class="warn">平台已拒绝</span>
              </template>
            </div>
          </div>
        </div>
      </scroller>
    </div>


  </div>

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
        orderStatus: {},
        status: '',


        list: [],
        noData: false,
        p: 1
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_order_total();
      this.get_order_list();
    },
    methods: {
      infinite(done) {
        this.get_order_list(done);
      },
      get_order_list(fn) {
        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return;
        } else {
          this.$axios
            .get("/Api/Shop/tui_list", {
              params: this.params
            })
            .then(({
              data
            }) => {
              if (data.ok == 1) {
                console.log("还有数据");
                this.p++;
              } else if (data.ok == 0) {
                console.log("没数据了");
                this.noData = true;
              }
              this.list = this.list.concat(data.list);
              if (fn) fn();
            });
        }

      },
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      changeType(val) {
        this.list = [];
        this.p = 1;
        this.noData = false;
        this.get_order_list();
      },
      toDetail(order_num, zf) {
        this.$router.push({
          path: '/shanghu/jingying/tuikuanDetail',
          query: {
            order_num,
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

    },
    computed: {
      params() {
        return {
          shop_id: this.userinfo.shop[0].id,
          num: 8,
          p: this.p,
          tui_status: this.status
        }
      }
    },
    components: {
      bigTitle,
      ViewBox,
      Step,
      StepItem,
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-gl {
    height: 100%;
    display: flex;
    flex-direction: column;
    line-height: 1;
    background: #f0f0f0;
    .select-wrapper {
      font-size: .373333rem/* 28/75 */
      ;
    }
    .list {
      flex: 1;
      position: relative;
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
            height: 2.666667rem;
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

  }

</style>
