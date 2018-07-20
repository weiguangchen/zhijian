<template>
  <div class="agent-item">
    <div class="top">
      <div class="line">
        <span class="icon">
          <i class="iconfont icon-quxiandaili"></i>
        </span>
        <span class="txt1">{{agent.city_name}}代理</span>
        <span>{{agent.dl_name}}{{agent.dl_phone}}</span>
      </div>
      <div class="line2">
        <span class="txt1">地址</span>
        <span class="add">{{agent.adress}}</span>
      </div>
    </div>
    <div class="bot">
      <span>加盟商：{{agent.shop_count}}</span>
    </div>
    <div class="dingdan">
      <div class="line">
        <span class="icon">
          <i class="iconfont icon-dingdanzonge"></i>
        </span>
        <span class="txt1">订单总额</span>
        <span>{{agent.z_money}}元</span>
      </div>
      <div class="line2">
        <span class="txt1">完成订单总额</span>
        <span class="add">{{agent.y_money}}元</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ['agent'],
    components: {}
  };

</script>

<style lang='scss' scoped>
  .agent-item {
    background: #ffffff;
    margin-top: $bot;
    font-size: 0.373333rem/* 28/75 */
    ;
    display: flex;
    flex-direction: column;
    .top,
    .dingdan {
      height: 2.733333rem/* 205/75 */
      ;
      padding: 0.746667rem/* 56/75 */
      0 0.453333rem/* 34/75 */
      0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .line,
      .line2 {
        display: flex;
        align-items: center;
        .txt1 {
          width: 2.733333rem/* 205/75 */
          ;
        }
      }
      .line {
        .icon {
          flex: none;
          width: 1.4rem/* 105/75 */
          ;
          display: flex;
          justify-content: center;
          .icon-shijidaili {
            font-size: 0.56rem/* 42/75 */
            ;
          }
          .icon-dingdanzonge{
              font-size: .8rem /* 60/75 */;
          }
        }
      }
      .line2 {
        padding-left: 1.4rem/* 105/75 */
        ;
        .add {
          flex: 1;
          line-height: 1.4;
        }
      }
    }
    .bot {
      height: 1.44rem/* 108/75 */
      ;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      padding: 0 2rem 0 1.4rem;
      border-top: 1px solid #000000;
      border-bottom: 1px solid #000000;
    }
    .dingdan {}
  }

</style>
