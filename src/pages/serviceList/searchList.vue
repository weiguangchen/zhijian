<template>
  <div class="page service-list" ref="lay">
    <Layout>
      <InfiniteScroll ref="infinitescroll" :callback="loadList">
        <template slot="list">
          <div class="ad">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item,index) in top_ad" :key="index">
                <img :src="item.url" alt="">
              </swiper-slide>
            </swiper>
          </div>
          <div class="classify-list">
            <!-- <sticky>
              <div class="term">
                <div class="select-box">
                  <span class="term-item" :class="{active:(selectType == 1&&selectAddShow)}" @click="selectAdd(1)">
                    <span class="text">{{currentInfo.area.sq.val}}</span>
                    <span class="iconfont icon-zhankai1"></span>
                  </span>
                  <span class="term-item" :class="{active:(selectType == 2&&selectAddShow)}" @click="selectAdd(2)">
                    <span class="text">{{currentInfo.order.val}}</span>
                    <span class="iconfont icon-zhankai1"></span>
                  </span>
                  <span class="term-item" :class="{active:(selectType == 3&&selectAddShow)}" @click="selectAdd(3)">
                    <span class="text">{{currentInfo.search.val}}</span>
                    <span class="iconfont icon-zhankai1"></span>
                  </span>
                </div>

                <div class="address-select-box" v-show="selectAddShow">
                  <div class="add" v-if="selectType == 1">
                    <div class="qy">
                      <div class="item" :class="{active:qyVal.key == 0}" @click="fujin">附近</div>
                      <div class="item" @click="selectQy(item)" v-for="(item,index) in qy" :key="index" :class="{active:qyVal.key== item.id}">{{item.qy_name}}</div>
                    </div>
                    <div class="sq">
                      <template v-if="sq.length>0">
                        <div class="item" :class="{active:sqVal.key == item.id}" v-for="(item,index) in sq" :key="index" @click="selectSq(item)">{{item.sq_name}}</div>
                      </template>
                      <div class="item" v-else>暂未开通</div>
                    </div>

                  </div>
                  <div class="order-type" v-else-if="selectType == 2">
                    <div class="item" :class="{active:orderVal.key == item.key}" @click="selectOrder(item)" v-for="(item,index) in order" :key="index">{{item.val}}</div>
                  </div>
                  <div class="select" v-else-if='selectType == 3'>
                    <div class="item" :class="{active:searchVal.key == item.key}" v-for="(item,index) in search" :key="index">{{item.val}}</div>
                  </div>
                </div>
              </div>
            </sticky> -->
            <service class="service" v-for="(item,index) in serviceList" :key="index" :fwInfo='item'></service>

          </div>
        </template>

        <span slot="doneTip">暂无更多服务</span>
      </InfiniteScroll>
    </Layout>

  </div>

</template>

<script>
  import addressSelect from "@/components/addressSelect/index";
  import service from "@/components/service/service";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import {
    ViewBox,
    XHeader,
    Sticky,
    Selector,
    Group,
    XDialog
  } from "vux";
  import {
    InfiniteScroll
  } from "vue-ydui/dist/lib.px/infinitescroll";
  import {
    Layout
  } from "vue-ydui/dist/lib.px/layout";
  import checkLogin from "@/mixins/checkLogin.js";
  import getLocation from "@/mixins/getLocation.js";
  export default {
    name: "service-list",
    data() {
      return {
        top_ad: [],
        selectAddShow: false,
        selectType: "",
        adHeight: "",
        swiperOption: {
          loop: true,
          autoplay: true
        },
        qy: [],
        qyVal: {
          val: "附近",
          key: 0
        },
        sq: [{
          val: "附近",
          key: 0
        }],
        sqVal: {
          val: "附近",
          key: 0
        },
        order: [{
          val: "智能排序",
          key: 1
        }],
        orderVal: {
          val: "智能排序",
          key: 1
        },
        search: [{
          val: "暂无",
          key: 1
        }],
        searchVal: {
          val: "暂无",
          key: 1
        },

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
      document.title = "";
      var _this = this;
      this.setMetaTitle('搜索结果')
      this.getPosition().then(res => {
        console.log("获取定位成功");
        console.log(res);
        this.SET_LOCATION(res);
        this.get_fw().then(res => {
          this.serviceList = res.list;
        });

        this.$axios.get(_this.API_URL + "/Api/Show/get_gg").then(({
          data
        }) => {
          // 获取头部广告
          this.top_ad = data.list_banner;
        });
        this.get_city();
      });
    },
    methods: {
      get_fw() {
        var _this = this;
        var params = {
          tj: this.searchUrlQuery,
          num: 8,
          p: _this.p,
          lng: _this.location.lat,
          lat: _this.location.lng,
          city: this.location.province
        };

        return this.$axios
          .get(_this.API_URL + "/Api/Yes/fw_js", {
            params
          })
          .then(({
            data
          }) => {
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
        console.log('到底了')
        var _this = this;
        this.get_fw().then(res => {
          console.log(res);
          _this.serviceList = _this.serviceList.concat(res.serviceList);
        });
      },
      selectAdd(type) {
        if (this.selectType == type) {
          this.selectAddShow = !this.selectAddShow;
        } else {
          this.selectAddShow = true;
        }
        this.selectType = type;
      },
      selectQy(qy) {
        console.log(qy);
        this.sq = qy.sq;
        this.qyVal.val = qy.qy_name;
        this.qyVal.key = qy.id;
      },
      selectSq(sq) {
        console.log(sq);
        var _this = this;
        this.sqVal.val = sq.sq_name;
        this.sqVal.key = sq.id;
        this.selectAddShow = false;
        this.get_fw({
          sq_id: _this.sqVal.key
        }).then(res => {
          this.serviceList = res.list;
        });
      },
      selectOrder(order) {
        this.orderVal.val = order.val;
        this.orderVal.key = order.key;
        this.selectAddShow = false;
      },
      selectSearch(search) {
        this.searchVal.val = search.val;
        this.searchVal.key = search.key;
        this.selectAddShow = false;
      },
      fujin() {
        this.qyVal = {
          key: 0,
          val: "附近"
        };
        this.sq = [{
          id: 0,
          sq_name: "附近"
        }];
      },
      get_city() {
        var _this = this;
        this.$axios
          .get("http://zj.daonian.cn/Api/UserShow/city")
          .then(({
            data
          }) => {
            data.map(m => {
              if (m.city == _this.location.province) {
                _this.qy = m.qy;
              }
            });
          });
      }
    },

    computed: {
      classId() {
        return this.$route.params.classId;
      },
      currentInfo() {
        var obj = {
          area: {
            qy: {},
            sq: {}
          },
          order: {},
          search: {}
        };
        obj.area.qy = this.qyVal;
        obj.area.sq = this.sqVal;
        obj.order = this.orderVal;
        obj.search = this.searchVal;
        return obj;

      },
      searchUrlQuery() {
        return this.$route.query.search;
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
            padding: .1rem/* 10/100 */
            ;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            .text {
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: 1;
            }
          }
          .active {
            color: #cb2620;
          }
        }
        .term-box {
          position: absolute;
          bottom: 0;
          left: 0;
          background: red;
        }
        .addressSelect {}
        .iconfont {
          color: #b6b6b6;
          @include font-dpr(14px);
        }
      }
    }
    .address-select-box {
      width: 100%;
      z-index: 9999;
      background: #ffffff;
      .add {
        display: flex;
      }
      .item {
        padding: 0.266667rem 0.533333rem;
        @include font-dpr(12px);
      }
      .active {
        color: #cb2620;
      }
    }
  }

</style>
