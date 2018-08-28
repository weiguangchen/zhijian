<template>
  <!-- <router-link :to="'/serviceDetail/'+fwInfo.id"> -->
  <div class="service" @click="toDetail(fwInfo.fw.shop_fw_id,fwInfo.face.id)">
    <div class="img-box">
      <img :src="fwInfo.fw.fw_img" alt="" class="img">

    </div>
    <div class="info">
      <div class="intr">
        <div class="top">{{fwInfo.fw.fw_mingzi}}</div>
        <div class="middle">
          <span class="money">￥{{fwInfo.fw.money}}</span><rater :val='fwInfo.fw.star' :enable='enable'></rater>
        </div>
        <div class="bottom">
          <span>
            <span class="iconfont icon-weizhi1"></span>{{fwInfo.face.face_name}}</span>
          <span>{{fwInfo.fw.fw_name}}</span>
          <span>{{fwInfo.m}}KM</span>
        </div>
        <div class="tips" v-show="tuan">
          <div class="tip">内饰清洗</div>
          <div class="tip">抛光</div>
          <div class="tip">清洗</div>
          <div class="tip">补胎</div>
        </div>
        <div class="tuan" v-show="tuan">
          <div class="hd">
            <img src="~img/class/tuangou.png" alt="" class="icon">
            <span class="txt">99元 单次车身上光打蜡（含洗车）</span>
          </div>
          <div class="hd">
            <img src="~img/class/tuangou.png" alt="" class="icon">
            <span class="txt">99元 单次车身上光打蜡（含洗车）</span>
          </div>
        </div>

      </div>

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
      toDetail(id,faceId) {
        var _this = this;
        this.$router.push({
          path: "/serviceDetail/" + id+'/'+faceId,
        });
      }
    },
    components: {
      rater
    }
  };

</script>

<style lang='scss'>
  .service {
    display: flex;
    background: #ffffff;
    padding: 0.36rem 0 0.36rem 0.4rem;
    border-bottom: 1px solid #dfdfdf;
    .img-box {
      .img {
        // transform: translateX(-20%);
        // height: 100%;
        // max-width: none;
        width: 100%;
      }
      width: 2.346667rem;
      height: 2.346667rem;
      margin-right: 0.32rem;
      overflow: hidden;
    }
    .info {
      flex: 1; // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      padding-top: 0.24rem;
      color: #2b2b2b;
      .top,
      .middle,
      .bottom {
        padding-right: 0.36rem;
      }
      .top {
        font-size: .426667rem /* 32/75 */;
        line-height: 1;
        margin-bottom: 0.4rem;
      }
      .middle {
        display: flex;
        align-items: center;
        margin-bottom: 0.466667rem;
        .money{
          color:#e13330;
          font-size: .293333rem /* 22/75 */;
          margin-right: .32rem /* 24/75 */;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        @include font-dpr(12px);
        opacity: 0.5;
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
