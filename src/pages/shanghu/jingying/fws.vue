<template>
  <div class="gl-fw">
    <bigTitle title="服务统计" @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="fw-list">
      <scroller :on-infinite="infinite" ref="myscroller">
          
        <div class="fw-item"  v-for="(item,index) in list" :key="index">
          <div class="top">
            <div><span class="tt">用户姓名：</span><span>{{item.xingming}}</span></div>
            <div><span class="tt">联系方式：</span><span>{{item.dianhua}}</span></div>
          </div>
          <div class="bot">
            <div><span class="tt">下单时间：</span><span>{{item.date}}</span></div>
            <div><span class="tt">使用状态：</span><span>{{status(item.status)}}</span></div>
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
            .get("/Api/Order/get_fw_buy_content", {
              params: {
                fw_id: this.fw_id,
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
      status(status){
          if(status == 0){
              return '未支付'
          }else if(status == 1){
              return '已支付未使用'
          }else if(status == 2){
              return '已支付已使用'
          }else if(status == 3){
              return '申请退款'
          }else if(status == 4){
              return '申请退款'
          }else if(status == 5){
              return '已支付已过期'
          }else if(status == 7){
              return '已支付已使用已评论'
          }
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


    .fw-list {
      position: relative;
      flex: 1;
      margin: 0 .4rem
        /* 30/75 */
      ;

      .fw-item {
          margin: .4rem /* 30/75 */ 0;
          border: 1px solid #cdcdcd;
        padding: .4rem
          /* 30/75 */
        ;
        font-size: .373333rem
          /* 28/75 */
        ;

        .top {
          border-bottom: 1px solid #efefef;
          margin-bottom: .4rem
            /* 30/75 */
          ;
        }

        .top,
        .bot {
          padding-left: .533333rem
            /* 40/75 */
          ;

          &>div {
            display: flex;
            margin-bottom: .4rem
              /* 30/75 */
            ;
          }

          .tt {
            flex: none;
            width: 3.466667rem
              /* 260/75 */
            ;
          }
        }
      }
    }
  }

</style>
