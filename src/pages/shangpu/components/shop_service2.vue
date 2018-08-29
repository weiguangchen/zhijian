<template>
  <div class="service-wrapper2" @click="toDetail(info.shop_fw_id,faceId)">
    <div class="img-box">
      <img :src="info.fw_img" alt="" class="img">
    </div>
    <div class="info">
      <h1>{{info.fw_mingzi}}</h1>
      <div class="box1">
        <div class="box-l">
          <div class="price">
            <em>{{info.money}}</em>元
            <template v-if="info.fw_gg">/{{info.fw_gg}}</template>
          </div>
          <div class="sold">已售 {{info.buy_number}}</div>
        </div>
        <div class="box-r">
          <img src="~img/public/shangpu-buy.png" alt="" class="buy-icon">
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      info: {
        default: {}
      },
      faceId: {
        default: ''
      }
    },
    methods: {
      toDetail(id, faceId) {
        this.$router.push({
          path: '/serviceDetail/' + id + '/' + faceId,

        });
      }
    },
    components: {

    }
  }

</script>

<style lang='scss' scoped>
  .service-wrapper2 {
    box-sizing: border-box;
    width: 4.4rem/* 330/75 */
    ;
    // height: 5.333333rem/* 400/75 */
    // ;
    padding: .133333rem/* 10/75 */
    ;
    font-size: .32rem/* 24/75 */
    ;
    background: #ffffff;
    border: 1px solid #e6e5e5;
    .img-box {
      overflow: hidden;
      width: 100%;
      // height: 2.666667rem/* 200/75 */
      // ;
      margin-bottom: .2rem/* 15/75 */
      ;
      .img {
        width: 100%;
      }
    }
    .info {
      .box1 {
        display: flex;
        .box-l{
            width: 2.8rem /* 210/75 */;
        }
        .box-r{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .buy-icon{
            width: .666667rem /* 50/75 */;
        }
      }
      h1 {
        font-size: .373333rem/* 28/75 */
        ;
        line-height: 1.6;
        margin-bottom: .133333rem/* 10/75 */
        ;
                width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        color: #ff1119;
        margin-bottom: .2rem/* 15/75 */
        ;
        em {
          font-size: .4rem/* 30/75 */
          ;
        }
      }
      .sold {
        color: #b3b3b3;
      }
    }

  }

</style>
