<template>
  <div class="selectJuan">
    <template v-if="hasCard">
      <div class="no-juan">
        <div class="radio">
          <mu-radio v-model="juan" value='nocard' @change="change"></mu-radio>
        </div>
        <div class="info">不使用优惠券</div>
      </div>

      <div class="juan" v-for="(item,index) in card_list" :key="index">
        <div class="juan-top">
          <div class="radio">
            <mu-radio v-model="juan" :value='item.bk_id' @change="change"></mu-radio>
          </div>
          <div class="info">
            <div class="left">
              <h1>{{item.card_name}}</h1>
              <h2>{{item.shop_name}}</h2>
            </div>
            <div class="right">
              <div class="img-box">
                <img src="~img/index/avatar.png" alt="" class="img">
              </div>
            </div>
          </div>
        </div>
        <div class="detail">
          <span :class="{disabled:item.fw_num<=0}" v-for="(item,index) in item.son" :key="index">{{item.fw_name}}({{item.fw_num}})</span>
        </div>
      </div>


    </template>

    <div v-else class="none">没有可用优惠券</div>
    <!-- <XButton @click.native='finish' type='warn' class="xbtn">确定</XButton> -->
  </div>
</template>

<script>
  import {
    XButton
  } from 'vux';
  import checkLogin from "@/mixins/checkLogin.js";

  export default {
    data() {
      return {
        juan: '',
        card_list: [],
      }
    },
    created() {
      if(this.cardVal){
        this.juan = this.cardVal;
      }
      this.get_card();

    },
    // props:['fwId'],
    methods: {
      get_card() {
        var _this = this;
        this.$axios
          .get(_this.API_URL + "/Api/BkPay/yes_card", {
            params: {
              user_id: this.id,
              fw_id: this.serviceId
            }
          })
          .then(({
            data
          }) => {
            if (data.status == 1) {
              this.card_list = data.data;
            }
          });
      },
      finish() {
        this.$emit('finish', false);
        this.$emit('set_card', this.juan)
      },
      change(val) {
        var query = {
          serviceId: this.serviceId,
          shopid: this.shopid,
        }
        if (val != 'nocard') {
          Object.assign(query,{
            cardVal:this.juan
          })
        }
        this.$router.replace({
          path: '/queren',
          query
        })
      }
    },
    components: {
      XButton
    },
    computed: {
      serviceId() {
        return this.$route.query.serviceId;
      },
      shopid() {
        return this.$route.query.shopid;
      },
      cardVal(){
        return this.$route.query.cardVal;
      },
      hasCard() {
        if (this.card_list.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    mixins: [checkLogin]
  }

</script>

<style scoped lang='scss'>
  .selectJuan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #ffffff;
    padding-right: .4rem/* 30/75 */
    ;
    color: #2c2c2c;
    .juan {

      .juan-top {
        display: flex;
        justify-content: space-between;
        flex: 1;
        .radio {
          flex: none;
          width: 1.6rem/* 120/75 */
          ;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .info {
          width: 8rem/* 600/75 */
          ;
          height: 2.133333rem/* 160/75 */
          ;
          background-image: url(~img/public/juan-bg.png);
          background-repeat: no-repeat;
          background-size: 8rem/* 600/75 */
          ;
          background-position: 0 0;
          display: flex;
          padding-right: .4rem/* 30/75 */
          ;
          font-size: .32rem/* 24/75 */
          ;
          .left {
            width: 5.6rem/* 420/75 */
            ;
            flex: none;
            padding: .4rem/* 30/75 */
            0 .533333rem/* 40/75 */
            .533333rem/* 40/75 */
            ;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
          .right {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .img-box {
              width: 1.066667rem/* 80/75 */
              ;
              height: 1.066667rem/* 80/75 */
              ;
              border-radius: .133333rem/* 10/75 */
              ;
              overflow: hidden;
              .img {
                height: 100%;
                max-width: none;
              }
            }
          }

        }
      }
      .detail {
        margin-left: 1.6rem/* 120/75 */
        ;
        padding: .533333rem/* 40/75 */
        ;
        box-shadow: 0 0 10px 4px rgba(#f2f2f2, 1);
        span {
          margin-right: .4rem/* 30/75 */
          ;
        }
        .disabled {
          color: #a6a6a6;
        }
      }
    }
    .no-juan {
      display: flex;
      height: 2.133333rem/* 160/75 */
      ;
      .radio {
        flex: none;
        width: 1.6rem/* 120/75 */
        ;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .info {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: .4rem/* 30/75 */
        ;
      }
    }
    .none {
      text-align: center;
      color: #c1c1c1;
      line-height: 2;
    }
    .xbtn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

</style>
