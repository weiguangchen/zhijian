<template>
  <div class="page queren">
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
      <Group>
        <XNumber title='购买数量' :min='1' v-model="num"  v-if="!card_list.length>0"></XNumber>
        <Cell title='总价' :value='money'></Cell>
        <XInput title='联系人' v-model="lianxiren"></XInput>
        <XInput title='联系电话' v-model="phone"></XInput>
        <XInput title='服务地址' @click.native="openMap" v-model="mapInfo.poiaddress"></XInput>
      </Group>
    </div>

    <!-- v-if="card_list.length>0" -->
    <div class="card-list" v-if="card_list.length>0">
      <!-- <h1 class="sub-title">优惠卡</h1> -->
      <!-- <Group>
        <Radio :options='card_list' v-model="card_val"></Radio>
      </Group> -->
      <Group>
        <PopupRadio title="优惠卡" :options='card_list' v-model="card_val">
        </PopupRadio>
      </Group>

    </div>

    <XButton class="xbtn" type='warn' @click.native='buy' :disabled='submiting'>结算</XButton>
    <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap>
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
  import myMap from "@/components/map/index";
  import checkLogin from "@/mixins/checkLogin.js";
  export default {
    data() {
      return {
        fwInfo: {},
        orderNum: "",
        card_list: [{
          value: '卡1',
          key: 1
        }, {
          value: '卡2',
          key: 2
        }],
        hasCard: false,
        mapShow: false,
        submiting: false,

        num: 1,
        lianxiren: "",
        phone: "",
        mapInfo: "",
        card_val: ""
      };
    },
    created() {
      document.title = "确认订单";
      this.get_fw_info();
      this.get_card();
    },
    methods: {
      openMap() {
        this.mapShow = true;
      },
      finishAdd(val) {
        this.mapInfo = val;
        this.mapShow = false;
      },
      buy() {
        var _this = this;
        this.submiting = true;
        if (this.id) {
          if (!this.lianxiren) {
            this.$vux.toast.show({
              text: "请输入联系人",
              position: "middle"
            });
            this.submiting = false;
            return false;
          } else if (!this.phone) {
            this.$vux.toast.show({
              text: "请输入联系人手机号",
              position: "middle"
            });
            this.submiting = false;
            return false;
          } else if (!this.mapInfo) {
            this.$vux.toast.show({
              text: "请选择收货地址",
              position: "middle"
            });
            this.submiting = false;
            return false;
          } else {
            this.$vux.confirm.show({
              title: "提示",
              content: "是否购买该服务？",
              onCancel() {
                this.submiting = false;
              },
              onConfirm() {
                if (_this.card_val) {
                  _this.$axios
                    .get(_this.API_URL + "/api/BkPay/bk_pay", {
                      params: {
                        fw_id: _this.serviceId,
                        num: _this.num,
                        uid: _this.id,
                        adress: _this.mapInfo.poiaddress,
                        phone: _this.phone,
                        xingming: _this.lianxiren,
                        card_id: _this.card_val,
                        shop_id: _this.shopid
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
                        adress: _this.mapInfo.poiaddress,
                        dianhua: _this.phone,
                        xingming: _this.lianxiren
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
            var radioList = [];
            if (data.status == 1) {
              data.data.map(m => {
                var item = {};
                item.key = m.bk_id;
                item.value = m.card_name;
                radioList.push(item);
              });
            }
            this.card_list = radioList;
          });
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
        return `${this.num * this.fwInfo.money}元/${this.fwInfo.fw_gg}`;
      }
    },
    components: {
      XNumber,
      Group,
      XInput,
      Cell,
      myMap,
      XButton,
      Radio,
      PopupRadio
    },
    mixins: [checkLogin]
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
    }
    .fw_time {
      margin-bottom: $bot;
    }
    .xbtn {
      margin-top: 1.333333rem;
    }
    .card-list {
      .sub-title {
        padding: 10px 15px;
        @include font-dpr(17px);
        background: #ffffff;
      }
    }
  }

</style>
