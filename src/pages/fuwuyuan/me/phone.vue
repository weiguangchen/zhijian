<template>
  <div>
    <bigTitle title='修改手机号' @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="form-box">
      <div class="form-group">
        <h2 class="sub-title">请输入新手机号</h2>
        <Group class="reset-vux-input">
          <XInput v-model="new_phone"></XInput>
        </Group>
      </div>
      <div class="form-group">
        <h2 class="sub-title">请输入验证码</h2>
        <Group class="reset-vux-input">

          <XInput v-model="yzm">
            <SendCode slot="right" @click.native='sendCode' v-model='codeing'></SendCode>
          </XInput>
        </Group>
      </div>
      <XButton type='warn' class="xbtn" @click.native='yanzheng'>完成</XButton>
    </div>

  </div>
</template>

<script>
  import {
    SendCode
  } from 'vue-ydui/dist/lib.px/sendcode';
  import {
    XInput,
    Group,
    XButton,
    Cell
  } from "vux";
  import bigTitle from "@/components/bigTitle/index";

  import checkLogin from "@/mixins/checkLogin";
  export default {
    data() {
      return {
        codeing: false,
        new_phone: '',
        yzm: '',
        code: ''
      }
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      sendCode() {
        var _this = this;
        if (!this.new_phone) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写手机号'
          })
        } else {
          this.$vux.loading.show({
            text: "发送中"
          });
          const params = {
            mobile: this.new_phone
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
        }

      },
      yanzheng() {
        if (!this.yzm) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写验证码'
          })
        } else if (this.yzm != this.code || !this.yzm) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写正确验证码'
          })
        } else if(this.yzm == this.code && this.code && this.yzm){
          this.$router.replace({
            path: '/fuwuyuan/me/index'
          })
        }
      }
    },
    components: {
      bigTitle,
      Group,
      XInput,
      XButton,
      Cell,
      SendCode
    },
    mixins: [checkLogin]
  }

</script>

<style>


</style>
