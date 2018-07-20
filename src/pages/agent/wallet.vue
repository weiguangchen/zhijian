<template>
  <div class="wallet page">
    <div class="wallet-wrapper">
      <div class="info">
        <h1>余额</h1>
        <div class="yue">￥
          <strong>{{userinfo.user_money}}</strong>
        </div>
        <div>可用余额&nbsp;&nbsp;&nbsp;&nbsp;{{userinfo.dl[0].dl_money}}</div>
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
          <span class="active">全部</span>
          <span>收入</span>
          <span>支出</span>
        </div>
      </div>
    </div>
    <div class="wallet-list">
      <betterScroll @pullingUp='pullingUp' ref='scroll'>
        <div class="list">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="l">
              <div class="tit">{{item.log}}</div>
              <div class="date">{{item.time}}</div>
            </div>
            <div class="r" :class="{add:item.zt == 1,down:item.zt == 2}"><i v-if="item.zt == 1">+</i><i v-if="item.zt == 2">-</i>{{item.money}}</div>
          </div>
        </div>
        <span slot="loadingTip">正在加载数据...</span>
        <span slot="doneTip">暂无更多数据</span>
      </betterScroll>
    </div>


  </div>
</template>

<script>
  import betterScroll from "@/components/betterScroll";
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from "@/mixins/setTitle.js";
  export default {
    data() {
      return {
        p: 1,
        list: []
      }
    },
    created() {
      this.get_list();
    },
    methods: {
      tixian() {
        this.$router.push({
          path: '/agentTixian'
        })
      },
      shoukuan() {
        this.$router.push({
          path: '/shoukuan'
        })
      },
      get_list() {
        this.$axios.get(this.API_URL + '/Api/DlCore/get_list', {
          params: {
            dl_id: this.userinfo.dl[0].id,
            see: 0,
            num: 8,
            p: this.p
          }
        }).then(({
          data
        }) => {
          if (data.ok == 1) {
            console.log("还有数据");
            this.p = this.p + 1;
          } else if (data.ok == 0) {
            console.log("没数据了");
            this.$refs.scroll.closePullUp();
          }
          this.list = this.list.concat(data.list);
          this.$refs.scroll.pullupLoadend();
        })
      },
      pullingUp() {
        this.get_list();
        this.$refs.scroll.finishPullupload();
      }
    },
    computed: {
      params() {
        var params = {

        }
        return params;
      }
    },
    components: {
      betterScroll
    },
    mixins: [checkLogin, setTitle]
  }

</script>

<style scoped lang='scss'>
  .wallet {
    display: flex;
    flex-direction: column;

    .wallet-wrapper {
      background: #ffffff;
      padding: .613333rem/* 46/75 */
      .4rem/* 30/75 */
      .4rem/* 30/75 */
      ;
      font-size: .373333rem/* 28/75 */
      ;
      .info {
        position: relative;
        border-radius: .106667rem/* 8/75 */
        ;
        background: #4698fe;
        height: 4rem/* 300/75 */
        ;
        color: #ffffff;
        text-align: center;
        padding-top: .506667rem/* 38/75 */
        ;
        line-height: 1;
        margin-bottom: 1.2rem/* 90/75 */
        ;
        h1 {
          font-size: .506667rem/* 38/75 */
          ;
          margin-bottom: .533333rem/* 40/75 */
          ;
        }
        .yue {
          font-size: .453333rem/* 34/75 */
          ;
          margin-bottom: .426667rem/* 32/75 */
          ;
          strong {
            font-size: .613333rem/* 46/75 */
            ;
          }
        }
        .tx-box {
          display: flex;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 50%);
          box-shadow: 0 2px 10px 4px rgba(#000000, .1);
          width: 6.666667rem/* 500/75 */
          ;
          height: 1.173333rem/* 88/75 */
          ;
          border-radius: .586667rem/* 44/75 */
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
            width: .666667rem/* 50/75 */
            ;
            margin-right: .266667rem/* 20/75 */
            ;
          }
        }
      }
      .search-wrapper {
        h2 {
          margin-bottom: .466667rem/* 35/75 */
          ;
        }
        .s-box {
          display: flex;
          justify-content: space-around;
        }
        span {
          display: inline-block;
          width: 1.866667rem/* 140/75 */
          ;
          height: .8rem/* 60/75 */
          ;
          line-height: .8rem/* 60/75 */
          ;
          text-align: center;
          border-radius: .24rem/* 18/75 */
          ;
        }
        .active {
          background: #5b61fc;
          color: #ffffff;
        }
      }
    }
    .wallet-list {
      flex: 1;
      .list {
        .item {
          display: flex;
          padding: .4rem/* 30/75 */
          ;
          background: #ffffff;
          font-size: .373333rem/* 28/75 */
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
            margin-bottom: .6rem/* 45/75 */
            ;
          }
          .date {
            font-size: .24rem/* 18/75 */
            ;
          }
        }
      }
    }
  }

</style>
