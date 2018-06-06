<template>
    <div class="shop-car-item">
        <div class="icon">
            <i class="iconfont icon-dui"></i>
        </div>
        <div class="goods-info">
            <img src="" alt="" class="thumb">
            <div class="info">
                <div class="fw-name">
                    298元内饰高温桑拿消毒除菌上光套餐
                </div>
                <div class="sub">
                    除菌的套餐（suv到店补15差价）
                </div>
                <div class="btn-box">
                    <span>¥
                        <span class="price">596</span>
                    </span>
                    <Group>
                        <XNumber button-style='round' class='xnumber' :min='0'></XNumber>
                    </Group>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { XNumber, Group } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    XNumber,
    Group
  }
};
</script>

<style lang='scss'>
.shop-car-item {
  display: flex;
  background: #ffffff;
  padding: 0.4rem 0;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.68rem;
    @include font-dpr(20px);
  }
  .goods-info {
    display: flex;
    .thumb {
      flex: none;
      width: 1.733333rem;
      height: 1.733333rem;
      margin-right: 0.266667rem;
    }
    .fw-name,.sub{
        line-height: .48rem;
    }
    .sub{
        color:#aaaaaa;
        margin-bottom: .133333rem;
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include font-dpr(13px);
      .price{
          color:#dd3333;
      }
      .xnumber{
          transform: scale(.8);
      }
    }
    .weui-cells{
        box-sizing: content-box;
        margin-top: 0;
        &::after,&::before{
            display: none;
        }
        
        .weui-cell{
            padding: 0;
        }
    }
  }
}
</style>