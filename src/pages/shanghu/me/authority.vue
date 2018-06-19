<template>
    <div class="authority shanghu-page">
        <bigTitle title='设置权限' @showPopup='showPopup'></bigTitle>{{tabbar}}
        <CheckBoxGroup v-model="tabbar" class="checker-box">
            <div v-for="(item,index) in authList" :key="index">
                <CheckBox :val='item.id' shape="circle" class="check-title" data-id='1'>{{item.name}}</CheckBox>
                <CheckBoxGroup v-model="formatModel(item.id)" class="son-box">
                    <CheckBox shape="circle" val='11' :disabled='tabbar1ed' v-for="(son,index1) in item.son" :key="index1">{{son.name}}</CheckBox>
                </CheckBoxGroup>
            </div>
            <!-- <CheckBox val='1' shape="circle" class="check-title" data-id='1'>验证管理</CheckBox>
            <CheckBoxGroup v-model="tabbar1" class="son-box">
                <CheckBox shape="circle" val='11' :disabled='tabbar1ed'>验证消费券</CheckBox>
                <CheckBox shape="circle" val='12' :disabled='tabbar1ed'>验证优惠券</CheckBox>
                <CheckBox shape="circle" val='13' :disabled='tabbar1ed'>验证活动报名</CheckBox>
            </CheckBoxGroup>
            <CheckBox val='2' shape="circle" class="check-title" data-id='2'>评价管理</CheckBox>
            <CheckBoxGroup v-model="tabbar2" class="son-box">
                <CheckBox shape="circle" val='21' :disabled='tabbar2ed'>消费评价</CheckBox>
                <CheckBox shape="circle" val='22' :disabled='tabbar2ed'>优惠券点评</CheckBox>
                <CheckBox shape="circle" val='23' :disabled='tabbar2ed'>活动点评</CheckBox>
            </CheckBoxGroup>
            <CheckBox val='3' shape="circle" class="check-title" data-id='3'>经营管理</CheckBox>
            <CheckBoxGroup v-model="tabbar3" class="son-box">
                <CheckBox shape="circle" val='31' :disabled='tabbar3ed'>活动统计</CheckBox>
                <CheckBox shape="circle" val='32' :disabled='tabbar3ed'>消费统计</CheckBox>
                <CheckBox shape="circle" val='33' :disabled='tabbar3ed'>订单管理</CheckBox>
            </CheckBoxGroup>
            <CheckBox val='4' shape="circle" class="check-title" data-id='4'>商户中心</CheckBox>
            <CheckBoxGroup v-model="tabbar4" class="son-box">
                <CheckBox shape="circle" val='41' :disabled='tabbar4ed'>项目管理</CheckBox>
                <CheckBox shape="circle" val='42' :disabled='tabbar4ed'>新建项目</CheckBox>
                <CheckBox shape="circle" val='43' :disabled='tabbar4ed'>门店管理</CheckBox>
                <CheckBox shape="circle" val='44' :disabled='tabbar4ed'>账户管理</CheckBox>
                <CheckBox shape="circle" val='45' :disabled='tabbar4ed'>财务管理</CheckBox>
            </CheckBoxGroup> -->
        </CheckBoxGroup>
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
export default {
  data() {
    return {
      tabbar: [],
      tabbar1: [],
      tabbar2: [],
      tabbar3: [],
      tabbar4: [],
      authorityList: [],
      authList
    };
  },
  created() {
    this.$emit("showPopup", false);
  },
  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
    },
    ifinArray(arr, index) {
      var arrstr = arr.join("");
      if (arrstr.indexOf(index) != -1) {
        return true;
      } else {
        return false;
      }
    },
    submit() {
      // this.tabbar.map(m=>{
      //     var tabbaritem = {};
      //     tabbaritem.tabbar = m;
      //     tabbaritem.
      // })
    },
    formatModel(id){
        return `tabbar${id}`;
    }
  },
  computed: {
    tabbar1ed() {
      if (this.ifinArray(this.tabbar, 1)) {
        return false;
      } else {
        return true;
      }
    },
    tabbar2ed() {
      if (this.ifinArray(this.tabbar, 1)) {
        return false;
      } else {
        return true;
      }
    },
    tabbar3ed() {
      if (this.ifinArray(this.tabbar, 3)) {
        return false;
      } else {
        return true;
      }
    },
    tabbar4ed() {
      if (this.ifinArray(this.tabbar, 4)) {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    bigTitle,
    CheckBox,
    CheckBoxGroup,
    XButton
  }
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