<template>
  <div class="page service-list" ref="lay">
    <Layout>
      <InfiniteScroll ref="infinitescroll" :callback="loadList">
        <template slot="list">
          <div class="ad">
            <!-- <Swiper :aspect-ratio='0.24' ref="ad">
              <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
              <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
              <SwiperItem><img src="~img/class/ad.png" alt=""></SwiperItem>
            </Swiper> -->
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide><img src="~img/class/ad.png" alt=""></swiper-slide>
              <swiper-slide><img src="~img/class/ad.png" alt=""></swiper-slide>
              <swiper-slide><img src="~img/class/ad.png" alt=""></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="classify-list">
            <sticky>
              <div class="term">
                <div class="select-box">
                  <span class="term-item" :class="{active:selectType == 1}" @click="selectAdd(1)">
                    <span>{{currentSelInfo.area.val}}</span>
                    <span class="iconfont icon-zhankai1"></span>
                  </span>
                  <span class="term-item" :class="{active:selectType == 2}" @click="selectAdd(2)">
                    <span>{{currentSelInfo.order.val}}</span>
                    <span class="iconfont icon-zhankai1"></span>
                  </span>
                  <span class="term-item" :class="{active:selectType == 3}" @click="selectAdd(3)">
                    <span>更多</span>
                    <span class="iconfont icon-zhankai1"></span>
                  </span>
                </div>
                <div class="term-box">

                </div>
              </div>
            </sticky>
            <service class="service" v-for="(item,index) in serviceList" :key="index" :fwInfo='item'></service>
            <service class="service" v-for="(item,index) in serviceList1" :key="index" :fwInfo='item'></service>
            <service class="service" v-for="(item,index) in serviceList2" :key="index" :fwInfo='item'></service>
          </div>
        </template>

        <span slot="doneTip">暂无更多服务</span>
      </InfiniteScroll>
    </Layout>
    <addressSelect class="addressSelect" :type='selectType' v-if="location" v-show="selectAddShow" :currentInfo='currentSelInfo'></addressSelect>

  </div>

</template>

<script>
import addressSelect from "@/components/addressSelect/index";
import service from "@/components/service/service";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { ViewBox, XHeader, Sticky, Selector, Group, XDialog } from "vux";
import { InfiniteScroll } from "vue-ydui/dist/lib.px/infinitescroll";
import { Layout } from "vue-ydui/dist/lib.px/layout";
import checkLogin from "@/mixins/checkLogin.js";
import getLocation from "@/mixins/getLocation.js";
export default {
  name: "service-list",
  data() {
    return {
      currentSelInfo: {
        area: {
          key: 0,
          val: "附近"
        },
        order: {
          key: 0,
          val: "智能排序"
        },
        select: {}
      },

      selectAddShow: false,
      selectType: 1,
      adHeight: "",

      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },

      classArr: [],
      serviceList: [],
      serviceList1: [],
      serviceList2: [],
      p: 1
    };
  },

  created() {
    document.title = "服务列表";
    var _this = this;

    this.getPosition().then(res => {
      console.log("获取定位成功");
      console.log(res);
      this.SET_LOCATION(res);
      this.get_fw().then(res => {
        this.serviceList = res.list;
        this.serviceList1 = res.list;

        this.serviceList2 = res.list;
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.adHeight = this.$refs.mySwiper.$el.offsetHeight;
    });
  },
  methods: {
    get_fw() {
      var _this = this;
      return this.$axios
        .get(_this.API_URL + "/Api/Fj/two_list", {
          params: {
            fw_id: _this.classId,
            num: 8,
            p: _this.p,
            lng: _this.location.lat,
            lat: _this.location.lng,
            city: this.location.province
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data.ok == 1) {
            _this.p++;
          } else if (data.ok == 0) {
            _this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
          }
          _this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
          return data;
        });
    },
    loadList() {
      var _this = this;
      this.get_fw().then(res => {
        console.log(res);
        _this.serviceList = _this.serviceList.concat(res.serviceList);
      });
    },
    selectAdd(type) {
      this.selectType = type;
      if (document.querySelector("#scrollView").scrollTop < this.adHeight) {
        document.querySelector("#scrollView").scrollTop = this.adHeight;
      }
      this.selectAddShow = true;
    }
  },

  computed: {
    classId() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.classId;
    }
  },
  components: {
    XHeader,
    ViewBox,
    service,
    Sticky,
    InfiniteScroll,
    Layout,
    Selector,
    Group,
    XDialog,
    addressSelect,
    swiperSlide,
    swiper
  },
  mixins: [checkLogin, getLocation]
};
</script>

<style lang='scss'>
.service-list {
  .swiper-container {
    height: 2.4rem;
  }
  .classify-list {
    .service {
      margin-bottom: 0.133333rem;
    }
    .term {
      position: relative;
      height: 1.386667rem;
      border-bottom: 1px solid #dfdfdf;
      background: #ffffff;
      color: #2b2b2b;
      @include font-dpr(15px);
      .select-box {
        height: 100%;
        display: flex;
        .term-item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
        }
        .active{
          color:#cb2620;
        }
      }
      .term-box {
        position: absolute;
        bottom: 0;
        left: 0;
        background: red;
      }

      .iconfont {
        color: #b6b6b6;
        @include font-dpr(14px);
      }
    }
  }
  .addressSelect {
  }
}
</style>