<template>
  <div class="page selectYhj">
    <!-- <Tab active-color='#e86359' class="x-tab" v-model="tabActiveIndex">
      <TabItem @on-item-click='changeTab'>
        <span>可用优惠券</span>
      </TabItem>
      <TabItem @on-item-click='changeTab'>
        <span>不可用优惠券</span>
      </TabItem>
    </Tab> -->
    <!-- <div class="swiper-box">
      <swiper :options="swiperOption" ref="mySwiper" @transitionEnd='transitionEnd'>
        <swiper-slide>
          <div class="scroll-wrapper">
            <mineScroller></mineScroller>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="scroll-wrapper">
            <mineScroller></mineScroller>
          </div>
        </swiper-slide>
      </swiper>
    </div> -->
    <div class="scroll-wrapper">
      <scroller :on-infinite="infinite" ref="myscroller">
        <Checker v-model="yhj_val" selected-item-class='selected-yhj' default-item-class='default-yhj'>
          <CheckerItem v-for="(item,index) in list" :key="index" :value='item.yhq_id'>
            <yhj :info='item.content' :hasBtn='false'></yhj>
            <img src="./gou.png" alt="" class="gou">
          </CheckerItem>
        </Checker>
      </scroller>
      <XButton type='warn' class="xbtn" @click.native="ok">确定</XButton>
    </div>

  </div>
</template>
<script>
  import yhj from '@/pages/yhj/components/index';
  import {
    Cell,
    Group,
    Tab,
    TabItem,
    Sticky,
    Checker,
    CheckerItem,
    XButton
  } from "vux";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import checkLogin from "@/mixins/checkLogin.js";


  export default {
    data() {
      return {
        tabActiveIndex: 0,
        swiperOption: {},

        noData: false,
        p: 1,
        list: [],

        yhj_val: ''
      };
    },
    created() {
      this.get_list();
      this.yhj_val = this.yhjId;
    },
    methods: {
      infinite(done) {
        console.log('触发')
        this.get_list(done);
      },
      get_list(fn) {
        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return
        } else {
          // 还有数据
          this.$axios.get('/Api/Yhq/fw_user_yhq', {
            params: {
              user_id: this.id,
              fw_id: this.fwId,
              shop_id: this.shopId,
              money: this.money,
              p: this.p,
              num: 8,
            }
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.ok == 1) {
              //   还有数据
              this.p++;
            } else {
              //   没有数据
              this.noData = true;
            }
            this.list = this.list.concat(data.list);
            if (fn) fn();
          })
        }
      },
      ok() {
        var query = {
          serviceId: this.fwId,
          faceId: this.faceId,
          shopId: this.shopId,
          yhjId: this.yhj_val,
          num: this.num
        }
        this.$router.replace({
          path: '/queren',
          query
        })
      }
      //   transitionEnd() {
      //     this.tabActiveIndex = this.swiper.activeIndex
      //   },
      //   changeTab(val) {
      //     this.swiper.slideTo(val, 200, false)
      //   },




    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      },
      fwId() {
        return this.$route.query.serviceId;
      },
      shopId() {
        return this.$route.query.shopId;
      },
      faceId() {
        return this.$route.query.faceId;
      },
      yhjId(){
          return this.$route.query.yhjId;
      },
      money() {
        return this.$route.query.money;
      },
      num() {
        return this.$route.query.num;
      }
    },
    mounted() {

    },
    components: {
      Cell,
      Group,
      Tab,
      TabItem,
      Sticky,
      swiperSlide,
      swiper,
      yhj,
      Checker,
      CheckerItem,
      XButton
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .selectYhj {
    background: #ffffff;
    padding: .4rem/* 30/75 */
    ;
    .scroll-wrapper {
      position: relative;
      height: 100%;
      .vux-checker-item {
        width: 100%;
        position: relative;
        margin-bottom: .666667rem/* 50/75 */
        ;
      }
      .gou {
        position: absolute;
        bottom: 0;
        right: 0;
        display: none;
        width: 1.173333rem/* 88/75 */
        ;
      }
      .selected-yhj {
        border: .053333rem/* 4/75 */
        solid #f16764 !important;
        .gou {
          display: block;
        }
      }
      .default-yhj {
        border: .053333rem/* 4/75 */
        solid transparent;
      }
      .xbtn {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99999;
      }
    }

    .x-tab {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }

    .swiper-box {
      padding-top: 44px;
      height: 100%;
      .swiper-container {
        height: 100%;
        .scroll-wrapper {
          position: relative;
          height: 100%;
          .list {
            padding: .8rem/* 60/75 */
            .4rem/* 30/75 */
            ;
          }
        }
      }
      .list1 {
        padding: .4rem/* 30/75 */
        ;
      }
    }
  }

</style>
