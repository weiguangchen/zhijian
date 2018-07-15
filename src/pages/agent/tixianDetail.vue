<template>
  <div class="tixianDetail">
    <div class="tu">
      <iview-steps size='small' direction='vertical' :current='step'>
        <iview-step title='发起提现申请' content='2018/05/02'></iview-step>
        <iview-step title='系统审核中' content='预计到账时间05-21  14:20'></iview-step>
        <iview-step title='到账成功'></iview-step>
      </iview-steps>
    </div>
    <div class="info">
      <div>
        <span>提现金额</span>
        <span>￥980.00</span>
      </div>
      <div>
        <span>提现账户：</span>
        <span>18292093198</span>
      </div>
    </div>
    <XButton type='warn'>完成</XButton>
  </div>
</template>

<script>
import { XButton } from 'vux';
  export default {
    data() {
      return {
          step:1
      }
    },
    components: {
        XButton
    }
  }

</script>

<style lang='scss'>
  .tixianDetail {
    padding: .4rem/* 30/75 */
    ;
    .tu {
      padding-left: .933333rem/* 70/75 */
      ;
      border-bottom: 1px solid #cccccc;
      .ivu-steps-vertical .ivu-steps-main {
        height: 2.933333rem/* 220/75 */
        ;
      }
      .ivu-steps-item {
        &:last-child {
          .ivu-steps-main {
            height: 20px;
          }
        }
      }

    }
    .info {
      padding: .4rem/* 30/75 */
      ;
      &>div {
        font-size: .373333rem/* 28/75 */
        ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .4rem/* 30/75 */
        ;
      }
    }
  }

</style>
