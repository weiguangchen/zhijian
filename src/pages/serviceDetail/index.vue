<template>
  <div class="page">
    <div class="service-detail">
      <div class="wrapper my-warpper" ref="wrapper">
        <ul class="content">
          <div>
            <div class="banner">
              <!-- <div class="share">
            <i class="iconfont icon-fenxiang" @click="share"></i>
          </div> -->
              <Swiper height='5.12rem' :show-dots='false'>
                <SwiperItem v-for="(item,index) in fw_info.fw_img" :key="index">
                  <img :src="item" alt="" class="img">
                </SwiperItem>
              </Swiper>
            </div>
            <div class="sp-info">
              <div class="top">
                <span class="price">
                  <span class="num">{{fw_info.money}}</span>元
                  <span v-if="fw_info.fw_gg">/{{fw_info.fw_gg}}</span>
                </span>{{fw_info.fw_mingzi}}</div>
              <div class="bottom">{{fw_info.sub_content}}</div>
            </div>
            <!-- <div class="comment">
        <span class="iconfont icon-fuwuxiangqingzan">好评率97%</span>
        <span class="count">共{{fw_info.token_num}}个消费评价</span>
      </div> -->

            <div class="address1" @click="toShop(faceInfo.id)">
              <div class="top">
                <div class="left">
                  <div class="name">{{faceInfo.face_name}}</div>
                  <div class="info">
                    <rater :val='fw_info.token_pj' class="rater" :enable='enable'></rater>
                    <!-- <span class="count">28条</span>
              <span class="juli">5.5KM</span> -->
                  </div>
                </div>
                <!-- <div class="right">
            <span class="iconfont icon-lianxifangshi"></span>
          </div> -->
              </div>
              <div class="bottom">
                <span class="iconfont icon-weizhi1"></span>
                <span class="txt" v-if="faceInfo.map">{{faceInfo.map.poiaddress}}</span>
              </div>
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
import {mapMutations,mapState} from 'vuex';

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

        mountedStatus: false,
        imgLoaded: false,
      };
    },
    created() {
      this.$dialog.loading.open();
      this.get_fw_info();
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
        this.$axios
          .get(_this.API_URL + "/api/Show/fw_content", {
            params: {
              id: _this.fwId
            }
          })
          .then(res => {
            _this.fw_info = res.data[0];
            if (typeof res.data[0].fw_img == "string") {
              var arr = [];
              arr.push(res.data[0].fw_img);
              res.data[0].fw_img = arr;
            }
            this.setMetaTitle(res.data[0].fw_mingzi)
            _this.fw_info.token = res.data[0].token.slice(0, 2);
            _this.fw_info.fw_img = arr;

            this.preloadImages()
          });
      },
      get_face() {
        this.$axios.get(this.API_URL + '/Api/show/get_face', {
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
          this.$axios.get(this.API_URL + '/Api/UserShow/user_dlike', {
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
          this.$axios.get(this.API_URL + '/Api/UserShow/user_like', {
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
        this.$axios.get(this.API_URL + '/Api/UserShow/yes_like', {
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
      padding: 0.373333rem 0.4rem;
      background: #ffffff;
      border-bottom: 1px solid #dfdfdf;
      line-height: 1;
      color: #2b2b2b;
      .top {
        .price {
          margin-right: 0.213333rem;
        }
        .num {
          color: #e13131;
        }
      }
      .middle,
      .bottom {
        display: flex;
        align-items: center;
      }
      .top,
      .middle {
        margin-bottom: 0.32rem;
      }
      .middle,
      .bottom {
        .txt {
          color: #2b2b2b;
          opacity: 0.5;
        }
      }
    }
    .sp-info {
      @extend %public;
      .top {
        @include font-dpr(17px);
        line-height: 1.414;
      }
      .bottom {
        opacity: 0.5;
        @include font-dpr(14px);
        line-height: 0.56rem;
      }
    }
    .comment {
      box-sizing: border-box;
      @extend %public;
      height: 1.16rem;
      @include font-dpr(14px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        @include font-dpr(14px);
        &::before {
          margin-right: 0.506667rem;
        }
      }
      .count {
        opacity: 0.5;
      }
    }
    .address1 {
      @extend %public;
      margin-bottom: 0.373333rem;
      .top {
        display: flex;
        align-items: stretch;
        line-height: 0.453333rem;
        margin-bottom: 0.46rem;
        .left {
          flex: 1;
          .name {
            @include font-dpr(17px);
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
          display: flex;
          justify-content: center;
          align-items: center;
          flex: none;
          width: 1.546667rem;
          border-left: 1px solid #7f7f7f;
          @include font-dpr(25px);
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
