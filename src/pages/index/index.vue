/* * @Author: 魏广辰 * @Date: 2018-05-26 12:02:12 * @Last Modified by: mikey.zhaopeng * @Last Modified time: 2018-06-28
16:05:58
*/
<template>
  <div class="page index">
    <betterScroll>
      <div>
        <div class="top-ad">
          <div class="top-input">
            <span class="add" @click="select_city" v-if="currentLocation">{{currentLocation.city}}
              <i class="iconfont icon-weibiaoti35"></i>
            </span>

            <Search placeholder='请输入商家名或地点' v-model="search" @on-submit='searchFn'></Search>
          </div>
          <swiper :options="swiperOption1" ref="mySwiper1" @transitionEnd='transitionEnd(1)'>
            <swiper-slide v-for="(item,index) in top_ad" :key="index">
              <img v-lazy="item.url" alt="">
            </swiper-slide>
          </swiper>
        </div>
        <keep-alive>
          <classify :classArr='classArr' v-if="classArr.length"></classify>
        </keep-alive>
        <div class="huodong">
          <swiper :options="swiperOption2" ref="mySwiper2" @transitionEnd='transitionEnd(2)'>
            <!-- slides -->
            <swiper-slide v-for="(item,index) in middle_ad" :key="index">
              <img v-lazy="item.url" alt="" @click="to5xiche">
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

      </div>
    </betterScroll>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    <Popup v-model="alertShow" position='center'>
      <div class="popup1">
        <h1>选择城市
          <i class="iconfont icon-cha" @click='close'></i>
        </h1>
        <div class="face" @click="setLocation">{{location.city}}&nbsp;&nbsp;
          <em>(当前位置)</em>
        </div>
        <div class="face" v-for="item in city" :key="item.id" @click="changeLocation(item)">{{item.city}}</div>
      </div>
    </Popup>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
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
    SwiperItem,
    Search
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
  import setTitle from '@/mixins/setTitle.js'
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import betterScroll from '@/components/betterScroll';
  export default {
    data() {
      return {
        alertShow: false,
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
        hd: [],
        search: '',
        city: ''
      };
    },
    created() {
      var _this = this;
      // this.$eruda.init();
      this.get_city();
      this.get_fw();
      this.get_one_class();
      this.get_gg();
      
    },
    watch: {
      currentLocation() {
        console.log('出发了')
        this.get_fw();
      },
    },
    methods: {
      ...mapMutations([
        "SAVE_ID",
        "SAVE_USERINFO",
        "SET_INDEX_HD_ID",
        "SET_CURRENTLOCTION_TYPE",
        "SET_LOCATION",
        "SET_CITYLOCATION"
      ]),
      get_fw() {
        var _this = this;
        console.log(this.location)
        this.$axios
          .get("/Api/Yes/one_jl", {
            params: {
              lng: this.currentLocation.lat,
              lat: this.currentLocation.lng,
              city: this.currentLocation.city
            }
          })
          .then(({
            data
          }) => {
            console.log("获取最近服务");
            this.listArr = data.info;
          });
      },
      toHd(keyword) {
        console.log(keyword)
        this.SET_INDEX_HD_ID(keyword)
        this.$router.push({
          path: '/faxian',
        })
        // var arr = id.split('-');
        // if (arr[0] == 1) {
        //   // 跳转服务详情页
        //   this.$router.push({
        //     path: '/serviceDetail/' + arr[1]
        //   })
        // } else if (arr[0] == 2) {
        //   // 跳转发现页
        //   this.SET_INDEX_HD_ID(arr[1])
        //   this.$router.push({
        //     path: '/faxian',
        //   })
        // }

      },
      transitionEnd(n) {
        var Swiper = this['mySwiper' + n];
        var index = Swiper.activeIndex;
        if (n == 1) {
          var l = this.top_ad.length
        } else if (n == 2) {
          var l = this.middle_ad.length

        }

        if (index + 1 == l) {
          setTimeout(() => {
            Swiper.slideTo(0, 200)
            Swiper.autoplay.start()
          }, 3000);
        }
      },
      searchFn(val) {
        this.$router.push({
          path: '/searchList',
          query: {
            search: val
          }
        })
      },
      to5xiche() {
        this.$router.push({
          path: '/searchList',
          query: {
            search: 5
          }
        })
      },
      select_city() {
        this.alertShow = true;
      },
      changeLocation(city) {
        this.alertShow = false;
        // 手动选择地址
        this.SET_CURRENTLOCTION_TYPE(2);
        this.SET_CITYLOCATION(city);
      },
      setLocation() {
        this.alertShow = false;
        // 使用定位
        this.SET_CURRENTLOCTION_TYPE(1);
      },
      get_city() {
        this.$axios.get('/Api/show/city').then(({
          data
        }) => {
          console.log(data)
          this.city = data;
        })
      },
      close() {
        this.alertShow = false;
      },
      get_gg() {
        this.$axios.get("/Api/Show/get_gg").then(({
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
      get_one_class() {
        this.$axios.get('/Api/Yes/one').then(({
          data
        }) => {
          console.log(data);
          this.classArr = data;
        })
      }
    },
    computed: {
      ...mapState(["location", "cityLocation"]),
      ...mapGetters(['currentLocation']),
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
      betterScroll,
      swiperSlide,
      swiper,
      Search,
      Popup
    },
    mixins: [setTitle]
  };

</script>

<style lang='scss'>
  .index {
    padding-bottom: 50px;

    .top-ad {
      .swiper-container {
        height: 2.666667rem;
      }

      position: relative;

      .top-input {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: .266667rem
          /* 20/75 */
          .4rem
          /* 30/75 */
          .266667rem
          /* 20/75 */
          .533333rem
          /* 40/75 */
        ;
        @include font-dpr(19px);
        color: #292929;

        .weui-search-bar__form {
          border-radius: .346667rem
            /* 26/75 */
          ;
          border: 1px solid #000000;
          overflow: hidden;
        }

        .weui-search-bar__cancel-btn {
          font-size: .32rem
            /* 24/75 */
          ;
        }

        .weui-search-bar {
          padding: 0;
          background: transparent;

          &::before,
          &::after {
            display: none;
          }
        }

        .weui-search-bar__cancel-btn {
          font-size: .426667rem
            /* 32/75 */
          ;
        }

        .vux-search-fixed {
          padding: .266667rem
            /* 20/75 */
            .4rem
            /* 30/75 */
            .266667rem
            /* 20/75 */
            .533333rem
            /* 40/75 */
          ;
        }

        .add {
          font-size: .346667rem
            /* 26/75 */
          ;
          margin-right: 0.333333rem;
          line-height: 1;
          flex: none;

          .iconfont {
            font-size: .32rem
              /* 24/75 */
            ;
          }
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

        form {
          display: flex;
          flex: 1;
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

    .popup1 {
      width: 8rem
        /* 600/75 */
      ;
      background: #ffffff;
      border-radius: .133333rem
        /* 10/75 */
      ;
      font-size: .373333rem
        /* 28/75 */
      ;

      h1,
      .face {
        display: flex;
        align-items: center;
        padding: 0 .4rem
          /* 30/75 */
        ;
      }

      h1 {
        font-size: .426667rem
          /* 32/75 */
        ;
        height: 1.106667rem
          /* 83/75 */
        ;
        justify-content: space-between;
      }

      .face {
        height: 1.186667rem
          /* 89/75 */
        ;

        &:nth-child(even) {
          background: #f8f8f8;
          border: 1px solid #dedede;
        }
      }

      em {
        color: #6d6d6d;
        font-size: .24rem
          /* 18/75 */
        ;
      }
    }
  }

</style>
