<template>
  <div class="shanghu-box">
    <!-- <div class="wrapper shanghu-warpper" ref="wrapper">
      <ul class="content"> -->
    <transition name='router'>
      <router-view @showPopup='showPopup' @showTextarea='showTextarea'></router-view>
    </transition>
    <!-- </ul>
    </div> -->

    <Popup position='right' v-model="popupShow">
      <div class="popup-list">
        <!-- <Group>
          <Cell title='消费统计' link='/shanghu/jingying/tongji'  v-if="checkQx(31)"></Cell>
          <Cell title='订单管理' link='/shanghu/jingying/orderGl' v-if="checkQx(32)"></Cell>
        </Group> -->
        <Group v-if="shenfenType == 'shanghu'">
          <Cell title='消费统计' link='/shanghu/jingying/tongji'></Cell>
          <Cell title='订单管理' link='/shanghu/jingying/orderGl'></Cell>
        </Group>
        <Group v-else-if="shenfenType == 'fuwuyuan'">
          <Cell title='消费统计' link='/fuwuyuan/jingying/tongji'></Cell>
          <Cell title='订单管理' link='/fuwuyuan/jingying/orderGl'></Cell>
        </Group>
      </div>
    </Popup>

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
    Cell,
    XTextarea
  } from "vux";
  import bigTitle from "@/components/bigTitle/index";
  import shanghuSelect from "@/components/shanghu_form/face_select";
  import shanghuInput from "@/components/shanghu_form/input";
  import {
    Popup
  } from "vue-ydui/dist/lib.px/popup";
  import {
    TextArea
  } from 'vue-ydui/dist/lib.px/textarea';
  // import BScroll from "better-scroll";
  import checkMenuQx from '@/mixins/checkMenuQx.js';
  import checkAdminShenfen from '@/mixins/checkAdminShenfen.js';

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
      },
      showTextarea(val) {
        this.alertShow = val;
      },
      submit_tuidan() {
        // this.$axios.get('/api/order/jj_order',{

        // }).then(({data})=>{

        // })
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {
      //     tap: true,
      //     click: true
      //   });
      // });
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
      Popup,
      XTextarea
    },
    mixins: [checkMenuQx, checkAdminShenfen]
  };

</script>

<style lang='scss'>


</style>
