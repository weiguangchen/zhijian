<template>
  <div class="shanghu-page">
    <bigTitle title="确认服务员身份" :icon='false'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <CellGroup>
          <CellItem>
            <input type="text" slot="right" placeholder="请输入手机号码" v-model="phone">
            <!-- ↓↓关键代码是这里↓↓ -->
            <SendCode slot="right" v-model="start1" @click.native="sendCode1" type="warning"></SendCode>
            <!-- ↑↑关键代码是这里↑↑ -->

          </CellItem>
          <CellItem>
            <span slot="left">验证码：</span>
            <input slot="right" type="number" placeholder="请输入验证码" v-model="code">
          </CellItem>
        </CellGroup>
        <XButton type='warn' class="xbtn" @click.native="yanzheng">确认</XButton>
      </div>
    </div>

  </div>

</template>

<script>
import { XButton } from "vux";
import bigTitle from "@/components/bigTitle/index";
import { SendCode } from "vue-ydui/dist/lib.px/sendcode";
import { CellGroup, CellItem } from "vue-ydui/dist/lib.px/cell";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      start1: false,
      phone: "",
      code: "",
      yzm: ""
    };
  },
  components: {
    SendCode,
    CellGroup,
    CellItem,
    bigTitle,
    XButton
  },
  methods: {
    sendCode1() {
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
        .then(({ data }) => {
          this.start1 = true;
          this.$vux.loading.hide();
          this.$vux.toast.show({
            text: "已发送",
            position: "middle"
          });
          console.log(data);
          _this.yzm = data.code;
        });
    },
    yanzheng() {
      var _this = this;

      if (!(this.yzm == this.code && this.yzm && this.code)) {
        this.$vux.alert.show({
          title: "提示",
          content: "请验证手机号！"
        });
        return false;
      } else {
        this.$axios
          .get(_this.API_URL + "/Api/UserShow/yzm_ok", {
            params: {
              uphone: _this.phone,
              id: _this.id
            }
          })
          .then(({ data }) => {
            console.log(data);
            if (data.is_fuwuyuan == 1) {
              _this.$vux.alert.show({
                title: "提示",
                content: "身份验证成功！",
                onHide() {
                  _this.$router.replace({
                    path: "/shanghu/me/index"
                  });
                }
              });
            } else {
              _this.$router.replace({
                path: "/warning?tip=servicer"
              });
            }
          });
      }
    }
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
</style>