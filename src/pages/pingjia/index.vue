<template>
  <div class="page pingjia">
    <betterScroll>
      <div class="rater-box">
        <img :src="orderDetail.fw_img" alt="" class="thumb">
        <div class="star-wrapper">
          <div class="star-box">
            <span class="tit">服务态度</span>
            <rater v-model="star1" :enable='false'></rater>
          </div>
          <div class="star-box">
            <span class="tit">服务速度</span>
            <rater v-model="star2" :enable='false'></rater>
          </div>
          <div class="star-box">
            <span class="tit">服务质量</span>
            <rater v-model="star3" :enable='false'></rater>
          </div>
        </div>
      </div>
      <Group class="pingjia">
        <XTextarea v-model="content" placeholder='请对本次服务进行点评，分享您的体验心得' :height='140'></XTextarea>
        <uploadImage @uploadComplete='uploadComplete'></uploadImage>
      </Group>
      <div class="shangpu">
        <h1 class="title">
          <i class="iconfont icon-dianpu"></i>选车好听汽车维修保养生活馆</h1>
        <div class="sp-star">
          <span class="tit">卖家服务</span>
          <rater v-model="star4" :enable='false'></rater>
        </div>
      </div>
    </betterScroll>
    <div class="btn-box">
      <span class="l-btn"></span>
      <XButton type='warn' :disabled='submiting' class="submit-btn" @click.native="submit">提交评价</XButton>
    </div>
  </div>
</template>

<script>
  import {
    XInput,
    XTextarea,
    XButton,
    Group
  } from "vux";
  import rater from "@/components/star/index";

  import checkLogin from "@/mixins/checkLogin.js";
  import wxConfig from "@/mixins/wxConfig.js";
  import uploadImage from '@/components/uploadImg/index';
  import setTitle from '@/mixins/setTitle.js'
  import betterScroll from '@/components/betterScroll';
  export default {
    data() {
      return {
        orderDetail: {},
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        content: "",
        tupian: "",

      };
    },
    created() {
      var _this = this;
      // this.$eruda.init();
      if (this.type == 1) {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/order_content1", {
            params: {
              order_num: _this.orderId
            }
          })
          .then(res => {
            console.log(res);
            _this.orderDetail = res.data[0];
          });
      } else if (this.type == 0) {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/order_content", {
            params: {
              order_num: _this.orderId
            }
          })
          .then(res => {
            console.log(res);
            _this.orderDetail = res.data[0];
          });
      }
    },
    methods: {
      submit() {
        var _this = this;
        var params = {
          uid: this.id,
          u_name: this.userinfo.nickname,
          td_star: this.star1,
          sd_star:this.star2,
          zl_star:this.star3,
          star:this.star4,
          content: this.content,
          order_id: this.orderId,
          img: this.tupian,
          fw_id: this.orderDetail.fw_id,
          zf: this.type /*1用卡支付0用钱支付*/
        }
        console.log(params)

        this.$axios
          .get(this.API_URL + "/Api/UserShow/token", {
            params
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$vux.alert.show({
                title: "提示",
                content: "谢谢评论",
                onHide() {
                  _this.$router.replace({
                    path: "/me/orderList/6"
                  });
                }
              });
            } else if (res.data.status == 0) {
              this.$vux.alert.show({
                title: "提示",
                content: "评论失败了",
                onHide() {
                  _this.$router.replace({
                    path: "/me/orderList/6"
                  });
                }
              });
            }
            console.log(res);
          });


      },
      changeStar(v) {
        console.log("星星" + v);
        this.star = v;
      },
      uploadComplete(imgs) {
        this.tupian = imgs;
      },
      alertWarning(text) {
        this.$vux.alert.show({
          title: '提示',
          content: text
        })
      }
    },
    components: {
      XInput,
      rater,
      XButton,
      XTextarea,
      Group,
      uploadImage,
      betterScroll
    },
    computed: {
      orderId() {
        return this.$route.params.orderNum;
      },
      type() {
        return this.$route.query.type;
      },
      submiting() {
        var submiting = this.star1 > 0 && this.star2 > 0 && this.star3 > 0 && this.star4 > 0 ? false : true;
        console.log(submiting)
        return submiting
      }
    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style lang='scss'>
  .pingjia {
    margin-bottom: $bot;
    .rater-box {
      display: flex;
      padding: 0.266667rem 0.4rem; // border-bottom: 1px solid #f0f0f0;
      background: #ffffff;
      .thumb {
        width: 2.666667rem;
        height: 2.133333rem;
        margin-right: 0.666667rem;
      }
      .star-wrapper {
        flex: 1;
        padding-top: .266667rem/* 20/75 */
        ;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .star-box {
          display: flex;
          align-items: center;
          .tit {
            font-size: .32rem/* 24/75 */
            ;
            margin-right: .373333rem/* 28/75 */
            ;
          }
        }
      }
    }
    .weui-cells {
      margin-top: 0;
    }
    .btn-box {
      position: fixed;
      display: flex;
      height: 1.333333rem;
      left: 0;
      bottom: 0;
      width: 100%;
      .l-btn {
        flex: 1;
        background: #ffffff;
      }
      .submit-btn {
        flex: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        width: 3.546667rem;
        font-size: .373333rem/* 28/75 */
        ;
      }

    }
    .uploadImage {
      padding: 0.4rem;
      background: #ffffff;
      display: flex;
      .upload-btn {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        background: #ececec;
        .img {
          width: 0.853333rem;
        }
      }
      .thumb {
        width: 2rem;
        height: 2rem;
        flex: none;
      }
    }
    .shangpu {
      .title {
        border-bottom: 1px solid #f0f0f0;
        font-weight: normal;
        background: #ffffff;
        padding-left: .4rem/* 30/75 */
        ;
        height: .866667rem/* 65/75 */
        ;
        display: flex;
        align-items: center;
        font-size: .32rem/* 24/75 */
        ;
        .iconfont {
          font-size: .346667rem/* 26/75 */
          ;
          color: #939393;
          margin-right: .186667rem/* 14/75 */
          ;
        }
      }
      .sp-star {
        height: 1.253333rem/* 94/75 */
        ;
        display: flex;
        align-items: center;
        font-size: .373333rem/* 28/75 */
        ;
        background: #ffffff;
        padding-left: .4rem/* 30/75 */
        ;
        .tit {
          margin-right: .6rem/* 45/75 */
          ;
        }
      }
    }
  }

</style>
