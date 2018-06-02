<template>
    <div class="page">
        <ViewBox>
            <ScrollTab class="ScrollTab">
                <ScrollTabPanel :label="item.fw_cid_name" v-for="(item,index) in listArr" :key="index">
                    <div v-for="(item,index) in item.list" :key="index">
                        {{item.fw_mingzi}}
                    </div>
                </ScrollTabPanel>
            </ScrollTab>
        </ViewBox>
    </div>
</template>

<script>
import { ViewBox } from "vux";
import { ScrollTab, ScrollTabPanel } from "vue-ydui/dist/lib.px/scrolltab";
export default {
  data() {
    return {
      listArr: []
    };
  },
  created() {
    var _this = this;
    this.$axios.get(this.API_URL + "/api/Show/one_class").then(res => {
      console.log(res);
      _this.listArr = res.data.info;
    });
  },
  components: {
    ScrollTab,
    ScrollTabPanel,
    ViewBox
  }
};
</script>

<style lang='scss'>
.ScrollTab {
  padding-bottom: 50px;
}
</style>