<template>
  <div>
    <bigTitle title="订单详情" @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="order-detail ">
      <div class="order-wrapper">
        <div class="order-num">
          <div>订单号：{{detail.order_num}}</div>
          <div>下单时间：{{detail.date}}</div>
        </div>
        <div class="order-info">
          <div class="line">
            <span class="title">服务名称：</span>
            <span class="content">京东IE我就发文件费我个金佛IE文件佛IE文件佛IE我就分为</span>
          </div>
          <div class="line">
            <span class="title">下单用户：</span>
            <span class="content">{{detail.xingming}}</span>
          </div>
          <div class="line">
            <span class="title">联系方式：</span>
            <span class="content">{{detail.dianhua}}</span>
          </div>
          <div class="line">
            <span class="title">地址：</span>
            <span class="content">{{detail.adress}}</span>
          </div>
          <div class="line">
            <span class="title">交易数量：</span>
            <span class="content">{{detail.shop_num}}</span>
          </div>
          <div class="line">
            <span class="title">交易金额：</span>
            <span class="content">{{detail.order_price}}</span>
          </div>
          <div class="line">
            <span class="title">支持门店：</span>
            <span class="content">十一经路</span>
          </div>
        </div>
      </div>

      <div class="paidan">
        <h2>派单</h2>
        <Group class="reset-vux-input select">
          <Selector title='1' :options='son' :value-map="['id','sub_name']" placeholder='选择要派发的账户'></Selector>

        </Group>
        <XButton type='warn'>确定</XButton>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    Selector,
    XButton,
    Group
  } from 'vux';
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        son: [],
        detail: {}
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_detail();
      this.get_son();
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      get_son() {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/get_son", {
            params: {
              shop_id: this.userinfo.shop[0].id
            }
          })
          .then(res => {
            console.log(res);
            this.son = res.data;
          });
      },
      get_detail() {
        this.$axios
          .get(this.API_URL + "/Api/Order/get_order_content", {
            params: {
              id: this.orderId,
              zf:this.zf
            }
          })
          .then(res => {
            console.log(res);
            this.detail = res.data[0];
          });
      }
    },
    computed: {
      orderId() {
        return this.$route.query.id;
      },
      zf(){
        return this.$route.query.zf;
      }
    },
    components: {
      bigTitle,
      Selector,
      XButton,
      Group
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-detail {
    height: 100%;
    background: #f0f0f0;
    .order-wrapper {
      margin-bottom: $bot;
      background: #ffffff;
      padding-left: .533333rem/* 40/75 */
      ;
      padding-bottom: .4rem/* 30/75 */
      ;
      .order-num {
        line-height: .853333rem/* 64/75 */
        ;
        font-size: .373333rem/* 28/75 */
        ;
        border-bottom: 1px solid #f0f0f0;
      }
      .order-info {
        font-size: .32rem/* 24/75 */
        ;
        line-height: 2;
        .line {
          padding-right: .4rem/* 30/75 */
          ;
          display: flex;
          .title {
            flex: auto;
          }
          .content {
            flex: none;
            width: 7.333333rem/* 550/75 */
            ;
            ;
          }
        }

      }
    }
    .paidan {
      padding: .533333rem/* 40/75 */
      ;
      background: #ffffff;
      h2 {
        font-size: .48rem/* 36/75 */
        ;
        font-weight: bold;
        margin-bottom: .48rem/* 36/75 */
        ;
      }
      .select {
        margin-bottom: .8rem/* 60/75 */
        ;
      }
      .vux-selector {
        .weui-cell__hd {
          visibility: hidden;
          width: 1px;
        }
      }
      .weui-btn {
        border-radius: 0;
        &::after {
          border-radius: 0;
        }
      }
    }
  }

</style>
