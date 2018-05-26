<template>
    <div class="service">
        <img src="~img/index/avatar.png" alt="" class="img">
        <div class="info">
            <div class="top">炫车豪庭汽车维护中心</div>
            <div class="middle">
                <Rater font-size='18' disabled></Rater>
            </div>
            <div class="bottom">
                <span>体育中心</span>
                <span>维修保养</span>
                <span>&lt;2.8KM</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Rater } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    Rater
  }
};
</script>

<style lang='scss'>
.service {
  display: flex;

  background: #ffffff;
  padding: 0.36rem 0.4rem;
  border-bottom: 1px solid #dfdfdf;
  .img {
    width: 2.346667rem;
    height: 2.346667rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-weight: bold;
      @include font-dpr(17px);
      line-height: 0.773333rem;
      color: #2b2b2b;
    }
  }
}
</style>