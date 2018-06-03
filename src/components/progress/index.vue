<template>
    <div class="star-item">
        <span class="star-percent" :style="{width: percent+'%'}"></span>
    </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    percent() {
      return this.num / this.total * 100;
    }
  },
  props: ["total", "num"],
  components: {}
};
</script>

<style lang='scss' scoped>
.star-item {
  width: 2.986667rem;
  height: 0.24rem;
  display: flex;
  background: #cacaca;
  .star-percent {
    flex: none;
    background: #ff5814;
  }
}
</style>