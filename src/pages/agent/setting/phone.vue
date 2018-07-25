<template>
  <div class="agent-setting1 agent-setting">
    <img src="./phone.png" alt="" class="img">
    <div>
      <Group>
        <XInput title='手机号' v-model="phone"></XInput>
        <XInput title='验证码' v-model="yzm">
          <SendCode slot="right" @click.native="sendCode" v-model="codeing"></SendCode>
        </XInput>
      </Group>
    </div>
    <div class="xbtn">
      <XButton type='warn' @click.native='finish'>完成</XButton>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    XInput,
    XButton
  } from 'vux';
  import {
    SendCode
  } from 'vue-ydui/dist/lib.px/sendcode';
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {
        phone: '',
        yzm: '',
        code: '',
        codeing: false
      }
    },
    methods: {
      sendCode() {
        var _this = this;
        this.$vux.loading.show({
          text: "发送中"
        });
        const params = {
          mobile: _this.phone
        };
        this.$axios
          .get(_this.API_URL + "/Api/UserShow/fsyzm", {
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
            _this.code = data.code;
          });
      },
      finish() {
        var _this = this;
        if (!this.yzm) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写验证码'
          })
        } else if (this.yzm != this.code) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写正确验证码'
          })
        } else {
          var params = {
            dl_id: this.userinfo.dl[0].id,
            dl_name: this.userinfo.dl[0].dl_name,
            dl_phone: this.phone,
            xingming: this.userinfo.dl[0].xingming,
            adress: this.userinfo.dl[0].adress
          }
          this.$axios.get(this.API_URL + '/Api/DlCore/dl_sz', {
            params
          }).then(({
            data
          }) => {
            console.log(data);
            _this.$vux.alert.show({
              title: '提示',
              content: '修改完成',
              onHide() {
                _this.$router.replace({
                  path: '/agentSetting'
                })
              }
            })
          })

        }

      }
    },
    components: {
      Group,
      XInput,
      SendCode,
      XButton
    },
    mixins: [checkLogin, setTitle]
  }

</script>

<style lang='scss'>
  .agent-setting1 {
    padding: .4rem/* 30/75 */
    ;
    .img {
      display: block;
      width: 1.6rem/* 120/75 */
      ;
      margin: .56rem/* 42/75 */
      auto;
    }
  }

</style>
