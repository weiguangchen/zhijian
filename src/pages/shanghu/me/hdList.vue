<template>
  <div class="gl-fw">

    <bigTitle title="管理活动" @showPopup='showPopup'></bigTitle>
    <div class="form-box">
      <div v-for="(item,index) in hdList" :key="index" class="fw-item">
        <div class="tit">活动名称：</div>
        <div class="fw_name">{{item.card_name}}</div>
        <div class="op-btn">
          <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native="toChange(item.bk_id)">编辑</XButton>
          <XButton :mini='true' :plain='true' type='warn' class="xbtn" :disabled='true' v-if="item.status == 0">审核中</XButton>
          <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='xiajia(item.bk_id)' v-if="item.status == 1">下架</XButton>
          <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='shangjia(item.bk_id)' v-if="item.status == 2">上架</XButton>
        </div>
      </div>
      <div class="loading-wrapper"></div>
    </div>

  </div>
</template>

<script>
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  import {
    ViewBox,
    XButton
  } from "vux";
  export default {
    data() {
      return {
        hdList: [],
        p: 1,
      };
    },
    created() {

      this.$emit("showPopup", false);
      this.get_hd_list();
    },
    methods: {
      toChange(hdId) {
        this.$router.push({
          path: "/shanghu/me/addhuodong",
          query:{
              hdId
          }
        });
      },
      xiajia(fwId) {
        var _this = this;
        this.$axios
          .get(this.API_URL + "/Api/card/down", {
            params: {
              id: fwId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            if (data == 1) {
              this.$vux.alert.show({
                title: "提示",
                content: "下架成功",
                onHide() {
                  _this.get_hd_list();
                }
              });
            } else if (data == 0) {
              this.$vux.alert.show({
                title: "提示",
                content: "下架失败，请重新尝试",
                onHide() {
                  _this.get_hd_list();
                }
              });
            }
          });
      },
      shangjia(hdId) {
        var _this = this;
        this.$axios
          .get(this.API_URL + "/Api/card/up", {
            params: {
              id: hdId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            if (data == 1) {
              this.$vux.alert.show({
                title: "提示",
                content: "上架成功",
                onHide() {
                  _this.get_hd_list();
                }
              });
            } else if (data == 0) {
              this.$vux.alert.show({
                title: "提示",
                content: "上架失败，请重新尝试",
                onHide() {
                  _this.get_hd_list();
                }
              });
            }
          });
      },
      get_hd_list() {
        var _this = this;
        this.$axios
          .get(this.API_URL + "/Api/Card/get_card", {
            params: {
              shop_id: this.userinfo.shop[0].id,
              num: 8,
              p: this.p
            }
          })
          .then(({
            data
          }) => {
            this.$nextTick(() => {
              this.hdList = this.hdList.concat(data.list);
            })
          });
      },
      showPopup(val) {
        // 关闭侧栏
        this.$emit("showPopup", val);
      }
    },
    mixins: [checkLogin],
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
