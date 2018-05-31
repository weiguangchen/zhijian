<template>
  <div class="page">
    <ViewBox>
      <div class="banner">
        <Swiper aspect-ratio='0.512'>
          <SwiperItem><img src="~img/shangpu/banner.png" alt=""></SwiperItem>
          <SwiperItem><img src="~img/shangpu/banner.png" alt=""></SwiperItem>
          <SwiperItem><img src="~img/shangpu/banner.png" alt=""></SwiperItem>
        </Swiper>
      </div>

      <div class="sp-info1">
        <div class="top">炫车豪庭汽车维修保养生活馆
          <span class="iconfont icon-shoucang"></span>
        </div>
        <div class="middle">
          <rater val='4' class="rater"></rater>
          <span class="txt">28条</span>
        </div>
        <div class="bottom">
          <span class="txt">技术：5.6</span>
          <span class="txt">服务：7.8</span>
          <span class="txt">环境7.8</span>
          <span class="txt">卫国道</span>
        </div>
      </div>

      <div class="sp-info2">
        <div class="top">
          <span class="iconfont icon-yingyeshijian"></span>营业时间：周一到周日 08:00 —— 19:00</div>
        <div class="middle">
          <span class="txt">WIFI</span>
          <span class="txt">刷卡</span>
          <span class="txt">手机支付</span>
        </div>
        <div class="bottom">
          <span class="txt">内饰清洗</span>
          <span class="txt">抛光</span>
          <span class="txt">清洗</span>
          <span class="txt">补胎</span>
        </div>
      </div>

      <div class="address">
        <div class="left">
          <div class="top">
            <span class="iconfont icon-weizhi1"></span>卫国道泰兴路益寿东里37号楼底商（近仁爱医院）</div>
          <div class="bottom">
            距地铁2号线靖江路站c口（东）口步行690米
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-lianxifangshi"></span>
        </div>
      </div>

      <div class="tuangou">
        <div class="tit">
          <span class="left"><img src="~img/shangpu/tuangou.png" alt="" class="icon">服务(5)</span>
          <span class="right">
            <i class="iconfont icon-dui">随时退</i>
            <i class="iconfont icon-dui">过期退</i>
          </span>
        </div>
        <div class="list">
          <tuangou></tuangou>
          <tuangou></tuangou>
          <tuangou></tuangou>
        </div>
      </div>

      <div class="pingjia">
        <div class="title">
          <div class="left">网友点评(28)</div>
          <span class="iconfont icon-jinru"></span>
        </div>
        <div class="list">
          <div class="item">
            <div class="left"><img src="~img/shangpu/avatar.png" alt="" class="avatar"></div>
            <div class="right">
              <div class="tit">
                <span class="name">黑夜的味道</span>
                <span class="date">2017年11月28日</span>
              </div>
              <rater val='4' class="rater"></rater>
              <div class="content">
                <div class="txt">
                  家门口的修理厂，巴拉巴拉北京佛无法就我IE分级加尔文覅金额外，非法金额为飞机。
                </div>
                <div class="imgs">
                  <img src="~img/shangpu/pl1.png" alt="">
                  <img src="~img/shangpu/pl2.png" alt="">
                  <img src="~img/shangpu/pl3.png" alt="">

                </div>
              </div>
              <div class="click">
                <span>浏览2059</span>
                <span>132
                  <i class="iconfont icon-dianzan"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="left"><img src="~img/shangpu/avatar.png" alt="" class="avatar"></div>
            <div class="right">
              <div class="tit">
                <span class="name">黑夜的味道</span>
                <span class="date">2017年11月28日</span>
              </div>
              <rater val='1' class="rater"></rater>
              <div class="content">
                <div class="txt">
                  家门口的修理厂，巴拉巴拉北京佛无法就我IE分级加尔文覅金额外，非法金额为飞机。
                </div>
                <div class="imgs">
                  <img src="~img/shangpu/pl1.png" alt="">
                  <img src="~img/shangpu/pl2.png" alt="">
                  <img src="~img/shangpu/pl3.png" alt="">

                </div>
              </div>
              <div class="click">
                <span>浏览2059</span>
                <span>132
                  <i class="iconfont icon-dianzan"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hot">
        <div class="title">小伙伴们还喜欢</div>
        <div class="list">
          <div class="item">
            <img src="~img/shangpu/car.png" alt="" class="thumb">
            <div class="intr">
              <div class="tit">炫车豪庭汽车</div>
              <rater val='2' class="rater"></rater>
              <div class="tip">
                <span>维修保养</span>
                <span>卫国道</span>
                <span>12KM</span>
              </div>
            </div>
          </div>
          <div class="item">
            <img src="~img/shangpu/car.png" alt="" class="thumb">
            <div class="intr">
              <div class="tit">炫车豪庭汽车</div>
              <rater val='2' class="rater"></rater>
              <div class="tip">
                <span>维修保养</span>
                <span>卫国道</span>
                <span>12KM</span>
              </div>
            </div>
          </div>
          <div class="item">
            <img src="~img/shangpu/car.png" alt="" class="thumb">
            <div class="intr">
              <div class="tit">炫车豪庭汽车</div>
              <rater val='2' class="rater"></rater>
              <div class="tip">
                <span>维修保养</span>
                <span>卫国道</span>
                <span>12KM</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ViewBox>
  </div>
