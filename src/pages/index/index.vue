/* * @Author: 魏广辰 * @Date: 2018-05-26 12:02:12 * @Last Modified by: mikey.zhaopeng * @Last Modified time: 2018-06-28 16:05:58
*/
<template>
  <keep-alive>
    <div class="wrapper page" ref="wrapper">
      <ul class="content">
        <div class="index">
          <ViewBox>
            <div class="top-ad">
              <div class="top-input">
                <span class="add" v-if="location">{{location.city}}</span>
                <input placeholder='请输入商家名或地点' class="search" />
              </div>
              <swiper :options="swiperOption1" ref="mySwiper1" @transitionEnd='transitionEnd(1)'>
                <swiper-slide v-for="(item,index) in top_ad" :key="index">
                  <img v-lazy="item.url" alt="">
                </swiper-slide>
              </swiper>
            </div>
            <classify :classArr='classArr' v-if="classArr.length"></classify>
            <div class="huodong">
              <swiper :options="swiperOption2" ref="mySwiper2" @transitionEnd='transitionEnd(2)'>
                <!-- slides -->
                <swiper-slide v-for="(item,index) in middle_ad" :key="index">
                  <img v-lazy="item.url" alt="">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>

            </div>
            <div class="huodong-list">
              <div class="item" v-for="(item,index) in hd" :key="index" @click="toHd(item.alt)">
                <img v-lazy="item.url" alt="" class="img">
              </div>
            </div>

            <tuijian :info='item' v-for="(item,index) in listArr" :key="index" v-if="item.list.length>0" fwClass='1'></tuijian>

            <!-- <div class="server-list"> -->
            <!-- <Sticky>
          <div class="tit-list">
            <Tab v-model="selectedTab">
              <Tab-item v-for="(item,index) in classArr" :key="index" @on-item-click='changeItem(index)'>{{item.class_name}}</Tab-item>
            </Tab>
          </div>
        </Sticky> -->

            <!-- <div class="list-content"> -->
            <!-- <div class="content" v-for="(item,index) in classArr" :key='index' v-show='selectedTab == index'>
            <service v-for="(item,index) in listArr['list'+item.id]" :key="index" :fwInfo='item'></service>
          </div> -->

            <!-- </div> -->
            <!-- </div> -->

          </ViewBox>

        </div>
      </ul>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>

  </keep-alive>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from "vuex";
  import {
    ViewBox,
    Tabbar,
    TabbarItem,
    Tab,
    TabItem,
    Sticky,
    XInput,
    Group,
    Swiper,
    SwiperItem
  } from "vux";
  import service from "@/components/service/service";
  import classify from "@/components/classify/index";
  import tuijian from "@/components/tuijian/index";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import {
    rejects
  } from "assert";
  import getLocation from "@/mixins/getLocation.js";
  import BScroll from "better-scroll";
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {
        scroll: {},
        swiperOption1: {
          loop: true,
          disableOnInteraction: false,
          autoplay: true
        },
        swiperOption2: {
          loop: true,
          autoplay: true,
          disableOnInteraction: false,
          pagination: {
            el: ".huodong .swiper-pagination"
          }
        },
        selectedTab: 0,
        classArr: [],
        listArr: {},
        activeListId: "",
        top_ad: [],
        middle_ad: [],
        hd: []
      };
    },
    created() {
      var _this = this;
      // this.$eruda.init();

      this.getPosition().then(res => {
        this.SET_LOCATION(res);
        console.log(this.location);
        this.get_fw();
      });

      this.$axios.get(_this.API_URL + "/Api/Show/get_gg").then(({
        data
      }) => {
        // 获取头部广告
        this.top_ad = data.one_img;
        // 获取中部广告
        this.middle_ad = data.two_img;
        // 活动推荐
        this.hd = data.hd_banner;
      });

    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          tap: true,
          click: true
        });
      });
    },
    watch: {
      location() {
        this.get_fw();
      }
    },
    methods: {
      ...mapMutations([
        "SAVE_ID",
        "SAVE_USERINFO",
        "SAVE_ADDRESS",
        "SET_LOCATION",
        "SET_INDEX_HD_ID"
      ]),
      get_fw() {
        var _this = this;
        this.$axios
          .get(_this.API_URL + "/Api/Yes/one_jl", {
            params: {
              lng: _this.location.lat,
              lat: _this.location.lng
            }
          })
          .then(({
            data
          }) => {
            console.log("获取最近服务");
            _this.classArr = data.class;
            _this.listArr = data.info;
          });
      },
      toHd(id) {
        var arr = id.split('-');
        if (arr[0] == 1) {
          // 跳转服务详情页
          this.$router.push({
            path: '/serviceDetail/' + arr[1]
          })
        } else if (arr[0] == 2) {
          // 跳转发现页
          this.SET_INDEX_HD_ID(arr[1])
          this.$router.push({
            path: '/faxian',
          })
        }

      },
      transitionEnd(n) {
        var Swiper = this['mySwiper' + n];
        var index = Swiper.activeIndex;
        if(n == 1){
          var l = this.top_ad.length
        }else if(n == 2){
          var l = this.middle_ad.length

        }

        if (index + 1 == l) {
          setTimeout(() => {
            Swiper.slideTo(0, 200)
            Swiper.autoplay.start()
          }, 3000);
        }
      }
    },
    computed: {
      ...mapState(["location"]),
      mySwiper1() {
        return this.$refs.mySwiper1.swiper;
      },
      mySwiper2() {
        return this.$refs.mySwiper2.swiper;
      }
    },
    components: {
      ViewBox,
      Tabbar,
      TabbarItem,
      Tab,
      TabItem,
      service,
      classify,
      Sticky,
      tuijian,
      XInput,
      // Swiper,
      // SwiperItem,
      swiperSlide,
      swiper
    },
    mixins: [getLocation,setTitle]
  };

</script>

<style lang='scss'>
  .index {
    .top-ad {
      .swiper-container {
        height: 2.666667rem;
      }
      position: relative;
      .top-input {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0.24rem 0.533333rem;
        @include font-dpr(19px);
        color: #292929;
        .add {
          font-size: .373333rem /* 28/75 */;
          margin-right: 0.333333rem;
          line-height: 1;
        }
        .search {
          padding-left: 0.266667rem;
          flex: 1;
          height: 0.693333rem;
          border: 1px solid #000000;
          border-radius: 0.346667rem;
          outline: none;
          @include font-dpr(12px);
        }
      }
    }

    .huodong {
      // display: flex;
      // justify-content: space-between;
      // box-sizing: border-box;
      padding: 0.16rem 0.4rem 0;
      background: #ffffff;
      .swiper-container {
        height: 2.986667rem;
      }
    }

    .huodong-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #ffffff;
      padding: 0.36rem 0.4rem;
      height: 6.866667rem;
      margin-bottom: $bot;
      .item {
        width: 4.4rem;
        height: 2.933333rem;
        overflow: hidden;
        margin-bottom: .133333rem;
        .img {
          vertical-align: top;
        }
      }
    }

    .server-list {
      .tit-list {
        border-bottom: 1px solid #dfdfdf;
      }
    }
  }

</style>
