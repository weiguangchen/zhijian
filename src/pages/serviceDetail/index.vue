<template>
  <div class="page">
    <ViewBox>
      <div class="banner">
        <div class="share"></div>
        <Swiper height='5.12rem'>
          <SwiperItem v-for="(item,index) in fw_info.fw_img" :key="index"><img :src="item" alt=""></SwiperItem>
        </Swiper>
      </div>
      <div class="sp-info">
        <div class="top">{{fw_info.fw_mingzi}}</div>
        <div class="bottom">
          仅售298元，价值420元的内饰高位桑拿消毒除菌的套餐（SUV到店补15差价即可）
        </div>
      </div>

      <div class="comment">
        <span class="iconfont icon-fuwuxiangqingzan">好评率97%</span>
        <span class="count">共{{fw_info.token_num}}个消费评价</span>
      </div>

      <div class="address1">
        <div class="top">
          <div class="left">
            <div class="name">炫车豪庭汽车维修保养生活馆</div>
            <div class="info">
              <rater :val='fw_info.token_pj' class="rater" :enable='enable'></rater>
              <span class="count">28条</span>
              <span class="juli">5.5KM</span>
            </div>
          </div>
          <div class="right">
            <span class="iconfont"></span>
          </div>
        </div>
        <div class="bottom">
          <span class="iconfont icon-weizhi1"></span>
          <span class="txt">卫国道泰兴路益寿东里37号楼底商（近仁爱医院）</span>
        </div>
      </div>

      <div class="detail">
        <myTitle>
          <span>服务详情</span>
          <span slot="right">更多图文详情
            <i class="iconfont icon-jinru"></i>
          </span>
        </myTitle>
        <div class="content" v-html="fw_info.fw_content">

        </div>
      </div>

      <div class="pingjia">
        <!-- <myTitle>
          <span>网友点评(28)</span>
          <span slot="right">
            <i class="iconfont icon-jinru"></i>
          </span>
        </myTitle> -->
        <Group>
          <Cell title='网友点评(28)'>
            <span>更多</span>
          </Cell>
        </Group>
        <!-- <div class="title">
                    <div class="left">网友点评(28)</div>
                    <span class="iconfont icon-jinru"></span>
                </div> -->
        <div class="list">
          <pinglun></pinglun>
          <pinglun></pinglun>
        </div>
      </div>

      <div class="hot">
        <div class="title">小伙伴们还喜欢</div>
        <div class="list">
          <div class="item" v-for='(item,index) in fw_info.friend_like' :key='index' @click="toDetail(item.shop_fw_id)">
            <img :src="item.fw_img" alt="" class="thumb">
            <div class="intr">
              <div class="tit">{{item.fw_mingzi}}</div>
              <rater :val='item.token_pj' class="rater"></rater>
              <div class="tip">
                <span>{{item.fw_name}}</span>
                <span>卫国道</span>
                <span>12KM</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="buy-btn">
        <div class="price">
          <span>
            <i>￥</i>{{fw_info.money}}
            <sup>￥{{fw_info.y_money}}</sup>
          </span>
        </div>
        <div class="buy" @click="buy">立即购买</div>
      </div>
    </ViewBox>
  </div>
