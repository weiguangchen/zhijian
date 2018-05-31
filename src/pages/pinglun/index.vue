<template>
    <div class="page">
        <div class="pinglun-detail">
            <div class="pl-top">
                <div class="pl-item active">
                    <div class="count">28</div>
                    <div class="tit">全部</div>
                </div>
                <div class="pl-item">
                    <div class="count">12</div>
                    <div class="tit">好评</div>
                </div>
                <div class="pl-item">
                    <div class="count">2</div>
                    <div class="tit">中评</div>
                </div>
                <div class="pl-item">
                    <div class="count">1</div>
                    <div class="tit">差评</div>
                </div>
                <div class="pl-item">
                    <div class="count">12</div>
                    <div class="tit">有图</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang='scss'>
.pinglun-detail {
  .pl-top {
    height: 1.866667rem;
    background: #ffffff;
    display: flex;
    line-height: 1;
    .pl-item {
      color: #2b2b2b;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      flex: 1;
      @include font-dpr(13px);
      .count {
        margin-bottom: 0.16rem;
      }
    }
    .active {
      color: #de3230;
    }
  }
}
</style>