<template>
  <div class="service-wrapper" @click="toDetail(info.bk_id,info.card_face_id)">
    <div class="img-box">
      <img :src="info.img" alt="" class="img">
    </div>
    <div class="info">
      <h1>{{info.card_name}}</h1>
      <h2>{{info.card_subname}}</h2>
      <div class="line">
        <span class="num">
          <span class="money">
            <em>{{info.card_money}}</em>元</span>
          <del class="y-money">原价{{info.card_ymoney}}元</del>
        </span>
        <span class="sold">已售 {{info.buy_number}}</span>
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
      type: {
        default: 1
      }
    },
    methods: {
      toDetail(id,faceId) {
        this.$router.push({
          name: "huodongDetail",
          params: {
            huodongId: id,
            faceId
          }
        });
      }
    },
    components: {

    }
  }

</script>

<style lang='scss' scoped>
  .service-wrapper {
    background: #ffffff;
    display: flex;
    padding: .533333rem/* 40/75 */
    .4rem/* 30/75 */
    0;
    .img-box {
      margin-bottom: .4rem/* 30/75 */
      ;
      flex: none;
      margin-right: .48rem/* 36/75 */
      ;
      width: 2.133333rem/* 160/75 */
      ;
      height: 2.133333rem/* 160/75 */
      ;
      border-radius: .133333rem/* 10/75 */
      ;
      overflow: hidden;
      .img {
        height: 100%;
        max-width: none;
        transform: translateX(-15%);
      }
    }
    .info {
      flex: 1;
      border-bottom: 1px solid #f1f1f1;
      padding: .186667rem/* 14/75 */
      0 .426667rem/* 32/75 */
      0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h1 {
        font-size: .373333rem/* 28/75 */
        ;
        font-weight: bold;
      }
      h2 {
        font-size: .32rem/* 24/75 */
        ;
        color: #272727;
      }
      .line {
        display: flex;
        justify-content: space-between;
        font-size: .32rem/* 24/75 */
        ;
        .num,
        .money {
          color: #ff1119;
        }
        .sold {
          color: #b3b3b3;
        }
        em {
          font-size: .4rem/* 30/75 */
          ;
        }
        .y-money {
          color: #000000;
        }
      }
    }
  }

</style>
