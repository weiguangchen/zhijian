<template>
  <div class="tixianList">
    <betterScroll>
      <div class="list">
        <div class="tx-item" @click="toDetail">
          <div class="account">
            <div>账户余额</div>
            <img src="~img/public/tixian-arrow.png" alt="" class="arrow">
            <div>微信账户<div class="phone">(12312321332132)</div></div>
          </div>
          <div class="line">
            <div class="status success">
              <i class="iconfont icon-yuan"></i>
            </div>
            <span class="txt">已完成</span>￥2000.00
          </div>
          <div class="date">提现时间:2018/07/12</div>
        </div>
        <div class="tx-item">
          <div class="account">
            <div>账户余额</div>
            <img src="~img/public/tixian-arrow.png" alt="" class="arrow">
            <div>微信账户<div class="phone">(12312321332132)</div></div>
          </div>
          <div class="line">
            <div class="status ing">
              <i class="iconfont icon-yuan"></i>
            </div>
            <span class="txt">已完成</span>￥2000.00
          </div>
          <div class="date">提现时间:2018/07/12</div>
        </div>
        <div class="tx-item">
          <div class="account">
            <div>账户余额</div>
            <img src="~img/public/tixian-arrow.png" alt="" class="arrow">
            <div>微信账户<div class="phone">(12312321332132)</div></div>
          </div>
          <div class="line">
            <div class="status warn">
              <i class="iconfont icon-yuan"></i>
            </div>
            <span class="txt">已完成</span>￥2000.00
          </div>
          <div class="date">提现时间:2018/07/12</div>
        </div>
      </div>

    </betterScroll>
  </div>
</template>

<script>
import betterScroll from "@/components/betterScroll/index";
import setTitle from "@/mixins/setTitle.js";

export default {
  data() {
    return {};
  },
  methods:{
    toDetail(){
      this.$router.push({
        path:'/tixianDetail'
      })
    }
  },
  components: {
    betterScroll
  },
  mixins: [setTitle]
};
</script>

<style scoped lang='scss'>
.tixianList {
  background: #e4e4e4;
  height: 100%;
  .tx-item {
    margin-top: $bot;
    padding: 0.666667rem /* 50/75 */ 0.4rem /* 30/75 */;
    background: #ffffff;
    .account {
      display: flex;
      align-items: flex-start;
      font-size: 0.453333rem /* 34/75 */;
      margin-bottom: 0.4rem /* 30/75 */;
      .arrow {
        flex: none;
        width: 0.533333rem /* 40/75 */;
        max-width: none;
        margin-top: 0.133333rem /* 10/75 */;
      }
      & > div {
        flex: auto;
        text-align: center;
        .phone {
          margin-top: 0.24rem /* 18/75 */;
          color: #a3a3a3;
          font-size: 0.373333rem /* 28/75 */;
        }
      }
    }
    .line {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem /* 30/75 */;
      .status {
        width: 1rem /* 75/75 */;
        flex: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .success {
        color: #21ad45;
      }
      .ing{
        color:#e39023;
      }
      .warn{
        color: #ed321e;
      }
      .txt {
        margin-right: 0.853333rem /* 64/75 */;
      }
    }
    .date {
      padding-left: 1rem /* 75/75 */;
      color: #a4a4a4;
    }
  }
}
</style>
