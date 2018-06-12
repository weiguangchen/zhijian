<template>
  <div class="page">
    <div class="pingjia">
      <div class="rater-box">
        <img :src="orderDetail.fw_img" alt="" class="thumb">
        <rater :val="star" @changeStar='changeStar' :enable='false'></rater>
      </div>
      <Group class="pingjia">
        <XTextarea v-model="content" placeholder='请对本次服务进行点评，分享您的体验心得' :height='240'></XTextarea>
      </Group>
      <div class="uploadImage">
        <div class="upload-btn" @click="chooseImg">
          <img src="~img/public/uploadImgBtn.png" alt="" class="img">
        </div>
        <template v-if="imgs">
          <img :src="imgs" alt="" class="thumb" v-if="system == 1">
          <img :src="localData" alt="" v-else class="thumb">
        </template>

      </div>
      <div class="btn-box">
        <span class="l-btn"></span>
        <span class="submit-btn" @click="submit">提交评价</span>
      </div>
    </div>

  </div>
</template>

<script>
import { XInput, XTextarea, XButton, Group } from "vux";
import rater from "@/components/star/index";

import checkLogin from "@/mixins/checkLogin.js";
import wxConfig from "@/mixins/wxConfig.js";
export default {
  data() {
    return {
      orderDetail: {},
      system: 1,

      star: 0,
      content: "",
      tupian: "",
      localData: "",
      imgs: ""
    };
  },
  created() {
    document.title = "评价";
    var _this = this;
    this.checkSystem();
    // this.$eruda.init();
    this.$axios
      .get(this.API_URL + "/Api/UserShow/order_content", {
        params: {
          order_num: _this.order_num
        }
      })
      .then(res => {
        console.log(res);
        _this.orderDetail = res.data[0];
      });
  },
  methods: {
    submit() {
      var _this = this;
      console.log(this.star);
      console.log(this.content);
      console.log(this.userinfo.nickname);
      console.log(this.orderId);
      console.log(this.tupian);
      this.$axios
        .get(this.API_URL + "/Api/UserShow/token", {
          params: {
            uid: _this.id,
            u_name: _this.userinfo.nickname,
            star: _this.star,
            content: _this.content,
            order_id: _this.orderId,
            img: _this.tupian
          }
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
    chooseImg() {
      var _this = this;
      this.$wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          _this.imgs = res.localIds;
          if (_this.system == 1) {
            _this.uploadImg();
            return false;
            // 安卓
          } else if (_this.system == 2) {
            _this.$wx.getLocalImgData({
              localId: res.localIds[0], // 图片的localID
              success: function(res) {
                _this.localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                _this.uploadImg();
                return false;
              }
            });
          }
        }
      });
    },
    uploadImg() {
      var _this = this;
      this.$wx.uploadImage({
        localId: _this.imgs[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          console.log("上传返回值");
          console.log(res);
          var serverId = res.serverId; // 返回图片的服务器端ID
          _this.$axios
            .get("/api/api/wechat/bcimg", {
              params: {
                imgs: res.serverId
              }
            })
            .then(res => {
              console.log(res);
              _this.tupian = res.data;
            });
        }
      });
    },
    checkSystem() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        this.system = 1;
      } else if (isiOS) {
        this.system = 2;
      }
      console.log("系统：" + this.system);
    }
  },
  components: {
    XInput,
    rater,
    XButton,
    XTextarea,
    Group
  },
  computed: {
    order_num() {
      return this.$route.params.orderNum;
    }
  },
  mixins: [wxConfig, checkLogin]
};
</script>

<style lang='scss'>
.pingjia {
  .rater-box {
    display: flex;
    align-items: center;
    padding: 0.266667rem 0.4rem;
    // border-bottom: 1px solid #f0f0f0;
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