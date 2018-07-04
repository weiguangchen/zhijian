<template>
  <div class="youhui">
    <div class="wrapper" ref="wrapper">
      <ul class="content">  
         <div class="select">
          <!-- <div class=" item">全部</div> -->
          <i class="iconfont icon-a"></i>
          <div class="item active">活动卡</div>
          <div class="item">优惠券</div>
          <div class="item">代金券</div>
        </div>
        <div class="juan-list">
          <div class="juan" v-for="(item,index) in cardList" :key="index">
            <div class="top">
              <img :src="item.card_img" alt="" class="thumb">
              <div class="info">
                <div class="name">
                  <span>{{item.shop_name}}</span>
                  <span class="price">￥{{item.card_money}}</span>
                </div>
                <div class="classifiy">{{item.card_name}}</div>
              </div>
              <div class="status wsy">未使用</div>
            </div>
            <div class="bot">
              <div class="address">
                <i class="iconfont"></i>
                {{item.adress}}
              </div>
              <div class="fw-item" v-for="(fw,index1) in item.son" :key="index1">
                <div class="line">
                  <span>
                    <span class="fw-title">服务：</span>{{fw.fw_name}}</span>
                  <span>剩余次数: {{fw.fw_num}}</span>
                </div>
                <!-- <div class="line">
                  <span>
                    <span class="fw-title">验证码：</span>
                    <span class="fw-num">{{fw.pay_ma}}</span>
                  </span>
                  <span class="reset-num" @click="cz_card(fw.id,index,index1)">刷新验证码</span>
                </div> -->
              </div>

            </div>
          </div>

        </div>
      </ul>
    </div>
   

    <!-- <Layout>
            <InfiniteScroll :callback="loadList" ref="infinitescroll"> -->
    <!-- <span slot="doneTip">暂无更多评论</span> -->
    <!-- </InfiniteScroll>
        </Layout> -->
  </div>
</template>

<script>
import { InfiniteScroll } from "vue-ydui/dist/lib.px/infinitescroll";
import { Layout } from "vue-ydui/dist/lib.px/layout";
import { ViewBox } from "vux";
import BScroll from "better-scroll";
import checkLogin from "@/mixins/checkLogin";
export default {
  data() {
    return {
      cardList: []
    };
  },
  created() {
    var _this = this;
    this.get_card().then(res => {
      _this.cardList = res;
    });
  },
  methods: {
    loadList() {},
    get_card() {
      var _this = this;
      return this.$axios
        .get(_this.API_URL + "/Api/YouHui/see_card", {
          params: {
            uid: _this.id
          }
        })
        .then(({ data }) => {
          console.log(data);
          return data;
        });
    },
    cz_card(id, index, sonindex) {
      this.$axios
        .get(this.API_URL + "/Api/YouHui/cz_card", {
          params: {
            id
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.cardList[index].son[sonindex].pay_ma = data;
        });
    }
  },
  components: {
    Layout,
    InfiniteScroll
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        tap: true,
        click: true
      });
    });
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.youhui {
  height: 100%;
  box-sizing: border-box;
  padding: 0.533333rem 0.4rem 0;
  .wrapper{
    height: 100%;
  }
  .select {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 1.2rem;
    border-radius: 0.6rem;
    padding: 0.133333rem;
    margin-bottom: 0.8rem;
    .item {
      box-sizing: border-box;
      height: 0.906667rem;
      padding: 0 0.586667rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.453333rem;
      flex: none;
    }
    .active {
      background: #de3232;
      color: #ffffff;
    }
    .icon-a {
      @include font-dpr(22px);
      margin-right: 0.6rem;
    }
  }
  .juan {
    box-shadow: 0 0 10px 1px rgba(#000000, 0.4);
    border-radius: 0.133333rem;
    overflow: hidden;
    margin-bottom: 1.2rem;
    $juanColor: #8ac7ff;
    .top {
      position: relative;
      color: #ffffff;
      display: flex;
      padding: 0.373333rem 0.4rem;
      background: linear-gradient(#3891dd, $juanColor);
      .thumb {
        flex: none;
        width: 1.333333rem;
        height: 1.333333rem;
        border: 1px solid #ffffff;
        border-radius: 50%;
        margin-right: 0.266667rem;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          display: flex;
          justify-content: space-between;
          .price {
            @include font-dpr(22px);
            flex: none;
            text-align: center;
          }
        }
        .classifiy {
          @include font-dpr(14px);
        }
      }
      .status {
        color: #ffffff;
        position: absolute;
        text-align: center;
        width: 1.733333rem;
        height: 0.64rem;
        line-height: 0.64rem;
        right: 0;
        bottom: 0;
      }
      .wsy {
        background: #43b486;
      }
    }
    .bot {
      .address {
        height: 1.026667rem;
        background: #ffffff;
        display: flex;
        align-items: center;
        padding-left: 0.466667rem;
      }
      .fw-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 1.666667rem;
        padding: 0.32rem 0.466667rem;
        border-top: 1px dashed #acacac;
        &:nth-child(even) {
          background: #f7f9f8;
        }
        .line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .fw-title {
            display: inline-block;
            width: 1.573333rem;
          }
          .fw-num {
            @include font-dpr(14px);
          }
          .reset-num {
            background: #dd69ee;
            text-align: center;
            line-height: 0.533333rem;
            height: 0.533333rem;
            padding: 0 0.053333rem;
            border-radius: 0.133333rem;
            color: #ffffff;
          }
        }
      }
      background: #ffffff;
      position: relative;
      // display: flex;
      // padding: 0.24rem 0 0.4rem 0.4rem;
      box-sizing: border-box;
      // height: 1.893333rem;
      &:after {
        content: "";
        height: 0.106667rem;
        position: absolute;
        left: 0;
        top: -0.106667rem;
        width: 100%;
        background: url(~img/public/youhuijuan-bg.png);
      }
      .message {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .icon-shijian {
          @include font-dpr(17px);
        }
        .icon-yuechi {
          margin-left: 0.04rem;
          @include font-dpr(13px);
        }
        .iconfont {
          margin-right: 0.426667rem;
        }
        .ma {
          @include font-dpr(14px);
        }
        & > div {
          display: flex;
          align-items: center;
        }
      }
      .times {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.08rem;
        .num {
          width: 0.64rem;
          height: 0.64rem;
          line-height: 0.64rem;
          text-align: center;
          border-radius: 0.106667rem;
          color: #ffffff;
          background: $juanColor;
        }
      }
    }
  }
}
</style>