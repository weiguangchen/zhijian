<template>
  <div>
    <div class="add-account">
      <bigTitle title='添加子账户' @showPopup='showPopup' v-if="!queryPhone"></bigTitle>
      <bigTitle title='编辑子账户' @showPopup='showPopup' v-else></bigTitle>
      <div class="form-box">

        <div class="form-group">
          <h2 class="sub-title">新增账号身份</h2>
          <mu-radio color='#e03233' :label="item.name" v-model="sf" :value="item.id"   class="radio-box" v-for='(item,index) in shenfenList' :key='index'></mu-radio>
        </div>
        <div class="form-group">
          <h2 class="sub-title">选择账号所属门店</h2>
          <mu-checkbox v-model="faceVal" :value='item.id' v-for="(item,index) in face_list" :key="index" :label='item.face_name' color='#e03233'></mu-checkbox>
        </div>
        <div class="form-group">
          <h2 class="sub-title">新增账号的名称</h2>
          <Group class="reset-vux-input">
            <XInput v-model="account_name" placeholder='请输入账号名称'></XInput>
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
    </div>
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
      shenfenList: [
        {
          name: "服务员",
          id: 1
        }
      ],

      sf: '',
      test:'',
      faceVal: [],
      account_name: "",
      phone: "",
      rephone: ""
    };
  },
  created() {
    console.log('路由')
    console.log(this.$router)
    // this.$eruda.init();
    var _this = this;
    this.$emit("showPopup", false);

    this.$axios
      .get(this.API_URL + "/Api/UserShow/son_add", {
        params: {
          shop_id: _this.userinfo.shop[0].id
        }
      })
      .then(({ data }) => {
        console.log(data);
        _this.face_list = data;
      });
  },
  mounted() {
    var _this = this;
    this.$axios
      .get(_this.API_URL + "/Api/UserShow/son_edit", {
        params: {
          phone: this.queryPhone
        }
      })
      .then(({ data }) => {
        console.log("旧数据");
        console.log(data);


          _this.sf =parseInt(data[0].shenfen);
        
        _this.test = data[0].shenfen;
        data[0].face.map(m => {
          this.faceVal.push(m.face_id);
        });
        _this.account_name = data[0].sub_name;
        _this.phone = data[0].phone;
        _this.rephone = data[0].phone;
      });
  },
  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    },

    submitFn() {
      var _this = this;
      this.submiting = true;
      this.checkForm().then(
        res => {
          const params = {
            shop_id: this.userinfo.shop[0].id,
            shenfen: this.sf,
            sub_name: this.account_name,
            phone: this.phone,
            face_id: this.faceVal
          };
          console.log(params);
          if (this.queryPhone) {
            // 编辑
            Object.assign(params, {
              id: this.accountId
            });
            this.$axios
              .get(_this.API_URL + "/Api/UserShow/edit_son", {
                params
              })
              .then(({ data }) => {
                console.log(data);
                if (data.status == 1) {
                  this.$vux.alert.show({
                    title: "提示",
                    content: "修改子账户成功！",
                    onHide() {
                      _this.$router.replace({
                        path: "/shanghu/me/account"
                      });
                    }
                  });
                } else {
                  this.$vux.alert.show({
                    title: "提示",
                    content: "修改子账户失败！",
                    onHide() {
                      _this.$router.replace({
                        path: "/shanghu/me/account"
                      });
                    }
                  });
                }
              });
          } else {
            // 新增
            this.$axios
              .get(_this.API_URL + "/Api/UserShow/add_son", {
                params
              })
              .then(({ data }) => {
                _this.submiting = false;
                this.$vux.alert.show({
                  title: "提示",
                  content: "创建子账户成功！",
                  onHide() {
                    _this.$router.replace({
                      path: "/shanghu/me/account"
                    });
                  }
                });
              });
          }
        },
        err => {
          this.submiting = false;
        }
      );
    },

    checkForm() {
      console.log(!/^[u4e00-u9fa5]{6,}$/.test(this.account_name));

      var _this = this;
      return new Promise((resolve, reject) => {
        if (!this.sf) {
          _this.alertWarning("请选择账号身份！");
          reject();
        } else if (this.faceVal.length <= 0) {
          _this.alertWarning("请选择门店！");
          reject();
        } else if (!this.account_name) {
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
    queryPhone() {
      return this.$route.query.phone;
    },
    accountId() {
      return this.$route.query.id;
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

.add-account {
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
  .yc-radio {
    visibility: hidden;
  }
  .mu-checkbox {
    margin-right: 0.2rem /* 20/100 */;
    margin-bottom: 0.2rem /* 20/100 */;
  }
}
</style>
