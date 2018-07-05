/* * @Author: 魏广辰 * @Date: 2018-05-26 12:02:12 * @Last Modified by: mikey.zhaopeng * @Last Modified time: 2018-06-28 16:05:58
*/
<template>
  <keep-alive>
    <div class="wrapper page" ref="wrapper">
      <ul class="content">
        <div class="index">
          <ViewBox>
            <div class="top-ad">
              <swiper :options="swiperOption1" ref="mySwiper1">
                <!-- slides -->
                <swiper-slide v-for="(item,index) in top_ad" :key="index">
                  <img :src="item.url" alt="">
                </swiper-slide>
              </swiper>

              <div class="top-input">
                <span class="add" v-if="location">{{location.city}}</span>
                <input placeholder='请输入商家名或地点' class="search" />
              </div>

            </div>
            <!-- <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
        </iframe> -->
            <classify :classArr='classArr' v-if="classArr.length"></classify>
            <div class="huodong">
              <swiper :options="swiperOption2" ref="mySwiper2">
                <!-- slides -->
                <swiper-slide v-for="(item,index) in middle_ad" :key="index">
                  <img :src="item.url" alt="">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>

            </div>
            <div class="huodong-list">
              <div class="item" v-for="(item,index) in hd" :key="index" @click="toHd(item.alt)">
                <img :src="item.url" alt="" class="img">
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
  export default {
    data() {
      return {
        scroll: {},
        swiperOption1: {
          loop: true,
          autoplay: true
        },
        swiperOption2: {
          loop: true,
          autoplay: true,
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
      document.title = "首页";
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
      // this.$wx.ready(function() {
      //   _this.$wx.getLocation({
      //     type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function(res) {
      //       var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //       var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //       var speed = res.speed; // 速度，以米/每秒计
      //       var accuracy = res.accuracy; // 位置精度
      //       console.log("地理位置:");
      //       console.log(res);
      //     }
      //   });
      // });
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

      }
    },
    computed: {
      ...mapState(["location"]),
      ifContentShow() {}
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
    mixins: [getLocation]
  };

</script>

<style lang='scss'>
  .index {
    .top-ad {
      .swiper-container {
        height: 2.666667rem;
      }
      position: relative;
      height: 2.666667rem; // background-image: url(~img/index/top-ad.png);
      // background-repeat: no-repeat;
      // background-size: cover;
      .top-input {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 99999;
        display: flex;
        align-items: center;
        padding: 0.24rem 0.533333rem;
        @include font-dpr(19px);
        color: #292929;
        .add {
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
