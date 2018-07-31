<template>
  <div class="page pingjia">
    <betterScroll>
      <div class="rater-box">
        <img :src="orderDetail.fw_img" alt="" class="thumb">
        <rater :val="star" @changeStar='changeStar' :enable='false'></rater>
      </div>
      <Group class="pingjia">
        <XTextarea v-model="content" placeholder='请对本次服务进行点评，分享您的体验心得' :height='240'></XTextarea>
      </Group>

      <uploadImage @uploadComplete='uploadComplete'></uploadImage>
    </betterScroll>
    <div class="btn-box">
      <span class="l-btn"></span>
      <span class="submit-btn" @click="submit">提交评价</span>
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
        system: 1,

        star: 0,
        content: "",
        tupian: "",

      };
    },
    created() {
      var _this = this;
      this.$eruda.init();
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
          star: this.star,
          content: this.content,
          order_id: this.orderId,
          img: this.tupian,
          fw_id: this.orderDetail.shop_fw_id
        }
        console.log(params)

        if (!this.content) {
          this.alertWarning('请填写评价！')
        } else {
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
        }


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
      }
    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style lang='scss'>
  .pingjia {
    padding-bottom: 1.333333rem;
    .rater-box {
      display: flex;
      align-items: center;
      padding: 0.266667rem 0.4rem; // border-bottom: 1px solid #f0f0f0;
      background: #ffffff;
      .thumb {
        width: 2.666667rem;
        height: 2.133333rem;
        margin-right: 0.666667rem;
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
        background: #de3232;
        color: #ffffff;
        width: 3.546667rem;
        @include font-dpr(14px);
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
  }

</style>
