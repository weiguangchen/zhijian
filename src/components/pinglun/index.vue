<template>
    <div class="pl-item">
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
</template>

<script>
import rater from "@/components/star/index";
export default {
  data() {
    return {};
  },
  components: {
      rater
  }
};
</script>

<style lang='scss'>
.pl-item {
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
</style>