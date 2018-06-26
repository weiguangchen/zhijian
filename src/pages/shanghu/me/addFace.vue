<template>
  <div class="shanghu-page add-face">
    <bigTitle title='修改门店' @showPopup='showPopup' v-if="faceId"></bigTitle>
    <bigTitle title='添加门店' @showPopup='showPopup' v-else></bigTitle>
    <div class="form-box">
      <h2 class="sub-title">门店名称:</h2>
      <Group class="reset-vux-input">
        <XInput v-model="face_name"></XInput>
      </Group>
      <h2 class="sub-title">门店位置:</h2>
      <Group class="reset-vux-input">
        <XInput v-model="map.poiaddress" @click.native='selectAdd'></XInput>
      </Group>
      <h2 class="sub-title">详细地址:</h2>
      <Group class="reset-vux-input">
        <XInput v-model="address"></XInput>
      </Group>
      <Group>
        <Cell title='加盟城市' v-model="cityKey"></Cell>
        <Cell title='加盟区域' v-model="qyKey"></Cell>
        <Selector :options='sqList' title='加盟社区' :value-map="['id','sq_name']" direction='rtl' @on-change='changeSq' v-model='sqVal'></Selector>
      </Group>
      <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap>
      <XButton type='warn' class="xbtn" @click.native='add_face' v-if="!faceId" :disabled='submiting'>增加门店</XButton>
      <XButton type='warn' class="xbtn" @click.native='change_face' v-else :disabled='submiting'>提交修改</XButton>
    </div>

  </div>
</template>

<script>
import bigTitle from "@/components/bigTitle/index";
import myMap from "@/components/map/index";
import wxConfig from "@/mixins/wxConfig.js";
import { XInput, Group, XButton, Selector, Cell } from "vux";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      submiting: false,
      mapShow: false,
      sqList: [],

      face_name: "",
      map: "",
      address: "",
      cityVal: "",
      cityKey: "",
      qyVal: "",
      qyKey: "",
      sqVal: ""
    };
  },
  created() {
    var _this = this;
    this.$emit("showPopup", false);
    if (this.faceId) {
      this.$axios
        .get(this.API_URL + "/Api/Shop/face_edit", {
          params: {
            id: _this.faceId
          }
        })
        .then(({ data }) => {
          console.log(data);
          _this.face_name = data[0].face_name;
          _this.map = JSON.parse(data[0].map);
          _this.address = data[0].adress;
          _this.sqVal = data[0].sq_id;
          
        });
    }

    this.$axios.get(this.API_URL + "/Api/UserShow/city").then(({ data }) => {
      console.log(data);
      // 获取城市信息
      data.map(m => {
        if (m.id == this.userinfo.shop[0].city) {
          this.cityKey = m.city;
          this.cityVal = m.id;
          if (m.qy) {
            m.qy.map(q => {
              if (q.id == this.userinfo.shop[0].qy) {
                this.qyKey = q.qy_name;
                this.qyVal = q.id;
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
  },
  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    },
    add_face() {
      this.submiting = true;
      var _this = this;
      console.log("提交");
      this.$axios
        .get(this.API_URL + "/Api/Shop/add_face", {
          params: {
            face_name: this.face_name,
            jd: this.map.latlng.lat,
            wd: this.map.latlng.lng,
            map:this.map,
            adress: this.address,
            city: this.cityVal,
            qy: this.qyVal,
            sq: this.sqVal,
            fw_shop_id: this.userinfo.shop[0].id,
            phone: this.userinfo.uphone
          }
        })
        .then(
          ({ data }) => {
            if (data.status == 1) {
              this.$vux.alert.show({
                title: "提示",
                content: "创建门店成功！",
                onHide() {
                  _this.$router.replace({
                    path: "/shanghu/me/mendian"
                  });
                }
              });
            } else if (data.status == 0) {
              this.submiting = false;
              this.$vux.alert.show({
                title: "提示",
                content: "创建门店失败，请重试！",
                onHide() {
                  _this.$router.replace({
                    path: "/shanghu/me/mendian"
                  });
                }
              });
            }
          },
          err => {
            this.submiting = false;
          }
        );
    },
    change_face() {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/Shop/edit_face", {
          params: {
            face_name: _this.face_name,
            jd: _this.map.latlng.lat,
            wd: _this.map.latlng.lng,
            id: _this.faceId
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "修改成功！",
              onHide() {
                _this.$router.replace({
                  path: "/shanghu/me/mendian"
                });
              }
            });
          } else if (data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "修改失败！",
              onHide() {
                _this.$router.replace({
                  path: "/shanghu/me/mendian"
                });
              }
            });
          }
        });
    },
    selectAdd() {
      console.log(this.mapShow);
      this.mapShow = true;
    },
    finishAdd(map) {
      this.mapShow = false;
      this.map = map;
    },
    checkForm() {
      var _this = this;
      return new Promise((resolve, reject) => {
        if (!face_name) {
          reject();
          _this.alertWarning("请填写门店名称！");
        } else if (!map) {
          reject();
          _this.alertWarning("请填写门店名称！");
        }
      });
    },
    alertWarning(text) {
      this.$vux.alert.show({
        title: "提示",
        content: text
      });
    },
    changeSq(val) {
      this.sqVal = val;
    }
  },
  components: {
    bigTitle,
    XInput,
    Group,
    XButton,
    Selector,
    myMap,
    Cell
  },
  computed: {
    faceId() {
      return this.$route.query.faceId;
    },
    finishBtn() {
      if (this.face_name && this.loc) {
        return false;
      } else {
        return true;
      }
    }
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.add-face {
  .xbtn {
    margin-top: 0.666667rem;
  }
}
</style>