/*
 * @Author: 魏广辰 
 * @Date: 2018-05-26 12:02:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-22 17:32:22
 */
<template>
  <keep-alive>
    <div class="page">
      <ViewBox>
        <div class="top-ad" :style="{'background-image':top_ad}">
          <div class="top-input">
            <span class="add" v-if="address">{{address.city}}</span>
            <input placeholder='请输入商家名或地点' class="search" />
          </div>
        </div>
        <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
        </iframe>
        <classify :classArr='classArr' v-if="classArr.length"></classify>
        <div class="huodong">
          <Swiper :aspect-ratio='0.31'>
            <SwiperItem v-for="(item,index) in middle_ad" :key="index">
              <img :src="item" alt="">
            </SwiperItem>
          </Swiper>
          <!-- <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div> -->
        </div>
        <div class="huodong-list">
          <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
          <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
          <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
          <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
        </div>

        <tuijian :info='item' v-for="(item,index) in listArr" :key="index" v-if="item.list.length>0"></tuijian>

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
  </keep-alive>
</template>

<script>
import { mapMutations, mapState } from "vuex";
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

export default {
  data() {
    return {
      selectedTab: 0,
      classArr: [],
      listArr: {},
      activeListId: "",
      top_ad:'',
      middle_ad:[]
    };
  },
  created() {
    document.title = "首页";
    var _this = this;
    window.addEventListener(
      "message",
      function(event) {
        // 接收位置信息
        console.log("腾讯地图");
        var loc = event.data;
        _this.SAVE_ADDRESS(loc);
        console.log("location", loc);
      },
      false
    );

    this.$axios.get(this.API_URL + "/api/Show/one_class").then(res => {
      console.log(res);
      _this.classArr = res.data.class;
      _this.listArr = res.data.info;
    });
    

    this.$axios.get(_this.API_URL+'/Api/Show/get_gg').then(({data})=>{
      this.top_ad = data.one_img;
      this.middle_ad =this.middle_ad.push(data.two_img);
    })
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
  activated(){
    
  },
  methods: {
    ...mapMutations(["SAVE_ID", "SAVE_USERINFO", "SAVE_ADDRESS"]),
    getloc() {},
    changeItem(index) {
      this.activeItem = index;
    }
  },
  computed: {
    ...mapState(["address"]),
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
    Swiper,
    SwiperItem
  },
};
</script>

<style lang='scss'>
.top-ad {
  height: 2.666667rem;
  background-image: url(~img/index/top-ad.png);
  background-repeat: no-repeat;
  background-size: cover;
  .top-input {
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
  // height: 3.52rem;
  // background: url(~img/index/huodong-bg.png) no-repeat;
  // background-color: #ffffff;
  // background-size: 6.533333rem;
  // background-position: 50% -0.133333rem;
  // border-bottom: 1px solid #dfdfdf;
  // .item {
  //   height: 1.6rem;
  //   width: 2.666667rem;
  // }
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
    width: 4.08rem;
    height: 2.64rem;
    overflow: hidden;
    margin-bottom: 0.826667rem;
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
</style>
