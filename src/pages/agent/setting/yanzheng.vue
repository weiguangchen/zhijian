<template>
  <div class="agent-setting1 agent-setting">
    <img src="./yanzheng.png" alt="" class="img">
    <div>
      <Group>
        <XInput title='手机号' v-model="userinfo.uphone" :disabled='true'></XInput>
        <XInput title='验证码' v-model="yzm">
          <SendCode slot="right" @click.native='sendCode' v-model='codeing'></SendCode>
        </XInput>
      </Group>
    </div>
    <div class="xbtn">
      <XButton type='warn' @click.native="yanzheng">下一步</XButton>
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
          mobile: _this.userinfo.uphone
        };
        this.$axios
          .get( "/Api/UserShow/fsyzm", {
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
      yanzheng() {
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
          this.$router.replace({
            path: '/agentPhone'
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
