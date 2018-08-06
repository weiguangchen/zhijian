<template>
  <div>
    <bigTitle title='经营管理' @showPopup='showPopup'></bigTitle>
    <div class="my-form">
      <div class="form-box">
        <Group>
          <Cell title='服务统计' :is-link='true' link='/shanghu/jingying/tongji'></Cell>
          <Cell title='活动卡统计' :is-link='true' link='/shanghu/jingying/hdTongji'></Cell>
          <Cell title='订单管理' :is-link='true' link='/shanghu/jingying/orderGl'></Cell>
          <Cell title='活动卡订单管理' :is-link='true' link='/shanghu/jingying/cardOrderList'></Cell>
          <Cell title='添加服务' :is-link='true' link='/shanghu/jingying/xmgl'></Cell>
          <Cell title='管理服务' :is-link='true' link='/shanghu/jingying/fwList'></Cell>
          <Cell title='添加活动' :is-link='true' link='/shanghu/jingying/addhuodong' ></Cell>
          <Cell title='管理活动' :is-link='true' link='/shanghu/jingying/hdList' ></Cell>
          <Cell title='创建优惠券' :is-link='true' link='/shanghu/jingying/createdYhj' ></Cell>
          <Cell title='优惠券管理' :is-link='true' link='/shanghu/jingying/yhjList' ></Cell>
          <Cell title='操作优惠券' :is-link='true' link='/shanghu/jingying/yhjHandle' ></Cell>
        </Group>
      </div>
    </div>
  </div>
</template>

<script>
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
  import {
    Popup
  } from "vue-ydui/dist/lib.px/popup";
  import checkMenuQx from '@/mixins/checkMenuQx.js';
  import checkAdminShenfen from '@/mixins/checkAdminShenfen.js';
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
      console.log()
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

    mixins: [checkMenuQx, checkAdminShenfen]
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
