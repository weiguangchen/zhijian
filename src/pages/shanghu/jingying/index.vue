<template>
  <div class="shanghu-box">
    <div class="wrapper shanghu-warpper" ref="wrapper">
      <ul class="content">
        <router-view @showPopup='showPopup'></router-view>
      </ul>
    </div>

    <Popup position='right' v-model="popupShow">
      <div class="popup-list">
        <Group>
          <Cell title='消费统计' link='/shanghu/jingying/tongji'  v-if="checkQx(31)"></Cell>
          <Cell title='订单管理' link='/shanghu/jingying/orderGl' v-if="checkQx(32)"></Cell>
        </Group>

      </div>
    </Popup>
  </div>
</template>

<script>
import { ViewBox, Selector, Group, XButton, XInput, Confirm, Cell } from "vux";
import bigTitle from "@/components/bigTitle/index";
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
import { Popup } from "vue-ydui/dist/lib.px/popup";
import BScroll from "better-scroll";
import checkMenuQx from '@/mixins/checkMenuQx.js';
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
  methods: {
    showPopup(val) {
      this.popupShow = val;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        tap: true,
        click: true
      });
    });
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

<style lang='scss'>
</style>