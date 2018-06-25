<template>
  <div class="add-jms">
    <div class="form-box dl">
      <span class="title">代理商</span>
      <span class="form-text">
        {{userinfo.dl[0].xingming}}&nbsp;&nbsp;{{userinfo.uphone}}&nbsp;&nbsp;
        <span v-if='userinfo.dl[0].dl_jb == 1'>股东代理</span>
        <span v-else-if='userinfo.dl[0].dl_jb == 2'>市级代理</span>
        <span v-else-if='userinfo.dl[0].dl_jb == 3'>区级代理</span>
      </span>
    </div>

    <div class="form-group">
      <div class="form-box">
        <span class="title">加盟商名称</span>
        <span>
          <XInput placeholder='请输入加盟商名称' v-model="jms_name"></XInput>
        </span>
      </div>
      <div class="form-box">
        <span class="title">联系人</span>
        <span>
          <XInput placeholder='请输入联系人姓名' v-model="name"></XInput>
        </span>
      </div>
      <div class="form-box">
        <span class="title">联系电话</span>
        <span>
          <XInput placeholder='请输入联系人电话号码' v-model="phone"></XInput>
        </span>
      </div>
    </div>
    <Group class="classifiy">
      <div>类别</div>
      <CheckBoxGroup v-model="fw_class">
        <CheckBox shape="circle" :val='item.id' v-for="(item,index) in fw_class_all" :key="index">{{item.class_name}}</CheckBox>
      </CheckBoxGroup>
    </Group>

    <Group>
      <!-- <XAddress title='地区' :list='city' v-model="cityVal"></XAddress> -->
      <Cell title='加盟城市' v-model="cityAreaKey"></Cell>
      <Cell title='加盟区域' v-model="qyAreaKey"></Cell>
      <!-- <Selector :options='sqList' title='加盟社区' :value-map="['id','sq_name']" direction='rtl' @on-change='changeQy' v-model='sqAreaVal'></Selector> -->
    </Group>
    <Group>
      <XTextarea title='详细地址' v-model="address"></XTextarea>
    </Group>
    <Group>
      <XInput v-model="map.poiaddress" @on-focus='mapShow = true' title='选择地址'></XInput>
    </Group>
    <div class="upload">
      <h2 class="sub-title">营业执照:</h2>
      <div class="uploadImage">
        <div class="upload-btn" @click="chooseImg">
          <i class="iconfont icon-xiangji" v-if="!imgs && !localData"></i>
          <template v-else>
            <!-- 安卓预览图片 -->
            <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1">
            <!-- IOS预览图片 -->
            <img :src="localData || tupian" alt="" v-else class="thumb">
          </template>
        </div>
      </div>
    </div>
    <div class="agree">
      <!-- <CheckBoxGroup color='#e03233'> -->
      <CheckBox shape="circle" v-model="agree">同意指尖到位协议</CheckBox>
      <!-- </CheckBoxGroup> -->
    </div>
    <XButton type='warn' @click.native='submit' :disabled='submiting'>提交</XButton>
    <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap>
  </div>
</template>

