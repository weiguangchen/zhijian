<template>
  <div>
    <bigTitle title='修改手机号' @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="form-box">
      <div class="form-group">
        <h2 class="sub-title">验证码已发送至：{{userinfo.fuwuyuan.phone}}</h2>
      </div>
      <div class="form-group">
        <h2 class="sub-title">请输入验证码</h2>
        <Group class="reset-vux-input">

          <XInput v-model="yzm">
            <SendCode slot="right" v-model="codeing" @click.native="sendCode1"></SendCode>
          </XInput>
        </Group>
      </div>
      <XButton type='warn' class="xbtn" @click.native='next'>下一步</XButton>
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
        yzm: '',
        code: ''
      }
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      sendCode1() {
        var _this = this;
        this.$vux.loading.show({
          text: "发送中"
        });
        const params = {
          mobile: this.userinfo.fuwuyuan.phone
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
      next(){
          if(!this.yzm){
              this.$vux.alert.show({
                  title:'提示',
                  content:'验证码不能为空'
              })
          }else if(this.yzm != this.code){
              this.$vux.alert.show({
                  title:'提示',
                  content:'请填写正确验证码'
              })
          }else{
              this.$router.replace({
                  path:'/fuwuyuan/me/phone'
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
