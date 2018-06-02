<template>
    <div class="big-title-box">
        <h1 class="big-title">{{title}}
            <span class="iconfont icon-weibiaoti-" v-if="icon"></span>
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
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.big-title-box{
  padding-left: .533333rem;  
  
}
h1.big-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.066667rem;
  @include font-dpr(33px);
  padding-right: 0.533333rem;
  color: #2b2b2b;
  font-weight: bold;
  border-bottom: 1px solid #f0f0f0;
  .icon-weibiaoti- {
    margin-top: 0.4rem;
    @include font-dpr(20px);
  }
}
</style>