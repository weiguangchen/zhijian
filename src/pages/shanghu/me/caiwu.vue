<template>
  <div class="caiwu page">
    <bigTitle title="财务管理" :icon='false'></bigTitle>
    <div>
      <h1>
        <img src="./img/money.png" alt="">
        <span>余额 &nbsp;&nbsp;&nbsp;&nbsp;{{shop.shop_money}}</span>
        <XButton :mini='true' type='warn'>提现</XButton>
      </h1>
      <div class="shouyi">
        <div class="line">
          <span class="tit">已结算收益：</span>
          <span>{{info.y_money}}(元)</span>
          <XButton type='warn' :mini='true'>收款</XButton>
        </div>
        <div class="line">
          <span class="tit">未结算收益: </span>
          <span>{{info.w_money}}(元)</span>
        </div>
      </div>
      <div class="dingdan">
        <!-- <div class="line">
          <span class="tit">订单总额：</span>
          <span>10000.00(元)</span>
        </div> -->
        <div class="line">
          <span class="tit">订单总数：</span>
          <span>{{info.all_order}}</span>
        </div>
      </div>
      <div class="account">
        <h2>收款账户信息</h2>
        <div>
          <div class="line">
            <span class="tit">联系人：</span>
            <span>{{userinfo.shop[0].xingming}}</span>
          </div>
          <div class="line">
            <span class="tit">联系电话：</span>
            <span>{{userinfo.shop[0].shop_phone}}</span>
          </div>
          <div class="line">
            <span class="tit">收款微信：</span>
            <span>{{userinfo.nickname}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XButton
  } from 'vux';
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
          info:{},
          shop:{}
      }
    },
    created() {
      this.get_money();
      this.get_shop();
    },
    methods: {
      get_money() {
        this.$axios.get(this.API_URL + '/Api/ShopCore/shop_core', {
          params: {
            shop_id: this.userinfo.shop[0].id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.info = data;
        })
      },
      get_shop(){
          this.$axios.get(this.API_URL+'/Api/ShopCore/get_shop',{
              params:{
                  shop_id:this.userinfo.shop[0].id
              }
          }).then(({data})=>{
              console.log(data)
              this.shop = data;
          })
      }
    },
    components: {
      bigTitle,
      XButton
    },
    mixins: [checkLogin]

  }

</script>

<style lang='scss'>
  .caiwu {
    $pad: .533333rem/* 40/75 */
    ;
    font-size: .373333rem/* 28/75 */
    ;
    .tit {
      width: 2.666667rem/* 200/75 */
      ;
      flex: none;
    }
    h1 {
      background: #ffffff;
      font-size: .453333rem/* 34/75 */
      ;
      padding-left: $pad;
      display: flex;
      align-items: center;
      height: 1.866667rem/* 140/75 */
      ;
      border-bottom: 1px solid #f0f0f0;
      img {
        width: .72rem/* 54/75 */
        ;
        margin-right: .4rem/* 30/75 */
        ;
      }
    }
    .shouyi {
      margin-bottom: $bot;
      background: #ffffff;
      padding-left: $pad;
      .line {
        display: flex;
        align-items: center;
        height: 1.333333rem/* 100/75 */
        ;
      }
    }
    .dingdan {
      margin-bottom: $bot;
      padding-left: $pad;
      background: #ffffff;
      .line {
        height: 1.466667rem/* 110/75 */
        ;
        display: flex;
        align-items: center;
      }
    }
    .account {
      padding-left: $pad;
      background: #ffffff;
      h2 {
        height: 1.466667rem/* 110/75 */
        ;
        line-height: 1.466667rem/* 110/75 */
        ;
        font-size: .453333rem/* 34/75 */
        ;
        font-weight: bold;
      }
      .line {
        height: .866667rem/* 65/75 */
        ;
        display: flex;
        align-items: center;
      }
    }
  }

</style>
