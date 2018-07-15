<template>
  <div class="page queren">
    <betterScroll>
      <div class="address-wrapper" @click="toAddList">
        <div class="bg"></div>
        <div class="my-address">
          <div v-if="moren_add" class="my-add-box">
            <div class="title">
              <i class="iconfont icon-weizhi1"></i>地址信息</div>
            <div class="add-info">
              <div class="info-wrapper">
                <div>客户姓名：{{moren_add.name}}</div>
                <div>手机：{{moren_add.phone}}</div>
                <div>
                  <span class="txt">服务地址：</span>{{moren_add.adress}}</div>
                <div class="car-info">车辆信息：{{moren_add.car_card}}{{moren_add.car_color}} {{moren_add.car_xing}}</div>
              </div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </div>
          <div class="no-add" v-else>点击添加收货地址</div>
        </div>
        <div class="bg"></div>

      </div>
      <div class="fw_info">
        <div class="img-box">
          <img :src="fwInfo.fw_img" alt="" class="thumb">
        </div>
        <div class="fw_txt">
          <div class="fw_name">{{fwInfo.fw_mingzi}}</div>
          <div class="fw_content">{{fwInfo.sub_content}}</div>
        </div>
      </div>
      <div class="fw_num">
        <Group class="form">
          <XNumber title='购买数量' :min='1' v-model="num" class="xnum"></XNumber>
          <Cell title='总价' :value='money'></Cell>
          <Cell title='选择服务时间' :isLink='true'></Cell>
          <Cell title='选择优惠券 ' :isLink='true' @click.native="selectJuan"></Cell>
        </Group>

      </div>


      <XButton class="xbtn" type='warn' @click.native='buy' :disabled='submiting'>结算</XButton>
    </betterScroll>
      <selectJuan v-show="juanShow" @finish='finish' @set_card='set_card' :fwId='serviceId'></selectJuan>

  </div>
</template>

