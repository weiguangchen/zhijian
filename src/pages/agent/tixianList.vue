<template>
  <div class="tixianList">
    <betterScroll>
      <div class="list" v-if="type == 'tixian'">
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
      <div class="list" v-else-if="type == 'shoukuan'">
        <div class="tx-item" v-for="(item,index) in list" :key='index'>
          <div class="account">
            <div>可用收益</div>
            <img src="~img/public/tixian-arrow.png" alt="" class="arrow">
            <div>余额</div>
          </div>
          <div class="line">
            <div class="status success">
              <i class="iconfont icon-yuan"></i>
            </div>
            <span class="txt">已完成</span>￥{{item.money}}
          </div>
          <div class="date">提现时间:{{item.time}}</div>
        </div>
      </div>

    </betterScroll>
  </div>
</template>

<script>
  import betterScroll from "@/components/betterScroll/index";
  import checkLogin from "@/mixins/checkLogin.js";
  export default {
    data() {
      return {
        p: 1,
        list: []
      };
    },
    created() {
      if (this.type == 'tixian') {
        this.setMetaTitle('提现列表')
        this.get_tx_list();
      } else if (this.type == 'shoukuan') {
        this.setMetaTitle('收款列表')
        this.get_sk_list();
      }
    },
    methods: {
      toTxDetail(id) {
        this.$router.push({
          path: '/tixianDetail',
          query:{
            type:'tixian',
            id
          }
        })
      },
      toSkDetail(id) {
        this.$router.push({
          path: '/tixianDetail',
          query:{
            type:'shoukuan',
            id
          }
        })
      },
      get_tx_list() {
        this.$axios.get(this.API_URL + '/Api/UserShow/give_money_list', {
          params: {
            uid: this.id,
            num: 8
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.list = data.list;
        })
      },
      get_sk_list() {
        var params = {
          dl_id: this.userinfo.dl[0].id,
          p: this.p,
          num: 8
        };
        this.$axios.get(this.API_URL + '/Api/DlCore/get_money_log', {
          params
        }).then(({
          data
        }) => {
          this.list = data.list;
        })
      }
    },
    components: {
      betterScroll
    },
    computed: {
      type() {
        return this.$route.query.type;
      }
    },
    mixins: [checkLogin]
  };

</script>

<style scoped lang='scss'>
  .tixianList {
    background: #e4e4e4;
    height: 100%;
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
