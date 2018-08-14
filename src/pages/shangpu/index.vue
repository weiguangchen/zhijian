<template>
  <div class="page shop-wrapper">
    <betterScroll>
      <div class="info-wrapper">
        <img src='~img/shangpu/banner.png' alt="" class="blur-bg1">
        <button class="guanzhu" :disabled='collecting'>
          <img src="./img/weiguanzhu.png" alt="" @click='collect' v-if="!ifCollect">
          <img src="./img/guanzhu.png" alt="" @click='collect' v-else>
        </button>
        <div class="info-box">
          <div class="logo">
            <img :src="faceInfo.face_img[0]" alt="" class="img" v-if="faceInfo.face_img">
            <img src="./img/mr_face.jpg" alt="" class="img" v-else>
          </div>
          <div class="info">
            <div>{{faceInfo.face_name}}</div>
            <div>
              <rater :val='faceInfo.star' class="rater"></rater>
            </div>
            <div>
              <span>态度：{{format_fenshu(faceInfo.td_star)}}</span>
              <span>速度：{{format_fenshu(faceInfo.sd_star)}}</span>
              <span>质量：{{format_fenshu(faceInfo.zl_star)}}</span>
            </div>
            <div>营业时间：
              <template v-if="faceInfo.start_day">{{faceInfo.start_day}}到{{faceInfo.end_day}} {{faceInfo.start_time}} —— {{faceInfo.end_time}}</template>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <div class="yhj-btn" @click="toYhjList">点击领取优惠券》</div>

        </div>




      </div>

      <swiper :options="swiperOption" ref="mySwiper" class="top-ad">
        <swiper-slide v-for="(item,index) in top_ad" :key="index">
          <img :src="item.url" alt="">
        </swiper-slide>
      </swiper>
      <!-- <Sticky> -->
      <Tab active-color='#e86359' class="x-tab" v-model="tabActiveIndex" :scroll-threshold='5'>
        <TabItem selected='selected' @on-item-click='changeTab'>
          <i class="iconfont icon-quanbufuwuweixuanzhong"></i>
          <span>全部服务</span>
        </TabItem>
        <TabItem @on-item-click='changeTab'>
          <i class="iconfont icon-huodongxiangmuweixuanzhong"></i>
          <span>活动项目</span>
        </TabItem>
        <TabItem @on-item-click='changeTab'>
          <i class="iconfont icon-yonghupingjiaweixuanzhong"></i>
          <span>用户评价</span>
        </TabItem>
        <TabItem @on-item-click='changeTab'>
          <i class="iconfont icon-youhuiquan"></i>
          <span>优惠券</span>
        </TabItem>
        <TabItem @on-item-click='changeTab'>
          <i class="iconfont icon-shangpuxiangqingxuanzhong"></i>
          <span>商铺详情</span>
        </TabItem>
      </Tab>
      <!-- </Sticky> -->
      <swiper :options="swiperOption" ref="mySwiper" @transitionEnd='transitionEnd'>
        <swiper-slide class="fw-wrapper">
          <div class="toggle-btn">
            <div class="selector">
              <span @click="tuijian">推荐</span>
              <Selector title='类别' :options='classArr' placeholder='类别' v-model="leibie" @on-change='changeFwType'></Selector>
            </div>
            <span>
              <i class="iconfont icon-pingpu" :class="{active:showType == 1}" @click="changeShowType(1)"></i>
              <i class="iconfont icon-liebiao" :class="{active:showType == 2} " @click="changeShowType(2)"></i>
            </span>

          </div>
          <div class="list" v-if="showType == 1">
            <fw v-for="(item,index) in current_fw_list" :key="index" :info='item' :faceId='faceId'></fw>
          </div>
          <div class="fw-list" v-else-if="showType == 2">
            <fw2 v-for="(item,index) in current_fw_list" :key="index" :info='item' :faceId='faceId' class="fw2-item"></fw2>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="list">
            <hd v-for="(item,index) in huodong" :key="index" :info='item'></hd>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="pingjia">
            <div class="list">
              <pinglun :info='item' v-for="(item,index) in pl" :key="index"></pinglun>

            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="yhj-list">
            <yhj v-for="(item,index) in yhj_list" :key="index" :info='item' :disabled='item.l_yes == 0' :status="item.l_yes == 0?1:''" @btnClick='lingqu(item,index)'></yhj>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="sp-info2">
            <div class="top">
              <span class="iconfont icon-yingyeshijian"></span>营业时间：周一到周日 08:00 —— 19:00</div>
            <div class="middle" v-if="faceInfo.tag1">
              <span class="txt" v-for="(item,index) in faceInfo.tag1" :key="index">{{item}}</span>

            </div>
            <div class="bottom" v-if="faceInfo.tag2">
              <span class="txt" v-for="(item,index) in faceInfo.tag2" :key="index">{{item}}</span>

            </div>
          </div>
          <div class="address" v-if="faceInfo.map">
            <div class="left">
              <div class="top">
                <span class="iconfont icon-weizhi1"></span>{{faceInfo.map.poiname}}</div>
              <div class="bottom">
                {{faceInfo.map.poiaddress}}
              </div>
            </div>
            <div class="right">
              <span class="iconfont icon-lianxifangshi" v-if="shopInfo.shop_phone == 0"></span>
            </div>
          </div>
        </swiper-slide>
      </swiper>

    </betterScroll>
  </div>
