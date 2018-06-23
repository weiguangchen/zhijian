<template>
    <div class="page add-jms">
        <div class="form-box dl">
            <span class="title">代理商</span>
            <span>
                <XInput v-model="dl" :disabled='true'></XInput>
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
        <CheckBoxGroup v-model="fw_class">
            <CheckBox shape="circle" :val='item.id' v-for="(item,index) in fw_class_all" :key="index">{{item.class_name}}</CheckBox>
        </CheckBoxGroup>
        <Group>
            <XAddress title='地区' :list='city' v-model="cityVal"></XAddress>
        </Group>
        <Group>
            <XTextarea title='地址' v-model="address"></XTextarea>
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
            <CheckBoxGroup color='#e03233' v-model="agree">
                <CheckBox shape="circle">同意指尖到位协议</CheckBox>
            </CheckBoxGroup>
        </div>
        <XButton type='warn' @click.native='submit'>提交</XButton>
        <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap>
    </div>
</template>

<script>
import myMap from "@/components/map/index";
import { XInput, XTextarea, Group, XAddress, XButton } from "vux";
import { CheckBox, CheckBoxGroup } from "vue-ydui/dist/lib.px/checkbox";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      mapShow: false,
      dl: "李海东  15223032043",
      city: [],
      fw_class_all: [],

      jms_name: "",
      name: "",
      phone: "",
      cityVal: [],
      address: "",
      map: {},
      agree: [],
      system: 1,
      imgs: "",
      localData: "",
      tupian: "",
      fw_class: [1,2]
    };
  },
  created() {
    var _this = this;
    this.$axios.get(this.API_URL + "/Api/UserShow/city").then(({ data }) => {
      console.log(data);

      data.map(m => {
        var address = {};
        address.name = m.city;
        address.value = m.id;
        _this.city.push(address);
        if (m.qy.length > 0) {
          m.qy.map(n => {
            var address = {};
            address.name = n.qy_name;
            address.value = n.id;
            address.parent = n.city_id;
            _this.city.push(address);
            if (n.sq.length > 0) {
              n.sq.map(s => {
                var address = {};
                address.name = s.sq_name;
                address.value = s.id;
                address.parent = s.qy_id;
                _this.city.push(address);
              });
            }
          });
        }
      });
      console.log(_this.city);
      this.$axios
        .get(this.API_URL + "/Api/ShopFw/fw_shop_class")
        .then(({ data }) => {
          console.log(data);
          this.fw_class_all = data;
        });
    });
  },
  methods: {
    submit() {
      var _this = this;
      var params = {
        dl_id: this.userinfo.dl[0].id,
        shop_phone: this.phone,
        zj_img: this.tupian,
        adress: this.address,
        jd: this.map.latlng.lat,
        wd: this.map.latlng.lng,
        city: this.cityValue,
        qy: this.qyValue,
        sq: this.sqValue,
        shop_name: this.jms_name,
        xingming: this.name,
        fw_class: this.fw_class
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
    }
  },
  computed: {
    cityValue() {
      return this.cityVal[0];
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
    myMap
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