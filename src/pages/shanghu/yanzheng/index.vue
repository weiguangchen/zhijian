<template>
  <div>
    <transition name='router'>
    <router-view @showPopup='showPopup'></router-view>
</transition>
    <Popup v-model="popupShow" position='right'>
      <div class="popup-list">
        <Group v-if="shenfenType == 'shanghu'">
          <Cell title='消费券验证' link='/shanghu/yanzheng/xfm'></Cell>
          <Cell title='活动验证' link='/shanghu/yanzheng/huodong'></Cell>
        </Group>
        <Group v-else-if="shenfenType == 'fuwuyuan'">
          <Cell title='消费券验证' link='/fuwuyuan/yanzheng/xfm'></Cell>
          <Cell title='活动验证' link='/fuwuyuan/yanzheng/huodong'></Cell>
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
import checkAdminShenfen from '@/mixins/checkAdminShenfen.js';
export default {
  data() {
    return {
      popupShow: false
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get( "/api/ShopFw/shop_fw", {
        params: { shop_id: 1 }
      })
      .then(res => {
        console.log(res);
        _this.faceList = res.data.face;
      });
  },
  watch: {
    $route() {
      this.popupShow = false;
    }
  },
  methods: {
    // yanzheng() {
    //   console.log(1);
    //   var _this = this;
    //   this.$axios
    //     .get( "/api/ShopFw/pay_num_ok", {
    //       params: {
    //         fw_shop_id: 1,
    //         pay_num: _this.pay_num,
    //         face_id: _this.face_id
    //       }
    //     })
    //     .then(res => {
    //       console.log(res);
    //       _this.xiaofeijuan = res.data.log;
    //       _this.alertShow = true;
    //     });
    // },
    // showPopup(val) {
    //   this.popupShow = val;
    // },
    showPopup(val) {
      this.popupShow = val;
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
    Popup,
    Cell
  },
  mixins:[checkAdminShenfen]
};
</script>

<style lang='scss'>
.yz-tips {
  margin-top: 0.266667rem;
  .tip-tit {
    @include font-dpr(14px);
    margin-bottom: 0.266667rem;
  }
  .tip-content {
    padding-left: 0.4rem;
    line-height: 0.533333rem;
  }
   .router-enter-active {
    transition: transform .3s ease-in-out;
  }

  .router-enter {
    transform: translateX(100%);
  }
}
</style>