</template>
<script>
  import {
    // Swiper,
    // SwiperItem,
    ViewBox,
    Cell,
    Group,
    Tab,
    TabItem,
    Sticky,
    Selector,
    Blur
  } from "vux";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import betterScroll from '@/components/betterScroll/index';
  import rater from "@/components/star/index";
  import tuangou from "@/components/service/serviceTuan.vue";
  import huodong from "@/components/service/huodong.vue";
  import fw from "./components/shop_service.vue";
  import fw2 from "./components/shop_service2.vue";
  import hd from "./components/shop_huodong.vue";
  import checkLogin from "@/mixins/checkLogin.js";
  import pinglun from "@/components/pinglun/index";

  import {
    Slider,
    SliderItem
  } from 'vue-ydui/dist/lib.px/slider';

  import defaultImg from './img/mr_face.jpg';
  import yhj from '@/pages/yhj/components';
  export default {
    data() {
      return {
        ifCollect: false,
        collecting: false,
        collect_id: {},
        val: 3,
        shopInfo: "",
        fw_list: [],
        current_fw_list: [],
        huodong: [],
        selected: '全部服务',
        tabActiveIndex: 0,
        swiperOption: {
          autoHeight: true
        },
        top_ad: [],
        showType: 2,
        classArr: [],
        leibie: '',

        faceInfo: {},
        pl: [],
        tag1: [],
        tag2: [],

        yhj_noData: false,
        yhj_p: 1,
        yhj_list: []
      };
    },
    created() {
      var _this = this;
      this.get_shop();
      this.collect_status();
      this.get_card();
      this.get_gg();
      this.get_face_info();
    },
    methods: {

      transitionEnd() {
        console.log(this.swiper.activeIndex)
        this.tabActiveIndex = this.swiper.activeIndex
      },
      changeTab(val) {
        this.swiper.slideTo(val, 200, false)
      },
      changeShowType(type) {
        this.showType = type;
      },
      getClassArr(fw) {
        if (fw.length > 0) {
          var classArr = [];
          var classs = [];
          fw.map(m => {
            if (classs.indexOf(m.fw_id) < 0) {
              var cls = {};
              cls.key = m.fw_id;
              cls.value = m.two_name;
              classArr.push(cls);
              classs.push(m.fw_id);
            }
          })
          this.classArr = classArr;
          console.log(classArr)
        }
      },
      get_shop() {
        this.$axios
          .get("/Api/Show/get_shop", {
            params: {
              shop_id: this.faceId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            // this.shopInfo = data[0];
            // this.setMetaTitle(data[0].shop_name);
            // this.getClassArr(data[0].fw);
            // this.current_fw_list = data[0].fw;
          });
      },
      get_card() {
        // 获取所有活动
        this.$axios
          .get("/Api/Show/get_card", {
            params: {
              shop_id: this.faceId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.huodong = data;
          });
      },
      get_gg() {
        this.$axios.get("/Api/Show/get_gg").then(({
          data
        }) => {
          // 获取头部广告
          this.top_ad = data.list_banner;
        });
      },
      get_face_info() {
        var _this = this;
        this.$axios.get('/Api/show/get_face', {
          params: {
            face_id: this.faceId
          }
        }).then(({
          data
        }) => {
          data.face.map = JSON.parse(data.face.map);
          this.faceInfo = data.face;
          this.fw_list = data.fw;
          this.setMetaTitle(data.face.face_name);
          this.getClassArr(data.fw);
          this.current_fw_list = data.fw;
          this.huodong = data.hd;
          this.get_pl();
          this.get_yhj();
          this.$wx.ready(function () {
            _this.share();
          })
        })
      },
      get_pl() {
        this.$axios.get('/Api/Show/shop_get_token', {
          params: {
            shop_id: this.faceInfo.fw_shop_id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.pl = data;

        })
      },
      changeFwType(fwId) {
        if (fwId == 0) {
          this.current_fw_list = this.fw_list;
        } else {
          this.current_fw_list = this.fw_list.filter(m => {
            return m.fw_id == fwId;
          })
        }

      },
      tuijian() {
        this.leibie = '';
        this.current_fw_list = this.fw_list;
      },
      collect() {
        this.collecting = true;
        if (this.ifCollect) {
          this.$axios.get('/Api/UserShow/user_dlike', {
            params: {
              id: this.collect_id
            }
          }).then(({
            data
          }) => {
            console.log(data);
            if (data.status == 1) {
              this.ifCollect = false;
            } else {
              this.ifCollect = true;
            }
            this.collecting = false;
          })
        } else {
          this.$axios.get('/Api/UserShow/user_like', {
            params: this.collect_params
          }).then(({
            data
          }) => {
            console.log(data);
            this.collecting = false;
            if (data.status == 1) {
              this.ifCollect = true;
            } else {
              this.ifCollect = false;
            }
            this.collect_id = data.id;
          })
        }

      },
      collect_status() {
        this.$axios.get('/Api/UserShow/yes_like', {
          params: this.collect_params
        }).then(({
          data
        }) => {
          console.log(data);
          if (data.status == 1) {
            this.ifCollect = true;
          } else {
            this.ifCollect = false;
          }
          this.collect_id = data.zhi.id;
        })
      },
      format_fenshu(num) {
        if (num) {
          return (num.toString()).indexOf('.') < 0 ? `${num}.0` : num
        }
      },
      share() {
        var windowUrl = window.location.href;
        var url = this.$production_url;
        this.$wxShare({
          title: this.faceInfo.face_name,
          desc: '',
          link: url + this.$route.fullPath,
          imgUrl: this.faceInfo.face_img || defaultImg,
        });

      },
      toYhjList() {
        this.swiper.slideTo(3, 200, false)
      },
      get_yhj() {
        this.$axios.get('/Api/yhq/shop_yhq_list', {
          params: {
            shop_id: this.faceInfo.fw_shop_id,
            user_id: this.id,
            num: 99999,
            p: this.yhj_p
          }
        }).then(({
          data
        }) => {
          console.log(data);
          this.yhj_list = data.list;
        })
      },
      lingqu(yhj, index) {
        this.$axios.get('/Api/Yhq/user_get_yhq', {
          params: {
            yhq_id: yhj.id,
            shop_id: this.faceInfo.fw_shop_id,
            user_id: this.id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            this.yhj_list[index].l_yes = 0;
            this.$vux.alert.show({
              title: '提示',
              content: '领取成功！'
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '领取失败！'
            })
          }
        })
      }
    },
    computed: {
      faceId() {
        return this.$route.params.shangpuId;
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      collect_params() {
        return {
          uid: this.id,
          sid: this.faceId,
          face_id: this.faceId,
          tj: 0
        }
      }
    },
    mounted() {

    },
    components: {
      ViewBox,
      rater,
      tuangou,
      Cell,
      Group,
      huodong,
      Tab,
      TabItem,
      Sticky,
      Slider,
      SliderItem,
      fw,
      fw2,
      hd,
      betterScroll,
      swiperSlide,
      swiper,
      Selector,
      Blur,
      pinglun,
      yhj
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .banner {
    height: 5.12rem;
    overflow: hidden;
  }

  .shop-wrapper {
    padding-bottom: 50px;
    .info-wrapper {
      position: relative;
      padding: .533333rem/* 40/75 */
      .4rem/* 30/75 */
      ;
      margin-bottom: $bot;
      color: #ffffff;
      overflow: hidden;
      .info-box {
        display: flex;
        z-index: 9999;
        .logo {
          position: relative;
          width: 2.133333rem/* 160/75 */
          ;
          height: 2.133333rem/* 160/75 */
          ;
          margin-right: .466667rem/* 35/75 */
          ;
          border-radius: .133333rem/* 10/75 */
          ;
          overflow: hidden;
          flex: none;
          .img {
            width: 100%;
          }
        }
        .info {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

        }
      }
      .btn-box {
        padding-left: 2.6rem/* 195/75 */
        ;
        .yhj-btn {
          position: relative;
          width: 2.933333rem/* 220/75 */
          ;
          z-index: 9999;
          margin-top: .266667rem/* 20/75 */
          ;
          height: .533333rem/* 40/75 */
          ;
          background: url(./img/yhj-btn.png) no-repeat;
          background-size: cover;
          text-align: center;
          font-size: .32rem/* 24/75 */
          ;
        }
      }

      .blur-bg1 {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        filter: blur(5px);
      }
      .blur-bg {
        position: absolute;
        top: -99999px;
        right: -99999px;
      }
      .blur-canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .guanzhu {
        position: absolute;
        top: 0;
        right: .48rem/* 36/75 */
        ;
        z-index: 9999;
        width: 1rem;
        border: none;
      }
    }
    .x-tab {
      .vux-tab,
      .vux-tab-container {
        height: 1.706667rem/* 128/75 */
        ;
      }
      .vux-tab-item {
        display: flex;
        flex-direction: column;

        .iconfont {
          font-size: .6rem/* 45/75 */
          ;
        }
        span {
          line-height: 1;
          font-size: .32rem/* 24/75 */
          ;
        }
        .icon-yonghupingjiaweixuanzhong {
          font-size: .533333rem/* 40/75 */
          ;
        }

      }

    }
    .vux-tab-wrap {
      padding-top: 1.706667rem/* 128/75 */
      ;
    }
    .fw-wrapper {
      background: #ffffff;
      .toggle-btn {
        display: flex;
        justify-content: space-between;
        padding: 0 .4rem/* 30/75 */
        ;
        height: 1.333333rem/* 100/75 */
        ;
        align-items: center;
        .selector {
          display: flex;
          align-items: center;
          .vux-selector {
            &:after,
            &:before {
              border: none;
            }
          }
          .weui-cells {
            margin-top: 0;
            &:after {
              border: none;
            }
            &:before {
              border: none;
            }
          }
          .weui-select {
            height: .533333rem/* 40/75 */
            ;
            font-size: .333333rem/* 25/75 */
            ;
            line-height: .533333rem/* 40/75 */
            ;
          }
          .weui-cell__bd {
            &:after {
              display: none;
            }
          }
          .weui-label {
            width: 1px;
            visibility: hidden;
          }
        }
        .iconfont {
          font-size: .733333rem/* 55/75 */
          ;
          color: #b2b2b2;
          margin-left: .666667rem/* 50/75 */
          ;
        }
        .active {
          color: #000000;
        }
      }
    }
    .fw-list {
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      padding: .426667rem/* 32/75 */
      ;
      &:after {
        content: '';
        display: block;
        clear: both;
      }
      .fw2-item {
        float: left;
        margin-right: .333333rem/* 25/75 */
        ;
        margin-bottom: .36rem/* 27/75 */
        ;
      }
      .fw2-item {
        &:nth-child(even) {
          margin-right: 0;
        }
      }
    }
    .top-ad {
      height: 2.4rem;
    }
    .yhj-list {
      background: #ffffff;
      padding: .4rem/* 30/75 */
      ;
    }
    %public {
      padding: 0.32rem 0.56rem 0.32rem 0.4rem;
      background: #ffffff;
      border-bottom: 1px solid #dfdfdf;
      line-height: 1;
      color: #2b2b2b;
      .top,
      .middle,
      .bottom {
        display: flex;
        align-items: center;
      }
      .top,
      .middle {
        margin-bottom: 0.32rem;
      }
      .middle,
      .bottom {
        .txt {
          color: #2b2b2b;
          opacity: 0.5;
        }
      }
    }

    .sp-info1 {
      @extend %public;

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include font-dpr(16px);
        color: #2b2b2b;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .rater {
        margin-right: 0.8rem;
      }
    }

    .sp-info2 {
      .iconfont {
        @include font-dpr(22px);
      }
      @extend %public;
      .top {
        @include font-dpr(12px);
        .icon-yingyeshijian {
          margin-right: 0.186667rem;
        }
      }
      .middle,
      .bottom {
        padding-left: 0.8rem;
      }
      .middle {
        .txt {
          margin-right: 0.88rem;
        }
      }
      .bottom {
        .txt {
          display: flex;
          align-items: center;
          padding: 0 0.213333rem;
          height: 0.453333rem;
          border: 1px solid #7f7f7f;
          border-radius: 0.08rem;
          margin-right: 0.293333rem;
        }
      }
    }

    .address {
      padding: 0.293333rem 0 0.293333rem 0.4rem;
      background: #ffffff;
      display: flex;
      color: #2b2b2b;
      margin-bottom: 0.373333rem;
      .iconfont {
        @include font-dpr(24px);
      }
      .top {
        display: flex;
        align-items: center;
        line-height: 0.453333rem;
        margin-bottom: 0.2rem;
        .icon-weizhi1 {
          margin-right: 0.24rem;
        }
      }
      .bottom {
        padding-left: 0.8rem;
        opacity: 0.5;
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.026667rem;
      }
    }

    .tuangou {
      margin-bottom: 0.373333rem;
      .tit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.933333rem;
        padding: 0 0.453333rem;
        background: #ffffff;
        border-bottom: 1px solid #dfdfdf;
        color: #2b2b2b;
        .left,
        .right {
          display: flex;
          align-items: center;
        }
        .left {
          font-size: 17px;
        }
        .right {
          font-size: 12px;
          opacity: 0.5;
          .icon-dui {
            &:first-child {
              margin-right: 0.48rem;
            }
            &:before {
              margin-right: 0.133333rem;
            }
          }
        }
        .icon {
          width: 0.586667rem;
          margin-right: 0.2rem;
        }
      }
    }

    .pingjia {
      margin-bottom: 0.373333rem;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include font-dpr(17px);
        background: #ffffff;
        height: 1.026667rem;
        padding: 0 0.453333rem;
        border-bottom: 1px solid #dfdfdf;
      }
      .item {
        display: flex;
        background: #ffffff;
        border-bottom: 1px solid #dfdfdf;
        .left {
          padding: 0.32rem 0.32rem 0 0.4rem;
          .avatar {
            width: 1.466667rem;
            height: 1.466667rem;
            border-radius: 50%;
          }
        }
        .right {
          padding: 0.426667rem 0.4rem 0.4rem 0;
          flex: 1;
          line-height: 1;
          .tit {
            margin-bottom: 0.346667rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #2b2b2b;
            .name {
              font-size: 15px;
            }
            .date {
              opacity: 0.5;
              font-size: 12px;
            }
          }
          .rater {
            margin-bottom: 0.4rem;
          }
          .content {
            margin-bottom: 0.4rem;
            .txt {
              line-height: 0.56rem;
              margin-bottom: 0.266667rem;
            }
            .imgs {
              display: flex;
              justify-content: space-between;
              img {
                width: 2.066667rem;
                height: 1.786667rem;
              }
            }
          }
          .click {
            display: flex;
            align-items: center;
            justify-content: space-between;
            @include font-dpr(12px);
            color: #2b2b2b;
            opacity: 0.5;
          }
        }
      }
    }

    .hot {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include font-dpr(17px);
        background: #ffffff;
        height: 1.026667rem;
        padding: 0 0.4rem;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 0.4rem;
        background: #ffffff;
      }
      .item {
        width: 4.24rem;
        line-height: 1;
        background: #ffffff;
        padding-bottom: 0.426667rem;
        .thumb {
          width: 100%;
          margin-bottom: 0.133333rem;
        }
        .tit {
          @include font-dpr(15px);
          color: #2b2b2b;
          margin-bottom: 0.213333rem;
        }
        .rater {
          margin-bottom: 0.293333rem;
        }
        .tip {
          display: flex;
          justify-content: space-between;
          color: #2b2b2b;
          @include font-dpr(12px);
          opacity: 0.5;
        }
      }
    }
  }

</style>
