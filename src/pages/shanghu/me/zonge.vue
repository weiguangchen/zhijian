<template>
  <div class="ddze">
    <bigTitle title='订单总额' :icon='false'></bigTitle>
    <div class="num">
      <div class="line">
        <span class="tit">订单总额：</span>
        <span>10000.00(元)</span>
      </div>
      <div class="line">
        <span class="tit">已完成总额：</span>
        <span>7000.00(元)</span>
      </div>
      <div class="line">
        <span class="tit">未完成总额：</span>
        <span>3000.00(元)</span>
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
    components: {
      bigTitle
    }
  }

</script>

<style lang='scss'>
  .ddze {
      font-size: .373333rem /* 28/75 */;
    .num {
      padding-left: .533333rem/* 40/75 */
      ;
      .line {
        display: flex;
        align-items: center;
        height: 1.6rem/* 120/75 */
        ;
        border-bottom: 1px solid #eeeeee;
        .tit {
          width: 3.013333rem/* 226/75 */
          ;
          flex: none;
        }
      }
    }

  }

</style>
