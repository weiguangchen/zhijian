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
          <Cell title='添加项目' link='/shanghu/me/xmgl'></Cell>
          <Cell title='管理服务' link='/shanghu/me/fwList'></Cell>
          <Cell title='添加活动' link='/shanghu/me/addhuodong'></Cell>
          <Cell title='门店管理' link='/shanghu/me/mendian'></Cell>
        </Group>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from "vue-ydui/dist/lib.px/popup";
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll'; 
import { ViewBox, Cell, Group } from "vux";
import BScroll from "better-scroll";
import checkMenuQx from "@/mixins/checkMenuQx.js";
export default {
  data() {
    return {
      popupShow: false,
      scroll: ""
    };
  },
  created() {

  },
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
        console.log('初始化scroll')
    console.log(this.scroll)
  },
  computed: {

  },
  components: {
    ViewBox,
    Popup,
    Cell,
    Group,
  },
  mixins: [checkMenuQx]
};
</script>

<style lang='scss'>
.shanghu-box,
.shanghu-warpper {
  height: 100%;
}
</style>