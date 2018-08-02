<template>
  <div>
    <ViewBox class="shanghu-page">
      <bigTitle title='申请成为商户'></bigTitle>
      <div class="form-box">
        <template v-if="step == 1">
          <div class="form-group">
            <h2 class="sub-title">店铺名称</h2>
            <Group class="reset-vux-input">
              <XInput v-model="shop_name"></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">联系电话</h2>
            <Group class="reset-vux-input">
              <XInput v-model="shop_phone"></XInput>
            </Group>
          </div>
        </template>
        <template v-else-if="step == 2">
          <div class="form-group">
            <h2 class="sub-title">营业执照</h2>
            <div class="uploadImage">
              <div class="upload-btn" @click="chooseImg">点击添加<br/>图片</div>
              <!-- 安卓预览图片 -->
              <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1">
              <!-- IOS预览图片 -->
              <img :src="localData || tupian" alt="" v-else class="thumb">

            </div>
          </div>
        </template>
        <template v-else-if="step == 3">
          <div class="form-group">
            <h2 class="sub-title">商铺地址</h2>
            <Group class="reset-vux-input">
              <XInput v-model="map.poiaddress" @on-focus='mapShow = true'></XInput>
            </Group>
          </div>
        </template>
        <XButton type='warn' class="xbtn" @click.native="next1" v-if="step == 1">下一步</XButton>
        <XButton type='warn' class="xbtn" @click.native="next2" v-else-if="step == 2">下一步</XButton>
        <XButton type='warn' class="xbtn" @click.native="finish" v-else-if="step == 3">提交</XButton>
      </div>
      <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap>
    </ViewBox>

  </div>
</template>

<script>
import myMap from "@/components/map/index";
import {
  ViewBox,
  Group,
  XButton,
  XInput,
  Confirm,
  Checker,
  CheckerItem,
  XTextarea
} from "vux";
import { KeyBoard } from "vue-ydui/dist/lib.px/keyboard";
import bigTitle from "@/components/bigTitle/index";
import wxConfig from "@/mixins/wxConfig.js";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      alertShow: false,
      modalInfo: "",
      mapShow: false,

      step: 1,
      imgs: "",
      localData: "",
      system: 1,

      // 第一步
      shop_name: "",
      shop_phone: "",

      // 第二步
      tupian: "",
      //   第三部
      map: ""
    };
  },
  created() {
    document.title = "申请商户";
    var _this = this;
    // this.$eruda.init();

    this.checkSystem();
  },
  methods: {
    next1() {
      if (!this.shop_name) {
        this.$vux.alert.show({
          title: "提示",
          content: "请填写商铺名称!"
        });
        return false;
      } else if (!this.shop_phone) {
        this.$vux.alert.show({
          title: "提示",
          content: "请填写商铺联系电话!"
        });
        return false;
      }
      this.step = 2;
    },
    next2() {
      // if (!this.tupian) {
      //   this.$vux.alert.show({
      //     title: "提示",
      //     content: "请上传营业执照!"
      //   });
      //   return false;
      // }

      this.step = 3;
    },
    finish() {
      var _this = this;

      this.$axios
        .get( "/api/UserShow/add_shop", {
          params: {
            shop_name: this.shop_name,
            zj_img: this.tupian,
            jd: this.map.lat,
            wd: this.map.lng,
            adress:this.map.poiaddress,
            shop_phone: this.shop_phone,
            user_id: this.id
          }
        })
        .then(res => {
          //   成功返回1不成功返回0
          console.log(res);
          console.log(this.$router);
          if (res.data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "申请商户成功，请等待审核!",
              onHide() {
                _this.$router.replace({
                  path: "/me"
                });
              }
            });
          } else if (res.data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "申请失败，请重试!",
              onHide() {
                _this.$router.replace({
                  path: "/me"
                });
              }
            });
          }
        });
    },
    finishAdd(val) {
      this.mapShow = false;
      this.map = val;
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
          var serverId = res.serverId; // 返回图片的服务器端ID
          _this.$axios
            .get( "/api/wechat/bcimg", {
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
    }
  },
  computed: {},
  components: {
    bigTitle,
    ViewBox,
    Group,
    XButton,
    XInput,
    Confirm,
    Checker,
    CheckerItem,
    XTextarea,
    KeyBoard,
    myMap
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
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