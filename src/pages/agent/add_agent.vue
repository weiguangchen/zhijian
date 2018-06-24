<template>
  <div class=" add-jms">
    <div class="form-box dl">
      <span class="title">添加人</span>
      <span class="form-text">
        {{userinfo.dl[0].xingming}}&nbsp;&nbsp;{{userinfo.uphone}}&nbsp;&nbsp;
        <span v-if='userinfo.dl[0].dl_jb == 1'>股东代理</span>
        <span v-else-if='userinfo.dl[0].dl_jb == 2'>市级代理</span>
        <span v-else-if='userinfo.dl[0].dl_jb == 3'>区级代理</span>
      </span>
    </div>

    <div class="form-group">
      <div class="form-box">
        <span class="title">代理商名称</span>
        <span>
          <XInput placeholder='请输入加盟商名称' v-model="agent_name"></XInput>
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

    <Group>
      <Cell title='级别' v-model="level"></Cell>
    </Group>

    <Group v-if="agentType == 2">
      <Selector :options='areaList' title='代理城市' :value-map="['id','city']" direction='rtl' @on-change='changeArea' v-if="areaList" v-model='area'></Selector>
    </Group>
    <Group v-else-if='agentType == 3'>
      <!-- <Selector :options='cityList' title='城市' :value-map="['id','city']" direction='rtl' @on-change='changeCity' v-if="areaList" v-model='cityAreaVal'></Selector> -->
      <Cell title='代理城市' v-model="cityAreaKey"></Cell>
      <Selector :options='qyList' title='代理区域' :value-map="['id','qy_name']" direction='rtl' @on-change='changeQy' v-if="areaList" v-model='qyAreaVal'></Selector>
    </Group>

    <Group>
      <Cell title='地址' v-model="cityVal" @click.native="cityShow = true"></Cell>
    </Group>
    <CitySelect v-model="cityShow" :callback="finishSelectCity" :items="District"></CitySelect>

    <Group>
      <XTextarea title='详细地址' v-model="address"></XTextarea>
    </Group>
    <!-- <Group>
            <XInput v-model="map.poiaddress" @on-focus='mapShow = true' title='选择地址'></XInput>
        </Group> -->
    <!-- <div class="upload"> -->
    <!-- <h2 class="sub-title">营业执照:</h2> -->
    <!-- <div class="uploadImage"> -->
    <!-- <div class="upload-btn" @click="chooseImg"> -->
    <!-- <i class="iconfont icon-xiangji" v-if="!imgs && !localData"></i> -->
    <!-- <template v-else> -->
    <!-- 安卓预览图片 -->
    <!-- <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1"> -->
    <!-- IOS预览图片 -->
    <!-- <img :src="localData || tupian" alt="" v-else class="thumb"> -->
    <!-- </template> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <div class="agree">
      <CheckBoxGroup color='#e03233' v-model="agree">
        <CheckBox shape="circle" :val='true'>同意指尖到位协议</CheckBox>
      </CheckBoxGroup>
    </div>
    <XButton type='warn' @click.native='submit' :disabled='submiting'>提交</XButton>
    <!-- <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap> -->
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
  Selector,
  ChinaAddressV4Data,
  Cell
} from "vux";
import { CheckBox, CheckBoxGroup } from "vue-ydui/dist/lib.px/checkbox";
import { CitySelect } from "vue-ydui/dist/lib.px/cityselect";
import District from "ydui-district/dist/jd_province_city_area_id";
import checkLogin from "@/mixins/checkLogin.js";

