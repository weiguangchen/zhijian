<template>
    <div class="shanghu-page">
        <ViewBox>
            <router-view @showPopup='showPopup'></router-view>
        </ViewBox>
        <Popup position='right' v-model="popupShow">
            <div class="popup-list">
                <Group>
                    <Cell title='添加项目' link='/shanghu/me/xmgl'></Cell>
                    <Cell title='管理服务' link='/shanghu/me/fwList'></Cell>
                    <Cell title='添加活动' link='/shanghu/me/addhuodong'></Cell>
                    <Cell title='门店管理'  link='/shanghu/me/mendian'></Cell>
                </Group>

            </div>
        </Popup>
    </div>
</template>

<script>
import { Popup } from "vue-ydui/dist/lib.px/popup";

import { ViewBox, Cell, Group } from "vux";

export default {
  data() {
    return {
      popupShow: false
    };
  },
  created() {},
  methods: {
    showPopup(val) {
      this.popupShow = val;
    }
  },
  components: {
    ViewBox,
    Popup,
    Cell,
    Group
  }
};
</script>

<style lang='scss'>
</style>