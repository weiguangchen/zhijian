<template>
  <div class="big-title-box">
    <h1 class="big-title">
      <span>{{title}}</span>
      <span class="iconfont icon-weibiaoti-" v-if="icon" @click='showPopup'></span>
      <div class="right" v-if="right">
        <slot name="right"></slot>
      </div>
    </h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      title: {
        default: "标题"
      },
      icon: {
        default: true
      },
      right:{
        default:false
      }
    },
    methods: {
      showPopup() {
        this.$emit('showPopup', true);
      }
    },
    components: {}
  };

</script>

<style lang='scss' scoped>
  .big-title-box {
    padding-left: .533333rem;
    background: #ffffff;

  }

  h1.big-title {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 2.066667rem;
    @include font-dpr(33px);
    padding-right: 0.533333rem;
    padding-bottom: .533333rem/* 40/75 */
    ;
    color: #2b2b2b;
    font-weight: bold;
    border-bottom: 1px solid #f0f0f0;
    .icon-weibiaoti- {
      margin-top: 0.4rem;
      @include font-dpr(20px);
    }

    .right {
      width: 4rem/* 300/75 */
      ;
      display: flex;
      flex: none;
      justify-content: flex-end;
    }
  }

</style>
