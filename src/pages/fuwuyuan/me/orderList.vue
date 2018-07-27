<template>
  <div>
    <bigTitle title='订单记录' @showPopup='showPopup'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <Group>
          <Cell title='订单总数'>1</Cell>
          <Cell title='完成订单数'>2</Cell>
          <Cell title='未完成订单数'>3</Cell>
          <Cell title='退单'>4</Cell>
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
