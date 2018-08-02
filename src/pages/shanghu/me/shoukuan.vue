<template>
  <div class="sh-tixian">
    <bigTitle title='收款' :icon='false'></bigTitle>
    <div class="tixian-info">
      <h1>收款到余额</h1>
      <div>
        <div class="line">
          <span class="tit">当前可收款收益</span>
          <span>{{shop.shop_money}}&nbsp;&nbsp;(元)</span>
        </div>
        <div class="line line2" @click="toList">
          <span>收款记录</span>
          <i class="iconfont icon-jinru"></i>
        </div>
      </div>
    </div>
    <div class="tixian">
      <h1>收款金额</h1>
      <Group class="reset-vux-input">
        <!-- <XInput v-model="sk_money" type='number'></XInput> -->
        <keyboard :value="sk_money" @input='KeyboardInput' inter="10" decimal="2" placeholder="请输入金额" class="money-keyboard"></keyboard>
      </Group>
      <XButton type='warn' class="xbtn" @click.native='shoukuan' :disabled='sking'>提交</XButton>
    </div>
  </div>
</template>

<script>
  import bigTitle from "@/components/bigTitle/index";
  import keyboard from '@/components/wc-keyboard/KeyboardInput';
  import checkLogin from '@/mixins/checkLogin.js';

  import {
    Group,
    XInput,
    XButton
  } from 'vux';
  export default {
    data() {
      return {
        info: {},
        sk_money: '',
        shop: {},
        sking: false
      }
    },
    created() {
      this.get_money();
      this.get_shop();
    },
    methods: {
      toList() {
        this.$router.push({
          path: '/shanghu/me/shoukuanList'
        })
      },
      KeyboardInput(val) {
        this.sk_money = val;
      },
      get_shop() {
        this.$axios.get( '/Api/ShopCore/get_shop', {
          params: {
            shop_id: this.userinfo.shop[0].id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.shop = data;
        })
      },
      get_money() {
        this.$axios.get( '/Api/ShopCore/shop_core', {
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
      shoukuan() {
        var _this = this;
        this.sking = true;
        if (this.sk_money == '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写收款金额'
          })
          this.sking = false;
        } else {
          this.$axios.get( '/Api/ShopCore/shop_get_money', {
            params: {
              shop_id: this.userinfo.shop[0].id,
              user_id: this.userinfo.id,
              get_money: this.sk_money
            }
          }).then(({
            data
          }) => {
            console.log(data);
            this.sking = false;
            this.$vux.alert.show({
              title: '提示',
              content: data.log,
              onHide() {
                if (data.status != 0) {
                  _this.$router.push({
                    path: '/shanghu/me/shoukuanList'
                  })
                }

              }
            })
          })
        }
      }
    },
    components: {
      bigTitle,
      XInput,
      Group,
      XButton,
      keyboard
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss'>
  .sh-tixian {
    $pad: .533333rem/* 40/75 */
    ;
    font-size: .373333rem/* 28/75 */
    ;
    h1 {
      font-size: .453333rem/* 34/75 */
      ;
      font-weight: bold;
      height: 1.866667rem/* 140/75 */
      ;
      display: flex;
      align-items: center;
    }
    .tixian-info {
      padding-bottom: .533333rem/* 40/75 */
      ;
      border-bottom: 1px solid #f0f0f0;
      padding-left: $pad;
      .line {
        padding-right: .533333rem/* 40/75 */
        ;
        height: .933333rem/* 70/75 */
        ;
        display: flex;
        align-items: center;
        .tit {
          width: 4.266667rem/* 320/75 */
          ;
          flex: none;
        }
      }
      .line2 {
        justify-content: space-between;
      }

    }
    .tixian {
      padding: 0 $pad;
      .xbtn {
        margin-top: 1.466667rem/* 110/75 */
        ;
      }
      .money-keyboard {
        display: flex;
        align-items: center;
        height:1.2rem /* 90/75 */;
        padding-left: .733333rem /* 55/75 */;
        .input-box {
          flex: 1;
        }
        .content {
          flex: 1;
        }
      }
    }
  }

</style>
