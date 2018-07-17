<template>
  <div class="juan">
    <div class="top">
      <img :src="info.card_img" alt="" class="thumb">
      <div class="info">
        <div class="name">
          <span>{{info.shop_name}}</span>
          <span class="price">￥{{info.card_money}}</span>
        </div>
        <div class="classifiy">{{info.card_name}}</div>
      </div>
      <div class="status wsy">未使用</div>
    </div>
    <div class="bot">
      <div class="address">
        <i class="iconfont"></i>
        {{info.adress}}
      </div>
      <div class="fw-item" v-for="(fw,index1) in info.son" :key="index1">
        <div class="line">
          <span @click="buy(fw.fw_id,info.bk_id)">
            <span class="fw-title">服务：</span>{{fw.fw_name}} &nbsp;&nbsp;&nbsp;&nbsp;
            <span class="buy" >点击购买</span>
          </span>
          <span>剩余次数: {{fw.fw_num}}</span>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
          openFace:true
      }
    },
    props: ['info'],
    methods:{
        buy(fwId,cardId){
            var obj = {
                fwId,cardId
            }
            this.$emit('chooseFw',obj)
        }
    },
    components: {
    }
  }

</script>

<style lang='scss' scoped>
  .juan {
    box-shadow: 0 0 10px 1px rgba(#000000, 0.4);
    border-radius: 0.133333rem;
    overflow: hidden;
    margin-bottom: 1.2rem;
    $juanColor: #8ac7ff;
    .top {
      position: relative;
      color: #ffffff;
      display: flex;
      padding: 0.373333rem 0.4rem;
      background: linear-gradient(#3891dd, $juanColor);
      .thumb {
        flex: none;
        width: 1.333333rem;
        height: 1.333333rem;
        border: 1px solid #ffffff;
        border-radius: 50%;
        margin-right: 0.266667rem;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          display: flex;
          justify-content: space-between;
          .price {
            @include font-dpr(22px);
            flex: none;
            text-align: center;
          }
        }
        .classifiy {
          @include font-dpr(14px);
        }
      }
      .status {
        color: #ffffff;
        position: absolute;
        text-align: center;
        width: 1.733333rem;
        height: 0.64rem;
        line-height: 0.64rem;
        right: 0;
        bottom: 0;
      }
      .wsy {
        background: #43b486;
      }
    }
    .bot {
      .address {
        height: 1.026667rem;
        background: #ffffff;
        display: flex;
        align-items: center;
        padding-left: 0.466667rem;
      }
      .fw-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 1.666667rem;
        padding: 0.32rem 0.466667rem;
        border-top: 1px dashed #acacac;
        &:nth-child(even) {
          background: #f7f9f8;
        }
        .line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .fw-title {
            display: inline-block;
          }
          .buy {
            color: #de3232;
          }
          .fw-num {
            @include font-dpr(14px);
          }
          .reset-num {
            background: #dd69ee;
            text-align: center;
            line-height: 0.533333rem;
            height: 0.533333rem;
            padding: 0 0.053333rem;
            border-radius: 0.133333rem;
            color: #ffffff;
          }
        }
      }
      background: #ffffff;
      position: relative; // display: flex;
      // padding: 0.24rem 0 0.4rem 0.4rem;
      box-sizing: border-box; // height: 1.893333rem;
      &:after {
        content: "";
        height: 0.106667rem;
        position: absolute;
        left: 0;
        top: -0.106667rem;
        width: 100%;
        background: url(~img/public/youhuijuan-bg.png);
      }
      .message {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .icon-shijian {
          @include font-dpr(17px);
        }
        .icon-yuechi {
          margin-left: 0.04rem;
          @include font-dpr(13px);
        }
        .iconfont {
          margin-right: 0.426667rem;
        }
        .ma {
          @include font-dpr(14px);
        }
        &>div {
          display: flex;
          align-items: center;
        }
      }
      .times {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.08rem;
        .num {
          width: 0.64rem;
          height: 0.64rem;
          line-height: 0.64rem;
          text-align: center;
          border-radius: 0.106667rem;
          color: #ffffff;
          background: $juanColor;
        }
      }
    }
  }

</style>
