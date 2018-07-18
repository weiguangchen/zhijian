<template>
  <div class="income-list">
    <div class="income-wrapper" v-if="list">
      <div class="income-detail" v-for="(item,index) in list" :key="index">
        <div class="title">
          <div class="add">天津市</div>
          <i class="iconfont icon-jinru"></i>
        </div>
        <div class="detail-list">
          <div class="detail-item">
            总收益
            <div class="money">￥100.00</div>
          </div>
          <div class="detail-item">
            总收益
            <div class="money">￥100.00</div>
          </div>
          <div class="detail-item">
            总收益
            <div class="money">￥100.00</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无代理商信息</div>

  </div>
</template>

<script>
  import setTitle from '@/mixins/setTitle.js'
  import checkLogin from "@/mixins/checkLogin.js";
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      if (this.cityId) {
        this.get_qy()
      }
    },
    components: {

    },
    methods: {
      get_qy() {
        return this.$axios.get(this.API_URL + "/Api/DlCore/qy_see_qy", {
          params: {
            dl_id: this.userinfo.dl[0].id,
            city_id: this.cityId
          }
        }).then(({
          data
        }) => {
          this.list = data;
        })
      }
    },
    computed: {
      cityId() {
        return this.$route.query.cityId;
      }
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
