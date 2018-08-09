<template>
  <div class="page service-list">
    <div class="top">
      <div class="ad">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in top_ad" :key="index">
            <img :src="item.url" alt="">
          </swiper-slide>
        </swiper>
      </div>
      <div class="term">
        <div class="select-box">
          <span class="term-item" :class="{active:(selectType == 1&&selectAddShow)}" @click="selectAdd(1)">
            <span>{{currentInfo.area.sq.val}}</span>
            <span class="iconfont icon-zhankai1"></span>
          </span>
          <span class="term-item" :class="{active:(selectType == 2&&selectAddShow)}" @click="selectAdd(2)">
            <span>{{currentInfo.order.val}}</span>
            <span class="iconfont icon-zhankai1"></span>
          </span>
          <span class="term-item" :class="{active:(selectType == 3&&selectAddShow)}" @click="selectAdd(3)">
            <span>{{currentInfo.search.val}}</span>
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

    <div class="list">
      <scroller :on-infinite="infinite" ref="myscroller">
        <service class="service" v-for="(item,index) in list" :key="index" :fwInfo='item'></service>
      </scroller>
    </div>


  </div>

</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex';
  import addressSelect from "@/components/addressSelect/index";
  import service from "@/components/service/card";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import {
    ViewBox,
    XHeader,
    Selector,
    Group,
    XDialog
  } from "vux";

  import checkLogin from "@/mixins/checkLogin.js";
  import getLocation from "@/mixins/getLocation.js";
  import setTitle from '@/mixins/setTitle.js';
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
        noData: false,
        classArr: [],
        list: [],
        p: 1
      };
    },
    watch: {
      qyVal(newval) {
        this.currentInfo.area.qy.val = newval.val;
        this.currentInfo.area.qy.val = newval.key;
      },
      sqVal(newval) {

        this.currentInfo.area.sq.val = newval.val;
        this.currentInfo.area.sq.val = newval.key;
        console.log(this.currentInfo)
        console.log(newval)

      }
    },
    created() {
      var _this = this;

      this.get_gg();
      this.get_city();

      if (this.index_hd_id) {
        this.get_index_hd();
      } else {
        this.get_list();
      }


    },
    methods: {
      ...mapMutations(['SET_INDEX_HD_ID']),
      infinite(done) {
        console.log('到底')
        this.get_list();
      },
      get_list(fn) {
        var _this = this;
        // 合并条件
        var params = Object.assign(this.params, this.select);
        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return
        } else {
          this.$axios
            .get("/Api/See/two_list", {
              params
            })
            .then(({
              data
            }) => {
              if (data.ok == 1) {
                _this.p++;
              } else if (data.ok == 0) {
                //   没有数据
                this.noData = true;
              }
              this.list = this.list.concat(data.list);
              if (fn) fn();
            });
        }

      },
      get_index_hd(fn) {
        var _this = this;

        this.noData = true;
        var params = Object.assign(this.params, {
          id: this.index_hd_id
        })

        this.$axios
          .get("/Api/See/get_hd", {
            params
          })
          .then(({
            data
          }) => {

            this.list = this.list.concat(data);
          });
        // if (this.noData) {
        //   // 没有数据了
        //   this.$refs.myscroller.finishInfinite(true);
        //   return
        // } else {
        //   this.$axios
        //     .get("/Api/See/get_hd", {
        //       params
        //     })
        //     .then(({
        //       data
        //     }) => {
        //       if (data.ok == 1) {
        //         _this.p++;
        //       } else if (data.ok == 0) {
        //         //   没有数据
        //         this.noData = true;
        //       }
        //       this.list = this.list.concat(data.list);
        //       if (fn) fn();
        //     });
        // }

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

        // 清空活动id
        this.SET_INDEX_HD_ID('');

        this.get_list({
          sq_id: _this.sqVal.key
        }).then(res => {
          this.list = res.list;
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
      ...mapState(['index_hd_id']),
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
        return {
          num: 8,
          p: this.p,
          lng: this.currentLocation.lat,
          lat: this.currentLocation.lng,
          city: this.currentLocation.city
        };
      }
    },
    destroyed() {
      // 清空活动id
      this.SET_INDEX_HD_ID('');
    },
    components: {
      XHeader,
      ViewBox,
      service,
      Selector,
      Group,
      XDialog,
      addressSelect,
      swiperSlide,
      swiper
    },
    mixins: [checkLogin, getLocation, setTitle]
  };

</script>

<style lang='scss'>
  .service-list {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
    .top {
      .swiper-container {
        height: 2.4rem;
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

    .list {
      position: relative;
      flex: 1;
      .service {
        margin-bottom: 0.133333rem;
      }

    }
  }

</style>
