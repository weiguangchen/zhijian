<template>
  <div>
    <bigTitle title='个人中心' @showPopup='showPopup'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <Group>
          <Cell title='账号与安全' :is-link='true' link='/fuwuyuan/me/safe'></Cell>
          <Cell title='订单记录' :is-link='true' link='/shanghu/me/mendian'></Cell>
          <Cell title='用户评价' :is-link='true' link='/shanghu/me/account'></Cell>
        </Group>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    Popup
  } from "vue-ydui/dist/lib.px/popup";

  import {
    ViewBox,
    Selector,
    Group,
    XButton,
    XInput,
    Confirm,
    Cell
  } from "vux";
  import bigTitle from "@/components/bigTitle/index";
  import shanghuSelect from "@/components/shanghu_form/face_select";
  import shanghuInput from "@/components/shanghu_form/input";
  import checkMenuQx from "@/mixins/checkMenuQx.js";
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
      this.$emit("showPopup", false);
      console.log('menu')
      console.log(this.menuqx)
    },
    methods: {
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
      Cell,
      Popup
    },
    mixins: [checkMenuQx]
  };

</script>

<style lang='scss' scoped>
  .weui-cell {
    @include font-dpr(14px);
    height: 1.28rem;
    padding-left: 0;
    padding-right: 0;
    &::before {
      left: 0;
    }
  }

</style>
