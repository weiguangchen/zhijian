<template>
  <betterScroll>
    <bigTitle title="订单详情" @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="order-detail ">
      <div class="order-wrapper">
        <div class="order-num">
          <div>订单号：{{detail.order_num}}</div>
          <div>下单时间：{{detail.date}}</div>
        </div>
        <div class="order-info">
          <div class="line">
            <span class="title">服务名称：</span>
            <span class="content">{{detail.fw_mingzi}}</span>
          </div>
          <div class="line">
            <span class="title">下单用户：</span>
            <span class="content">{{detail.xingming}}</span>
          </div>
          <div class="line">
            <span class="title">联系方式：</span>
            <span class="content">{{detail.phone}}</span>
          </div>
          <div class="line">
            <span class="title">地址：</span>
            <span class="content">{{detail.three}} {{detail.adress}}</span>
          </div>
          <div class="line">
            <span class="title">交易数量：</span>
            <span class="content">{{detail.shop_num}}</span>
          </div>
          <div class="line" >
            <span class="title">交易金额：</span>
            <span class="content" v-if="detail.order_price">{{detail.order_price}}</span>
            <span class="content" v-else>其他支付方式</span>
          </div>
          <div class="line">
            <span class="title">支持门店：</span>
            <span class="content">十一经路</span>
          </div>
          <div class="line">
            <span class="title">车辆牌照：</span>
            <span class="content">{{detail.car_card}}</span>
          </div>
          <div class="line">
            <span class="title">车辆颜色：</span>
            <span class="content">{{detail.car_color}}</span>
          </div>
          <div class="line">
            <span class="title">车型：</span>
            <span class="content">{{detail.car_xing}}</span>
          </div>
        </div>
      </div>
      <!-- paidan_status为  1未派单   2已派单   3已接单     4已完成     5申请退单 -->
      <div class="paidan-status">
        <div v-if="detail.paidan_status == 1" class="paidan">
          <h2>派单</h2>
          <Group class="reset-vux-input select">
            <Selector title='1' :options='son' :value-map="['phone','sub_name']" placeholder='选择要派发的账户' v-model="pf_phone"></Selector>
          </Group>
          <XButton type='warn' @click.native="paidan">确定</XButton>
        </div>
        <div v-else-if="detail.paidan_status == 2" class="paidan1">
          <h2>派单</h2>
          <div class="info">
            <img src="~img/me/gou.png" alt="" class="img">
            <div class="text">
              <div>已派单：{{detail.fw_user}}</div>
              <div>派单时间：{{detail.paidan_time}}</div>
            </div>
          </div>
          <XButton type='warn' @click.native="rePaidan">重新派单</XButton>
        </div>
        <div v-else-if="detail.paidan_status == 3" class="paidan1">
          <h2>派单</h2>
          <div class="info">
            <img src="~img/me/gou.png" alt="" class="img">
            <div class="text">
              <div>已派单：{{detail.fw_user}}</div>
              <div>接单时间：{{detail.jiedan_time}}</div>
            </div>
          </div>
          <XButton :disabled='true'>服务中...</XButton>
        </div>
        <div v-else-if="detail.paidan_status == 4" class="paidan1">
          <h2>派单</h2>
          <div class="info">
            <img src="~img/me/gou.png" alt="" class="img">
            <div class="text">
              <div>已派单：{{detail.fw_user}}</div>
              <div>完成时间：{{detail.sdate}}</div>
            </div>
          </div>
          <h2>上传服务照片</h2>
          <h3>服务前照片</h3>
          <div class="img-boxs">
            <img :src="item" alt="" v-for="(item,index) in detail.q_img" :key="index" class="fw-img" @click="previewImg(item,detail.q_img)">
          </div>
          <h3>服务后照片</h3>
          <div class="img-boxs">
            <img :src="item" alt="" v-for="(item,index) in detail.h_img" :key="index" class="fw-img" @click="previewImg(item,detail.h_img)">
          </div>
          <XButton type='warn'>已完成</XButton>
        </div>
        <div v-else-if="detail.paidan_status == 5" class="tuidan">
          <h2>退单中</h2>
          <div class="info">
            <h3>该订单由{{detail.fw_user}}发起退单申请，申请理由：</h3>
            <div>{{detail.tui[0].tui_liyou}}</div>
            <div>退单时间：{{detail.tui[0].tui_time}}</div>
          </div>
          <XButton type='warn' @click.native="agree_tui">同意退单</XButton>
        </div>
      </div>
    </div>

  </betterScroll>
</template>

