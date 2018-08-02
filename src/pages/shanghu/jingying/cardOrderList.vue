<template>
  <div class="page card-order-gl">
    <betterScroll @pullingUp='pullingUp' ref='scroll'>
      <div class="">

        <div class="order-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.order_num)">
          <div class="order-num">
            <div>订单号：{{item.order_num}}</div>
            <div>交易时间：{{item.date}}</div>
          </div>
          <div class="order-info">
            <img :src="item.card.card_img" alt="" class="img">
            <div class="info">
              <div class="mingzi tit">{{item.card.card_name}}</div>
              <div class="mingzi">下单会员：{{item.xingming}}</div>
              <div class="mingzi">手机号：{{item.dianhua}}</div>
            </div>
          </div>
          <div class="count">
            <div class="count-item">
              结算价：
              <em>{{item.card.card_jmoney}}</em>元
            </div>
            <div class="count-item">
              数量：1
            </div>

          </div>
        </div>
      </div>
    </betterScroll>
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll/scroll';
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        list: [],
        p: 1
      };
    },
    created() {
      var _this = this;
      this.get_card_list();
    },
    methods: {
      toDetail(order_num) {
        this.$router.push({
          path: '/shanghu/jingying/cardOrderDetail',
          query: {
            order_num
          }
        })
      },
      get_card_list() {
        var _this = this;
        return this.$axios
          .get( "/Api/ShopCore/pay_card_list", {
            params: {
              shop_id: this.userinfo.shop[0].id,
              num: 10,
              p: this.p
            }
          })
          .then(({
            data
          }) => {
            if (data.ok == 1) {
              console.log("还有数据");
              this.p = this.p + 1;
            } else if (data.ok == 0) {
              console.log("没数据了");
              this.$refs.scroll.closePullUp();
            }
            this.$refs.scroll.pullupLoadend();
            this.list = this.list.concat(data.list);
          });
      },
      pullingUp() {
        this.get_card_list();
        this.$refs.scroll.finishPullupload();

      }
    },
    computed: {},
    components: {
      betterScroll
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .card-order-gl {
    line-height: 1;
    background: #f0f0f0;
    .select-wrapper {
      font-size: .373333rem/* 28/75 */
      ;
    }
    .order-item {
      background: #ffffff;
      @include font-dpr(12px);
      box-sizing: border-box;
      padding-top: 0.56rem;
      margin-bottom: $bot;
      .order-num {
        padding-left: 0.533333rem;
        border-bottom: 1px solid #f0f0f0;
        color: #888888;
        &>div {
          margin-bottom: 0.266667rem;
        }
        .step-wrapper {
          margin-left: -.533333rem/* 40/75 */
          ;
        }
      }
      .order-info {
        padding: 0.266667rem 0 0.266667rem 0.533333rem;
        display: flex;
        background: #f5f5f5;
        color: #888888;
        .img {
          width: 2.666667rem;
          height: 2.133333rem;
          border-radius: 0.133333rem;
          margin-right: 0.24rem;
        }

        .info {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-around;
          .tit {
            font-size: .346667rem/* 26/75 */
            ;
            color: #000000;
          }
        }
      }

      .count {
        height: 1.266667rem/* 95/75 */
        ;
        padding-left: 0.533333rem;
        display: flex;
        align-items: center;
        font-size: .293333rem/* 22/75 */
        ;
        font-weight: bold;
        .count-item {
          flex: 1;
          em {
            font-weight: bold;
            font-size: .373333rem/* 28/75 */
            ;
            color: #dc3330;
          }

        }
      }
    }
  }

</style>
