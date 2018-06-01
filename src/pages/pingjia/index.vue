<template>
    <div>
        <rater :val="star" @changeStar='changeStar'></rater>
        <Group>
            <XTextarea v-model="content"></XTextarea>
        </Group>
        <div class="uploadImage">
            <div class="upload-btn" @click="chooseImg">点击添加<br/>图片</div>
            <img :src="imgs" alt="" class="thumb" v-if="system == 1">
            <img :src="localData" alt="" v-else class="thumb">
        </div>
        <XButton @click.native="submit">提交</XButton>
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
      system: 1,

      star: 1,
      content: "",
      tupian: "",
      localData: "",
      imgs: ""
    };
  },
  created() {
    this.checkSystem();
    this.$eruda.init();
    
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
                _this.$router.push({
                  path: "/me/orderList/6"
                });
              }
            });
          } else if (res.data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "评论失败了",
              onHide() {
                _this.$router.push({
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
    orderId() {
      return this.$route.params.orderId;
    }
  },
  mixins: [wxConfig, checkLogin]
};
</script>

<style lang='scss'>
.uploadImage {
  display: flex;
  .upload-btn {
    margin: 0 0.4rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px dashed #2a2a2a;
    border-radius: 0.133333rem;
  }
  .thumb {
    width: 2rem;
    height: 2rem;
    flex: none;
  }
}
</style>