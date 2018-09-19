<template>
  <div class="gl-fw">

    <bigTitle title="活动卡统计" @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="hd-list">
      <scroller>
        <div class="form-box">
          <div v-for="(item,index) in hdList" :key="index" class="fw-item">
            <div class="fw">
              <div class="fw-img">
                <img :src="item.card_img" alt="">
              </div>
              <div class="fw-info">
                <div class="fw-name">{{item.card_name}}</div>
                <div class="fw-price">{{item.card_money}}</div>
              </div>
            </div>
            <div class="op-btn">
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native="toChange(item.bk_id)">编辑</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" :disabled='true' v-if="item.status == 0">审核中</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='xiajia(item.bk_id)' v-if="item.status == 1">下架</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='shangjia(item.bk_id)' v-if="item.status == 2">上架</XButton>
            </div>
          </div>
          <div class="loading-wrapper"></div>
        </div>

      </scroller>
    </div>


    
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';

  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  import {
    ViewBox,
    XButton,
    Group,
    Cell
  } from "vux";
  import {
    Popup
  } from "vue-ydui/dist/lib.px/popup";
  export default {
    data() {
      return {
        hdList: [],
        p: 1,
        popupShow: false
      };
    },
    created() {
      this.popupShow = false;
      this.$emit("showPopup", false);
      this.get_hd_list();
    },
    methods: {
      toChange(hdId) {
        this.$router.push({
          path: "/shanghu/jingying/addhuodong",
          query: {
            hdId
          }
        });
      },
      xiajia(fwId) {
        var _this = this;
        this.$axios
          .get("/Api/card/down", {
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
          .get("/Api/card/up", {
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
          .get("/Api/Card/get_card", {
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
        this.popupShow = true;
        this.$emit("showPopup", val);
      }
    },
    mixins: [checkLogin],
    components: {
      ViewBox,
      bigTitle,
      XButton,
      Popup,
      Group,
      Cell
    }
  };

</script>

<style lang='scss'>
  .gl-fw {
    height: 100%;
    display: flex;
    flex-direction: column;
    .hd-list{
      position: relative;
      flex: 1;
    }
    .fw-item {
      @include font-dpr(14px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 0.4rem;
      padding: .533333rem
        /* 40/75 */
        0;
      border-bottom: 1px solid #f0f0f0;
      line-height: 1;

      .fw {
        display: flex;
        margin-bottom: .4rem
          /* 30/75 */
        ;

        .fw-img {
          border-radius: .133333rem
            /* 10/75 */
          ;
          flex: none;
          width: 2.666667rem
            /* 200/75 */
          ;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .fw-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: .4rem
            /* 30/75 */
          ;

          .fw-name {
            font-size: .266667rem
              /* 20/75 */
            ;
          }

          .fw-price {
            color: red;
          }
        }
      }

      .tit {
        margin-bottom: 0.48rem;
      }

      .fw_name {
        margin-bottom: 0.48rem;
      }

      .op-btn {
        display: flex;
        justify-content: flex-end;

        .xbtn {
          margin: 0;
          width: 2.133333rem;
          height: 0.853333rem;
          margin-left: 0.613333rem;
        }
      }
    }
  }

</style>