<script>
  import {
    XNumber,
    Group,
    XInput,
    Cell,
    XButton,
    Radio,
    PopupRadio
  } from "vux";
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from '@/mixins/setTitle.js'
  import betterScroll from '@/components/betterScroll/index';
  import selectJuan from './selectJuan';
  export default {
    data() {
      return {
        fwInfo: {},
        orderNum: "",
        card_list: [],
        hasCard: false,
        mapShow: false,
        submiting: false,

        num: 1,
        lianxiren: "",
        phone: "",
        mapInfo: "",
        card_val: "",

        moren_add: '',
        juanShow:false
      };
    },
    created() {
      this.get_fw_info();
      this.get_card();
      this.get_moren_add();
    },
    methods: {
      buy() {
        var _this = this;
        this.submiting = true;
        if (this.id) {
          if (this.moren_add == '') {
            this.$vux.alert.show({
              title: '提示',
              content: '请填写地址!'
            })
            return false;
          } else {
            this.$vux.confirm.show({
              title: "提示",
              content: "是否购买该服务？",
              onCancel() {
                _this.submiting = false;
              },
              onConfirm() {
                if (_this.card_val) {
                  _this.$axios
                    .get(_this.API_URL + "/api/BkPay/bk_pay", {
                      params: {
                        fw_id: _this.serviceId,
                        num: _this.num,
                        uid: _this.id,
                        shop_id: _this.shopid,
                        adress: _this.moren_add.adress,
                        dianhua: _this.moren_add.phone,
                        xingming: _this.moren_add.name,
                        three: _this.moren_add.three,
                        car_card: _this.moren_add.car_card,
                        car_color: _this.moren_add.car_color,
                        car_xing: _this.moren_add.car_xing,
                        card_id: _this.card_val
                      }
                    })
                    .then(({
                      data
                    }) => {
                      _this.$vux.alert.show({
                        title: "提示",
                        content: "购买成功,请在我的订单中查看消费码！",
                        onHide() {
                          _this.$router.push({
                            path: "/me"
                          });
                        }
                      });
                    });
                } else {
                  _this.$axios
                    .get(_this.API_URL + "/api/WxPay/pay", {
                      params: {
                        shop_fw_id: _this.serviceId,
                        num: _this.num,
                        uid: _this.id,
                        adress: _this.moren_add.adress,
                        dianhua: _this.moren_add.phone,
                        xingming: _this.moren_add.name,
                        three: _this.moren_add.three,
                        car_card: _this.moren_add.car_card,
                        car_color: _this.moren_add.car_color,
                        car_xing: _this.moren_add.car_xing
                      }
                    })
                    .then(({
                      data
                    }) => {
                      _this.orderNum = data.pay_order_id;
                      return new Promise((resolve, reject) => {
                        _this.$wx.chooseWXPay({
                          timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                          nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                          package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                          signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                          paySign: data.paySign, // 支付签名
                          success: function (res) {
                            // 支付成功后的回调函数
                            resolve(res);
                          },
                          cancel: function (res) {
                            _this.submiting = false;
                          }
                        });
                      });
                    })
                    .then(res => {
                      console.log("支付成功回调");
                      console.log(res);
                      return _this.$axios.get(_this.API_URL + "/api/WxPay/fs", {
                        params: {
                          order_num: _this.orderNum
                        }
                      });
                    })
                    .then(res => {
                      console.log("回调结束");
                      console.log(res);
                      _this.$vux.alert.show({
                        title: "提示",
                        content: "购买成功,请在我的订单中查看消费码！",
                        onHide() {
                          _this.$router.push({
                            path: "/me"
                          });
                        }
                      });
                    });
                }
              }
            });
          }
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: "请先登录",
            onHide() {
              _this.$router.push({
                path: "/me"
              });
            }
          });
        }
      },
      get_fw_info() {
        var _this = this;
        this.$axios
          .get(_this.API_URL + "/Api/WxPay/yes_order", {
            params: {
              id: _this.serviceId
            }
          })
          .then(({
            data
          }) => {
            _this.fwInfo = data[0];
          });
      },
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
            this.card_list = data.data;
          });
      },
      get_moren_add() {
        this.$axios.get(this.API_URL + '/Api/Adress/moren_adress', {
          params: {
            uid: this.id
          }
        }).then(({
          data
        }) => {
          console.log(data);
          this.moren_add = data[0];
        })
      },
      toAddList() {
        this.$router.push({
          path: '/addressList'
        })
      },
      selectJuan() {
        this.juanShow = true;
        // this.$router.push({
        //   path: '/selectJuan',
        //   query: {
        //     fwId: this.serviceId
        //   }
        // })

      },
      finish(val){
        this.juanShow = val;
      },
      set_card(val){
        this.card_val = val;
      }
    },
    computed: {
      serviceId() {
        return this.$route.query.serviceId;
      },
      shopid() {
        return this.$route.query.shopid;
      },
      money() {
        if (this.fwInfo.fw_gg) {
          return `${this.num * this.fwInfo.money}元/${this.fwInfo.fw_gg}`;
        } else {
          return `${this.num * this.fwInfo.money}元`;
        }

      }
    },
    components: {
      XNumber,
      Group,
      XInput,
      Cell,
      XButton,
      Radio,
      PopupRadio,
      betterScroll,
      selectJuan
    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style lang='scss'>
  .queren {
    .fw_info {
      background: #ffffff;
      display: flex;
      padding: 0.666667rem 0.4rem;
      .img-box {
        flex: none;
        width: 2.666667rem;
        height: 2.666667rem;
        margin-right: 0.266667rem;
        overflow: hidden;
        .thumb {
          height: 100%;
          max-width: none;
          transform: translateX(-15%);
        }

      }
      .fw_txt {
        @include font-dpr(14px);
        line-height: 0.48rem;
        color: #2b2b2b;

        .fw_name {
          font-weight: bold;
          margin-bottom: 0.373333rem;
        }
        .fw_content {
          opacity: 0.8;
        }
      }
    }
    .weui-btn {
      border-radius: 0;
      &::after {
        border-radius: 0;
      }
    }
    .fw_num {
      margin-bottom: $bot;
      .form {
        margin-bottom: $bot;
      }
    }
    .address-wrapper {
      .bg {
        height: .4rem/* 30/75 */
        ;
        background: url(~img/public/queren-bg.png);
      }
      .my-address {
        min-height: 4.266667rem/* 320/75 */
        ;
        background: #ffffff;
        .my-add-box {
          padding: .266667rem/* 20/75 */
          0 .266667rem/* 20/75 */
          .4rem/* 30/75 */
          ;
          .title {
            display: flex;
            align-items: center;
            margin-bottom: .4rem/* 30/75 */
            ;
            .iconfont {
              width: .933333rem/* 70/75 */
              ;
              font-size: .6rem/* 45/75 */
              ;
            }
            font-size: .373333rem/* 28/75 */
            ;
          }
          .add-info {
            color: #4f4f4f;
            font-size: .346667rem/* 26/75 */
            ;
            line-height: 2;
            display: flex;
            align-items: center;
            padding-left: .933333rem/* 70/75 */
            ;
            .info-wrapper {
              word-wrap: break-word;
              overflow: hidden;
              flex: none;
              width: 7.466667rem/* 560/75 */
              ;
              .txt {
                float: left;
              }
              .car-info {
                font-size: .32rem/* 24/75 */
                ;
                color: #5f5f5f;
              }
            }
            .icon-jinru {
              font-size: .56rem/* 42/75 */
              ;
              color: #000000;
              margin-left: .2rem/* 15/75 */
              ;
            }
          }
        }
        .no-add {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: .48rem/* 36/75 */
          ;
          opacity: .5;
        }
      }
    }
    .fw_time {
      margin-bottom: $bot;
    }
    .xbtn {
      // margin-top: 1.333333rem;
    }
    .card-list {
      box-sizing: bor der-box;
      background: #ffffff;
      .sub-title {
        padding: 10px 15px;
        @include font-dpr(17px);
        background: #ffffff;
      }
      .card-item {
        display: flex;
        padding-right: .6rem/* 45/75 */
        ;
        margin-bottom: .666667rem/* 50/75 */
        ;
        .card-radio {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
        }
        .card {
          display: flex;
          position: relative;
          width: 8rem/* 600/75 */
          ;
          padding: .133333rem/* 10/75 */
          0 .133333rem/* 10/75 */
          .666667rem/* 50/75 */
          ;
          min-height: 1.786667rem/* 134/75 */
          ;
          background-image: url(~img/public/card-bg.png);
          background-position-y: .533333rem/* 40/75 */
          ;
          background-size: 5.533333rem/* 415/75 */
          ;
          background-repeat: no-repeat;
          background-color: #ffffff;
          box-shadow: 0 0 10px 4px rgba(#000000, .1);
          font-size: .32rem/* 24/75 */
          ;
          .card-info {
            width: 5.533333rem/* 415/75 */
            ;
            border-right: 1px dashed #7b7b7b;
            line-height: .64rem/* 48/75 */
            ;
            display: flex;
            .text {
              flex: none;
            }
            .fw-box {
              padding: 0 .266667rem/* 20/75 */
              ;
              .fw {
                display: inline-block;
              }
            }
          }
          .cishu {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            text-align: center;
            padding: .4rem/* 30/75 */
            0;
            em {
              font-size: .64rem/* 48/75 */
              ;
              font-weight: bold;
              color: #de3232;
            }
          }
          .left-circle {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(-50%, -50%);
            width: .533333rem/* 40/75 */
            ;
          }
        }
      }
    }
  }

</style>
