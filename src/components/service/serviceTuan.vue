<template>
  <div class="serviceTuan" @click="toDetail(info.shop_fw_id)">
    <div class="img-box">
      <img :src="info.fw_img" alt="" class="img">

    </div>
    <div class="info">
      <div class="top">{{info.fw_mingzi}}</div>
      <div class="middle">
        <span class="now">￥{{info.money}}</span>
        <span class="old">
          <span class="t">原价</span>￥{{info.y_money}}</span>
      </div>
      <div class="bottom">
        <span>已售{{info.buy_number}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Rater
  } from "vux";
  export default {
    data() {
      return {};
    },
    methods: {
      toDetail(id) {
        this.$router.push({
          name: 'serviceDetail',
          params: {
            serviceId: id
          }
        });
      }
    },
    props: ["info"],
    components: {
      Rater
    }
  };

</script>

<style lang='scss'>
  .serviceTuan {
    display: flex;
    background: #ffffff;
    padding: 0.36rem 0.4rem;
    border-bottom: 1px solid #dfdfdf;
    .img-box {
      width: 2.346667rem;
      height: 2.346667rem;
      margin-right: 0.32rem;
      overflow: hidden;
      .img{
        width: 100%;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        @include font-dpr(17px);
        line-height: 0.773333rem;
        color: #2b2b2b;
      }
      .middle {
        .now {
          @include font-dpr(24px);
          color: #de3232;
          margin-right: 0.293333rem;
        }
        .old {
          @include font-dpr(17px);
          opacity: 0.5;
          color: #0f0f0f;
          .t {
            @include font-dpr(12px);
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        @include font-dpr(12px);
        color: #2b2b2b;
        opacity: 0.5;
      }
    }
  }

</style>
