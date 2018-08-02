<template>
  <div class="page">
    <ViewBox>
      <classify :classArr='classArr' v-if="classArr.length"></classify>
      <div class="ad">
        <Swiper :aspect-ratio='0.24'>
          <SwiperItem>
            <img :src="item.url" alt="" v-for="(item,index) in ad" :key="index">
          </SwiperItem>
        </Swiper>
      </div>

      <tuijian :info='item' v-for="(item,index) in serviceList" :key="index" v-if="item.list.length>0" fwClass='2'></tuijian>
    </ViewBox>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import tuijian from "@/components/tuijian/index";
  import classify from "@/components/classify/index2";
  import service from "@/components/service/service";
  import {
    ViewBox,
    XHeader,
    Swiper,
    SwiperItem,
    Sticky,
    Loading
  } from "vux";
  import checkLogin from "@/mixins/checkLogin.js";
  import getLocation from "@/mixins/getLocation.js";
  export default {
    data() {
      return {
        classArr: [],
        serviceList: [],
        ad: [],
        title: ''
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
      var _this = this;
      console.log("classid" + this.classId);
      document.title='';

      this.getPosition().then(res => {
        this.SET_LOCATION(res);

        this.get_fw();
      })

      // this.$axios
      //   .get( "/api/Show/two_class", {
      //     params: {
      //       fid: _this.classId
      //     }
      //   })
      //   .then(res => {
      //     console.log("二级类");
      //     _this.classArr = res.data.class;
      //     _this.serviceList = res.data.info;
      //     _this.loading = false;
      //   });

      this.$axios.get( "/Api/Show/get_gg").then(({
        data
      }) => {
        this.ad = data.smeta;
      });

      // this.$axios
      //   .get( "/api/Show/one_fw", {
      //     params: {
      //       fw_cid: _this.classId
      //     }
      //   })
      //   .then(res => {
      //     _this.serviceList = res.data;
      //     console.log(res);
      //   });
    },
    methods: {
      get_fw() {
        var _this = this;
        this.$axios
          .get( "/Api/Yes/two_jl", {
            params: {
              fid: this.classId,
              lng: this.location.lat,
              lat: this.location.lng,
              city:this.location.city
            }
          })
          .then(({
            data
          }) => {
            _this.classArr = data.class;
            _this.serviceList = data.info;
            this.setMetaTitle(data.ming)
          });
      }
    },
    computed: {
      ...mapState(["location"]),
      classId() {
        return this.$route.params.classId;
      }
    },
    mixins: [checkLogin, getLocation]
  };

</script>

<style lang='scss'>
  .ad {
    height: 2.4rem;
  }

</style>
