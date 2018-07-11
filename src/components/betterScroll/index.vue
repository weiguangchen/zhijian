<template>
  <div class="wrapper my-warpper" ref="wrapper">
    <ul class="content">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  export default {
    data() {
      return {

      }
    },
    created(){
    },
    components: {

    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          tap: true,
          click: true
        });
      });
    },
  }

</script>

<style scoped lang='scss'>
.my-warpper{
  height: 100%;
}

</style>
