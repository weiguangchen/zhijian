<template>
  <div class="gl-fw">
    <bigTitle title="管理服务" @showPopup='showPopup'></bigTitle>
    <div class="fw-list">
      <scroller>
        <div class="form-box">
          <div v-for="(item,index) in fwList" :key="index" class="fw-item">
            <div class="fw">
              <div class="fw-img">
                <img :src="item.fw_img" alt="">
              </div>
              <div class="fw-info">
                <div class="fw-name">{{item.fw_mingzi}}</div>
                <div class="fw-price">{{item.money}}</div>
              </div>
            </div>
            <div class="op-btn">
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native="toChange(item.shop_fw_id)">编辑</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" :disabled='true' v-if="item.status == 0">审核中</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='xiajia(item.shop_fw_id)' v-if="item.status == 1">下架</XButton>
              <XButton :mini='true' :plain='true' type='warn' class="xbtn" @click.native='shangjia(item.shop_fw_id)'
                v-if="item.status == 3">上架</XButton>
            </div>
          </div>
        </div>
      </scroller>

    </div>
    <Popup position='right' v-model="popupShow">
      <div class="popup-list">
        <Group>
          <Cell title='添加服务' link='/shanghu/jingying/xmgl'></Cell>
        </Group>

      </div>
    </Popup>
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
        fwList: [],
        popupShow: false
      };
    },
    created() {
      this.$emit("showPopup", false);
      this.get_fw_list();
    },
    methods: {
      toChange(fwId) {
        this.$router.push({
          path: "/shanghu/jingying/bianjiFw/" + fwId
        });
      },
      xiajia(fwId) {
        var _this = this;
        this.$axios
          .get("/Api/ShopFw/xj_shop_fw", {
            params: {
              id: fwId
            }
          })
          .then(({
            data
          }) => {
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
          .get("/Api/ShopFw/sj_shop_fw", {
            params: {
              id: fwId
            }
          })
          .then(({
            data
          }) => {
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
          .get("/Api/ShopFw/fw_list", {
            params: {
              shop_id: this.userinfo.shop[0].id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            _this.fwList = data;
          });
      },
      showPopup(val) {
        this.popupShow = true;
      }
    },
    mixins: [checkLogin],
    components: {
      ViewBox,
      bigTitle,
      XButton,
      Popup,
      Group,
      Cell,
      betterScroll
    }
  };

</script>

<style lang='scss'>
  .gl-fw {
    height: 100%;
    display: flex;
    flex-direction: column;

    .fw-list {
      position: relative;
      flex: 1;
    }

    .fw-item {
      @include font-dpr(14px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 0.4rem;
      border-bottom: 1px solid #f0f0f0;
      line-height: 1;
      padding: .533333rem
        /* 40/75 */
        0;

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
