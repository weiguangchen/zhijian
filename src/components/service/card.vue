<template>
  <!-- <router-link :to="'/serviceDetail/'+fwInfo.id"> -->
  <div class="hd-card" @click="toDetail(fwInfo.bk_id)">
    <div class="img-box">
      <img :src="fwInfo.hd_img" alt="" class="img">
    </div>
    <div class="info">
      <!-- <div class="intr"> -->
      <div class="top">{{fwInfo.card_name}}</div>
      <div class="middle">
                <span>{{fwInfo.class[0].class_name}}</span>
        <span>{{fwInfo.m}}KM</span>
      </div>
      <div class="bottom">
          <span class="iconfont icon-weizhi1"></span>{{fwInfo.shop[0].adress}}

      </div>
      <div class="tips" v-if="tuan">
        <div class="tip">内饰清洗</div>
        <div class="tip">抛光</div>
        <div class="tip">清洗</div>
        <div class="tip">补胎</div>
      </div>
      <div class="tuan" v-if="tuan">
        <div class="hd">
          <img src="~img/class/tuangou.png" alt="" class="icon">
          <span class="txt">99元 单次车身上光打蜡（含洗车）</span>
        </div>
        <div class="hd">
          <img src="~img/class/tuangou.png" alt="" class="icon">
          <span class="txt">99元 单次车身上光打蜡（含洗车）</span>
        </div>
      </div>

      <!-- </div> -->

    </div>
  </div>
  <!-- </router-link> -->

</template>

<script>
  import rater from "@/components/star/index";
  export default {
    data() {
      return {
        tuan: false,
        enable: true
      };
    },
    props: ["fwInfo"],
    methods: {
      toDetail(id) {
        console.log(id)
        var _this = this;
        this.$router.push({
          name: "huodongDetail",
          params: {
            huodongId: id
          }
        });
      }
    },
    components: {
      rater
    }
  };

</script>

<style lang='scss'>
  .hd-card {
    display: flex;
    background: #ffffff;
    padding: 0.36rem 0 0.36rem 0.4rem;
    border-bottom: 1px solid #dfdfdf;
    .img-box {
      flex:none;
      overflow: hidden;
      width: 2.346667rem;
      height: 2.346667rem;
      margin-right: 0.32rem;
      .img {
        width: 100%;
      }
    }
    .info {
      flex: 1; 
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #2b2b2b;
      width: 0;
      %text-overflow{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .top,
      .middle,
      .bottom {
        padding-right: 0.36rem;
      }
      .top {
        font-size: .4rem /* 30/75 */;
        flex: 1;
        @extend %text-overflow;
      }
      .middle {
        flex: none;
        @extend %text-overflow;
      }
      .bottom {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: .32rem /* 24/75 */;
        opacity: 0.5;
        @extend %text-overflow;
      }
      .tips {
        margin-top: 0.453333rem;
        display: flex;
        border-bottom: 1px solid #dfdfdf;
      }
      .tip {
        @include font-dpr(12px);
        opacity: 0.5;
        display: flex;
        align-items: center;
        padding: 0 0.213333rem;
        height: 0.453333rem;
        border: 1px solid #7f7f7f;
        border-radius: 0.08rem;
        margin-right: 0.293333rem;
        margin-bottom: 0.4rem;
      }
      .tuan {
        .hd {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          @include font-dpr(12px);
          margin-top: 0.346667rem;
          .txt {
            opacity: 0.5;
          }
        }
        .icon {
          width: 0.426667rem;
          margin-right: 0.133333rem;
        }
      }
    }
  }

</style>
