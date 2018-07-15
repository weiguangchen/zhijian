<template>
  <div class="income">
    <div class="total-wrapper">
      <div class="total">
        <h1>总收益</h1>
        <div class="num">￥
          <em>10,000.00</em>
        </div>
      </div>
    </div>
    <div class="total-num">
      <div class="total-item">
        <h2>未结算</h2>
        <div class="num">￥600.00</div>
      </div>
      <div class="total-item">
        <h2>已结算</h2>
        <div class="num">￥600.00</div>
      </div>
    </div>
    <div class="area-income">
      <div class="income-detail">
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
      <div class="income-detail">
        <div class="title">
          <div class="add">北京市</div>
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
  </div>
</template>

<script>
  import setTitle from '@/mixins/setTitle.js'

  export default {
    data() {
      return {

      }
    },
    components: {

    },
    mixins:[setTitle]
  }

</script>

<style scoped lang='scss'>
  .income {
    height: 100%;
    background: #efefef;
    .total-wrapper {
      position: relative;
      height: 3.333333rem/* 250/75 */
      ;
      background-image: url(~img/public/income.png);
      overflow: hidden;
      .total {
        color: #ffffff;
        padding: .4rem/* 30/75 */
        ;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 2.24rem/* 168/75 */
        ;
        width: 8.4rem/* 630/75 */
        ;
        background: #5c63fc;
        border-radius: .213333rem/* 16/75 */
        .213333rem/* 16/75 */
        0 0;
        box-shadow: 0 0 10px 4px rgba(#000000, .2);
        font-size: .373333rem/* 28/75 */
        ;
        h1 {
          margin-bottom: .266667rem/* 20/75 */
          ;
        }
        em {
          font-size: .6rem/* 45/75 */
          ;
        }
        .num {
          margin-left: 2rem/* 150/75 */
          ;
        }
      }
    }
    .total-num {
      margin-bottom: $bot;
      height: 2rem/* 150/75 */
      ;
      display: flex;
      font-size: .373333rem/* 28/75 */
      ;
      background: #ffffff;
      .total-item {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2 {
          margin-bottom: .266667rem/* 20/75 */
          ;
        }
        .num {
          font-size: .346667rem/* 26/75 */
          ;
          font-weight: bold;
        }
      }
    }
    .area-income {
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
  }

</style>
