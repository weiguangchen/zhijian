<template>
    <Rater :font-size='8' :value='val' :margin='8' :active-color='starColor' class="rater" star='<span class="iconfont icon-shoucang"></span>' :disabled='enable'></Rater>
</template>

<script>
import { Rater } from "vux";
export default {
  data() {
    return {
      starColor: "#ff5715",
    };
  },
  props: ["val","enable"],
  components: {
    Rater
  }
};
</script>

<style lang='scss'>
.icon-shoucang{
  @include font-dpr(13px);
}
</style>