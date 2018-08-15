<template>
  <div class="page">
    <div class="service-detail">
      <div class="wrapper my-warpper" ref="wrapper">
        <ul class="content">
          <div>
            <div class="banner">
              <Swiper height='5.12rem' :show-dots='false'>
                <SwiperItem v-for="(item,index) in fw_info.fw_img" :key="index">
                  <img :src="item" alt="" class="img">
                </SwiperItem>
              </Swiper>
            </div>
            <div class="sp-info">
              <div class="top">{{fw_info.fw_mingzi}}</div>
              <div class="middle">{{fw_info.sub_content}}</div>
              <div class="bottom">
                <span class="left">
                  <em>{{fw_info.money}}</em>&nbsp;&nbsp;元
                  <template v-if="fw_info.fw_gg">/{{fw_info.fw_gg}}</template>
                </span>
                <span class="right">已售{{fw_info.buy_number}}单</span>
              </div>
            </div>
            <!-- <div class="comment">
              <span class="iconfont icon-fuwuxiangqingzan">好评率97%</span>
              <span class="count">共{{fw_info.token_num}}个消费评价</span>
            </div> -->

            <div class="address1">
              <div class="top">
                <div class="left" @click="toShop(faceInfo.id)">
                  <div class="name">{{faceInfo.face_name}}</div>
                  <div class="info">
                    <rater :val='fw_info.token_pj' class="rater" :enable='enable'></rater>
                    <!-- <span class="count">28条</span>
                    <span class="juli">5.5KM</span> -->
                  </div>
                </div>
                <div class="right">
                  <a class="iconfont icon-lianxifangshi" :href="'tel:'+faceInfo.face_phone"></a>
                </div>
              </div>
              <div class="bottom">
                <span class="iconfont icon-weizhi1"></span>
                <span class="txt" v-if="faceInfo.map">{{faceInfo.map.poiaddress}}</span>
              </div>
            </div>
            <div class="yhj" @click='toList'>
              <span class="tit">领劵</span>
              <div class="yhjs" v-if="yhj.length>0">
                <span class="yhj-item" v-for="(item,index) in yhj" :key="index">
                  <i class="l"></i>
                  <span class="c">满{{$filter_money(item.man_jian)}}减{{$filter_money(item.yh_money)}}</span>
                  <i class="r"></i>
                </span>
              </div>
              <i class="iconfont icon-jinru"></i>
            </div>
            <div class="detail">
              <myTitle>
                <span>服务详情</span>
                <!-- <span slot="right">更多图文详情
              <i class="iconfont icon-jinru"></i>
            </span> -->
              </myTitle>
              <div class="content">
                <img :src="item.url" alt="" v-for="(item,index) in fw_info.fw_content" :key="index">
              </div>
            </div>
            <div class="pingjia">
              <Group>
                <Cell :title="'网友点评('+fw_info.token_num+')'">
                  <span @click="more(fwId)">更多</span>
                </Cell>
              </Group>
              <!-- <div class="title">
                    <div class="left">网友点评(28)</div>
                    <span class="iconfont icon-jinru"></span>
                </div> -->
              <div class="list">
                <pinglun :info='item' v-for="(item,index) in fw_info.token" :key="index"></pinglun>
              </div>
            </div>

            <!-- <div class="hot">
        <div class="title">小伙伴们还喜欢</div>
        <friendLike :friendLike='fw_info.friend_like'></friendLike>

      </div> -->

          </div>
        </ul>
      </div>


      <!-- </betterScroll> -->
      <div class="buy-btn">
        <div class="opbtn">
          <!-- <span>
            <i>￥</i>{{fw_info.money}}
            <sup>￥{{fw_info.y_money}}</sup>
          </span> -->
          <div class="op-item" @click="toShop(faceInfo.id)">
            <i class="iconfont icon-dianpu"></i>
            <div>店铺</div>
          </div>
          <button class="op-item" @click="collect" :disabled='collecting'>
            <i class="iconfont icon-shoucang1" v-if="ifCollect"></i>
            <i class="iconfont icon-shoucangweixuan" v-else></i>
            <div>收藏</div>
          </button>
          <!-- <div class="op-item">
            <i class="iconfont icon-dianpu"></i>
            <div>购物车</div>
          </div> -->
        </div>
        <div class="buy" @click="buy">立即购买</div>
      </div>
    </div>

  </div>
