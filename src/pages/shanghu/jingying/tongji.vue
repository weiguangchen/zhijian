<template>
    <div class="shanghu-page">
        <bigTitle title="销售统计"></bigTitle>
        <div class="tongji-info">
            <div class="tongji-item" v-for="(item,index) in list" :key="index">
                <img :src="item.fw_img" alt="" class="img">
                <div class="info">
                    <div class="mingzi">{{item.fw_mingzi}}</div>
                    <div class="count">
                        <div class="count-item">
                            <div>销售量</div>
                            <span>{{item.buy_number}}</span>
                        </div>
                        <div class="count-item">
                            <div>验证量</div>
                            <span>{{item.yz_number}}</span>
                        </div>
                        <div class="count-item">
                            <div>退款量</div>
                            <span>{{item.tuihuo_number}}</span>
                        </div>
                    </div>
                </div>
                <div class="icon">
                    <i class="iconfont icon-jinru"></i>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import bigTitle from "@/components/bigTitle/index";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get(this.API_URL + "/Api/Shop/shop_fw", {
        params: {
          shop_id: 1
        }
      })
      .then(res => {
        console.log(res);
        _this.list = res.data;
      });
  },
  components: { bigTitle }
};
</script>

<style lang='scss'>
.tongji-info {
  padding-left: .533333rem;
  .tongji-item {
    @include font-dpr(12px);
    display: flex;
    box-sizing: border-box;
    padding-top: 0.56rem;
    height: 3.333333rem;
    border-bottom: 1px solid #f0f0f0;
    .img {
      width: 2.666667rem;
      height: 2.133333rem;
      border-radius: 0.133333rem;
      margin-right: 0.24rem;
    }
    .info {
      flex: 1;
    }
    .mingzi {
      height: 1.146667rem;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 0.266667rem;
      overflow: hidden;
    }
    .count {
      display: flex;
      .count-item {
        flex: 1;
        text-align: center;
      }
    }
    .icon {
      @include font-dpr(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.733333rem;
      flex: none;
      margin-top: -.8rem;
    }
  }
}
</style>