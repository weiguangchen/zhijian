<template>
    <div class="shanghu-page">
        <ViewBox>
            <bigTitle title='项目管理'></bigTitle>
            <div class="form-box">
                <template v-if="step == 1">
                    <div class="form-group">
                        <h2 class="sub-title">服务名称</h2>
                        <Group>
                            <XInput v-model="fw_name"></XInput>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">简短名称:
                            <span class="tip">用于消费卷，邮件，短信，列表展示的显示</span>
                        </h2>
                        <Group>
                            <XInput v-model="fw_short_info"></XInput>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">服务介绍</h2>
                        <Group>
                            <XTextarea :max='50' v-model="fw_intr"></XTextarea>
                        </Group>
                    </div>
                </template>
                <template v-else-if="step == 2">
                    <!-- <div class="form-group">
                        <h2 class="sub-title">标签:</h2>
                        <Group>
                            <XInput v-model="pay_num"></XInput>
                        </Group>
                    </div> -->
                    <!-- <div class="form-group">
                        <h2 class="sub-title">城市:</h2>
                        <Group>
                            <XInput v-model="pay_num"></XInput>
                        </Group>
                    </div> -->
                    <div class="form-group">
                        <h2 class="sub-title">分类:</h2>
                        <Group>
                            <Selector :options='one_class' :value-map="['id','class_name']" v-model="one_class_val" @on-change='changeOneClass'></Selector>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">子分类列表:</h2>
                        <Group>
                            <Selector :options='two_class' :value-map="['id','fw_name']" v-model="two_class_val"></Selector>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">支持门店:</h2>
                        <Checker type='checkbox' v-model="face" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                            <CheckerItem :value='item.id' v-for="(item,index) in faceList" :key="index">{{item.face_name}}</CheckerItem>
                        </Checker>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">服务缩略图:</h2>
                        <div class="uploadImage">
                            <div class="upload-btn" @click="chooseImg">点击添加<br/>图片</div>
                            <img :src="imgs" alt="" class="thumb" v-if="system == 1">
                            <img :src="localData" alt="" v-else class="thumb">
                        </div>
                    </div>
                </template>
                <template v-else-if="step == 3">
                    <div class="form-group">
                        <h2 class="sub-title">有效期(天):</h2>
                        <Group>
                            <XInput v-model="youxiao" type='number'></XInput>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">原价(元):</h2>
                        <Group>
                            <XInput v-model="yuanjia" type='number'></XInput>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">现价(元):</h2>
                        <Group>
                            <XInput v-model="xianjia" type='number'></XInput>
                        </Group>
                    </div>
                    <div class="form-group">
                        <h2 class="sub-title">商户结算价(元):</h2>
                        <Group>
                            <XInput v-model="jiesuanjia" type='number'></XInput>
                        </Group>
                    </div>
                </template>
                <XButton type='warn' class="xbtn" @click.native="next1" v-if="step == 1">下一步</XButton>
                <XButton type='warn' class="xbtn" @click.native="next2" v-else-if="step == 2">下一步</XButton>
                <XButton type='warn' class="xbtn" @click.native="finish" v-else-if="step == 3">完成</XButton>
            </div>

        </ViewBox>
        <Confirm v-model="alertShow">
            {{modalInfo}}
        </Confirm>
    </div>
</template>

<script>
import {
  ViewBox,
  Selector,
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
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
import wxConfig from '@/mixins/wxConfig.js';
export default {
  data() {
    return {
      alertShow: false,
      modalInfo: "",

      keyboardShow: false,
      step: 1,
      imgs: "",
      localData: "",
      system: 1,
      one_class: [],
      two_class_all: [],
      two_class: [],
      faceList: [],
      // 第一步
      fw_name: "",
      fw_short_info: "",
      fw_intr: "",
      // 第二步
      one_class_val: "",
      two_class_val: "",
      face: [],
      tupian: "",
      //   第三部
      youxiao: "",
      yuanjia: "",
      xianjia: "",
      jiesuanjia: ""
    };
  },
  created() {
    var _this = this;
    this.checkSystem();
    // this.$eruda.init();

    this.$axios
      .get(_this.API_URL + "/api/ShopFw/shop_fw", {
        params: { shop_id: 1 }
      })
      .then(res => {
        console.log(res);
        _this.faceList = res.data.face;
        _this.one_class = res.data.fw_class;
        _this.two_class_all = res.data.fw;
      });
    
  },
  methods: {
    next1() {
      if (!this.fw_name) {
        this.alertShow = true;
        this.modalInfo = "请填写服务名称";
        return false;
      } else if (!this.fw_short_info) {
        this.alertShow = true;
        this.modalInfo = "请填写简短名称";
        return false;
      } else if (!this.fw_intr) {
        this.alertShow = true;
        this.modalInfo = "请填写服务介绍";
        return false;
      }
      this.step = 2;
    },
    next2() {
      if (!this.one_class_val) {
        this.alertShow = true;
        this.modalInfo = "请选择分类";
        return false;
      } else if (!this.two_class_val) {
        this.alertShow = true;
        this.modalInfo = "请选择子分类";
        return false;
      } else if (this.face.length <= 0) {
        this.alertShow = true;
        this.modalInfo = "请请选择支持的门店";
        return false;
      } else if (!this.tupian) {
        this.alertShow = true;
        this.modalInfo = "请上传服务缩略图";
        return false;
      }
      this.step = 3;
    },
    finish() {
      var _this = this;
      if (!this.youxiao || Number.isInteger(this.youxiao)) {
        this.alertShow = true;
        this.modalInfo = "请填写正确有效期";
        return false;
      } else if (!this.yuanjia || Number.isInteger(this.yuanjia)) {
        this.alertShow = true;
        this.modalInfo = "请填写原价";
        return false;
      } else if (!this.xianjia || Number.isInteger(this.xianjia)) {
        this.alertShow = true;
        this.modalInfo = "请填写现价";
        return false;
      } else if (!this.jiesuanjia || Number.isInteger(this.jiesuanjia)) {
        this.alertShow = true;
        this.modalInfo = "请填写结算价";
        return false;
      }
      this.$axios
        .get("/api/api/ShopFw/add_shop_fw", {
          params: {
            fw_mingzi: this.fw_name,
            sub_name: this.fw_short_info,
            sub_count: this.fw_intr,
            fw_cid: this.one_class_val,
            fw_id: this.two_class_val,
            fw_face: this.face,
            fw_img: this.tupian,
            use_day: this.youxiao,
            y_money: this.yuanjia,
            money: this.xianjia,
            j_money: this.jiesuanjia,
            shop_id: 1
          }
        })
        .then(res => {
          //   成功返回1不成功返回0
          console.log(res);
          if (res.data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "上传服务成功，请等待审核",
              onHide() {
                _this.$router.push({
                  path: "/shanghu/me"
                });
              }
            });
          } else if (res.data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "上传服务失败，请重新上传",
              onHide() {
                _this.$router.push({
                  path: "/shanghu/me/xmgl"
                });
              }
            });
          }
        });
    },
    changeOneClass(val) {
      console.log(val);
      this.two_class = this.two_class_all.filter(item => {
        return item.fid == val;
      });
      console.log(this.one_class);
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
    }
  },
  components: {
    bigTitle,
    ViewBox,
    Selector,
    Group,
    shanghuSelect,
    shanghuInput,
    XButton,
    XInput,
    Confirm,
    Checker,
    CheckerItem,
    XTextarea,
    KeyBoard
  },
  mixins: [wxConfig]
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