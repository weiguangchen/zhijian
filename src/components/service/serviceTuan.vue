<template>
  <div class="serviceTuan">
    <img src="~img/index/avatar.png" alt="" class="img">
    <div class="info">
      <div class="top">炫车豪庭汽车维护中心</div>
      <div class="middle">
       <span class="now">￥298</span>
       <span class="old"><span class="t">原价</span>￥580</span>
      </div>
      <div class="bottom">
        <span>已售44</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Rater } from "vux";
export default {
  data() {
    return {
      val: 3,
      fontSize:18
    };
  },
  components: {
    Rater
  }
};
</script>

<style lang='scss'>
.serviceTuan {
  display: flex;
  background: #ffffff;
  padding: 0.36rem 0.4rem;
  border-bottom: 1px solid #dfdfdf;
  .img {
    width: 2.346667rem;
    height: 2.346667rem;
    margin-right: 0.32rem;
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      @include font-dpr(17px);
      line-height: 0.773333rem;
      color: #2b2b2b;
    }
    .middle{
        .now{
            @include font-dpr(24px);
            color:#de3232;
            margin-right: .293333rem;
        }
        .old{
            @include font-dpr(17px);
            opacity: .5;
            color: #0f0f0f;
            .t{
                @include font-dpr(12px);
            }
        }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      @include font-dpr(12px);
      color: #2b2b2b;
      opacity: 0.5;
    }
  }
}
</style>