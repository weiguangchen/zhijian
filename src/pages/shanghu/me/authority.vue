<template>
    <div class="authority shanghu-page">
        <bigTitle title='设置权限' @showPopup='showPopup'></bigTitle>
        <div class="checker-box">
            <!-- <checkItem :check='item' @changeCheck='changeCheck' v-for="(item,index) in authList" :key="index"></checkItem> -->
            <CheckBoxGroup v-model="tabbar">
                <CheckBox shape="circle" :val='1' class="check-title">验证管理</CheckBox>
                <CheckBoxGroup v-model="tabbar1" class="son-box">
                    <CheckBox shape="circle" :val='11'>验证消费券</CheckBox>
                    <CheckBox shape="circle" :val='12'>验证优惠码</CheckBox>
                    <CheckBox shape="circle" :val='13'>验证活动报名</CheckBox>
                </CheckBoxGroup>
                <CheckBox shape="circle" :val='2' class="check-title">评价管理</CheckBox>
                <CheckBoxGroup v-model="tabbar2" class="son-box">
                    <CheckBox shape="circle" :val='21'>消费评价</CheckBox>
                    <CheckBox shape="circle" :val='22'>优惠券点评</CheckBox>
                    <CheckBox shape="circle" :val='23'>活动点评</CheckBox>
                </CheckBoxGroup>
                <CheckBox shape="circle" :val='3' class="check-title">经营管理</CheckBox>
                <CheckBoxGroup v-model="tabbar3" class="son-box">
                    <CheckBox shape="circle" :val='31'>活动统计</CheckBox>
                    <CheckBox shape="circle" :val='32'>消费统计</CheckBox>
                    <CheckBox shape="circle" :val='33'>订单管理</CheckBox>
                </CheckBoxGroup>
                <CheckBox shape="circle" :val='4' class="check-title">商戶中心</CheckBox>
                <CheckBoxGroup v-model="tabbar4" class="son-box">
                    <CheckBox shape="circle" :val='41'>项目管理</CheckBox>
                    <CheckBox shape="circle" :val='42'>新建项目</CheckBox>
                    <CheckBox shape="circle" :val='43'>门店管理</CheckBox>
                    <CheckBox shape="circle" :val='44'>账户管理</CheckBox>
                    <CheckBox shape="circle" :val='45'>财务管理</CheckBox>
                </CheckBoxGroup>
            </CheckBoxGroup>
        </div>

        <div class="xbtn">
            <XButton type='warn' @click.native='submit'>提交</XButton>
        </div>

    </div>
</template>

<script>
import bigTitle from "@/components/bigTitle/index";
import { XButton } from "vux";
import { CheckBox, CheckBoxGroup } from "vue-ydui/dist/lib.rem/checkbox";
import authList from "./authlist";
import checkItem from "./check-item";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      tabbar: [],
      tabbar1: [],
      tabbar2: [],
      tabbar3: [],
      tabbar4: [],
      auth: [],
      authList
    };
  },
  created() {
    this.$emit("showPopup", false);
    var oldAuth = JSON.parse(this.userinfo.qx[0].content);
    console.log(oldAuth);
    oldAuth.map(m => {
      this.tabbar.push(m.id);
      this["tabbar" + m.id] = m.son;
    });
  },
  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    },
    submit() {
      var _this = this;
      var authList = [];
      this.tabbar.map(m => {
        var tabbar = {};
        tabbar.id = m;
        tabbar.son = this["tabbar" + m];
        authList.push(tabbar);
      });
      authList = JSON.stringify(authList);
      console.log(authList);

      this.$axios
        .get(this.API_URL + "/Api/UserShow/add_userqx", {
          //   baseURL: "http://zj.daonian.cn",
          params: {
            content: authList,
            uid: _this.id
          }
        })
        .then(({ data }) => {
          if (data.status == 1) {
            _this.$vux.alert.show({
              title: "提示",
              content: "权限设置成功！",
              onHide() {
                _this.$router.replace({
                  path: "/shanghu/me/account"
                });
              }
            });
          } else {
            _this.$vux.alert.show({
              title: "提示",
              content: "权限设置失败！",
              onHide() {
                _this.$router.replace({
                  path: "/shanghu/me/account"
                });
              }
            });
          }
        });
    }
  },
  watch: {},
  computed: {},
  components: {
    bigTitle,
    CheckBox,
    CheckBoxGroup,
    XButton,
    checkItem
  },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>
.authority {
  width: 100%;
  .checker-box {
    padding-left: 0.533333rem;
    .yd-checkbox-text {
      line-height: 22px;
    }
    .check-title {
      margin: 0.533333rem 0;
    }
    .son-box {
      display: flex;
      flex-wrap: wrap;
      background: #f0f0f0;
      padding: 0.4rem 0 0 0.666667rem;
      .yd-checkbox-text {
        @include font-dpr(12px);
      }
      .yd-checkbox {
        margin-bottom: 0.533333rem;
      }
    }
  }
  .xbtn {
    margin: 0 0.533333rem;
  }
}
</style>