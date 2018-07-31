<template>
  <div class="page collect">
    <!-- <Sticky> -->
    <Tab active-color='#e86359' class="x-tab" v-model="tabActiveIndex">
      <TabItem selected='selected' @on-item-click='changeTab'>
        <span>服务</span>
      </TabItem>
      <TabItem @on-item-click='changeTab'>
        <span>活动</span>
      </TabItem>
      <TabItem @on-item-click='changeTab'>
        <span>店铺</span>
      </TabItem>
    </Tab>
    <!-- </Sticky> -->
    <div class="swiper-box">
      <swiper :options="swiperOption" ref="mySwiper" @transitionEnd='transitionEnd'>
        <swiper-slide>
          <betterScroll @pullingUp='pullingUp' ref='scroll0'>
            <div class="list1">
              <fw v-for="(item,index) in fwList" :key="index" :fw='item' :index='index' @deleteFw='deleteFw'></fw>
            </div>
          </betterScroll>
        </swiper-slide>
        <swiper-slide>
          <betterScroll @pullingUp='pullingUp' ref='scroll1'>
            <div class="list1">
              <hd v-for="(item,index) in hdList" :key="index" :hd='item' :index='index' @deleteHd='deleteHd'></hd>
            </div>
          </betterScroll>
        </swiper-slide>
        <swiper-slide>
          <betterScroll @pullingUp='pullingUp' ref='scroll2'>
            <div class="list1">
              <md v-for="(item,index) in mdList" :key="index" :md='item'  @deleteMd='deleteMd'></md>
            </div>
          </betterScroll>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {
    ViewBox,
    Cell,
    Group,
    Tab,
    TabItem,
    Sticky,
    Selector,
  } from "vux";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import betterScroll from '@/components/betterScroll/scroll';
  import checkLogin from "@/mixins/checkLogin.js";

  import fw from './fw';
  import hd from './hd';
  import md from './mendian';

  export default {
    data() {
      return {
        tabActiveIndex: 0,
        swiperOption: {},
        p0: 1,
        p1: 1,
        p2: 1,
        fwList: [],
        hdList: [],
        mdList: []
      };
    },
    created() {
      var _this = this;
      this.get_list(2).then(data => {
        this.mdList = this.mdList.concat(data);
      })
      this.get_list(0).then(data => {
        this.fwList = this.fwList.concat(data);
      })
      this.get_list(1).then(data => {
        this.hdList = this.hdList.concat(data);
      })
    },
    methods: {
      get_list(type) {
        var params = {
          uid: this.id,
          num: 8,
          p: this['p' + type]
        }
        console.log(type)
        Object.assign(params, {
          tj: this.format(type) /* 0门店1服务2活动 */
        })
        return this.$axios.get(this.API_URL + '/Api/UserShow/get_like_list', {
          params
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.ok == 1) {
            console.log("还有数据");
            this['p' + type] = this['p' + type] + 1;
          } else if (data.ok == 0) {
            console.log("没数据了");
            this.$refs['scroll' + type].closePullUp();
          }
          this.$refs['scroll' + type].pullupLoadend();
          return data.list;
        })
      },
      deleteFw(i) {
        this.fwList.splice(i, 1);
      },
      deleteHd(i) {
        this.hdList.splice(i, 1);
      },
      deleteMd(i){
        this.mdList.splice(i, 1);
      },
      pullingUp() {
        this.get_list(this.tabActiveIndex).then(data => {
          if (this.tabActiveIndex == 0) {
            this.fwList = this.fwList.concat(data)
          } else if (this.tabActiveIndex == 1) {
            this.hdList = this.hdList.concat(data)
          } else if (this.tabActiveIndex == 2) {
            this.mdList = this.mdList.concat(data)
          }
        })
        this.$refs['scroll' + this.tabActiveIndex].finishPullupload();
      },
      transitionEnd() {
        this.tabActiveIndex = this.swiper.activeIndex
      },
      changeTab(val) {
        this.swiper.slideTo(val, 200, false)
      },

      format(type) {
        if (type == 0) {
          return 1;
        } else if (type == 1) {
          return 2;
        } else if (type == 2) {
          return 0;
        }
      }



    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      
    },
    mounted() {

    },
    components: {
      Cell,
      Group,
      Tab,
      TabItem,
      Sticky,
      betterScroll,
      swiperSlide,
      swiper,
      fw,
      hd,
      md
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
      }
      .list1 {
        padding: .4rem/* 30/75 */
        ;
      }
    }
  }

</style>
