<template>
  <div class="pl-item">
    <div class="left"><img :src="info.url" alt="" class="avatar"></div>
    <div class="right">
      <div class="tit">
        <span class="name">{{info.u_name}}</span>
        <span class="date">{{info.date}}</span>
      </div>
      <rater val='4' class="rater"></rater>
      <div class="content">
        <div class="txt">{{info.content}}</div>
        <div class="imgs">
          <img :src="item" alt="" v-for="(item,index) in info.img" :key="index">
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
  props: ["info"],
  created() {
    if (typeof this.info.img != "array") {
      var arr = [];
      arr.push(this.info.img);
      this.info.img = arr;
    }
  },
  components: {
    rater
  },
  computed: {}
};
</script>

<style lang='scss'>
.pl-item {
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
  .left {
    flex: none;
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
    width: 1px;
    .tit {
      margin-bottom: 0.346667rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #0e0707;
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
      width: 100%;
      margin-bottom: 0.4rem;
      .txt {
        width: 100%;
        line-height: 0.56rem;
        margin-bottom: 0.266667rem;
        word-break: break-word;
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