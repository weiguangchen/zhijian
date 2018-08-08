<template>
  <div class="page service-list">
    <div class="top1">
      <div class="ad">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in top_ad" :key="index">
            <img :src="item.url" alt="">
          </swiper-slide>
        </swiper>
      </div>
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
        <!-- <addressSelect class="addressSelect" 
              :type='selectType' v-if="location" v-show="selectAddShow" :currentInfo='currentSelInfo' 
              @selectSq='selectSq' 
              @selectQy='selectQy'
              @selectOrder='selectOrder'
              @init='init'></addressSelect> -->
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
    </div>
    <div class="scroll-wrapper">
      <scroller ref="myscroller" :on-infinite="infinite">

        <div class="classify-list">

          <service class="service" v-for="(item,index) in list" :key="index" :fwInfo='item'></service>

        </div>
      </scroller>
    </div>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex';
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
        select: {},


        classArr: [],
        list: [],
        noData: false,
        p: 1
      };
    },

    created() {
      document.title = "";
      var _this = this;

      this.get_fw();
      this.get_city();
      this.get_gg();

    },
    watch: {
      currentLocation() {
        // this.get_fw();
      }
    },
    methods: {
      infinite(done) {
        this.get_fw(done);
      },
      get_fw(fn) {
        var _this = this;

        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return
        } else {
          // 还有数据
          this.$axios.get('/Api/Yes/new_two_list', {
            params: this.params
          }).then(({
            data
          }) => {
            console.log(data)
            this.setMetaTitle(data.fw_name)
            if (data.ok == 1) {
              //   还有数据
              this.p++;
            } else {
              //   没有数据
              this.noData = true;
            }
            console.log(this.list)
            this.list = this.list.concat(data.list);
            if (fn) fn();
          })
        }
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

        this.select = {
          sq_id: _this.sqVal.key
        }
        this.get_fw();
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
      },
      get_gg() {
        this.$axios.get("/Api/Show/get_gg").then(({
          data
        }) => {
          // 获取头部广告
          this.top_ad = data.list_banner;
        });
      }
    },

    computed: {
      ...mapGetters(['currentLocation']),
      classId() {
        // 我们很快就会看到 `params` 是什么
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
      params() {
        var deafultParams = {
          fw_id: this.classId,
          num: 8,
          p: this.p,
          lng: this.currentLocation.lat,
          lat: this.currentLocation.lng,
          city: this.currentLocation.city
        };

        var params = Object.assign(deafultParams, this.select);
        return params;
      }
      // search(){
      //   return this.$route.query.search;
      // }
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
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .service-list {
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    .top1 {
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
    .scroll-wrapper {
    position: relative;
      flex: 1;
    }
    .swiper-container {
      height: 2.4rem;
    }
    .classify-list {
      .service {
        margin-bottom: 0.133333rem;
      }

    }

  }

</style>
