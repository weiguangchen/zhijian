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
    mapState,
    mapGetters
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
      document.title = '';
      this.get_fw();
      this.get_gg();
      this.get_two_class();


    },
    methods: {
      get_fw() {
        var _this = this;
        this.$axios
          .get("/Api/Yes/two_jl", {
            params: {
              fid: this.classId,
              lng: this.currentLocation.lat,
              lat: this.currentLocation.lng,
              city: this.currentLocation.city
            }
          })
          .then(({
            data
          }) => {
            this.serviceList = data.info;
          });
      },
      get_two_class(){
        this.$axios.get('/Api/Yes/two',{
          params:{
            fid:this.classId
          }
        }).then(({data})=>{
          console.log(data)
          this.classArr = data.class;
          this.setMetaTitle(data.ming)
        })
      },
      get_gg() {
        this.$axios.get("/Api/Show/get_gg").then(({
          data
        }) => {
          this.ad = data.smeta;
        });
      }
    },
    computed: {
      ...mapState(["location"]),
      ...mapGetters(['currentLocation']),
      classId() {
        return this.$route.params.classId;
      }
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .ad {
    height: 2.4rem;
  }

</style>
