<template>
  <div class="gl-fw">
    <ViewBox class="shanghu-page">
      <bigTitle title="管理服务" @showPopup='showPopup'></bigTitle>
      <div class="form-box">
        <div v-for="(item,index) in fwList" :key="index" class="fw-item">
          <div class="tit">项目名称：</div>
          <div class="fw_name">{{item.fw_mingzi}}</div>
          <div class="op-btn">
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native="toChange(item.shop_fw_id)">编辑</XButton>
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" :disabled='true' v-if="item.status == 0">审核中</XButton>
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='xiajia(item.shop_fw_id)' v-if="item.status == 1">下架</XButton>
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='shangjia(item.shop_fw_id)' v-if="item.status == 3">上架</XButton>
          </div>
        </div>
      </div>

    </ViewBox>
  </div>
</template>

<script>
import bigTitle from "@/components/bigTitle/index";
import { ViewBox, XButton } from "vux";
export default {
  data() {
    return {
      fwList: []
    };
  },
  created() {
    this.$emit("showPopup", false);
    this.get_fw_list();
  },
  methods: {
    toChange(fwId) {
      this.$router.push({
        path: "/shanghu/me/bianjiFw/"+fwId
      });
    },
    xiajia(fwId) {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/ShopFw/xj_shop_fw", {
          params: {
            id: fwId
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "下架成功",
              onHide() {
                _this.get_fw_list();
              }
            });
          } else if (data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "下架失败，请重新尝试",
              onHide() {
                _this.get_fw_list();
              }
            });
          }
        });
    },
    shangjia(fwId) {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/ShopFw/sj_shop_fw", {
          params: {
            id: fwId
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "上架成功",
              onHide() {
                _this.get_fw_list();
              }
            });
          } else if (data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "上架失败，请重新尝试",
              onHide() {
                _this.get_fw_list();
              }
            });
          }
        });
    },
    get_fw_list() {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/ShopFw/fw_list", {
          params: {
            shop_id: 1
          }
        })
        .then(({ data }) => {
          console.log(data);
          _this.fwList = data;
        });
    },
    showPopup(val) {
      this.$emit("showPopup", val);
    }
  },
  components: {
    ViewBox,
    bigTitle,
    XButton
  }
};
</script>

<style lang='scss'>
.gl-fw {
  .fw-item {
    @include font-dpr(14px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0.4rem;
    height: 4.266667rem;
    border-bottom: 1px solid #f0f0f0;
    line-height: 1;
    .tit {
      margin-bottom: 0.48rem;
    }
    .fw_name {
      margin-bottom: 0.48rem;
    }
    .op-btn {
      .xbtn {
        margin-top: 0;
        width: 2.133333rem;
        height: 0.853333rem;
        margin-right: 0.613333rem;
      }
    }
  }
}
</style>