<template>
  <div class="page card-order-detail">
    <div class="top">
      <div class="header">
        <h1>订单编号</h1>
        <p class="line">{{detail.order_num}}</p>
      </div>
      <div class="header">
        <h1>下单时间</h1>
        <p class="line">{{detail.date}}</p>
      </div>
    </div>
    <div class="content" v-if="detail.card">
        <h1>交易详情</h1>
        <div class="line">
            <span class="tit">活动卡名称：</span>
            <span>{{detail.card.card_name}}</span>
        </div>
        <div class="line">
            <span class="tit">下单用户：</span>
            <span>{{detail.xingming}}</span>
        </div>
        <div class="line">
            <span class="tit">联系方式：</span>
            <span>{{detail.dianhua}}</span>
        </div>
        <div class="line">
            <span class="tit">交易数量：</span>
            <span>1</span>
        </div>
        <div class="line">
            <span class="tit">交易金额：</span>
            <span>{{detail.card.card_money}}</span>
        </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
          detail:{}
      }
    },
    created(){
        this.get_detail();
    },
    methods: {
        get_detail(){
            this.$axios.get('/Api/ShopCore/get_card_content',{
                params:{
                    order_num:this.order_num
                }
            }).then(({data})=>{
                console.log(data)
                this.detail = data[0];
            })
        }
    },
    computed:{
        order_num(){
            return this.$route.query.order_num;
        }
    },
    components: {

    }
  }

</script>

<style lang='scss' scoped>
  .card-order-detail {
      .top{
          margin-bottom: $bot;
      }
      .header{
          border-bottom: 1px solid #e8e8e8;
      }
      .header,.content{
          padding: .4rem /* 30/75 */;
          padding-bottom: 0;
          background: #ffffff;
          h1{
              height: .453333rem /* 34/75 */;
              line-height: .453333rem /* 34/75 */;
              border-left: .08rem /* 6/75 */ solid #147dfa;
              padding-left: .2rem /* 15/75 */;
              font-size: .373333rem /* 28/75 */;
          }
          .line{
              color: #595959;
              font-size: .293333rem /* 22/75 */;
              height: 1.12rem /* 84/75 */;
              line-height: 1.12rem /* 84/75 */;
              padding-left: .266667rem /* 20/75 */;
              .tit{
                  width: 3.266667rem /* 245/75 */;
                  display: inline-block;
              }
          }
      }
  }

</style>
