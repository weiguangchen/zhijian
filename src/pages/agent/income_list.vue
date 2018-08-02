<template>
  <div class="income-list page">
    <betterScroll v-if="cityId">
      <div class="income-wrapper">
        <div class="income-detail" v-for="(item,index) in list" :key="index" @click="toJms(item.id)">
          <div class="title">
            <div class="add">{{item.qy_name}}</div>
            <i class="iconfont icon-jinru"></i>
          </div>
          <div class="detail-list">
            <div class="detail-item">
              总收益
              <div class="money">￥{{item.z_money}}</div>
            </div>
            <div class="detail-item">
              未结算
              <div class="money">￥{{item.w_money}}</div>
            </div>
            <div class="detail-item">
              已结算
              <div class="money">￥{{item.y_money}}</div>
            </div>
          </div>
        </div>
      </div>
    </betterScroll>
    <betterScroll @pullingUp='pullingUp' ref='scroll' v-else-if="qyId">
      <div class="income-wrapper">
        <div class="income-detail" v-for="(item,index) in list" :key="index" @click="toJms(item.id)">
          <div class="title">
            <div class="add">{{item.qy_name}}</div>
            <i class="iconfont icon-jinru"></i>
          </div>
          <div class="detail-list">
            <div class="detail-item">
              总收益
              <div class="money">￥{{item.z_money}}</div>
            </div>
            <div class="detail-item">
              未结算
              <div class="money">￥{{item.w_money}}</div>
            </div>
            <div class="detail-item">
              已结算
              <div class="money">￥{{item.y_money}}</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="loadingTip">正在加载数据...</span>
      <span slot="doneTip">暂无更多数据</span>
    </betterScroll>
  </div>
</template>

<script>
  import betterScroll from "@/components/betterScroll";
  import setTitle from '@/mixins/setTitle.js'
  import checkLogin from "@/mixins/checkLogin.js";
  export default {
    data() {
      return {
        p: 1,
        list: []
      }
    },
    created() {
      if (this.cityId) {
        this.get_qy();
      } else if (this.qyId) {
        this.get_jms();
      }
    },
    watch: {
      $route() {
        this.list = [];
        if (this.cityId) {
          this.get_qy();
        } else if (this.qyId) {
          this.get_jms();
        }
      }
    },
    methods: {
      get_qy() {
        return this.$axios.get( "/Api/DlCore/qy_see_qy", {
          params: {
            dl_jb: this.userinfo.dl[0].dl_jb,
            city_id: this.cityId
          }
        }).then(({
          data
        }) => {
          this.list = this.list.concat(data);
        })
      },
      get_jms() {
        return this.$axios.get( "/Api/DlCore/get_shop", {
          params: {
            dl_id: this.userinfo.dl[0].id,
            tj: 0,
            num: 8,
            p:this.p
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
      toJms(id) {
        this.$router.push({
          path: '/incomeList',
          query: {
            qyId: id
          }
        })
      },
      pullingUp() {
        this.get_qy();
        this.$refs.scroll.finishPullupload();
      }
    },
    computed: {
      cityId() {
        return this.$route.query.cityId;
      },
      qyId() {
        return this.$route.query.qyId;
      }
    },
    components: {
      betterScroll
    },
    mixins: [setTitle, checkLogin]
  }

</script>

<style lang='scss' scoped>
  .income-list {
    background: #ffffff;
    .income-detail {
      padding: .533333rem/* 40/75 */
      0 .533333rem/* 40/75 */
      .8rem/* 60/75 */
      ;
      border-bottom: 1px solid #efefef;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: .4rem/* 30/75 */
        ;
        margin-bottom: .533333rem/* 40/75 */
        ;
        .add {
          display: inline-block;
          padding: .186667rem/* 14/75 */
          .266667rem/* 20/75 */
          ;
          border-radius: .24rem/* 18/75 */
          ;
          background-color: #5b62fb;
          color: #ffffff;
          box-shadow: 0 4px 10px 4px rgba(#000000, .2);
        }
      }
      .detail-list {
        display: flex;
        .detail-item {
          font-size: .373333rem/* 28/75 */
          ;
          flex: 1;
          .money {
            margin-top: .4rem/* 30/75 */
            ;
            font-size: .293333rem/* 22/75 */
            ;
            font-weight: bold;
          }
        }
      }
    }
  }

</style>
