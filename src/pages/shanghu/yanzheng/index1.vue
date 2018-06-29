<template>
  <div>
    <bigTitle title='验证' @showPopup='showPopup'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <Group>
          <Cell title='验证消费码' :is-link='true' link='/shanghu/yanzheng/xfm' v-if="checkQx(11)"></Cell>
          <Cell title='验证活动码' :is-link='true' link='/shanghu/yanzheng/huodong'  v-if="checkQx(12)"></Cell>
        </Group>
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
import checkMenuQx from '@/mixins/checkMenuQx.js';
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
  },
  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    },
  },
  computed: {
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