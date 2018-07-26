<template>
  <div class="face-list">
    <betterScroll>
      <bigTitle title="门店管理" class="big-title" @showPopup='showPopup'></bigTitle>
      <div class="form-box">
        <div v-for="(item,index) in faceList" :key="index" class="face-item">
          <div class="tit">门店名称：</div>
          <div class="face_name">{{item.face_name}}</div>
          <div class="op-btn">
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native="toChange(item.id)">编辑</XButton>
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='deleteFace(item.id)' v-if="item.face_status == 1">停用</XButton>
            <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='startFace(item.id)' v-else>启用</XButton>
          </div>
        </div>
        <XButton type='warn' @click.native="add_face">添加门店</XButton>

      </div>
    </betterScroll>


  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll/index';
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from "@/mixins/checkLogin.js";
  import {
    ViewBox,
    XButton
  } from "vux";
  export default {
    data() {
      return {
        faceList: []
      };
    },
    created() {
      this.$emit("showPopup", false);
      this.get_face();
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      deleteFace(id) {
        var _this = this;
        this.$axios
          .get(this.API_URL + "/Api/Shop/delete_face", {
            params: {
              id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            //   _this.faceList = data;
            if (data.status == 1) {
              this.$vux.alert.show({
                title: "提示",
                content: "停用门店成功！",
                onHide() {
                  _this.$router.replace({
                    path: "/shanghu/me/mendian"
                  });
                }
              });
            } else if (data.status == 0) {
              this.$vux.alert.show({
                title: "提示",
                content: "停用门店失败，请重试！",
                onHide() {
                  _this.$router.replace({
                    path: "/shanghu/me/mendian"
                  });
                }
              });
            }
          });
      },
      startFace(id) {},
      toChange(id) {
        this.$router.push({
          path: "/shanghu/me/addFace",
          query: {
            faceId: id
          }
        });
      },
      add_face() {
        this.$router.push("/shanghu/me/addFace");
      },
      get_face() {
        var _this = this;

        this.$axios
          .get(this.API_URL + "/Api/Shop/get_face", {
            params: {
              shop_id: _this.userinfo.shop[0].id, //商户id
              phone: this.userinfo.uphone
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            _this.faceList = data;
          });
      }
    },
    components: {
      ViewBox,
      bigTitle,
      XButton,
      betterScroll
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .face-list {
    height: 100%;
    .big-title {
      margin-bottom: 0.8rem;
    }
    .face-item {
      .tit,
      .face_name {
        margin-bottom: 0.4rem;
      }
      .op-btn {
        .xbtn {
          margin-top: 0;
          margin-right: 0.613333rem;
        }
      }
      box-shadow: 0 0 1px 1px rgba(#000000, 0.1);
      margin-bottom: 0.533333rem;
      padding: 0.4rem;
      border-radius: 0.106667rem;
      border: 1px solid #d4d4d4;
    }
  }

</style>
