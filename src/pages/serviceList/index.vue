<template>
  <div class="page">
    <Layout>
      <InfiniteScroll ref="infinitescroll" :callback="loadList" >
        <div slot="list">
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
          <div class="classify-list">
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
          </div>
        </div>

        <span slot="doneTip">暂无更多评论</span>
      </InfiniteScroll>
    </Layout>
  </div>

</template>

<script>
import service from "@/components/service/service";
import { ViewBox, XHeader, Swiper, SwiperItem, Sticky, Loading,Selector,Group } from "vux";
import { InfiniteScroll } from "vue-ydui/dist/lib.px/infinitescroll";
import { Layout } from "vue-ydui/dist/lib.px/layout";
export default {
  name:'service-list',
  data() {
    return {
      loading: false,
      classArr: [],
      serviceList: [],
      p: 1
    };
  },
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    ViewBox,
    service,
    Sticky,
    Loading,
    InfiniteScroll,
    Layout,
    Selector,
    Group
  },
  created() {
    document.title = "服务列表";
    var _this = this;
    this.get_fw().then(res => {
      _this.serviceList = res.list;
    });
  },
  methods: {
    get_fw() {
      var _this = this;
      return this.$axios
        .get(_this.API_URL + "/api/Show/two_fw", {
          params: {
            fw_id: _this.classId,
            num: 8,
            p: _this.p
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
    loadList(){}
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
    }
    .term-box {
      position: absolute;
      bottom: 0;
      left: 0;
      background: red;
    }

    .iconfont {
      color: #b6b6b6;
      @include font-dpr(20px);
    }
  }
}
</style>