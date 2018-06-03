<template>
  <div class="shanghu-page">
    <ViewBox>
      <bigTitle title="消费券验证"></bigTitle>
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
    </ViewBox>
    <Confirm v-model="alertShow">
      {{xiaofeijuan}}
    </Confirm>
  </div>
</template>

<script>
import { ViewBox, Selector, Group, XButton, XInput, Confirm } from "vux";
import bigTitle from "@/components/bigTitle/index";
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
export default {
  data() {
    return {
      pay_num: "",
      face_id: "",
      faceList: [],
      alertShow: false,
      xiaofeijuan: ""
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get(_this.API_URL + "/api/ShopFw/shop_fw", {
        params: { shop_id: 1 }
      })
      .then(res => {
        console.log(res);
        _this.faceList = res.data.face;
      });
  },
  methods: {
    yanzheng() {
      console.log(1);
      var _this = this;
      this.$axios
        .get(_this.API_URL + "/api/ShopFw/pay_num_ok", {
          params: {
            fw_shop_id: 1,
            pay_num: _this.pay_num,
            face_id: _this.face_id
          }
        })
        .then(res => {
          console.log(res);
          _this.xiaofeijuan = res.data.log;
          _this.alertShow = true;
        });
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
    Confirm
  }
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
    line-height: .533333rem;
  }
}
</style>