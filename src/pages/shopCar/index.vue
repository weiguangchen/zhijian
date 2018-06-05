<template>
    <div class="page">
        <ViewBox class="shop-car">
            <div class="buy-btn">
                <div class="price">合计:  ¥894.00</div>
                <div class="buy" @click="buy">立即购买</div>
            </div>
        </ViewBox>

    </div>
</template>

<script>
import { ViewBox } from "vux";
export default {
  data() {
    return {};
  },
  methods: {
    buy() {}
  },
  components: {}
};
</script>

<style lang='scss'>
.shop-car {
  .buy-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.333333rem;
    background: #ffffff;
    display: flex;
    box-shadow: 0 0 9px 1px rgba(#000000, 0.57);
    .price,
    .buy {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .price {
      line-height: 1;
      background: #dedede;
      @include font-dpr(17px);
      color: #2c2c2c;
       
    }
    .buy {
      background: #ff1b36;
      color: #ffffff;
      @include font-dpr(18px);
    }
  }
}
</style>