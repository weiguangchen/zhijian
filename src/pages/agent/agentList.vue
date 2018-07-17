<template>
  <div class="agent-list page">
    <betterScroll>
      <div class="agent-item">
        <div class="top">
          <div class="line">
            <span class="icon">
              <i class="iconfont icon-quxiandaili"></i>
            </span>
            <span class="txt1">河东区代理</span>
            <span>张三15022485790</span>
          </div>
          <div class="line2">
            <span class="txt1">地址</span>
            <span class="add">天津市河东区卓越大厦一号楼</span>
          </div>
        </div>
        <div class="bot">
          <span>加盟商：36</span>
        </div>
      </div>
      <div class="agent-item">
        <div class="top">
          <div class="line">
            <span class="icon">
              <i class="iconfont icon-quxiandaili"></i>
            </span>
            <span class="txt1">河东区代理</span>
            <span>张三15022485790</span>
          </div>
          <div class="line2">
            <span class="txt1">地址</span>
            <span class="add">天津市河东区卓越大厦一号楼</span>
          </div>
        </div>
        <div class="bot">
          <span>加盟商：36</span>
        </div>
      </div>
      <div class="agent-item">
        <div class="top">
          <div class="line">
            <span class="icon">
              <i class="iconfont icon-quxiandaili"></i>
            </span>
            <span class="txt1">河东区代理</span>
            <span>张三15022485790</span>
          </div>
          <div class="line2">
            <span class="txt1">地址</span>
            <span class="add">天津市河东区卓越大厦一号楼</span>
          </div>
        </div>
        <div class="bot">
          <span>加盟商：36</span>
        </div>
      </div>
    </betterScroll>

  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';
  export default {
    data() {
      return {

      }
    },
    components: {
      betterScroll
    }
  }

</script>

<style scoped lang='scss'>
  .agent-list {

    .agent-item {
      &:nth-child(odd) {
        background: url(~img/public/agent-list.png) no-repeat;
        background-position: 0 50%;
        background-size: cover;
        color: #ffffff;
        .top {
          border-bottom: 1px solid #ffffff;
        }
      }
      &:nth-child(even) {
        color: #000000;
        .top {
          border-bottom: 1px solid #000000;
        }
      }
    }
    .agent-item {
      background: #ffffff;
      margin-top: $bot;
      height: 4.2rem/* 315/75 */
      ;
      font-size: .373333rem/* 28/75 */
      ;
      display: flex;
      flex-direction: column;
      .top {
        height: 2.733333rem/* 205/75 */
        ;
        padding: .746667rem/* 56/75 */
        0 .453333rem/* 34/75 */
        0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .bot {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        padding-right: 2rem/* 150/75 */
        ;
      }
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
          .iconfont {
            font-size: .56rem/* 42/75 */
            ;
          }
        }
      }
      .line2 {
        padding-left: 1.4rem/* 105/75 */
        ;
        .add {
          flex: 1;
          line-height: 1.4; // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }

</style>
