/*
 * @Author: 魏广辰 
 * @Date: 2018-05-26 12:02:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-01 14:37:16
 */
<template>
  <div class="page">
    <ViewBox>
      <div class="top-ad">
        <div class="top-input">
          <span class="add">天津</span>
          <XInput placeholder='请输入商家名或地点' class="search"></XInput>
        </div>
      </div>
      <classify :classArr='classArr'></classify>
      <div class="huodong">
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
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
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { ViewBox, Tabbar, TabbarItem, Tab, TabItem, Sticky, XInput } from "vux";
import service from "@/components/service/service";
import classify from "@/components/classify/index";
import tuijian from "@/components/tuijian/index";

import wxConfig from "@/mixins/wxConfig.js";

export default {
  data() {
    return {
      selectedTab: 0,
      classArr: [],
      listArr: {},
      activeListId: ""
    };
  },
  created() {
    var _this = this;

    // var userId = this.$cookies.get("user");
    // if (userId) {
    //   console.log("存在cookie");
    //   this.$axios
    //     .get("/api/api/Show/get_user", {
    //       params: {
    //         id: userId
    //       }
    //     })
    //     .then(res => {
    //       console.log(res);
    //       _this.SAVE_ID(userId);
    //       _this.SAVE_USERINFO(res.data[0]);
    //     });
    // } else {
    //   console.log("不存在cookie");
    // }

    this.$axios.get("http://zj.daonian.cn/api/Show/one_class").then(res => {
      console.log(res);
      _this.classArr = res.data.class;
      _this.listArr = res.data.info;
    });

    this.$wx.ready(function() {
      _this.$wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          console.log("地理位置:");
          console.log(res);
        }
      });
    });
  },
  methods: {
    ...mapMutations(["SAVE_ID", "SAVE_USERINFO"]),
    changeItem(index) {
      this.activeItem = index;
    }
  },
  computed: {
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
    XInput
  },
  mixins: [wxConfig]
};
</script>

<style lang='scss'>
.top-ad {
  height: 2.666667rem;
  background: url(~img/index/top-ad.png) no-repeat;
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
      flex: 1;
      height: 0.693333rem;
      border: 1px solid #000000;
      border-radius: 0.346667rem;
      @include font-dpr(12px);
    }
  }
}

.huodong {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1.56rem 0.4rem 0;
  height: 3.52rem;
  background: url(~img/index/huodong-bg.png) no-repeat;
  background-color: #ffffff;
  background-size: 6.533333rem;
  background-position: 50% -0.133333rem;
  border-bottom: 1px solid #dfdfdf;
  .item {
    height: 1.6rem;
    width: 2.666667rem;
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
