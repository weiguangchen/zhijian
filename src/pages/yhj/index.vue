<template>
  <div class="page collect">
    <Tab active-color='#e86359' class="x-tab" v-model="tabActiveIndex">
      <TabItem selected='selected' @on-item-click='changeTab'>
        <span>未使用</span>
      </TabItem>
      <TabItem @on-item-click='changeTab'>
        <span>已使用</span>
      </TabItem>
      <TabItem @on-item-click='changeTab'>
        <span>已过期</span>
      </TabItem>
    </Tab>
    <div class="swiper-box">
      <swiper :options="swiperOption" ref="mySwiper" @transitionEnd='transitionEnd'>
        <swiper-slide>
          <div class="scroll-wrapper">
            <mineScroller :status='0'></mineScroller>
            <!-- <scroller :on-infinite="infinite1" ref="myscroller1">
              <div class="list">
                <yhj v-for="(item,index) in 20" :key="index">
                </yhj>

              </div>
            </scroller> -->
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="scroll-wrapper">
            <mineScroller :status='1'></mineScroller>
            <!-- <scroller :on-infinite="infinite2" ref="myscroller2">
              <yhj></yhj>
            </scroller> -->
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="scroll-wrapper">
            <mineScroller :status='2'></mineScroller>
            <!-- <scroller :on-infinite="infinite3" ref="myscroller3">
              <yhj></yhj>
            </scroller> -->
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {
    Cell,
    Group,
    Tab,
    TabItem,
    Sticky,
  } from "vux";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import betterScroll from '@/components/betterScroll/scroll';
  import checkLogin from "@/mixins/checkLogin.js";
  import yhj from './components/index';
  import mineScroller from './components/scroller';

  export default {
    data() {
      return {
        tabActiveIndex: 0,
        swiperOption: {},

      };
    },
    created() {

    },
    methods: {
      transitionEnd() {
        this.tabActiveIndex = this.swiper.activeIndex
      },
      changeTab(val) {
        this.swiper.slideTo(val, 200, false)
      },
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      params() {

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
      mineScroller
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .collect {
    background: #ffffff;
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
