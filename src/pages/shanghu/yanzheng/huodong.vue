<template>
    <div>
        <bigTitle title="活动报名验证" @showPopup='showPopup'></bigTitle>
        <div class="my-form">
            <div class="form-box">
                <div class="form-group">
                    <h2 class="sub-title">选择门店</h2>
                    <Group class="reset-vux-input">
                        <Selector title='' :options='faceList' :value-map="['id','face_name']" v-model="face_id"></Selector>
                    </Group>
                </div>
                <div class="form-group">
                    <h2 class="sub-title">输入验证码</h2>
                    <Group class="reset-vux-input">
                        <XInput v-model="pay_num"></XInput>
                    </Group>
                </div>
                <XButton type='warn' class="xbtn" @click.native="yanzheng">立即验证</XButton>
                <div class="yz-tips">
                    <div class="tip-tit">温馨提示：</div>
                    <div class="tip-content">
                        <p> 输入验证码可以查询出该订单下所有可用消费卷；</p>
                        <p> 可以根据输入张数使用，但必须是同一款商品</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { ViewBox, Selector, Group, XButton, XInput, Confirm, Cell } from "vux";
import bigTitle from "@/components/bigTitle/index";
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
import { Popup } from "vue-ydui/dist/lib.px/popup";
import checkLogin from '@/mixins/checkLogin.js';
export default {
  data() {
    return {
      popupShow: false,
      pay_num: "",
      face_id: "",
      faceList: [],
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get(_this.API_URL + "/Api/ShopFw/get_face", {
        params: { phone:this.userinfo.uphone }
      })
      .then(res => {
        console.log(res);
        _this.faceList = res.data;
      });
  },
  methods: {
    yanzheng() {
      var _this = this;
      this.$axios
        .get(_this.API_URL + "/api/ShopFw/hd_ok", {
          params: {
            fw_shop_id: this.userinfo.shop[0].id ,
            pay_num: _this.pay_num,
            face_id: _this.face_id
          }
        })
        .then(res => {
          console.log(res);
          _this.$vux.alert.show({
              title:'提示',
              content:res.data.log
          })
        });
    },
    showPopup(val) {
      this.$emit("showPopup", val);
    }
  },
  components: {
    bigTitle,
    ViewBox,
    Selector,
    Group,
    shanghuSelect,
    shanghuInput,
    XButton,
    XInput,
    Confirm,
    Popup,
    Cell
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.yz-tips {
  margin-top: 0.266667rem;
  .tip-tit {
    @include font-dpr(14px);
    margin-bottom: 0.266667rem;
  }
  .tip-content {
    padding-left: 0.4rem;
    line-height: 0.533333rem;
  }
}
</style>