</template>
<script>
import { Swiper, SwiperItem, ViewBox, Cell, Group } from "vux";
import rater from "@/components/star/index";
import tuangou from "@/components/service/serviceTuan.vue";
export default {
  data() {
    return {
      val: 3
    };
  },
  components: {
    ViewBox,
    Swiper,
    SwiperItem,
    rater,
    tuangou,
    Cell,
    Group
  }
};
</script>

<style lang='scss'>
.banner {
  height: 5.12rem;
  overflow: hidden;
}

%public {
  padding: 0.32rem 0.56rem 0.32rem 0.4rem;
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
.sp-info1 {
  @extend %public;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-dpr(16px);
    color: #2b2b2b;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rater {
    margin-right: 0.8rem;
  }
}
.sp-info2 {
  .iconfont {
    @include font-dpr(22px);
  }
  @extend %public;
  .top {
    @include font-dpr(12px);
    .icon-yingyeshijian {
      margin-right: 0.186667rem;
    }
  }
  .middle,
  .bottom {
    padding-left: 0.8rem;
  }
  .middle {
    .txt {
      margin-right: 0.88rem;
    }
  }
  .bottom {
    .txt {
      display: flex;
      align-items: center;
      padding: 0 0.213333rem;
      height: 0.453333rem;
      border: 1px solid #7f7f7f;
      border-radius: 0.08rem;
      margin-right: 0.293333rem;
    }
  }
}
.address {
  padding: 0.293333rem 0 0.293333rem 0.4rem;
  background: #ffffff;
  display: flex;
  color: #2b2b2b;
  margin-bottom: 0.373333rem;
  .iconfont {
    @include font-dpr(24px);
  }
  .top {
    display: flex;
    align-items: center;
    line-height: 0.453333rem;
    margin-bottom: 0.2rem;
    .icon-weizhi1 {
      margin-right: 0.24rem;
    }
  }
  .bottom {
    padding-left: 0.8rem;
    opacity: 0.5;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.026667rem;
  }
}
.tuangou {
  margin-bottom: 0.373333rem;
  .tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.933333rem;
    padding: 0 0.453333rem;
    background: #ffffff;
    border-bottom: 1px solid #dfdfdf;
    color: #2b2b2b;
    .left,
    .right {
      display: flex;
      align-items: center;
    }
    .left {
      font-size: 17px;
    }
    .right {
      font-size: 12px;
      opacity: 0.5;
      .icon-dui {
        &:first-child {
          margin-right: 0.48rem;
        }
        &:before {
          margin-right: 0.133333rem;
        }
      }
    }
    .icon {
      width: 0.586667rem;
      margin-right: 0.2rem;
    }
  }
}
.pingjia {
  margin-bottom: 0.373333rem;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-dpr(17px);
    background: #ffffff;
    height: 1.026667rem;
    padding: 0 0.453333rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .item {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #dfdfdf;
    .left {
      padding: 0.32rem 0.32rem 0 0.4rem;
      .avatar {
        width: 1.466667rem;
        height: 1.466667rem;
        border-radius: 50%;
      }
    }
    .right {
      padding: 0.426667rem 0.4rem 0.4rem 0;
      flex: 1;
      line-height: 1;
      .tit {
        margin-bottom: 0.346667rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #2b2b2b;
        .name {
          font-size: 15px;
        }
        .date {
          opacity: 0.5;
          font-size: 12px;
        }
      }
      .rater {
        margin-bottom: 0.4rem;
      }
      .content {
        margin-bottom: 0.4rem;
        .txt {
          line-height: 0.56rem;
          margin-bottom: 0.266667rem;
        }
        .imgs {
          display: flex;
          justify-content: space-between;
          img {
            width: 2.066667rem;
            height: 1.786667rem;
          }
        }
      }
      .click {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include font-dpr(12px);
        color: #2b2b2b;
        opacity: 0.5;
      }
    }
  }
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
</style>