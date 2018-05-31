<template>
  <div class="form-group">
    <h2 class="sub-title">选择门店</h2>
    <Group>
      <Selector title='' :options='faceList' :value-map="['fw_shop_id','face_name']"></Selector>
    </Group>
  </div>
</template>

<script>
import { ViewBox, Selector, Group } from "vux";
export default {
  data() {
    return {
      faceList: []
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get(_this.API_URL + "/api/ShopFw/shop_fw", {
        params: { shop_id: 1 }
      })
      .then(res => {
        console.log(res);
        _this.faceList = res.data.face;
      });
  },
  components: {
    Selector,
    Group
  }
};
</script>

<style lang='scss' scoped>


</style>