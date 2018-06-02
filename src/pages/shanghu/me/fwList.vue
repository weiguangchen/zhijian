<template>
    <div class="page">
        <ViewBox>
            <div v-for="(item,index) in fwList" :key="index" @click="toChange(item.shop_fw_id)">
                {{item.fw_mingzi}}
            </div>
        </ViewBox>
    </div>
</template>

<script>
import { ViewBox } from "vux";
export default {
  data() {
    return {
      fwList: []
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get(this.API_URL + "/Api/ShopFw/fw_list", {
        params: {
          shop_id: 1
        }
      })
      .then(({ data }) => {
        console.log(data);
        _this.fwList = data;
      });
  },
  methods: {
    toChange(fwId) {
      this.$router.push({
        path: "/shanghu/me/xmgl",
        query: {
          fwId
        }
      });
    }
  },
  components: {
    ViewBox
  }
};
</script>

<style lang='scss'>
</style>