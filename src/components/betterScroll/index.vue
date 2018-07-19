<template>
  <div class="wrapper my-warpper" ref="wrapper">
    <ul class="content">
      <div>
        <slot></slot>
        <div class="tip">
          <slot name="loadingTip" v-if="isPullUpLoad"></slot>
          <slot name="doneTip" v-else></slot>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      isPullUpLoad: false
    };
  },
  created() {},
  components: {},
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        tap: true,
        click: true,
        pullUpLoad: {
          threshold: 50
        }
      });

      this.scroll.on("pullingUp", () => {
        console.log("触发上拉事件");
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
    });
  },
  methods: {
    finishPullupload() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    },
    pullupLoadend() {
      this.isPullUpLoad = false;
    },
    closePullUp() {
      console.log("关闭上拉加载");
      this.scroll.closePullUp();
    }
  }
};
</script>

<style scoped lang='scss'>
.my-warpper {
  height: 100%;
  .tip {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.4rem;
    color: rgba(#000000, 0.6);
    text-align: center;
  }
}
</style>
