<template>
  <div class="gl-fw">
    <bigTitle title="服务员记录" @showPopup='showPopup' :icon='false' :right='true'>
      <iview-select slot="right" class="select-wrapper" size='large' placeholder='请选择时间' v-model="date" @on-change='changeDate'>
        <iview-op value='1'>全部</iview-op>
        <iview-op value='2'>本月</iview-op>
        <iview-op value='3'>本周</iview-op>
        <iview-op value='4'>今天</iview-op>
      </iview-select>
    </bigTitle>
    <div class="fwy-list">
      <scroller :on-infinite="infinite" ref="myscroller">
        <router-link :to="{path:'/shanghu/jingying/fwyDetail',query:{fwy_id:item.id}}" v-for="(item,index) in list" :key="index">
          <div class="fwy">
            <div class="name">{{item.sub_name}}</div>
            <div class="content">
              <div class="count">接单数:{{item.no}}</div>
              <div>已完成订单数:{{item.yes}}</div>
            </div>
          </div>
        </router-link>
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
        start_time:  this.$moment('2018-01-01').unix(),
        end_time: this.$moment().unix(),
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
      this.get_list();
    },
    methods: {
      infinite(done) {
        this.get_list(done);
      },
      get_list(fn) {
        var _this = this;

        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return;
        } else {
          this.$axios
            .get("/Api/Shop/fwy_list", {
              params: {
                shop_id: this.userinfo.shop[0].id,
                num: 8,
                p: this.p,
                start_time: this.start_time,
                end_time: this.end_time
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
      changeDate(val) {
        this.list = [];
        this.p = 1;
        this.noData = false;

        if (val === 1) {
          this.start_time = this.$moment('2018-08-04').unix();
        } else if (val === 2) {
          this.start_time = this.$moment().startOf('month').unix();
        } else if (val === 3) {
          this.start_time = this.$moment().startOf('week').unix();
        } else if (val === 4) {
          this.start_time = this.$moment().startOf('day').unix();
        }



        this.end_time = this.$moment().unix();


        this.get_list();
      }
    },
    computed: {
      fw_id() {
        return this.$route.query.id;
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


    .fwy-list {
      position: relative;
      flex: 1;
      margin: 0 .4rem
        /* 30/75 */
      ;

      .fwy {
        margin: .666667rem
          /* 50/75 */
          0;

        .name {
          font-size: .4rem
            /* 30/75 */
          ;
          margin-bottom: .533333rem
            /* 40/75 */
          ;
        }

        .content {
          position: relative;
          padding: .4rem
            /* 30/75 */
            1rem
            /* 75/75 */
          ;
          background: #e9e9e9;
          font-size: .373333rem
            /* 28/75 */
          ;

          .count {
            margin-bottom: .4rem
              /* 30/75 */
            ;
          }

          &:before {
            content: '';
            display: block;
            position: absolute;
            left: .6rem
              /* 45/75 */
            ;
            top: -.8rem
              /* 60/75 */
            ;
            border: .4rem
              /* 30/75 */
              solid transparent;
            border-bottom: .4rem
              /* 30/75 */
              solid #e9e9e9;
          }
        }
      }
    }
  }

</style>
