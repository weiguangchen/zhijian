<template>
  <div class="page mendian-tongji">
    <bigTitle title="消费统计" @showPopup='showPopup'></bigTitle>
    <div class="fw-info">
      <h1>2843210938219381209381093810398123132121</h1>
      <div class="fw-detail">
        <span>总共消费:
          <em>52</em>
        </span>
        <span>有效期：不限时间</span>
      </div>
    </div>
    <div class="memdian-info">
      <h1 class="title">门店</h1>
      <div class="md-list">
        <div class="md-item">
          <h1 class="tit">选车飞机文件覅额外金佛IE无法Joe微积分</h1>
          <div class="money">
            <img src="./img/mendian.png" alt="" class="img">
            <div class="count">
              <div>消费数量</div>
              <span>30</span>
            </div>
            <div class="count">
              <div>已完成</div>
              <span>30</span>
            </div>
            <div class="count">
              <div>未完成</div>
              <span>30</span>
            </div>
            <div class="count">
              <div>退单</div>
              <span>30</span>
            </div>
          </div>
          <div class="total">
            <span>总额</span>
            <span class="price">￥3000</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        list: []
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);

    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      get_fw_mendian(){
        //   this.$axios.get(this.API_URL+'/Api/')
      }
    },
    computed:{
        fwId(){
            return this.$route.query.id;
        }
    },
    components: {
      bigTitle
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .mendian-tongji {
    .fw-info {
      background: #ffffff;
      padding: .6rem/* 45/75 */
      0 .6rem .533333rem/* 40/75 */
      ;
      margin-bottom: $bot;
      h1 {
        font-size: .373333rem/* 28/75 */
        ;
        margin-bottom: .346667rem/* 26/75 */
        ;
      }
      .fw-detail {
        span {
          margin-right: .6rem/* 45/75 */
          ;
          em {
            color: #de3332;
          }
        }
      }
    }
    .memdian-info {
      padding-left: .533333rem/* 40/75 */
      ;
      background: #ffffff;
      font-size: .373333rem/* 28/75 */
      ;
      .title {
        padding: .4rem/* 30/75 */
        0;
        font-weight: bold;
      }
      .md-item {
        margin-bottom: $bot;
        padding-right: .533333rem/* 40/75 */;
        .tit {
          margin-bottom: .533333rem/* 40/75 */
          ;
        }
        .money {
          display: flex;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: .4rem/* 30/75 */
          ;
          align-items: flex-start;
          .img {
            flex: none;
            width: .4rem/* 30/75 */
            ;
          }
          .count {
            font-size: .32rem/* 24/75 */
            ;
            flex: 1;
            text-align: center;
            div {
              margin-bottom: .333333rem/* 25/75 */
              ;
            }
          }
        }
        .total {
          height: 1.2rem/* 90/75 */
          ;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            color: #de3332;
            font-weight: bold;
          }
        }
      }
    }
  }

</style>
