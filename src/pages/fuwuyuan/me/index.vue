<template>
  <div class="shanghu-box">
    <transition name='router'>
      <router-view @showPopup='showPopup'></router-view>
    </transition>
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
  import {
    Popup
  } from "vue-ydui/dist/lib.px/popup";
  // import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll'; 
  import {
    ViewBox,
    Cell,
    Group
  } from "vux";
  // import BScroll from "better-scroll";
  import checkMenuQx from "@/mixins/checkMenuQx.js";
  export default {
    data() {
      return {
        popupShow: false,
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
