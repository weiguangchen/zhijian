<template>
    <div class="page">
        <ViewBox>
            <XHeader title='豪景国际大厦' left-options.showBack='false'>
                <span class="iconfont icon-shangmenxichesousuo" slot="right"></span>
            </XHeader>
            <classify :classArr='classArr'></classify>
            <div class="ad">
                <Swiper :aspect-ratio='0.24'>
                    <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
                    <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
                    <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
                </Swiper>
            </div>
            
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
      serviceList:[],
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
      .get(_this.API_URL+ "/api/Show/two_class", {
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
.ad {
  height: 2.4rem;
}

</style>