<script>
  import betterScroll from '@/components/betterScroll/index';
  import {
    Selector,
    XButton,
    Group
  } from 'vux';
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        son: [],
        detail: {},
        pf_phone: ''
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_detail();
      this.get_son();
      
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      get_son() {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/get_son", {
            params: {
              shop_id: this.userinfo.shop[0].id
            }
          })
          .then(res => {
            console.log(res);
            this.son = res.data;
          });
      },
      get_detail() {
        this.$axios
          .get(this.API_URL + "/Api/Order/get_order_content", {
            params: {
              id: this.orderId,
              zf: this.zf
            }
          })
          .then(res => {
            console.log(res);
            this.detail = res.data;
          });
      },
      paidan() {
        var _this = this;
        this.$axios.get(this.API_URL + '/Api/Order/pf_order', {
          params: {
            zf: this.zf,
            phone: this.pf_phone,
            id: this.detail.id
          }
        }).then(({
          data
        }) => {
          if (data.status == 1) {
            this.alertShow(data.log);
          } else {
            this.alertShow(data.log);
          }

        })
      },
      rePaidan() {
        this.$axios.get(this.API_URL + '/Api/Order/new_order', {
          params: {
            zf: this.zf,
            phone: this.detail.fw_user_phone,
            id: this.detail.id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            this.alertShow(data.log);
          } else {
            this.alertShow(data.log);
          }

        })
      },
      agree_tui() {
        var _this = this;
        this.$axios.get(this.API_URL + '/Api/order/ty_tui', {
          params: {
            zf: this.zf,
            order_id: this.orderId,
            id: this.detail.tui[0].id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.$vux.alert.show({
            title: '提示',
            content: '同意退单成功！',
            onHide() {
              _this.$router.push({
                path: '/shanghu/jingying/orderGl'
              })
              this.get_detail();
            }
          })
        })
      },
      alertShow(text) {
        var _this = this;
        this.$vux.alert.show({
          title: '提示',
          content: text,
          onHide() {
            _this.get_detail();
          }
        })
      },
      previewImg(curimg,allimg) {
        this.$wx.previewImage({
          current: curimg, // 当前显示图片的http链接
          urls: allimg // 需要预览的图片http链接列表
        });
      }
    },
    computed: {
      orderId() {
        return this.$route.query.id;
      },
      zf() {
        return this.$route.query.zf;
      }
    },
    components: {
      bigTitle,
      Selector,
      XButton,
      Group,
      betterScroll
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-detail {
    height: 100%;
    background: #f0f0f0;
    .order-wrapper {
      margin-bottom: $bot;
      background: #ffffff;
      padding-left: .533333rem/* 40/75 */
      ;
      padding-bottom: .4rem/* 30/75 */
      ;
      .order-num {
        line-height: .853333rem/* 64/75 */
        ;
        font-size: .373333rem/* 28/75 */
        ;
        border-bottom: 1px solid #f0f0f0;
      }
      .order-info {
        font-size: .32rem/* 24/75 */
        ;
        line-height: 2;
        .line {
          padding-right: .4rem/* 30/75 */
          ;
          display: flex;
          .title {
            flex: auto;
          }
          .content {
            flex: none;
            width: 7.333333rem/* 550/75 */
            ;
            ;
          }
        }

      }
    }
    .paidan-status {
      padding: .533333rem/* 40/75 */
      ;
      background: #ffffff;
      h2 {
        font-size: .48rem/* 36/75 */
        ;
        font-weight: bold;
        margin-bottom: .48rem/* 36/75 */
        ;
      }
      .select {
        margin-bottom: .8rem/* 60/75 */
        ;
      }
      .vux-selector {
        .weui-cell__hd {
          visibility: hidden;
          width: 1px;
        }
      }
      .weui-btn {
        border-radius: 0;
        &::after {
          border-radius: 0;
        }
      }
      .paidan1 {
        .info {
          display: flex;
          align-items: center;
          margin-bottom: .666667rem/* 50/75 */
          ;
          .img {
            flex: none;
            width: .666667rem/* 50/75 */
            ;
          }
          .text {
            padding: 0 .666667rem/* 50/75 */
            ;
            font-size: .373333rem/* 28/75 */
            ;
            line-height: 2;
          }
        }
        h3 {
          font-size: .426667rem/* 32/75 */
          ;
          line-height: 2;
          margin-bottom: .266667rem/* 20/75 */
          ;
        }
        .img-boxs {
          .fw-img {
            float: left;
            width: 1.533333rem/* 115/75 */
            ;
            height: 1.533333rem/* 115/75 */
            ;
            margin-bottom: .4rem/* 30/75 */
            ;
          }
          &:after {
            content: '';
            display: block;
            clear: both;
          }
        }
      }
      .tuidan {
        font-size: .373333rem/* 28/75 */
        ;
        line-height: 2;
        .info {
          margin-bottom: .266667rem/* 20/75 */
          ;
        }
      }
    }
  }

</style>
