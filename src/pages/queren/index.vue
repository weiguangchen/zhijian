<template>
  <div class="page queren">
    <betterScroll>
      <div class="address-wrapper" @click="toAddList">
        <div class="bg"></div>
        <div class="my-address">
          <div v-if="has_add" class="my-add-box">
            <div class="title">
              <i class="iconfont icon-weizhi1"></i>地址信息</div>
            <div class="add-info">
              <div class="info-wrapper">
                <div>客户姓名：{{moren_add.name}}</div>
                <div>手机：{{moren_add.phone}}</div>
                <div>
                  <span class="txt">服务地址：</span>{{moren_add.adress}}</div>
                <div class="car-info">车辆信息：{{moren_add.car_card}}{{moren_add.car_color}} {{moren_add.car_xing}}</div>
                <div>车位： {{moren_add.car_wei}}</div>
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
          <div class="fw_price">￥{{fwInfo.money}}
            <template v-if="fwInfo.fw_gg">/{{fwInfo.fw_gg}}</template>
          </div>
        </div>
      </div>
      <div class="fw_num">
        <Group class="form">
          <XNumber title='购买数量' :min='fwInfo.min' v-model="num" class="xnum" :fillable='true' v-if="!yhjId"></XNumber>
          <Cell title='购买数量' v-else>{{num}}</Cell>
          <Cell title='选择服务时间' :isLink='true'>
            <DateTime v-model="selectDate" :start-date='startdate'></DateTime>
          </Cell>
          <Cell title='选择活动卡 ' :isLink='true' @click.native="selectJuan" v-model="cardname"></Cell>
          <Cell title='选择优惠券 ' :isLink='true' @click.native="selectYhj">{{current_yhj_name}}</Cell>
          <Cell title='总价'>{{money}}元</Cell>
        </Group>
      </div>

      <XButton class="xbtn" type='warn' @click.native='buy' :disabled='submiting'>结算</XButton>
    </betterScroll>

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
    PopupRadio,
  } from "vux";
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from '@/mixins/setTitle.js'
  import betterScroll from '@/components/betterScroll/index';
  import selectJuan from './selectJuan';
  import {
    DateTime
  } from 'vue-ydui/dist/lib.px/datetime';
  import {
    mapMutations,
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        fwInfo: '',
        /* 服务信息 */
        orderNum: "",
        /* 微信支付成功订单号 */
        card_list: [],
        /* 已有活动卡 */
        hasCard: false,
        submiting: false,
        /* 防止重复提交 */

        add_status: '',
        /* 是否有默认地址 */
        moren_add: '',
        /* 默认地址 */
        num: 1,
        /* 购买数量 */
        selectDate: '',

        startdate: '',
        /*  开始时间 */
        // 当前选择优惠券
        current_yhj: '',
        // 优惠券列表
        yhj_list: []
      };
    },
    created() {
      // this.$eruda.init();
      this.get_fw_info();
      this.get_card();
      this.get_yhj_info();

      if (this.pre_num) {
        this.num = this.pre_num;
      }
      // 判断是否使用默认地址,默认从服务页下单使用默认地址
      if (this.if_moren_add) {
        this.get_moren_add();
      } else {
        this.moren_add = this.selected_add;
        this.add_status = 1;
      }
      // 当前时间
      this.startdate = this.$moment().format("YYYY-MM-DD HH:mm");
    },
    methods: {
      buy() {
        var _this = this;
        this.submiting = true;

        this.checkAdd().then(() => {
          this.$vux.confirm.show({
            title: "提示",
            content: "是否购买该服务？",
            onCancel() {
              _this.submiting = false;
            },
            onConfirm() {
              if (_this.cardVal) {
                // 用卡支付
                _this.checkCard().then(res => {
                  if (res.status == 1) {
                    _this.$axios
                      .get("/api/BkPay/bk_pay", {
                        params: {
                          fw_id: _this.serviceId,
                          num: _this.num,
                          uid: _this.id,
                          shop_id: _this.shopId,
                          adress: _this.moren_add.adress,
                          dianhua: _this.moren_add.phone,
                          xingming: _this.moren_add.name,
                          three: _this.moren_add.three,
                          car_card: _this.moren_add.car_card,
                          car_color: _this.moren_add.car_color,
                          car_xing: _this.moren_add.car_xing,
                          card_id: _this.cardVal,
                          fw_time: _this.selectDate,
                          face_face: _this.faceId

                        }
                      })
                      .then(({
                        data
                      }) => {
                        _this.$vux.alert.show({
                          title: "提示",
                          content: "购买成功,请在我的订单中查看消费码！",
                          onHide() {
                            _this.$router.replace({
                              path: "/me"
                            });
                          }
                        });
                      });
                  } else {
                    // 卡内次数不足
                    _this.$vux.alert.show({
                      title: '提示',
                      content: '卡内服务次数不足！',
                      onHide() {
                        _this.submiting = false;
                      }
                    })
                  }
                })
              } else {
                // 微信支付
                var params = {
                  shop_fw_id: _this.serviceId,
                  num: _this.num,
                  uid: _this.id,
                  adress: _this.moren_add.adress,
                  dianhua: _this.moren_add.phone,
                  xingming: _this.moren_add.name,
                  three: _this.moren_add.three,
                  car_card: _this.moren_add.car_card,
                  car_color: _this.moren_add.car_color,
                  car_xing: _this.moren_add.car_xing,
                  fw_time: _this.selectDate,
                  face_face: _this.faceId,
                }

                if (_this.yhjId) {
                  // 使用优惠券
                  Object.assign(params, {
                    yhq_id: _this.yhjId,
                    user_yhq: _this.current_yhj.user_yhq.id
                  })
                } else {
                  // 不使用优惠券
                  Object.assign(params, {
                    yhq_id: 0,
                    user_yhq: ''
                  })
                }
                _this.$axios
                  .get("/api/WxPay/pay", {
                    params
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
                    var resparams = {
                      order_num: _this.orderNum
                    };
                    if (_this.yhjId) {
                      // 使用优惠券
                      Object.assign(resparams, {
                        yhq_id: _this.yhjId,
                        user_yhq: _this.current_yhj.user_yhq.id
                      })
                    } else {
                      // 不使用优惠券
                      Object.assign(resparams, {
                        yhq_id: 0,
                        user_yhq: ''
                      })
                    }
                    console.log('resparams')
                    console.log(resparams)
                    return _this.$axios.get("/api/WxPay/fs", {
                      params: resparams
                    });
                  })
                  .then(res => {
                    console.log("回调结束");
                    console.log(res);
                    _this.$vux.alert.show({
                      title: "提示",
                      content: "购买成功,请在我的订单中查看消费码！",
                      onHide() {
                        _this.$router.replace({
                          path: "/me"
                        });
                      }
                    });
                  });
              }
            }
          });
        })
      },
      checkCard() {
        if (this.cardVal) {
          return this.$axios.get('/Api/BkPay/yes_num', {
            params: {
              user_id: this.id,
              fw_id: this.serviceId,
              card_id: this.cardVal,
              num: this.num
            }
          }).then(({
            data
          }) => {
            return data
          })
        } else {
          return;
        }

      },
      checkAdd() {
        var _this = this;
        return new Promise((resolve, rejcet) => {
          if (_this.add_status == 0) {
            _this.$vux.alert.show({
              title: '提示',
              content: '请填写地址!',
              onHide() {
                _this.toAddList();
              }
            })
            reject();

          } else {
            resolve();
          }
        })
      },
      get_fw_info() {
        var _this = this;
        this.$axios
          .get("/Api/WxPay/yes_order", {
            params: {
              id: _this.serviceId
            }
          })
          .then(({
            data
          }) => {
            data[0].min = parseInt(data[0].min);
            _this.fwInfo = data[0];
            if (this.fwInfo.min > 0) {
              this.num = this.fwInfo.min;
            }
            this.canuse_yhj();

          });
      },
      get_card() {
        var _this = this;
        this.$axios
          .get("/Api/BkPay/yes_card", {
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
        this.$axios.get('/Api/Adress/moren_adress', {
          params: {
            uid: this.id
          }
        }).then(({
          data
        }) => {
          console.log(data);
          this.moren_add = data.adress;
          this.add_status = data.status
        })
      },
      toAddList() {
        this.$router.push({
          path: '/addressList'
        })
      },
      selectJuan() {
        if (this.yhjId) return;
        var query = {
          serviceId: this.serviceId,
          faceId: this.faceId,
          shopId: this.shopId
        };
        if (this.cardVal) {
          Object.assign(query, {
            cardVal: this.cardVal
          })
        }
        this.$router.replace({
          path: '/selectJuan',
          query
        })

      },
      selectYhj() {
        // 已选活动卡不能使用优惠券
        if (this.cardVal) return;

        var query = {
          serviceId: this.serviceId,
          faceId: this.faceId,
          shopId: this.shopId,
          yhjId: this.yhjId,
          money: this.money,
          num: this.num
        };
        if (this.yhjVal) {
          Object.assign(query, {
            yhjVal: this.yhjVal
          })
        }
        this.$router.replace({
          path: '/selectYhj',
          query
        })
      },
      get_yhj_info() {
        if (!this.yhjId) return;
        this.$axios.get('/Api/Yhq/get_yhq_content', {
          params: {
            yhq_id: this.yhjId,
            user_id: this.id
          }
        }).then(({
          data
        }) => {
          this.current_yhj = data;
        })
      },
      canuse_yhj() {
        console.log(this.num)
        console.log(this.fwInfo)
        console.log(this.fwInfo.money)
        console.log(this.num * this.fwInfo.money)
        this.$axios.get('/Api/Yhq/fw_user_yhq', {
          params: {
            user_id: this.id,
            fw_id: this.serviceId,
            shop_id: this.shopId,
            money: this.money,
            p: this.p,
            num: 999999,
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.yhj_list = data.list;
        })
      },

      currentCard() {
        var _this = this;
        if (this.cardVal) {
          console.log('list')
          console.log(this.card_list)
          for (let i = 0; i < this.card_list.length; i++) {
            if (this.card_list[i].bk_id == _this.cardVal) {
              console.log(this.card_list[i])
              return this.card_list[i]
            }
          }
        }

      }
    },
    watch: {
      num() {
        // 获取可用优惠券
        if (this.fwInfo) {
          this.canuse_yhj();
        }
      }
    },
    computed: {
      ...mapState(['if_moren_add', 'selected_add']),
      serviceId() {
        return this.$route.query.serviceId;
      },
      faceId() {
        return this.$route.query.faceId;
      },
      shopId() {
        return this.$route.query.shopId;
      },
      mrAdd() {
        return this.$route.query.mrAdd;
      },
      money() {
        return (this.num * this.fwInfo.money).toFixed(2);
      },
      cardVal() {
        return this.$route.query.cardVal;
      },
      yhjId() {
        return this.$route.query.yhjId;
      },
      pre_num() {
        return this.$route.query.num;
      },
      cardname() {
        if (this.$route.query.cardVal) {
          for (let i = 0; i < this.card_list.length; i++) {
            if (this.card_list[i].bk_id == this.$route.query.cardVal) {
              return this.card_list[i].card_name
            }
          }
        }
      },
      current_yhj_name() {
        if (this.current_yhj) {
          // 已选择优惠券
          return this.current_yhj.yh_name;
        } else {
          // 未选择优惠券
          if (this.yhj_list.length > 0) {
            // 有可用优惠券
            return '请选择优惠券'
          } else {
            // 无可用优惠券
            return '无可用优惠券'
          }
        }
      },
      has_add() {
        return this.add_status == 0 ? false : true;
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
      selectJuan,
      DateTime
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
          width: 100%;
        }

      }

      .fw_txt {
        flex: 1;
        font-size: .186667rem
          /* 14/75 */
        ;
        line-height: 0.48rem;
        color: #2b2b2b;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .fw_name {
          font-weight: bold;
          margin-bottom: 0.373333rem;
          font-size: .346667rem
            /* 26/75 */
          ;
        }

        .fw_content {
          min-width: 0;
          font-size: .32rem
            /* 24/75 */
          ;
          line-height: 1.4;
          height: .896rem
            /* 67.2/75 */
          ;
          opacity: 0.8;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .fw_price {
          font-size: .32rem
            /* 24/75 */
          ;
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
        height: .4rem
          /* 30/75 */
        ;
        background: url(~img/public/queren-bg.png);
      }

      .my-address {
        min-height: 4.266667rem
          /* 320/75 */
        ;
        background: #ffffff;
        display: flex;
        align-items: center;

        .my-add-box {
          padding: .266667rem
            /* 20/75 */
            0 .266667rem
            /* 20/75 */
            .4rem
            /* 30/75 */
          ;

          .title {
            display: flex;
            align-items: center;
            margin-bottom: .4rem
              /* 30/75 */
            ;

            .iconfont {
              width: .933333rem
                /* 70/75 */
              ;
              font-size: .6rem
                /* 45/75 */
              ;
            }

            font-size: .373333rem
            /* 28/75 */
            ;
          }

          .add-info {
            color: #4f4f4f;
            font-size: .346667rem
              /* 26/75 */
            ;
            line-height: 2;
            display: flex;
            align-items: center;
            padding-left: .933333rem
              /* 70/75 */
            ;

            .info-wrapper {
              word-wrap: break-word;
              overflow: hidden;
              flex: none;
              width: 7.466667rem
                /* 560/75 */
              ;

              .txt {
                float: left;
              }

              .car-info {
                font-size: .32rem
                  /* 24/75 */
                ;
                color: #5f5f5f;
              }
            }

            .icon-jinru {
              font-size: .56rem
                /* 42/75 */
              ;
              color: #000000;
              margin-left: .2rem
                /* 15/75 */
              ;
            }
          }
        }

        .no-add {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: .48rem
            /* 36/75 */
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
        padding-right: .6rem
          /* 45/75 */
        ;
        margin-bottom: .666667rem
          /* 50/75 */
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
          width: 8rem
            /* 600/75 */
          ;
          padding: .133333rem
            /* 10/75 */
            0 .133333rem
            /* 10/75 */
            .666667rem
            /* 50/75 */
          ;
          min-height: 1.786667rem
            /* 134/75 */
          ;
          background-image: url(~img/public/card-bg.png);
          background-position-y: .533333rem
            /* 40/75 */
          ;
          background-size: 5.533333rem
            /* 415/75 */
          ;
          background-repeat: no-repeat;
          background-color: #ffffff;
          box-shadow: 0 0 10px 4px rgba(#000000, .1);
          font-size: .32rem
            /* 24/75 */
          ;

          .card-info {
            width: 5.533333rem
              /* 415/75 */
            ;
            border-right: 1px dashed #7b7b7b;
            line-height: .64rem
              /* 48/75 */
            ;
            display: flex;

            .text {
              flex: none;
            }

            .fw-box {
              padding: 0 .266667rem
                /* 20/75 */
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
            padding: .4rem
              /* 30/75 */
              0;

            em {
              font-size: .64rem
                /* 48/75 */
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
            width: .533333rem
              /* 40/75 */
            ;
          }
        }
      }
    }
  }

</style>
