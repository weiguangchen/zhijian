<template>
    <Rater :font-size='8' :value='val' :margin='10' :active-color='starColor' class="rater" star='<span class="iconfont icon-shoucang"></span>' :disabled='enable' @input='input'></Rater>
</template>

<script>
import { Rater } from "vux";
export default {
  data() {
    return {
      starColor: "#ff5715",
    };
  },
  methods: {
    input(v){
      this.$emit('input',v)
    }
  },
  props: {
    val:{
      default:0
    },
    enable:{
      default:true
    }
  },
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