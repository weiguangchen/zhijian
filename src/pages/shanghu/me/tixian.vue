<template>
  <div class="sh-tixian">
    <bigTitle title='提现' :icon='false'></bigTitle>
    <div class="tixian-info">
      <h1>提款到余额</h1>
      <div>
        <div class="line">
          <span class="tit">当前可提款收益</span>
          <span>{{shop.shop_money}}&nbsp;&nbsp;(元)</span>
        </div>
        <div class="line line2" @click="toList">
          <span>提款记录</span>
          <i class="iconfont icon-jinru"></i>
        </div>
      </div>
    </div>
    <div class="tixian">
      <h1>提现金额</h1>
      <Group class="reset-vux-input">
        <XInput v-model="tixian_money" type='number'></XInput>
        <!-- <keyboard :value="tixian_money" @input='KeyboardInput' inter="10" decimal="2" placeholder="请输入金额" class="money-keyboard"></keyboard> -->
      </Group>
      <XButton type='warn' class="xbtn" @click.native='tixian' :disabled='txing'>提交</XButton>
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
        tixian_money: '',
        shop:{},
        txing: false
      }
    },
    created(){
        this.get_shop();
    },
    methods: {
      toList() {
        this.$router.push({
          path: '/shanghu/me/tixianList'
        })
      },
      KeyboardInput(val) {
        this.tixian_money = val;
      },
      tixian() {
        var _this = this;
        this.txing = true;
        if (this.tixian_money == '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写提现金额'
          })
          this.txing = false;
        } else {
          this.$axios.get(this.API_URL + '/Api/ShopCore/shop_get_money', {
            params: {
              shop_id: this.userinfo.shop[0].id,
              user_id: this.userinfo.id,
              get_money: this.tixian_money
            }
          }).then(({
            data
          }) => {
            console.log(data);
            this.txing = false;
            this.$vux.alert.show({
              title: '提示',
              content: data.log,
              onHide() {
                if (data.status != 0) {
                  _this.$router.push({
                    path: '/shanghu/me/tixianList'
                  })
                }

              }
            })
          })
        }

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
        height: 1.6rem/* 120/75 */
        ;
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
