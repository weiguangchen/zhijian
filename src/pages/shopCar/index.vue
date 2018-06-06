<template>
    <div class="page">
        <ViewBox class="shop-car">
            <div class="total-btn">
                <div class="icon">
                    <i class="iconfont icon-dui"></i>
                </div>
                <span class="txt">
                    <span>全选</span>
                    <span>编辑</span>
                </span>
            </div>
            <div class="shop-item-list">
                <shopitem></shopitem>
            </div>

            <!-- <div class="hot-tuijian">
                为你推荐
            </div>
            <friendLike></friendLike> -->

            <div class="buy-btn">
                <div class="price">合计: ¥894.00</div>
                <div class="buy" @click="buy">立即购买</div>
            </div>

        </ViewBox>

    </div>
</template>

<script>
import { ViewBox } from "vux";
import shopitem from "./item";
import friendLike from "@/components/friendLike/index";
export default {
  data() {
    return {};
  },
  methods: {
    buy() {}
  },
  components: {
    ViewBox,
    shopitem,
    friendLike
  }
};
</script>

<style lang='scss'>
.shop-car {
  .total-btn {
      margin-bottom: $bot;
    background: #ffffff;
    @include font-dpr(14px);
    height: 1.2rem;
    display: flex;
    align-items: center;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.68rem;
      @include font-dpr(20px);
    }
    .txt{
        padding-right: .4rem;
        flex: 1;
        display: flex;
        justify-content: space-between;
    }
  }
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
  .hot-tuijian {
    text-align: center;
    height: 1.466667rem;
    line-height: 1.466667rem;
    @include font-dpr(17px);
  }
}
</style>