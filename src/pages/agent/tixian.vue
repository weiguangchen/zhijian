<template>
  <div class="tixian">
    <div class="tx">
      <h1>到账账户
        <span class="info">
          <img :src="userinfo.headimgurl" alt="" class="avatar"> 
          &nbsp;&nbsp;<i>{{userinfo.nickname}}</i>
        </span>
      </h1>

      <div class="content">
        <h2>提现金额</h2>
        <div class="input-wrapper">
          <span>￥</span>
          <div class="input">
            <wc-keyboard :value="tixian_money" @input='KeyboardInput' inter="10" decimal="2" placeholder="请输入金额" class="money-keyboard"
            />
          </div>
        </div>

        <div class="caniuse">可用金额&nbsp;&nbsp;￥{{userinfo.user_money}}&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="total" @click="tixian_all">全部提现</span>
        </div>

        <div class="xbtn">
          <XButton @click.native="tixian" :mini='true' type='primary' :disabled='tixianing'>提现</XButton>
        </div>
        <p @click="tixian_list" class="tixian-list"> 提现记录</p>

      </div>
      <Popup v-model='safe' position='center' width='80%'>
        <div class="safe-wrapper">
          <div class="title">安全验证
            <i class="iconfont icon-cha" @click="closeSafe"></i>
          </div>
          <CellGroup>
            <CellItem>
              <span slot="left">联系手机：</span>
              <yd-input slot="right" :disabled='true' :value='userinfo.uphone'></yd-input>
            </CellItem>
            <CellItem>
              <yd-input slot="left" v-model="yzm"></yd-input>
              <SendCode v-show="safe" slot="right" v-model="codeing" @click.native="sendCode1"></SendCode>
            </CellItem>
          </CellGroup>
          <div class="btn1">
            <XButton :mini='true' :disabled='yanzhenging' type='primary' @click.native="yanzheng">确认</XButton>

          </div>
        </div>
      </Popup>

    </div>

  </div>
</template>

<script>
  import checkLogin from "@/mixins/checkLogin.js";
  import keyboard from '@/components/wc-keyboard/KeyboardInput';
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
    XInput,
    XButton,
    Confirm
  } from 'vux';
  import setTitle from '@/mixins/setTitle.js'

  export default {
    data() {
      return {
        safe: false,
        isSafe: false,
        tixian_money: '',
        tixianing: false,

        codeing: false,
        code:'',
        yzm:''
      }
    },
    created() {},
    methods: {
      KeyboardInput(val) {
        this.tixian_money = val;
      },
      tixian() {
        var _this = this;
        var a = this.tixian_money >= this.userinfo.dl[0].dl_money;

        this.tixianing = true;
        if (!this.tixian_money) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写提现金额！'
          })
          this.tixianing = false;
        } else if (!this.isSafe) {
          this.safe = true;
        this.tixianing = false;

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
            this.tixianing = false;
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
      yanzheng(){
        if(this.yzm != this.code){
          this.$vux.alert.show({
            title:'提示',
            content:'验证码错误'
          })
        }else{
          this.safe = false;
          this.isSafe = true;
        }
        
      },
      closeSafe() {
        this.safe = false;
      },
      tixian_all() {
        this.tixian_money = this.userinfo.user_money;
      },
      tixian_list() {
        this.$router.push({
          path: '/tixianList',
          query: {
            type: 'tixian'
          }
        })
      }
    },
    computed:{
      yanzhenging(){
        return this.yzm?false:true;
      }
    },
    components: {
      XInput,
      XButton,
      Confirm,
      SendCode,
      CellGroup,
      CellItem,
      'yd-input': Input,
      Popup,
      'wc-keyboard': keyboard
    },
    mixins: [setTitle, checkLogin]
  }

</script>

<style scoped lang='scss'>
  .tixian {
    padding: .4rem/* 30/75 */
    ;
    background: #ffffff;
    .tx {
      box-shadow: 0 4px 10px 4px rgba(#000000, .1);

      h1 {
        padding: 0 .4rem/* 30/75 */
        ;
        height: 1.466667rem/* 110/75 */
        ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f3f3f3;
        font-size: .32rem/* 24/75 */
        ;
        .info{
          display: flex;
          align-items: center;
        }
        i {
          color: #a1a1a1;
        }
        .avatar{
          width: .6rem /* 45/75 */;
          height: .6rem /* 45/75 */;
          border-radius: 50%;
        }
      }
      .content {
        padding: .533333rem/* 40/75 */
        .4rem/* 30/75 */
        ;
        h2 {
          font-size: .453333rem/* 34/75 */
          ;
          margin-bottom: .4rem/* 30/75 */
          ;
        }
        .input-wrapper {
          margin-bottom: .666667rem/* 50/75 */
          ;
          display: flex;
          height: 1.333333rem/* 100/75 */
          ;
          font-size: .48rem/* 36/75 */
          ;
          padding: 0 1rem/* 75/75 */
          ;
          &>span {
            width: 1.466667rem/* 110/75 */
            ;
            flex: none;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .input {
            flex: none;
            width: 4.666667rem/* 350/75 */
            ;
            display: flex;
            align-items: center;
            flex: 1;
            border-bottom: 1px solid #000000;

          }
        }
        .caniuse {
          color: #a2a2a2;
          margin-bottom: 1.333333rem/* 100/75 */
          ;
          .total {
            color: #287ffd;
          }
        }
        .xbtn {
          display: flex;
          justify-content: center;

        }
        .tixian-list {
          margin-top: 1rem;
          color: #287ffd;
          text-align: center;
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
