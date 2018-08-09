<template>
  <div class="wallet page">
    <!-- <betterScroll @pullingUp='pullingUp' ref='scroll'> -->
    <div class="wallet-wrapper">
      <div class="info">
        <h1>余额</h1>
        <div class="yue">￥
          <strong>{{userinfo.user_money}}</strong>
        </div>
        <div>可用收益&nbsp;&nbsp;&nbsp;&nbsp;{{userinfo.dl[0].dl_money}}</div>
        <div class="tx-box">
          <div class="tx" @click="tixian">
            <img src="~img/public/wallet-tx.png" alt="">提现
          </div>
          <div class="tx" @click="shoukuan">
            <img src="~img/public/wallet-sk.png" alt="">收款
          </div>
        </div>
      </div>
      <div class="search-wrapper">
        <h2>收支明细</h2>
        <div class="s-box">
          <Checker type='radio' v-model="type" selected-item-class='active' default-item-class='span' :radio-required='true' @on-change='change'>
            <CheckerItem :value='0'>全部</CheckerItem>
            <CheckerItem :value='2'>收入</CheckerItem>
            <CheckerItem :value='1'>支出</CheckerItem>
          </Checker>
        </div>

      </div>
    </div>
    <div class="wallet-list">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div class="list">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="l">
              <div class="tit" v-if="item.zt == 1">可用收益充值</div>
              <div class="tit" v-else-if="item.zt == 2">提现到微信</div>
              <div class="date">{{item.time}}</div>
            </div>
            <div class="r"  :class="{add:item.zt == 1,down:item.zt == 2}">
              <i v-if="item.zt == 1">+</i>
              <i v-if="item.zt == 2">-</i>{{item.money}}</div>
          </div>
        </div>
      </scroller>
    </div>
    <!-- <span slot="loadingTip">正在加载数据...</span>
      <span slot="doneTip">暂无更多数据</span> -->
    <!-- </betterScroll> -->
  </div>
</template>

<script>
  import {
    Checker,
    CheckerItem
  } from "vux";
  import betterScroll from "@/components/betterScroll";
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from "@/mixins/setTitle.js";
  export default {
    data() {
      return {
        type: 0,

        noData: false,
        p: 1,
        list: []
      };
    },
    created() {
      this.get_list();
    },
    methods: {
      infinite(done) {
        this.get_list(done);
      },
      change(val) {
        this.list = [];
        this.noData = false;
        this.p = 1;
        this.type = val;
        this.get_list();
      },
      tixian() {
        this.$router.push({
          path: "/agentTixian"
        });
      },
      shoukuan() {
        this.$router.push({
          path: "/shoukuan"
        });
      },
      get_list(fn) {
        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return;
        } else {
          this.$axios
            .get("/Api/DlCore/get_list", {
              params: this.params
            })
            .then(({
              data
            }) => {
              if (data.ok == 1) {
                console.log("还有数据");
                this.p++;
              } else if (data.ok == 0) {
                console.log("没数据了");
                this.noData = true;
              }
              this.list = this.list.concat(data.list);
              if (fn) fn();
            });
        }

      },

    },
    computed: {
      params() {
        var params = {
          dl_id: this.userinfo.dl[0].id,
          see: this.type,
          num: 8,
          p: this.p
        };
        return params;
      }
    },
    components: {
      betterScroll,
      CheckerItem,
      Checker
    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style scoped lang='scss'>
  .wallet {
    display: flex;
    flex-direction: column;

    .wallet-wrapper {
      background: #ffffff;
      padding: 0.613333rem/* 46/75 */
      0.4rem/* 30/75 */
      0.4rem/* 30/75 */
      ;
      font-size: 0.373333rem/* 28/75 */
      ;
      .info {
        position: relative;
        border-radius: 0.106667rem/* 8/75 */
        ;
        background: #4698fe;
        height: 4rem/* 300/75 */
        ;
        color: #ffffff;
        text-align: center;
        padding-top: 0.506667rem/* 38/75 */
        ;
        line-height: 1;
        margin-bottom: 1.2rem/* 90/75 */
        ;
        h1 {
          font-size: 0.506667rem/* 38/75 */
          ;
          margin-bottom: 0.533333rem/* 40/75 */
          ;
        }
        .yue {
          font-size: 0.453333rem/* 34/75 */
          ;
          margin-bottom: 0.426667rem/* 32/75 */
          ;
          strong {
            font-size: 0.613333rem/* 46/75 */
            ;
          }
        }
        .tx-box {
          display: flex;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 50%);
          box-shadow: 0 2px 10px 4px rgba(#000000, 0.1);
          width: 6.666667rem/* 500/75 */
          ;
          height: 1.173333rem/* 88/75 */
          ;
          border-radius: 0.586667rem/* 44/75 */
          ;
          background: #ffffff;
          color: #000000;
          .tx {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
          }
          img {
            width: 0.666667rem/* 50/75 */
            ;
            margin-right: 0.266667rem/* 20/75 */
            ;
          }
        }
      }
      .search-wrapper {
        h2 {
          margin-bottom: 0.466667rem/* 35/75 */
          ;
        }
        .s-box {
          display: flex;
          justify-content: space-around;
          .span {
            display: inline-block;
            width: 1.866667rem/* 140/75 */
            ;
            height: 0.8rem/* 60/75 */
            ;
            line-height: 0.8rem/* 60/75 */
            ;
            text-align: center;
            border-radius: 0.24rem/* 18/75 */
            ;
          }
        }

        .active {
          background: #5b61fc;
          color: #ffffff;
        }
      }
    }
    .wallet-list {
      position: relative;
      flex: 1;
      .list {
        .item {
          display: flex;
          padding: 0.4rem/* 30/75 */
          ;
          background: #ffffff;
          font-size: 0.373333rem/* 28/75 */
          ;
          margin-top: $bot;
          .l {
            width: 6.666667rem/* 500/75 */
            ;
            flex: none;
          }
          .r {
            flex: 1;
            display: flex;
            align-items: center;
          }
          .add {
            color: #22a955;
          }
          .down {
            color: #ed4239;
          }
          .tit {
            font-weight: bold;
            margin-bottom: 0.6rem/* 45/75 */
            ;
          }
          .date {
            font-size: 0.24rem/* 18/75 */
            ;
          }
        }
      }
    }
  }

</style>
