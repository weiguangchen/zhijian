<template>
  <!-- <div class="shanghu-page">
        <ViewBox> -->
  <div>
    <bigTitle title="订单管理" @showPopup='showPopup'></bigTitle>
    <div class="order-gl">
      <div class="order-item" v-for="(item,index) in list" :key="index">
        <div class="order-num">
          <div>订单号：{{item.order_num}}</div>
          <div>交易时间：{{item.date}}</div>

        </div>
        <div class="order-info">
          <img :src="item.fw_img" alt="" class="img">
          <div class="info">
            <div class="mingzi">{{item.fw_mingzi}}</div>
            <div class="mingzi">下单会员：{{item.nickname}}</div>
            <div class="mingzi">手机号：{{item.phone}}</div>
          </div>
        </div>
        <div class="count">
          <div class="count-item">
            结算价：¥{{item.order_jprice}}
          </div>
          <div class="count-item">
            数量：{{item.shop_num}}
          </div>
          <div class="count-item">
            <div v-if="item.status == 0">状态：
              <span class="warn">未支付</span>
            </div>
            <div v-else-if="item.status == 1">状态：未使用</div>
            <div v-else-if="item.status == 2">状态：
              <span class="success">已使用</span>
            </div>
            <div v-else-if="item.status == 3">状态：申请退款</div>
            <div v-else-if="item.status == 4">状态：已退款</div>
            <div v-else-if="item.status == 5">状态：已过期</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- </ViewBox>

    </div> -->
</template>

<script>
import { ViewBox } from "vux";
import bigTitle from "@/components/bigTitle/index";
export default {
  data() {
    return {
      list: [],
      p: 1
    };
  },
  created() {
    var _this = this;
    this.$emit("showPopup", false);
    this.$axios
      .get(this.API_URL + "/Api/ShopFw/get_order", {
        params: {
          fw_shop_id: 1,
          num: 8,
          p: 1
        }
      })
      .then(({ data }) => {
        _this.list = data.list;
      });
  },
  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    }
  },
  components: { bigTitle, ViewBox }
};
</script>

<style lang='scss'>
.order-gl {
  line-height: 1;
  background: #f0f0f0;
  .order-item {
    padding-left: 0.533333rem;
    background: #ffffff;
    @include font-dpr(12px);
    box-sizing: border-box;
    padding-top: 0.56rem;
    padding-bottom: 0.533333rem;
    margin-bottom: 0.266667rem;
    .order-num {
      border-bottom: 1px solid #f0f0f0;
      & > div {
        margin-bottom: 0.266667rem;
      }
    }
    .order-info {
      padding: 0.266667rem 0;
      display: flex;
      .img {
        width: 2.666667rem;
        height: 2.133333rem;
        border-radius: 0.133333rem;
        margin-right: 0.24rem;
      }

      .info {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-around;
      }
    }

    .count {
      display: flex;
      .count-item {
        flex: 1;
        .warn {
          color: #dc3330;
        }
        .success {
          color: #1e7c28;
        }
      }
    }
  }
}
</style>