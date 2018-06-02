<template>
    <div class="shanghu-page">
        <bigTitle title="消费评价列表"></bigTitle>
        <div class="pingjia-list">
            <div class="pingjia-item" v-for="(item,index) in list" :key="index" @click="get_fw_content(item.shop_fw_id)">
                <img :src="item.fw_img" alt="" class="img">
                <div class="info">
                    <div class="mingzi">{{item.fw_mingzi}}</div>
                    <div class="count">¥{{item.money}}</div>
                    <div>已有：
                        <span class="num">{{item.token_num}}</span>人评价</div>
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
  methods: {
    get_fw_content(fwid){
        
    }  
  },
  components: { bigTitle }
};
</script>

<style lang='scss'>
.pingjia-list {
  padding-left: 0.533333rem;
  .pingjia-item {
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
      padding-right: 0.933333rem;
      flex: 1;
      .mingzi {
        height: 1.146667rem;
        overflow: hidden;
      }
      .num {
        color: #dc3232;
      }
    }
  }
}
</style>