</template>
<script>
import { Swiper, SwiperItem, ViewBox, Cell, Group } from "vux";
import rater from "@/components/star/index";
import tuangou from "@/components/service/serviceTuan.vue";
import myTitle from "@/components/title/index";
import pinglun from "@/components/pinglun/index";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      enable: true,
      fw_info: {}
    };
  },
  created() {
    this.get_fw_info();
  },
  methods: {
    buy() {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/api/WxPay/zf", {
          params: {
            shop_fw_id: _this.fwId,
            num: 1,
            uid: _this.id
          }
        })
        .then(res => {
          return res.data;
        })
        .then(res => {
          return _this.$axios.get(this.API_URL + "/api/WxPay/fs", {
            params: {
              order_num: res
            }
          });
        })
        .then(res => {
          console.log(res);
        });
    },
    toDetail(id) {
      this.$toDetail(id);
    },
    get_fw_info() {
      var _this = this;
      this.$axios
        .get(_this.API_URL + "/api/Show/fw_content", {
          params: {
            id: _this.fwId
          }
        })
        .then(res => {
          _this.fw_info = res.data[0];
          if (typeof res.data[0].fw_img == "string") {
            var arr = [];
            arr.push(res.data[0].fw_img);
            res.data[0].fw_img = arr;
          }
          _this.fw_info.fw_img = arr;
          console.log(res);
        });
    }
  },
  watch: {
    $route() {
      this.get_fw_info();
    }
  },
  computed: {
    fwId() {
      return this.$route.params.serviceId;
    }
  },
  components: {
    ViewBox,
    Swiper,
    SwiperItem,
    rater,
    tuangou,
    Cell,
    Group,
    myTitle,
    pinglun
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.banner {
  height: 5.12rem;
  overflow: hidden;
  position: relative;
  .share {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 1.066667rem;
    background: rgba(#000000, 0.4);
    z-index: 999;
  }
}

%public {
  padding: 0.373333rem 0.4rem;
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
  line-height: 1;
  color: #2b2b2b;
  .top,
  .middle,
  .bottom {
    display: flex;
    align-items: center;
  }
  .top,
  .middle {
    margin-bottom: 0.32rem;
  }
  .middle,
  .bottom {
    .txt {
      color: #2b2b2b;
      opacity: 0.5;
    }
  }
}
.sp-info {
  @extend %public;
  .top {
    @include font-dpr(17px);
  }
  .bottom {
    opacity: 0.5;
    @include font-dpr(14px);
    line-height: 0.56rem;
  }
}
.comment {
  box-sizing: border-box;
  @extend %public;
  height: 1.16rem;
  @include font-dpr(14px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconfont {
    @include font-dpr(14px);
    &::before {
      margin-right: 0.506667rem;
    }
  }
  .count {
    opacity: 0.5;
  }
}
.address1 {
  @extend %public;
  margin-bottom: 0.373333rem;
  .top {
    display: flex;
    align-items: center;
    line-height: 0.453333rem;
    margin-bottom: 0.2rem;
    .left {
      flex: 1;
      .name {
        @include font-dpr(17px);
        margin-bottom: 0.426667rem;
      }
      .info {
        margin-bottom: 0.26rem;
        .rater {
          margin-right: 0.8rem;
        }
        .count {
          margin-right: 2.48rem;
          opacity: 0.5;
        }
        .juli {
          opacity: 0.5;
        }
      }
    }
    .right {
      width: 1.546667rem;
      border-left: 1px solid #7f7f7f;
    }
    .icon-weizhi1 {
      margin-right: 0.24rem;
    }
  }
  .bottom {
    color: #2b2b2b;
    .iconfont {
      @include font-dpr(20px);
      margin-right: 0.346667rem;
    }

    .txt {
      @include font-dpr(12px);
      opacity: 0.5;
    }
  }
}

.detail {
  margin-bottom: 0.373333rem;
  .content {
    padding: 0.533333rem 0.4rem;
    background: #ffffff;
    @include font-dpr(13px);
  }
}
.pingjia {
  margin-bottom: 0.373333rem;
}
.hot {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-dpr(17px);
    background: #ffffff;
    height: 1.026667rem;
    padding: 0 0.4rem;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0.4rem;
    background: #ffffff;
  }
  .item {
    width: 4.24rem;
    line-height: 1;
    background: #ffffff;
    padding-bottom: 0.426667rem;
    .thumb {
      width: 100%;
      height: 2.426667rem;
      margin-bottom: 0.133333rem;
    }
    .tit {
      @include font-dpr(15px);
      color: #2b2b2b;
      margin-bottom: 0.213333rem;
    }
    .rater {
      margin-bottom: 0.293333rem;
    }
    .tip {
      display: flex;
      justify-content: space-between;
      color: #2b2b2b;
      @include font-dpr(12px);
      opacity: 0.5;
    }
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
    @include font-dpr(30px);
    color: #ff1b36;
    font-weight: bold;
    sup {
      @include font-dpr(12px);
      color: #131313;
      opacity: 0.5;
    }
    i {
      font-style: normal;
      @include font-dpr(13px);
    }
  }
  .buy {
    background: #ff1b36;
    color: #ffffff;
    @include font-dpr(18px);
  }
}
</style>