</template>
<script>
  import {
    Swiper,
    SwiperItem,
    ViewBox,
    Cell,
    Group,
  } from "vux";
  import rater from "@/components/star/index";
  import tuangou from "@/components/service/serviceTuan.vue";
  import myTitle from "@/components/title/index";
  import pinglun from "@/components/pinglun/index";
  import checkLogin from "@/mixins/checkLogin.js";
  import friendLike from "@/components/friendLike/index";
  import betterScroll from '@/components/betterScroll/index';
  import BScroll from "better-scroll";
  import {
    mapMutations,
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        enable: true,
        fw_info: {},
        faceInfo: {},
        testimg: [],
        ifCollect: false,
        collecting: false,
        collect_id: {},
        yhj:[],

        mountedStatus: false,
        imgLoaded: false,
      };
    },
    created() {
      var _this = this;
      this.$dialog.loading.open();
      this.get_fw_info().then(data => {
        this.setMetaTitle(data.fw_mingzi)
        this.fw_info = data;



        this.fw_info.token = data.token.slice(0, 2);
        var arr = [];
        arr.push(data.fw_img);
        this.fw_info.fw_img = arr;

        this.preloadImages();
        this.$wx.ready(function () {
          console.log('wx分享配置')
          _this.share();
        })
        this.get_yhj();
      })
      this.get_face();
      this.collect_status();

    },
    methods: {
      ...mapMutations(['SET_IF_MRADD']),
      buy() {
        var _this = this;
        this.SET_IF_MRADD(true);
        this.$router.push({
          path: "/queren",
          query: {
            serviceId: this.fwId,
            faceId: this.faceId,
            shopId: this.fw_info.shop_id,
          }
        });
      },
      toDetail(id) {
        this.$router.replace("/serviceDetail/" + id);
      },
      get_fw_info() {
        var _this = this;
        return this.$axios
          .get("/api/Show/fw_content", {
            params: {
              id: _this.fwId
            }
          })
          .then(({
            data
          }) => {
            return data[0];
          });
      },
      get_face() {
        this.$axios.get('/Api/show/get_face', {
          params: {
            face_id: this.faceId
          }
        }).then(({
          data
        }) => {
          data.face.map = JSON.parse(data.face.map);
          this.faceInfo = data.face;
        })
      },
      toShop(id) {
        this.$router.push("/shangpu/" + id);
      },
      more(id) {
        this.$router.push("/pinglun/" + id);
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
      preloadImages() {
        var loadednum = 0;
        var newimg = [];
        var imgarr = this.fw_info.fw_content;
        console.log(imgarr)
        if (imgarr) {
          for (let i = 0; i < imgarr.length; i++) {
            newimg[i] = new Image();
            newimg[i].src = imgarr[i].url
            newimg[i].onload = () => {
              loadednum++;
              if (loadednum == imgarr.length) {
                console.log('加载完了')
                this.imgLoaded = true;

              }
            }
            newimg[i].onerror = () => {}
          }
        } else {
          this.$dialog.loading.close();
        }


      },
      share() {
        var windowUrl = window.location.href;
        var url = this.$production_url;
        this.$wxShare({
          title: this.fw_info.fw_mingzi,
          desc: this.fw_info.sub_content,
          link: url + this.$route.fullPath,
          imgUrl: this.fw_info.fw_img[0],
        });

      },
      toList() {
        var query = {
          fwId: this.fwId,
          shopId: this.fw_info.shop_id
        }
        this.$router.push({
          path: '/lqYhj',
          query
        })
      },
      get_yhj() {
        this.$axios.get('/Api/Yhq/fw_yhq_list', {
          params: {
            shop_id: this.fw_info.shop_id,
            fw_id: this.fwId,
            user_id: this.id,
            num: 3,
            p: 1
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.yhj = data.list;
        })
      }
    },
    mounted() {
      this.mountedStatus = true;


    },
    watch: {
      $route() {
        this.get_fw_info();

      },
      isInitBetterScroll(newval) {
        console.log('触发初始化')
        console.log(newval)
        this.isLoading = false;
        if (newval) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            tap: true,
            click: true,
          });
          this.$dialog.loading.close();

        }
      }
    },
    computed: {
      ...mapState(['if_moren_add']),
      fwId() {
        return this.$route.params.serviceId;
      },
      faceId() {
        return this.$route.params.faceId;
      },
      collect_params() {
        return {
          uid: this.id,
          sid: this.fwId,
          face_id: this.faceId,
          tj: 1
        }
      },
      isInitBetterScroll() {
        return this.mountedStatus && this.imgLoaded;
      }
    },
    filters: {
      hotPL(val) {
        return val.slice(0, 2);
      }
    },
    components: {
      ViewBox,
      Swiper,
      SwiperItem,
      rater,
      tuangou,
      Cell,
      Group,
      myTitle,
      pinglun,
      friendLike,
      betterScroll,
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .service-detail {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 1.333333rem;
    .my-warpper {
      height: 100%;
    }
    .banner {
      height: 5.12rem;
      overflow: hidden;
      position: relative;
      .share {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 1.066667rem;
        background: rgba(#000000, 0.4);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: .4rem/* 30/75 */
        ;
        .iconfont {
          color: #ffffff;
          font-size: .48rem/* 36/75 */
          ;
        }
      }
      .img {
        width: 100%;
      }
    }

    %public {
      background: #ffffff;
      border-bottom: 1px solid #dfdfdf; // line-height: 1;
    }
    .sp-info {
      @extend %public;
      padding: 0.373333rem 0.4rem;
      .top {
        font-size: .453333rem/* 34/75 */
        ;
        font-weight: bold;
        line-height: 1.414;
        margin-bottom: 0.32rem;
      }
      .middle {
        font-size: .346667rem/* 26/75 */
        ;
        color: #a3a3a3;
        margin-bottom: 0.32rem;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .left {
          font-size: .32rem/* 24/75 */
          ;
          color: #f12522;
          em {
            font-weight: bold;
            font-size: .48rem/* 36/75 */
            ;
          }
        }
        .right {
          font-size: .346667rem/* 26/75 */
          ;
          color: #a3a3a3;
        }
      }
    } // .comment {
    //   box-sizing: border-box;
    //   height: 1.16rem;
    //   @include font-dpr(14px);
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   .iconfont {
    //     @include font-dpr(14px);
    //     &::before {
    //       margin-right: 0.506667rem;
    //     }
    //   }
    //   .count {
    //     opacity: 0.5;
    //   }
    // }
    .address1 {
      @extend %public;
      margin-bottom: 0.373333rem;
      padding: 0.373333rem 0 0.373333rem 0.4rem;
      .top {
        display: flex;
        align-items: stretch;
        line-height: 0.453333rem;
        margin-bottom: 0.46rem;
        .left {
          flex: 1;
          .name {
            font-size: .4rem/* 30/75 */
            ;
            margin-bottom: 0.426667rem;
          }
          .info {
            .rater {
              margin-right: 0.8rem;
            }
            .count {
              margin-right: 2.48rem;
              opacity: 0.5;
            }
            .juli {
              opacity: 0.5;
            }
          }
        }
        .right {
          width: 1.973333rem/* 148/75 */
          ;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: none;
          border-left: 1px solid #7f7f7f;
          .iconfont {
            font-size: .64rem/* 48/75 */
            ;
            color: #292929;

          }
        }
        .icon-weizhi1 {
          margin-right: 0.24rem;
        }
      }
      .bottom {
        color: #2b2b2b;
        .iconfont {
          @include font-dpr(20px);
          margin-right: 0.346667rem;
        }

        .txt {
          @include font-dpr(12px);
          opacity: 0.5;
        }
      }
    }
    .yhj {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.866667rem/* 140/75 */
      ;
      background: #ffffff;
      margin-bottom: $bot;
      .tit {
        width: 1.653333rem/* 124/75 */
        ;
        flex: none;
        text-align: center;
      }
      .yhjs {
        display: flex;
        justify-content: space-between;
        flex: 1;
        .yhj-item {
          display: flex;
          height: 1.146667rem/* 86/75 */
          ;
          %lr {
            width: .053333rem/* 4/75 */
            ;
            flex: 1;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .l {
            @extend %lr;
            background-image: url(./img/yhj-l.png);
          }
          .r {
            @extend %lr;
            background-image: url(./img/yhj-r.png);
          }
          .c {
            display: flex;
            align-items: center;
            background: url(./img/yhj-bg.png);
            color: #ffffff;
            padding: 0 .16rem/* 12/75 */
            ;
          }
        }
      }
      .iconfont {
        width: 1.066667rem/* 80/75 */
        ;
        flex: none;
        text-align: center;
      }
    }
    .detail {
      margin-bottom: 0.373333rem;
      .content {
        padding: 0.533333rem 0.4rem;
        background: #ffffff;
        @include font-dpr(13px);
        img {
          width: 100%;
        }
      }
    }
    .pingjia {
      margin-bottom: 0.373333rem;
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
    }

    .buy-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.333333rem;
      background: #ffffff;
      display: flex;
      box-shadow: 0 0 9px 1px rgba(#000000, 0.57);
      .price,
      .buy,
      .opbtn {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .price {
        flex: none;
        width: 5.333333rem;
        line-height: 1;
        background: #dedede;
        @include font-dpr(30px);
        color: #ff1b36;
        font-weight: bold;
        sup {
          @include font-dpr(12px);
          color: #131313;
          opacity: 0.5;
        }
        i {
          font-style: normal;
          @include font-dpr(13px);
        }
      }
      .opbtn {
        background: #dedede;
        flex: 1;
        .op-item {
          flex: 1;
          text-align: center;
          border: none;
          .iconfont {
            display: inline-block;
            @include font-dpr(16px);
            margin-bottom: 0.133333rem;
          }
          .icon-shoucang1 {
            color: #ff1b36;
          }
        }
      }
      .buy {
        width: 4.666667rem;
        flex: none;
        background: #ff1b36;
        color: #ffffff;
        @include font-dpr(18px);
      }
    }
  }

</style>
