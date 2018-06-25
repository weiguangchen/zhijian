<template>
    <div class="shanghu-page">
        <ViewBox>
            <router-view @showPopup='showPopup'></router-view>
            <!-- <bigTitle title='经营管理'></bigTitle>
      <div class="my-form">
        <div class="form-box">
          <Group>
            <Cell title='消费统计' :is-link='true' link='/shanghu/jingying/tongji'></Cell>
            <Cell title='订单管理' :is-link='true' link='/shanghu/jingying/orderGl'></Cell>
          </Group>
        </div>

      </div> -->
        </ViewBox>
        <Popup position='right' v-model="popupShow">
            <div class="popup-list">
                <Group>
                    <Cell title='消费统计' link='/shanghu/jingying/tongji'></Cell>
                    <Cell title='订单管理' link='/shanghu/jingying/orderGl'></Cell>
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
  created() {
  },
  methods: {
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
    Cell,
    Popup
  }
};
</script>

<style lang='scss'>

</style>