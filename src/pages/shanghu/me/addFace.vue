<template>
  <div class="shanghu-page add-face">
    <bigTitle title='添加门店' @showPopup='showPopup'></bigTitle>
    <div class="form-box">
      <h2 class="sub-title">门店名称:</h2>
      <Group class="reset-vux-input">
        <XInput v-model="face_name"></XInput>
      </Group>
      <h2 class="sub-title">门店位置:</h2>
      <Group class="reset-vux-input">
        <XInput v-model="loc.poiaddress" @click.native='selectAdd'></XInput>
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
import { XInput, Group, XButton } from "vux";
import checkLogin from '@/mixins/checkLogin.js';
export default {
  data() {
    return {
      submiting:false,
      face_name: "",
      mapShow: false,
      loc: ""
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
        });
    }
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
            face_name: _this.face_name,
            jd: _this.loc.latlng.lat,
            wd: _this.loc.latlng.lng,
            fw_shop_id: 1,
            phone:_this.userinfo.uphone
          }
        })
        .then(({ data }) => {
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
        },err=>{
          this.submiting = false;
        });
    },
    change_face() {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/Shop/edit_face", {
          params: {
            face_name: _this.face_name,
            jd: _this.loc.latlng.lat,
            wd: _this.loc.latlng.lng,
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
    finishAdd(loc) {
      this.mapShow = false;
      this.loc = loc;
    }
  },
  components: {
    bigTitle,
    XInput,
    Group,
    XButton,
    myMap
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