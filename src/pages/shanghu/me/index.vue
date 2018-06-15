<template>
    <div class="shanghu-page">
        <ViewBox>
            <bigTitle title='个人中心' @showPopup='showPopup'></bigTitle>
            <div class="my-form">
                <div class="form-box">
                    <Group>
                        <Cell title='添加服务' :is-link='true' link='/shanghu/me/xmgl'></Cell>
                        <Cell title='管理服务' :is-link='true' link='/shanghu/me/fwList'></Cell>
                        <Cell title='添加活动' :is-link='true' link='/shanghu/me/addhuodong'></Cell>
                        <Cell title='门店管理' :is-link='true' link='/shanghu/me/mendian'></Cell>
                    </Group>
                </div>

            </div>
        </ViewBox>

    </div>
</template>

<script>
import { Popup } from "vue-ydui/dist/lib.px/popup";

import { ViewBox, Selector, Group, XButton, XInput, Confirm, Cell } from "vux";
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
  }
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