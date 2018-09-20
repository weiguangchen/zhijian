<template>
  <div class="page">
    <betterScroll>
      <bigTitle title="活动卡统计" @showPopup='showPopup'></bigTitle>
      <div class="tongji-info">
        <div class="order-total">
          <div class="bot">
            <div class="line">
              <span>活动卡总额</span>
              <span class="total">￥{{count.z_money}}</span>
            </div>
          </div>
        </div>
        <div class="tj-list">
          <div class="tongji-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.bk_id)">
            <img :src="item.hd_img" alt="" class="img">
            <div class="info">
              <div class="mingzi">{{item.card_name}}</div>
              <div class="count">
                <div class="count-item">
                  <div class="tit">数量</div>
                  <span>{{item.all_pay}}</span>
                </div>
                <!-- <div class="count-item">
                <div class="tit">已使用金额</div>
                <span>{{item.bk_ok_jmoney}}</span>
              </div> -->
                <div class="count-item">
                  <div class="tit">出售金额</div>
                  <span>{{parseFloat(item.jmoney).toFixed(2)}}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </betterScroll>


  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll/scroll';

  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        count: {},
        list: []
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_count();
      this.$axios
        .get("/Api/ShopCore/get_bk_content", {
          params: {
            shop_id: this.userinfo.shop[0].id
          }
        })
        .then(res => {
          console.log(res);
          _this.list = res.data;
        });
    },
    methods: {
      get_count() {
        this.$axios.get('/Api/ShopCore/shop_xse', {
          params: {
            shop_id: this.userinfo.shop[0].id
          }
        }).then(({
          data
        }) => {
          console.log(data);
          this.count = data;
        })
      },
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      toDetail(hdId){
        this.$router.push({
          path:'/shanghu/jingying/hdcard',
          query:{
            hdId
          }
        })
      }
    },
    components: {
      bigTitle,
      betterScroll
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .tongji-info {
    .order-total {
      padding-left: 0.533333rem;
      background: #ffffff;
      font-size: .32rem
        /* 24/75 */
      ;
      margin-bottom: $bot;

      .line {
        padding-right: .533333rem
          /* 40/75 */
        ;
        display: flex;
        justify-content: space-between;
      }

      .top {
        padding-top: .56rem
          /* 42/75 */
        ;
        border-bottom: 1px solid #f0f0f0;

        h1,
        .line {
          margin-bottom: .56rem
            /* 42/75 */
          ;
        }

        h1 {
          font-size: .373333rem
            /* 28/75 */
          ;
        }
      }

      .bot {
        font-size: .4rem
          /* 30/75 */
        ;
        padding: .56rem
          /* 42/75 */
          0;
        font-weight: bold;

        .total {
          color: #dd3530;
        }
      }
    }

    .tj-list {
      padding-left: 0.533333rem;
      background: #ffffff;

      .tongji-item {
        @include font-dpr(12px);
        display: flex;
        box-sizing: border-box;
        padding: 0.56rem 0;
        // height: 3.333333rem;
        border-bottom: 1px solid #f0f0f0;

        .img {
          width: 2.666667rem;
          height: 2.666667rem;
          flex: none;
          border-radius: 0.133333rem;
          margin-right: 0.24rem;
        }

        .info {
          flex: 1;
          padding-right: 1.733333rem
            /* 130/75 */
          ;
        }

        .mingzi {
          flex: none;
          height: 1.146667rem;
          border-bottom: 1px solid #f0f0f0;
          overflow: hidden;
        }

        .count {
          display: flex;
          justify-content: space-between;

          .count-item {
            text-align: center;

            .tit {
              margin-bottom: .133333rem
                /* 10/75 */
              ;
            }

            padding-top: .266667rem
            /* 20/75 */
            ;
          }
        }

        .icon {
          flex: 1;
          font-size: .24rem
            /* 18/75 */
          ;
          display: flex;
          align-items: center;
          width: 1.733333rem;
          margin-top: -0.8rem;
        }
      }
    }

  }

</style>
