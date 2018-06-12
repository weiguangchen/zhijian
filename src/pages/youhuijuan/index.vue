<template>
    <div class="page youhui">
        <div class="select">
            <div class="active item">全部</div>
            <div class="item">未使用</div>
            <div class="item">即将过期</div>
            <div class="item">已使用/失效</div>
        </div>
        <div class="juan">
            <div class="top">
                <img src="~img/index/avatar.png" alt="" class="thumb">
                <div class="info">
                    <div class="name">
                        <span>炫车豪庭汽车维修保养生活馆</span>
                        <span class="price">￥50</span>
                    </div>
                    <div class="classifiy">汽车打蜡</div>
                </div>
                <div class="status wsy">未使用</div>
            </div>
            <div class="bot">
                <div class="message">
                    <div class="">
                        <i class="iconfont icon-shijian"></i>2018.06.07 - 2018.07.01</div>
                    <div class="ma">
                        <i class="iconfont icon-yuechi"></i>345522342423</div>
                </div>
                <div class="times">
                    <span class="num">5</span>
                </div>
            </div>
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
export default {
  data() {
    return {};
  },
  methods: {
    loadList() {}
  },
  components: {
    Layout,
    InfiniteScroll
  }
};
</script>

<style lang='scss'>
.youhui {
  box-sizing: border-box;
  padding: 0.533333rem 0.4rem 0;
  .select {
    box-shadow: 0 0 2px rgba(#000000, 0.1);
    display: flex;
    box-sizing: border-box;
    height: 1.2rem;
    border: 1px solid #989898;
    border-radius: 0.6rem;
    background: #ffffff;
    padding: 0.133333rem;
    margin-bottom: 0.8rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.453333rem;
      flex: 1;
    }
    .active {
      background: #de3232;
      color: #ffffff;
    }
  }
  .juan {
    box-shadow: 0 0 10px 1px rgba(#000000, 0.4);
    border-radius: 0.133333rem;
    overflow: hidden;
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
          .price {
            @include font-dpr(21px);
            flex: 1;
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
      background: #ffffff;
      position: relative;
      display: flex;
      padding: 0.24rem 0 0.4rem 0.4rem;
      box-sizing: border-box;
      height: 1.893333rem;
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