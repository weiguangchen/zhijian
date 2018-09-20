<template>
  <div class="fwy-detail">
    <betterScroll>
      <div class="btt">服务员A</div>
      <div class="info">
        <div class="title">
          <div>服务类别</div>
          <div>数量</div>
        </div>
        <div class="fw" v-for="(item,index) in list" :key="index">
          <div>{{item.class_name}}</div>
          <div>{{item.yes}}</div>
        </div>
        
      </div>
    </betterScroll>
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
        date: '',
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
            .get("/Api/Shop/fwy_list_content", {
              params: {
                shop_id: this.userinfo.shop[0].id,
                fwy_id: this.fwy_id,
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
      },
      changeDate(val) {}
    },
    computed: {
      fwy_id() {
        return this.$route.query.fwy_id;
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
  .fwy-detail {
    height: 100%;
    padding: .4rem
      /* 30/75 */
    ;

    .btt {
      margin: .4rem
        /* 30/75 */
        0 .666667rem
        /* 50/75 */
      ;
      font-size: .4rem
        /* 30/75 */
      ;
    }

    .info {
      border-radius: .133333rem
        /* 10/75 */
      ;
      overflow: hidden;
      font-size: .4rem
        /* 30/75 */
      ;

      .title {
        background: #326dac;
        color: #ffffff;
        height: 1.866667rem
          /* 140/75 */
        ;
        line-height: 1.866667rem
          /* 140/75 */
        ;
      }

      .fw {
        height: 1.2rem
          /* 90/75 */
        ;
        line-height: 1.2rem
          /* 90/75 */
        ;

        &:nth-child(odd) {
          background: #e8ebeb;
        }

        &:nth-child(even) {
          background: #c6c6c6;
        }
      }

      .title,
      .fw {
        display: flex;
        text-align: center;

        &>div {
          flex: 1;
        }
      }
    }
  }

</style>
