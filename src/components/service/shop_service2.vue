<template>
  <div class="service-wrapper2">
      <div class="img-box">
          <img :src="info.fw_img" alt="" class="img">
      </div>
      <h1>{{info.fw_mingzi}}</h1>
      <div class="price"><em>{{info.money}}</em>元/平米</div>
      <div class="sold">已售 {{info.buy_number}}</div>
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

    },
    components: {

    }
  }

</script>

<style lang='scss' scoped>
.service-wrapper2{
    box-sizing: border-box;
    width: 3.866667rem /* 290/75 */;
    height: 5.333333rem /* 400/75 */;
    box-shadow: 0 0 10px 4px rgba(#000000,.1); 
    padding: .133333rem /* 10/75 */;
    font-size: .32rem /* 24/75 */;
    background: #ffffff;
    .img-box{
        overflow: hidden;
        width: 100%;
        height: 2.666667rem /* 200/75 */;
        .img{
            height: 100%;
        }
    }
    h1{
        line-height: .506667rem /* 38/75 */; 
        margin-bottom: .2rem /* 15/75 */;
    }
    .price{
        color: #ff1119;
        margin-bottom: .2rem /* 15/75 */;
        em{
            font-size: .4rem /* 30/75 */;
        }
    }
    .sold{
        color:#b3b3b3;
    }
}

</style>
