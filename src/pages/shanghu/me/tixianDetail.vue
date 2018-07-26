<template>
  <div class="tixianDetail">
    <bigTitle title='提款进度' :icon='false'></bigTitle>
    <div class="jindu">
      <div class="tu">
        <iview-steps size='small' direction='vertical' :current='step'>
          <iview-step title='发起提现申请' :content='detail.time'></iview-step>
          <iview-step title='系统审核中'></iview-step>
          <iview-step title='到账成功' v-if="detail.status == 1"></iview-step>
          <iview-step title='已拒绝' v-else-if="detail.status == 2" status='error'></iview-step>
        </iview-steps>
      </div>
      <div class="info">
        <div>
          <span>提现金额</span>
          <span>￥{{detail.money}}</span>
        </div>
        <div>
          <span>提现账户：</span>
          <span>{{userinfo.uphone}}</span>
        </div>
      </div>
      <XButton type='warn'>完成</XButton>
    </div>

  </div>
</template>

<script>
  import checkLogin from "@/mixins/checkLogin.js";
  import bigTitle from "@/components/bigTitle/index";

  import {
    XButton
  } from 'vux';
  export default {
    data() {
      return {
        detail: {}
      }
    },
    created() {
      this.$axios.get(this.API_URL + "/Api/UserShow/give_money_content", {
        params: {
          id: this.txId
        }
      }).then(({
        data
      }) => {
        console.log(data);
        this.detail = data;
      })


    },
    computed: {
      type() {
        return this.$route.query.type;
      },
      txId() {
        return this.$route.query.id;
      },
      step() {
        if (this.detail.status == 0) {
          return 1
        } else if (this.detail.status == 1 || this.detail.status == 2) {
          return 2
        }
      },
      detailStatus() {

      }
    },
    components: {
      XButton,
      bigTitle
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss'>
  .tixianDetail {

    .jindu {
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

  }

</style>
