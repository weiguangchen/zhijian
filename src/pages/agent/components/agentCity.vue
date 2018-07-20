<template>
    <div class="agent-item">
        <div class="top">
            <div class="line">
                <span class="icon">
                    <i class="iconfont icon-shijidaili"></i>
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
            <span>区县代理：{{agent.qy_count}}</span>
            <span>加盟商：{{agent.shop_count}}</span>
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
    height: 4.2rem /* 315/75 */;
    font-size: 0.373333rem /* 28/75 */;
    display: flex;
    flex-direction: column;
    .top {
      height: 2.733333rem /* 205/75 */;
      padding: 0.746667rem /* 56/75 */ 0 0.453333rem /* 34/75 */ 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .bot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      padding: 0 2rem 0 1.4rem;
    }
    .line,
    .line2 {
      display: flex;
      align-items: center;
      .txt1 {
        width: 2.733333rem /* 205/75 */;
      }
    }
    .line {
      .icon {
        flex: none;
        width: 1.4rem /* 105/75 */;
        display: flex;
        justify-content: center;
        .iconfont {
          font-size: 0.56rem /* 42/75 */;
        }
      }
    }
    .line2 {
      padding-left: 1.4rem /* 105/75 */;
      .add {
        flex: 1;
        line-height: 1.4; // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }
  }
</style>