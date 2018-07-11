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
      <Group class="form">
        <XNumber title='购买数量' :min='1' v-model="num" v-if="!card_list.length>0" class="xnum"></XNumber>
        <Cell title='总价' :value='money'></Cell>
        <!-- <XInput title='联系人' v-model="lianxiren" text-align='right'></XInput>
        <XInput title='联系电话' v-model="phone" text-align='right'></XInput>
        <XInput title='服务地址' @click.native="openMap" v-model="mapInfo.poiaddress" text-align='right'></XInput> -->
      </Group>
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
          <div class="no-add">点击添加收货地址</div>
        </div>
        <div class="bg"></div>

      </div>
    </div>

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
        card_val: "",

        moren_add: ''
      };
    },
    created() {
      document.title = "确认订单";
      this.get_fw_info();
      this.get_card();
      this.get_moren_add();
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
                        xingming: _this.lianxiren,
                        three: this.moren_add.three,
                        car_card: this.moren_add.car_card,
                        car_color: this.moren_add.car_color,
                        car_xing: this.moren_add.car_xing
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
      .form {
        margin-bottom: $bot;
      }
      .address-wrapper {
        .bg {
          height: .4rem/* 30/75 */
          ;
          background: url(~img/public/queren-bg.png);
        }
        .my-address {
          height: 4.266667rem/* 320/75 */
          ;
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
