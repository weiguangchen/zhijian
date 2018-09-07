<template>
  <div class="page">
    <betterScroll>
      <bigTitle title="消费统计" @showPopup='showPopup'></bigTitle>
      <div class="tongji-info">
        <div class="order-total">
          <div class="top">
            <h1>订单总额</h1>
            <div class="line">
              <span>已完成订单</span>
              <span>￥{{count.y_money}}</span>
            </div>
            <div class="line">
              <span>未完成订单</span>
              <span>￥{{count.w_money}}</span>
            </div>
          </div>
          <div class="bot">
            <div class="line">
              <span>总计</span>
              <span class="total">￥{{count.z_money}}</span>
            </div>
          </div>
        </div>
        <div class="tj-list">
          <div class="tongji-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.fw_id)">
            <img :src="item.fw_img" alt="" class="img">
            <div class="info">
              <div class="mingzi">{{item.fw_mingzi}}</div>
              <div class="count">
                <div class="count-item">
                  <div class="tit">销售量</div>
                  <span>{{item.all_num}}</span>
                </div>
                <div class="count-item">
                  <div class="tit">验证量</div>
                  <span>{{item.yz_num}}</span>
                </div>
                <div class="count-item">
                  <div class="tit">退款量</div>
                  <span>{{item.t_num}}</span>
                </div>
                <div class="count-item">
                  <div class="tit">总额</div>
                  <span>￥{{item.all_money}}</span>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="iconfont icon-jinru"></i>
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
        .get("/Api/Shop/shop_fw", {
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
      toDetail(id) {
        // this.$router.push({
        //   path:'/shanghu/jingying/mendianTongji',
        //   query:{
        //     id
        //   }
        // })
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
        }

        .mingzi {
          width: 4.8rem
            /* 360/75 */
          ;
          flex: none;
          height: 1.146667rem;
          border-bottom: 1px solid #f0f0f0;
          overflow: hidden;
        }

        .count {
          width: 5.866667rem
            /* 440/75 */
          ;
          display: flex;

          .count-item {
            .tit {
              margin-bottom: .133333rem
                /* 10/75 */
              ;
            }

            padding-top: .266667rem
            /* 20/75 */
            ;
            flex: 1;
            text-align: center;
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
