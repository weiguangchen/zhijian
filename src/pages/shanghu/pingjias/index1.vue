<template>
  <div>
    <bigTitle title='评价' @showPopup='showPopup'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <Group>
          <Cell title='消费评价' :is-link='true' link='/shanghu/pingjias/pingjias' v-if="checkQx(21)"></Cell>
          <!-- <Cell title='活动评价' :is-link='true' link='/shanghu/jingying/orderGl'></Cell>
          <Cell title='优惠评价' :is-link='true' link='/shanghu/jingying/orderGl'></Cell> -->
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