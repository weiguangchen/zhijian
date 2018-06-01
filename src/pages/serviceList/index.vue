<template>
    <div class="page">
        <ViewBox>
            <XHeader title='豪景国际大厦' left-options.showBack='false'>
                <span class="iconfont icon-shangmenxichesousuo" slot="right"></span>
            </XHeader>
            <div class="ad">
                <Swiper :aspect-ratio='0.24'>
                    <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
                    <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
                    <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
                </Swiper>
            </div>
            <!-- <div class="classify-list">
                <sticky>
                    <div class="term">
                        <div class="select-box">
                            <span class="term-item">体育中心
                                <span class="iconfont icon-zhankai1"></span>
                            </span>
                            <span class="term-item">智能排序
                                <span class="iconfont icon-zhankai1"></span>
                            </span>
                            <span class="term-item">筛选
                                <span class="iconfont icon-zhankai1"></span>
                            </span>
                        </div>
                        <div class="term-box">

                        </div>
                    </div>
                </sticky>
                <service class="service" v-for="(item,index) in serviceList" :key="index" :fwInfo='item'></service>
            </div> -->
            <tuijian :info='item' v-for="(item,index) in serviceList" :key="index" v-if="item.list.length>0"></tuijian>
        </ViewBox>
        <Loading :show="loading"></Loading>
    </div>
</template>

<script>
import tuijian from "@/components/tuijian/index";
import classify from "@/components/classify/index2";
import service from "@/components/service/service";
import { ViewBox, XHeader, Swiper, SwiperItem, Sticky, Loading } from "vux";
export default {
  data() {
    return {
      classArr: [],
      serviceList: [],
      loading: false
    };
  },
  components: {
    tuijian,
    classify,
    XHeader,
    Swiper,
    SwiperItem,
    ViewBox,
    service,
    Sticky,
    Loading
  },
  created() {
    this.loading = true;
    var _this = this;
    console.log("classid" + this.classId);
    this.$axios
      .get(_this.API_URL + "/api/Show/two_class", {
        params: {
          fid: _this.classId
        }
      })
      .then(res => {
        _this.classArr = res.data.class;
        _this.serviceList = res.data.info;
        _this.loading = false;
      });
    // this.$axios
    //   .get(_this.API_URL + "/api/Show/one_fw", {
    //     params: {
    //       fw_cid: _this.classId
    //     }
    //   })
    //   .then(res => {
    //       _this.serviceList = res.data;
    //     console.log(res);
    //   });
  },
  computed: {
    classId() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.classId;
    }
  }
};
</script>

<style lang='scss'>