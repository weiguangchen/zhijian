<template>
  <div class="gl-fw">
    <bigTitle title="活动卡统计" @showPopup='showPopup' :icon='false'></bigTitle>
    <p class="tit">购买用户</p>
    <div class="hd-list">
      <scroller  :on-infinite="infinite" ref="myscroller">
        <div class="card-item" v-for="(item,index) in list" :key="index">
          <div class="card-order">
            <div class="l">联系人：{{item.xingming}}</div>
            <div>联系方式：{{item.dianhua}}</div>
          </div>
          <div class="card-info">
            <div class="hd">
              <div class="l">已结算</div>
              <div class="jiesuan">
                <div>{{item.bk_ok_jmoney}}</div>
              </div>
            </div>
            <div class="hd">
              <div class="l">未结算</div>
              <div class="jiesuan">
                <div>{{item.bk_wait_jmoney}}</div>
              </div>
            </div>
          </div>
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
        list: [],
        p: 1,
        noData: false,
        popupShow: false
      };
    },
    created() {
      this.popupShow = false;
      this.$emit("showPopup", false);
      this.get_hd_list();
    },
    methods: {
      infinite(done) {
        this.get_hd_list(done);
      },
      get_hd_list(fn) {
        var _this = this;

        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return;
        } else {
          this.$axios
            .get("/Api/Order/get_hd_order", {
              params: {
                shop_id: this.userinfo.shop[0].id,
                bk_id:this.bk_id,
                num: 8,
                p: this.p
              }
            })
            .then(({
              data
            }) => {
              if (data.ok == 1) {
                console.log("还有数据");
                this.p++;
              } else if (data.ok == 0) {
                console.log("没数据了");
                this.noData = true;
              }

              this.list = this.list.concat(data.list);

              if (fn) fn();
            });
        }


       
      },
      showPopup(val) {
        // 关闭侧栏
        this.popupShow = true;
        this.$emit("showPopup", val);
      }
    },
    computed:{
        bk_id(){
            return this.$route.query.hdId;
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

    .tit {
      padding: .4rem
        /* 30/75 */
      ;
    }

    .hd-list {
      position: relative;
      flex: 1;
      margin: 0 .4rem
        /* 30/75 */
      ;

      .card-item {
        margin-bottom: 1rem;

        .l {
          width: 3.533333rem
            /* 265/75 */
          ;
          flex: none;
        }

        .card-order {
          display: flex;
          padding: 0 .4rem
            /* 30/75 */
          ;
          color: #ffffff;
          font-size: .4rem
            /* 30/75 */
          ;
          height: 1.333333rem
            /* 100/75 */
          ;
          line-height: 1.333333rem
            /* 100/75 */
          ;
          background: #08a0ff;
          border-radius: .106667rem
            /* 8/75 */
          ;
          box-shadow: 0 2px 10px 2px rgba(#000000, .08);
          margin-bottom: .213333rem
            /* 16/75 */
          ;
        }

        .card-info {
          .hd {
            border-bottom: 1px dashed #aaaaaa;
            font-size: .373333rem
              /* 28/75 */
            ;
            padding: 0 .4rem
              /* 30/75 */
            ;
            display: flex;
            border-radius: 8px;
            background: #f1f1f1;
            color: #2a2a2a;
            height: 1.333333rem
              /* 100/75 */
            ;
            line-height: 1.333333rem
              /* 100/75 */
            ;

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }

</style>