export default {
  data() {
    return {
      cityShow: false,
      District,
      city: ChinaAddressV4Data,
      areaList: [],
      submiting: false,
      cityList: [],
      qyList: [],
      cityVal: "请选择地址",

      agent_name: "",
      name: "",
      phone: "",
      level: "",
      area: "",
      cityAreaKey: "",
      cityAreaVal: "",
      qyAreaVal: "",
      sheng: "",
      shi: "",
      qu: "",
      address: "",
      agree: []
    };
  },
  created() {
    var _this = this;
    // 获取地区三级联动数据
    this.$axios.get(this.API_URL + "/Api/UserShow/city").then(({ data }) => {
      console.log(data);
      // 处理数据数据为插件需要格式
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
    });

    // 判断添加级别
    if (this.userinfo.dl[0].dl_jb == 1) {
      // 股东代理
      this.level = "市级代理";
      // 获取代理区域
      this.$axios.get(this.API_URL + "/Api/Dl/get_city").then(({ data }) => {
        console.log(data);
        _this.areaList = data;
      });
    } else if (this.userinfo.dl[0].dl_jb == 2) {
      // 市级代理
      this.level = "区域代理";
      // 获取代理区域
      this.$axios.get(this.API_URL + "/Api/Dl/get_city").then(({ data }) => {
        console.log(data);
        _this.cityList = data;
        data.map(m => {
          console.log(m.id);
          console.log(_this.userinfo.dl[0].city_id);
          if (m.id == _this.userinfo.dl[0].city_id) {
            _this.cityAreaVal = m.id;
            _this.cityAreaKey = m.city;
          }
        });

        _this.changeCity(_this.cityAreaVal);
      });
    }

  },
  methods: {
    submit() {
      var _this = this;
      this.submiting = true;
      this.formValidata().then(
        res => {
          var params = {
            dl_name: this.agent_name,
            xingming: this.name,
            dl_phone: this.phone,
            dl_jb: this.agentType,
            sheng: this.sheng,
            shi: this.shi,
            qu: this.qu,
            adress: this.address,
            fid: this.userinfo.dl[0].id
          };
          // 判断增加区级代理还是市级代理
          var areaid;
          if (this.agentType == 2) {
            params.city = this.area;
            areaid = this.area;
          } else if (this.agentType == 3) {
            params.qy = this.qyAreaVal;
            params.city = this.cityAreaVal;
            areaid = this.qyAreaVal;
          }

          // 判断是否存在代理
          this.checkArea(areaid)
            .then(res => {
              return this.checkHasPhone();
            })
            .then(
              res => {
                console.log(params);
                this.$axios
                  .get(this.API_URL + "/Api/Dl/add_dl", {
                    params
                  })
                  .then(({ data }) => {
                    console.log(data);
                    if (data.status == 1) {
                      this.$vux.alert.show({
                        title: "提示",
                        content: "添加成功！",
                        onHide() {
                          _this.$router.replace({
                            path: "/agent"
                          });
                        }
                      });
                    } else {
                      this.$vux.alert.show({
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
        err => {
          this.submiting = false;
        }
      );
    },
    formValidata() {
      var _this = this;
      return new Promise((resolve, reject) => {
        if (!this.agent_name) {
          _this.alertWarning("请输入代理商名称！");
          reject();
        } else if (!this.name) {
          _this.alertWarning("请输入联系人！");
          rejcet();
        } else if (
          !this.phone ||
          !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
            this.phone
          )
        ) {
          _this.alertWarning("请输入正确联系电话！");
          rejcet();
        } else if (!this.cityVal) {
          _this.alertWarning("请选择地址！");
          rejcet();
        } else if (!this.address) {
          _this.alertWarning("请填写详细地址！");
          rejcet();
        } else if (!this.agree[0]) {
          _this.alertWarning("请同意协议！");
          rejcet();
        } else {
          resolve();
        }
      });
    },
    checkArea(id) {
      var _this = this;

      return new Promise((resolve, reject) => {
        this.$axios
          .get(this.API_URL + "/Api/Dl/adress_yes", {
            params: {
              id: id,
              status: _this.cityApiType
            }
          })
          .then(({ data }) => {
            console.log(data);

            var tit;
            if (this.agentType == 2) {
              tit = "该城市已有代理商，不能重复添加！";
            } else if (this.agentType == 3) {
              tit = "该地区已有代理商，不能重复添加！";
            }
            if (data.status == 1) {
              this.$vux.alert.show({
                title: "提示",
                content: tit
              });
              reject();
            } else if (data.status == 0) {
              resolve();
            }
          });
      });
    },
    checkHasPhone() {
      var _this = this;
      return new Promise((resolve, reject) => {
        this.$axios
          .get(this.API_URL + "/Api/Dl/phone_yes", {
            params: {
              phone: this.phone
            }
          })
          .then(({ data }) => {
            if (data.status == 0) {
              this.alertWarning("该手机号已存在,不能重复添加！");
              reject();
            }else if(data.status == 1){
              resolve();
            }
          })
      });
    },
    alertWarning(text) {
      this.$vux.alert.show({
        title: "提示",
        content: text
      });
    },
    changeArea(val) {
      this.checkArea(val);
    },
    changeCity(val) {
      var _this = this;
      this.$axios
        .get(_this.API_URL + "/Api/Dl/get_city", {
          params: {
            city_id: val
          }
        })
        .then(({ data }) => {
          this.qyList = data;
        });
    },
    changeQy(val) {
      this.checkArea(val);
    },
    finishSelectCity(val) {
      console.log(val);
      this.cityVal = val.itemName1 + "-" + val.itemName2 + "-" + val.itemName3;
      this.sheng = val.itemName1;
      this.shi = val.itemName2;
      this.qu = val.itemName3;
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
    agentType() {
      if (this.userinfo.dl[0].dl_jb == 1) {
        return 2;
      } else if (this.userinfo.dl[0].dl_jb == 2) {
        return 3;
      }
    },
    cityApiType() {
      if (this.agentType == 2) {
        return 1;
      } else if (this.agentType == 3) {
        return 0;
      }
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
    Cell,
    CitySelect
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
    margin-top: 1.333333rem;
  }
}
</style>