<script>
import myMap from "@/components/map/index";
import {
  XInput,
  XTextarea,
  Group,
  XAddress,
  XButton,
  Cell,
  Selector
} from "vux";
import { CheckBox, CheckBoxGroup } from "vue-ydui/dist/lib.px/checkbox";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      submiting: false,
      mapShow: false,
      city: [],
      fw_class_all: [],
      system: 1,
      imgs: "",
      localData: "",
      sqList: [],

      jms_name: "",
      name: "",
      phone: "",
      fw_class: [],
      cityAreaKey: "",
      cityAreaVal: "",
      qyAreaKey: "",
      qyAreaVal: "",
      sqAreaVal: 0,
      // cityVal: [],
      address: "",
      map: {},
      tupian: "",
      agree: false
    };
  },
  created() {
    this.checkSystem();
    this.$eruda.init();
    var _this = this;
    // 获取城市信息
    this.$axios.get(this.API_URL + "/Api/UserShow/city").then(({ data }) => {
      console.log(data);
      // 获取城市信息
      data.map(m => {
        if (m.id == this.userinfo.dl[0].city_id) {
          this.cityAreaKey = m.city;
          this.cityAreaVal = m.id;
          if (m.qy) {
            m.qy.map(q => {
              if (q.id == this.userinfo.dl[0].qy_id) {
                this.qyAreaKey = q.qy_name;
                this.qyAreaVal = q.id;
                if (q.sq) {
                  this.sqList = q.sq;
                }
              }
            });
          }
        }
      });

      // 获取社区列表
    });

    this.$axios
      .get(this.API_URL + "/Api/ShopFw/fw_shop_class")
      .then(({ data }) => {
        console.log(data);
        this.fw_class_all = data;
      });
  },
  methods: {
    submit() {
      var _this = this;
      this.submiting = true;
      this.formValidata().then(
        res => {
          var params = {
            shop_name: this.jms_name,
            xingming: this.name,
            shop_phone: this.phone,
            fw_class: this.fw_class,
            city: this.cityAreaVal,
            qy: this.qyAreaVal,
            sq: this.sqAreaVal,
            adress: this.address,
            jd: this.map.latlng.lat,
            wd: this.map.latlng.lng,
            zj_img: this.tupian,
            dl_id: this.userinfo.dl[0].id
          };

          console.log(params);
          this.$axios
            .get(this.API_URL + "/Api/ShopFw/add_fw_shop", {
              params
            })
            .then(({ data }) => {
              console.log(data);
              if (data.status == 1) {
                _this.$vux.alert.show({
                  title: "提示",
                  content: "添加成功！",
                  onHide() {
                    _this.$router.replace({
                      path: "/agent"
                    });
                  }
                });
              } else {
                _this.$vux.alert.show({
                  title: "提示",
                  content: "添加失败！",
                  onHide() {
                    _this.$router.replace({
                      path: "/agent"
                    });
                  }
                });
              }
            });
        },
        err => {
          this.submiting = false;
        }
      );
    },
    formValidata() {
      var _this = this;
      return new Promise((resolve, reject) => {
        if (!this.jms_name) {
          _this.alertWarning("请输入加盟商名称！");
          reject();
        } else if (!this.name) {
          _this.alertWarning("请输入联系人名称！");
          rejcet();
        } else if (
          !this.phone ||
          !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
            this.phone
          )
        ) {
          _this.alertWarning("请输入正确联系电话！");
          rejcet();
        } else if (this.fw_class.length <= 0) {
          _this.alertWarning("请选择类别！");
          rejcet();
        } else if (!this.address) {
          _this.alertWarning("请填写详细地址！");
          rejcet();
        } else if (!this.map) {
          _this.alertWarning("请选择地址！");
          rejcet();
        } else if (!this.agree) {
          _this.alertWarning("请同意协议！");
          rejcet();
        } else {
          resolve();
        }
        // else if (!this.tupian) {
        //   _this.alertWarning("请上传营业执照！");
        //   rejcet();
        // }
      });
      // else if (!this.sqAreaVal) {
      //   _this.alertWarning("请选择代理社区！");
      //   rejcet();
      // }
    },
    alertWarning(text) {
      this.$vux.alert.show({
        title: "提示",
        content: text
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
            .get(_this.API_URL + "/api/wechat/bcimg", {
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
    finishAdd(val) {
      this.mapShow = false;
      this.map = val;
      console.log(val);
    },
    changeQy() {}
  },
  computed: {
    cityValue() {
      var city = [];
      city[0] = this.cityAreaVal;
      city[1] = this.qyAreaVal;
      city[2] = this.sqAreaVal;
      return city;
    },
    qyValue() {
      return this.cityVal[1].split("-")[1];
    },
    sqValue() {
      return this.cityVal[2].split("-")[2];
    }
  },
  components: {
    XInput,
    XTextarea,
    XAddress,
    Group,
    XButton,
    CheckBoxGroup,
    CheckBox,
    myMap,
    Selector,
    Cell
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.add-jms {
  background: #ffffff !important;
  padding: 0.853333rem 0.373333rem;
  box-sizing: border-box;
  .dl {
    margin-bottom: 0.506667rem;
  }
  .form-box {
    height: 1.066667rem;
    padding: 0.133333rem 0;
    border-radius: 0.133333rem;
    background: #f9f9f9;
    width: 100%;
    border: 1px solid #c6c6c6;
    display: flex;
    @include font-dpr(14px);
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.6rem;
      flex: none;
      border-right: 1px solid #c6c6c6;
    }
    .form-text {
      padding-left: 15px;
      flex: 1;
      display: flex;
      align-items: center;
      color: #686868;
    }
  }
  .classifiy {
    margin: 0.4rem 0;
  }
  .form-group {
    .form-box {
      background: #ffffff;
      border-radius: unset;
      &:not(:last-child) {
        border-bottom: none;
      }
      &:first-child {
        border-radius: 0.133333rem 0.133333rem 0 0;
      }
      &:last-child {
        border-radius: 0 0 0.133333rem 0.133333rem;
      }
    }
  }
  .upload {
    margin: 0.533333rem 0 1.333333rem 0;
    .sub-title {
      @include font-dpr(16px);
      margin-bottom: 0.266667rem;
    }
    .uploadImage {
      display: flex;
      justify-content: center;
      .upload-btn {
        flex: none;
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
      .icon-xiangji {
        color: #918b8b;
        @include font-dpr(30px);
      }
      .thumb {
        width: 2rem;
        height: 2rem;
        flex: none;
      }
    }
  }
  .agree {
    display: flex;
    justify-content: center;
    margin-bottom: 0.533333rem;
  }
}
</style>