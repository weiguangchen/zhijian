<template>
    <div class="shanghu-page">
        <ViewBox>
            <bigTitle title='个人中心' :icon='false'></bigTitle>
            <div class="my-form">
                <div class="form-box">
                    <Group>
                        <Cell title='添加服务' :is-link='true' link='/shanghu/me/xmgl'></Cell>
                        <Cell title='管理服务' :is-link='true' link='/shanghu/me/fwList'></Cell>
                        <!-- <Cell title='财务管理' :is-link='true'></Cell> -->
                        <Cell title='门店管理' :is-link='true' link='/shanghu/me/mendian'></Cell>
                        <!-- <Cell title='账户管理' :is-link='true'></Cell> -->
                    </Group>
                </div>

            </div>
        </ViewBox>
        <Popup position='right' v-model="popupShow">
            <div class="popup-list">
                <Cell title='项目管理'></Cell>
                <Cell title='财务管理'></Cell>
                <Cell title='门店管理'></Cell>
                <Cell title='账户管理'></Cell>
                <Cell title='外卖预定管理'></Cell>
            </div>
        </Popup>
    </div>
</template>

<script>
import { Popup } from "vue-ydui/dist/lib.px/popup";
/* 使用px：import {ActionSheet} from 'vue-ydui/dist/lib.px/actionsheet'; */

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
      xiaofeijuan: "",
      popupShow: false
    };
  },
  created() {},
  methods: {},
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