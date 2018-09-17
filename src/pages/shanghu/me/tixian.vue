<template>
  <div class="sh-tixian">
    <bigTitle title='提现' :icon='false'></bigTitle>
    <div class="tixian-info">
      <div>
        <div class="line">
          <span class="tit">到账账户</span>
          <span>{{userinfo.uphone}}</span>
        </div>
        <div class="line">
          <span class="tit">当前可提现余额</span>
          <span>{{userinfo.user_money}}&nbsp;&nbsp;(元)</span>
        </div>
        <!-- <div class="line line2" @click="toList">
          <span>提现记录</span>
          <i class="iconfont icon-jinru"></i>
        </div> -->
      </div>
    </div>
    <div class="tixian">
      <h1>提现金额</h1>
      <Group class="reset-vux-input">
        <!-- <XInput v-model="tixian_money" type='number' ></XInput> -->
        <keyboard :value="tixian_money" @input='KeyboardInput' inter="10" decimal="2" placeholder="请输入金额" class="money-keyboard"></keyboard>
      </Group>
      <XButton type='warn' class="xbtn" @click.native='tixian' :disabled='txing'>提交</XButton>
          <div @click="toList" style="text-align:center;margin-top:.5rem;">提现记录</div>

    </div>
    <Popup v-model='safe' position='center' width='80%'>
      <div class="safe-wrapper">
        <div class="title">安全验证
          <i class="iconfont icon-cha" @click="closeSafe"></i>
        </div>
        <CellGroup>
          <CellItem>
            <span slot="left">联系手机：</span>
            <yd-input slot="right" :disabled='true' :value='formatPhone'></yd-input>
          </CellItem>
          <CellItem>
            <yd-input slot="left" v-model="yzm"></yd-input>
            <SendCode v-show="safe" slot="right" v-model="codeing" @click.native="sendCode1" :disabled='!safe'></SendCode>
          </CellItem>
        </CellGroup>
        <div class="btn1">
          <XButton :mini='true' :disabled='yanzhenging' type='primary' @click.native="yanzheng">确认</XButton>
        </div>

      </div>
    </Popup>
  </div>
</template>

<script>
  import bigTitle from "@/components/bigTitle/index";
  import keyboard from '@/components/wc-keyboard/KeyboardInput';
  import checkLogin from '@/mixins/checkLogin.js';
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import {
    CellGroup,
    CellItem
  } from 'vue-ydui/dist/lib.px/cell';
  import {
    SendCode
  } from 'vue-ydui/dist/lib.px/sendcode';
  import {
    Input
  } from 'vue-ydui/dist/lib.px/input';
  import {
    Group,
    XInput,
    XButton
  } from 'vux';
  export default {
    data() {
      return {
        tixian_money: '',
        shop: {},
        txing: false,

        safe: false,
        isSafe: false,
        codeing: false,
        code: '',
        yzm: ''
      }
    },
    created() {
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
        if (!this.tixian_money) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写提现金额！'
          })
          this.txing = false;
        } else if (!this.isSafe) {
          this.safe = true;
          this.txing = false;

        } else {
          this.$axios.get('/Api/UserShow/user_give_money', {
            params: {
              uid: this.id,
              get_money: this.tixian_money
            }
          }).then(({
            data
          }) => {
            console.log(data)
            this.txing = false;
            if (data.status == 0) {
              this.$vux.alert.show({
                title: '提示',
                content: data.log,

              })
            } else if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: data.log,
                onHide() {
                  // _this.get_user();
                  _this.$router.push({
                    path: '/tixianList?type=tixian'
                  })
                }
              })
            }
          })
        }

      },
      sendCode1() {
        var _this = this;
        this.$vux.loading.show({
          text: "发送中"
        });
        const params = {
          mobile: this.userinfo.uphone
        };
        this.$axios
          .get("/Api/UserShow/fsyzm", {
            params
          })
          .then(({
            data
          }) => {
            this.codeing = true;
            this.$vux.loading.hide();
            this.$vux.toast.show({
              text: "已发送",
              position: "middle"
            });
            console.log(data);
            this.code = data.code;
          });
      },
      yanzheng() {
        if (this.yzm != this.code) {
          this.$vux.alert.show({
            title: '提示',
            content: '验证码错误'
          })
        } else {
          this.safe = false;
          this.isSafe = true;
        }

      },
      closeSafe() {
        this.safe = false;
      },
      get_shop() {
        this.$axios.get('/Api/ShopCore/get_shop', {
          params: {
            shop_id: this.userinfo.shop[0].id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.shop = data;
        })
      }
    },
    computed: {
      yanzhenging() {
        return this.yzm ? false : true;
      },
      formatPhone(){
        return `${this.userinfo.uphone.slice(0,3)}****${this.userinfo.uphone.slice(7)}`;
      }
    },
    components: {
      bigTitle,
      XInput,
      Group,
      XButton,
      keyboard,
      SendCode,
      CellGroup,
      CellItem,
      'yd-input': Input,
      Popup,
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
        height: 1.2rem/* 90/75 */
        ;
        padding-left: .733333rem/* 55/75 */
        ;
        .input-box {
          flex: 1;
        }
        .content {
          flex: 1;
        }
      }
    }
    .safe-wrapper {
      border-radius: .133333rem/* 10/75 */
      ;
      padding: .4rem/* 30/75 */
      ;
      background: #ffffff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .4rem/* 30/75 */
        ;
        .icon-cha {}
      }
      .btn1 {
        margin-top: .533333rem/* 40/75 */
        ;
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
