<template>
  <!-- <div class="shanghu-page">
        <ViewBox> -->
  <div>
    <bigTitle title='个人中心' @showPopup='showPopup'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <!-- <Group>
          <Cell title='添加服务' :is-link='true' link='/shanghu/me/xmgl' v-if="checkQx(41)"></Cell>
          <Cell title='管理服务' :is-link='true' link='/shanghu/me/fwList' v-if="checkQx(42)"></Cell>
          <Cell title='添加活动' :is-link='true' link='/shanghu/me/addhuodong' v-if="checkQx(43)"></Cell>
          <Cell title='门店管理' :is-link='true' link='/shanghu/me/mendian' v-if="checkQx(44)"></Cell>
          <Cell title='账户管理' :is-link='true' link='/shanghu/me/account' v-if="checkQx(45)"></Cell>
        </Group> -->
         <Group>
          <Cell title='添加服务' :is-link='true' link='/shanghu/me/xmgl'       ></Cell>
          <Cell title='管理服务' :is-link='true' link='/shanghu/me/fwList'     ></Cell>
          <Cell title='添加活动' :is-link='true' link='/shanghu/me/addhuodong' ></Cell>
          <Cell title='门店管理' :is-link='true' link='/shanghu/me/mendian'    ></Cell>
          <Cell title='账户管理' :is-link='true' link='/shanghu/me/account'    ></Cell>
        </Group>
      </div>

    </div>
  </div>

  <!-- </ViewBox>

    </div> -->
</template>

<script>
import { Popup } from "vue-ydui/dist/lib.px/popup";

import { ViewBox, Selector, Group, XButton, XInput, Confirm, Cell } from "vux";
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