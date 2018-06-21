<template>
  <div>
    <ViewBox class="shanghu-page creat-huodong">
      <bigTitle title='添加子账户' @showPopup='showPopup'></bigTitle>
      <div class="form-box">
        <div class="form-group">
          <h2 class="sub-title">选择账号所属门店</h2>
          <CheckBoxGroup v-model="faceVal" color="#e03233">
            <CheckBox v-for="(item,index) in face_list" :key="index" :val='item.id' shape="circle">{{item.face_name}}</CheckBox>
          </CheckBoxGroup>

        </div>

        <div class="form-group">
          <h2 class="sub-title">新增账号的名称</h2>
          <Group class="reset-vux-input">
            <XInput v-model="account_name" placeholder='输入6-10位中文字符'></XInput>
          </Group>
        </div>
        <div class="form-group">
          <h2 class="sub-title">用户手机号</h2>
          <Group class="reset-vux-input">
            <XInput v-model="phone" placeholder='输入手机号'></XInput>
          </Group>
        </div>
        <div class="form-group">
          <h2 class="sub-title">再次输入手机号</h2>
          <Group class="reset-vux-input">
            <XInput v-model="rephone" placeholder='请再次输入手机号'></XInput>
          </Group>
        </div>

        <XButton type='warn' class="xbtn" @click.native="submitFn" :disabled='submiting'>提交</XButton>
        <!-- <XButton type='warn' class="xbtn" @click.native="changeFw" v-else-if="step == 3 && querys">完成修改</XButton> -->
      </div>

    </ViewBox>

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
  XTextarea,
  XNumber
} from "vux";
import { KeyBoard } from "vue-ydui/dist/lib.px/keyboard";
import bigTitle from "@/components/bigTitle/index";
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
import wxConfig from "@/mixins/wxConfig.js";
import checkLogin from "@/mixins/checkLogin.js";
import Qs from "qs";
import { CheckBox, CheckBoxGroup } from "vue-ydui/dist/lib.px/checkbox";
export default {
  data() {
    return {
      submiting: false,
      face_list: [],

      faceVal: [],
      account_name: "",
      phone: "",
      rephone: ""
    };
  },
  created() {
    // this.$eruda.init();
    var _this = this;
    this.$emit("showPopup", false);

    this.$axios
      .get(this.API_URL + "/Api/YouHui/card_add", {
        params: {
          phone: _this.userinfo.uphone
        }
      })
      .then(({ data }) => {
        console.log(data);
        _this.add = data.city;
        _this.one_class_list = data.hd_class;
        _this.face_list = data.face;
        _this.fw_list = data.fw;
      });
  },

  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    },

    submitFn() {
      var _this = this;

      //   this.submiting = true;
      this.submiting = true;
      this.checkForm().then(
        res => {
          const params = {
            shop_id: this.userinfo.shop[0].id,
            sub_name: this.account_name,
            phone: this.phone,
            face_id: this.faceVal
          };

          console.log(params);

          // this.$axios
          //   .get(_this.API_URL + "/Api/UserShow/add_son", {
          //     params: {
          //       shop_id: this.userinfo.shop[0].id,
          //       phone: "",
          //       sub_name: "",
          //       face_id: ""
          //     }
          //   })
          //   .then(({ data }) => {
          //     _this.submiting = false;
          //   });
        },
        err => {
          this.submiting = false;
        }
      );
    },

    // 获取已有数据
    getOldInfo() {
      var _this = this;
      return this.$axios
        .get(this.API_URL + "/api/ShopFw/edit_fw", {
          params: {
            id: _this.querys
          }
        })
        .then(res => {
          console.log(res.data.list[0]);
          return res.data.list[0];
        });
    },
    checkForm() {
      console.log(!/^[u4e00-u9fa5]{6,}$/.test(this.account_name));

      var _this = this;
      return new Promise((resolve, reject) => {
        if (this.faceVal.length <= 0) {
          _this.alertWarning("请选择门店！");
          reject();
        } else if (!/^[u4e00-u9fa5]{6,}&/.test(this.account_name)) {
          _this.alertWarning("请填写正确账号名称！");
          reject();
        } else if (
          !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone) ||
          !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.rephone)
        ) {
          _this.alertWarning("请填写正确手机号码！");
          reject();
        } else if (this.phone != this.rephone) {
          _this.alertWarning("手机号不一致！");
          reject();
        } else {
          resolve();
        }
      });
    },
    alertWarning(text) {
      this.$vux.alert.show({
        title: "提示",
        content: text
      });
    }
  },
  computed: {
    querys() {
      return this.$route.query.fwId;
    },
    fw_num() {
      var arr = [];

      this.fw_list.map((m, index) => {
        if (this.fw_selceted[index] >= 0) {
          var item = [];
          item[0] = m.fw_mingzi;
          item[1] = m.shop_fw_id;
          item[2] = this.fw_selceted[index];
          //   item = JSON.stringify(item);
          arr.push(item);
        }
      });
      //   arr = JSON.stringify(arr);
      return arr;
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
    KeyBoard,
    XNumber,
    CheckBoxGroup,
    CheckBox
  },
  mixins: [checkLogin]
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
.creat-huodong {
  .fw-item {
    margin: 0 0.426667rem;
    border-bottom: 1px solid #e4e4e4;
  }
  .select-num {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .weui-cell {
      &::before {
        border-top: none;
      }
    }
  }

  .check-box {
    display: flex;
    flex-wrap: wrap;
    %checker {
      width: 0.533333rem;
      height: 0.533333rem;
      border-radius: 50%;
      margin-right: 0.213333rem;
    }
    .checker-item {
      @extend %checker;
      border: 1px solid #000000;
    }
    .checker-item-selected {
      position: relative;
      color: #df3331;
      &::before {
        @include font-dpr(12px);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .check-item {
      margin-bottom: 0.586667rem;
      margin-right: 1.333333rem;
      flex: none;
      @include font-dpr(14px);
      display: flex;
      align-items: center;
    }
  }
}
</style>