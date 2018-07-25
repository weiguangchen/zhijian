<template>
  <div class="sh-tx-list">
    <bigTitle title='提款记录' :icon='false'></bigTitle>
    <div class="list">
      <div class="tx-item" @click="toTxDetail(item.id)" v-for="(item,index) in list" :key='index'>
        <div class="account">
          <div>账户余额</div>
          <img src="~img/public/tixian-arrow.png" alt="" class="arrow">
          <div>微信账户
            <div class="phone">({{userinfo.uphone}})</div>
          </div>
        </div>
        <div class="line">
          <div class="status" :class="{ing:item.status == 0,warn:item.status == 2,success:item.status == 1}">
            <i class="iconfont icon-yuan"></i>
          </div>
          <span class="txt" v-if='item.status == 0'>审核中</span>
          <span class="txt" v-else-if="item.status == 1">已完成</span>
          <span class="txt" v-else-if="item.status == 2">已拒绝</span>
          ￥{{item.money}}
        </div>
        <div class="date">提现时间:{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import bigTitle from "@/components/bigTitle/index";

  export default {
    data() {
      return {

      }
    },
    methods: {
      toTxDetail(id) {

      }
    },
    components: {
      bigTitle
    }
  }

</script>

<style lang='scss'>
  .sh-tx-list {
    .tx-item {
      margin-top: $bot;
      padding: 0.666667rem/* 50/75 */
      0.4rem/* 30/75 */
      ;
      background: #ffffff;
      .account {
        display: flex;
        align-items: flex-start;
        font-size: 0.453333rem/* 34/75 */
        ;
        margin-bottom: 0.4rem/* 30/75 */
        ;
        .arrow {
          flex: none;
          width: 0.533333rem/* 40/75 */
          ;
          max-width: none;
          margin-top: 0.133333rem/* 10/75 */
          ;
        }
        &>div {
          flex: auto;
          text-align: center;
          .phone {
            margin-top: 0.24rem/* 18/75 */
            ;
            color: #a3a3a3;
            font-size: 0.373333rem/* 28/75 */
            ;
          }
        }
      }
      .line {
        display: flex;
        align-items: center;
        margin-bottom: 0.4rem/* 30/75 */
        ;
        .status {
          width: 1rem/* 75/75 */
          ;
          flex: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .success {
          color: #21ad45;
        }
        .ing {
          color: #e39023;
        }
        .warn {
          color: #ed321e;
        }
        .txt {
          margin-right: 0.853333rem/* 64/75 */
          ;
        }
      }
      .date {
        padding-left: 1rem/* 75/75 */
        ;
        color: #a4a4a4;
      }
    }
  }

</style>
