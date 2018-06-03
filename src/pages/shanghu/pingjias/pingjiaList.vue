<template>
    <div class="shanghu-page">
        <ViewBox class="pingjia-detail">
            <bigTitle title="消费评价详情" class="big-title"></bigTitle>
            <div class="form-box">
                <div class="total-info">
                    <div class="thumb-wrap">
                        <img :src="fw_img" alt="" class="thumb">
                        <star :val='all' class="star"></star>
                    </div>
                    <div class="star-info">
                        <div class="star-line">
                            5星
                            <starprogress :total='all_token' :num='starinfo.one' class="progress"></starprogress>{{starinfo.one}}
                        </div>
                        <div class="star-line">
                            4星
                            <starprogress :total='all_token' :num='starinfo.two' class="progress"></starprogress>{{starinfo.two}}
                        </div>
                        <div class="star-line">
                            3星
                            <starprogress :total='all_token' :num='starinfo.three' class="progress"></starprogress>{{starinfo.three}}
                        </div>
                        <div class="star-line">
                            2星
                            <starprogress :total='all_token' :num='starinfo.four' class="progress"></starprogress>{{starinfo.four}}
                        </div>
                        <div class="star-line">
                            1星
                            <starprogress :total='all_token' :num='starinfo.five' class="progress"></starprogress>{{starinfo.five}}
                        </div>
                    </div>
                </div>
                <!-- <ButtonTab v-model="activeIndex">
                    <ButtonTabItem>全部</ButtonTabItem>
                    <ButtonTabItem>差评</ButtonTabItem>
                </ButtonTab> -->
                <div class="pingjia-content">
                    <!-- <template v-if="activeIndex == 0"> -->
                        <pinglun v-for="(item,index) in list" :key="index" :info='item'></pinglun>
                    <!-- </template>
                    <template v-else-if="activeIndex == 1">
                        <pinglun></pinglun>
                        <pinglun></pinglun>
                        
                    </template> -->
                </div>

            </div>

        </ViewBox>
    </div>
</template>

<script>
import { ViewBox, ButtonTab, ButtonTabItem } from "vux";
import pinglun from "@/components/pinglun/index";
import bigTitle from "@/components/bigTitle/index";
import starprogress from "@/components/progress/index";
import star from "@/components/star/index";
export default {
  data() {
    return {
      activeIndex: 0,
      starinfo: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: ""
      },
      fw_img: "",
      all_token: "",
      all: "",
      list:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/Shop/fw_token", {
          params: {
            fw_shop_id: _this.fwId
          }
        })
        .then(({ data }) => {
          _this.starinfo.one = data.one;
          _this.starinfo.two = data.two;
          _this.starinfo.three = data.three;
          _this.starinfo.four = data.four;
          _this.starinfo.five = data.five;
          _this.fw_img = data.img;
          _this.all_token = data.all_token;
          _this.all = data.all;
          _this.list = data.list;
        });
    }
  },
  computed: {
    fwId() {
      return this.$route.params.pingjiaId;
    }
  },
  components: {
    bigTitle,
    ViewBox,
    ButtonTab,
    ButtonTabItem,
    starprogress,
    star,
    pinglun
  }
};
</script>

<style lang='scss'>
.pingjia-detail {
  .big-title {
    margin-bottom: 0.533333rem;
  }
  .total-info {
    display: flex;
    margin-bottom: 1.066667rem;
    .thumb-wrap {
      position: relative;
      margin-right: 0.24rem;
      .star {
        position: absolute;
        bottom: 0.266667rem;
        left: 0.266667rem;
      }
    }
    .thumb {
      width: 2.666667rem;
      height: 2.133333rem;
      border-radius: 0.106667rem;
    }
    .star-info {
      .star-line {
        display: flex;
        align-items: center;
        .progress {
          margin: 0 0.106667rem 0 0.16rem;
        }
      }
    }
  }
  .vux-button-group > a.vux-button-group-current{
      background: #de3232;
  }
  .vux-button-group > a.vux-button-tab-item-first:after{
      border: 1px solid #de3232;
  }

  .vux-button-group > a.vux-button-tab-item-last:after{
      border: 1px solid #de3232;
      
  }
}
</style>