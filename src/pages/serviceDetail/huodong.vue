<template>
  <div class="page service-detail">
    <div class="wrapper my-warpper" ref="wrapper">
      <ul class="content">
        <div>
          <div class="banner">
            <div class="share"></div>
            <img :src="huodong_info.hd_img" alt="" class="img">
          </div>
          <div class="sp-info">
            <div class="top">
              <span class="price">
                <span class="num">{{huodong_info.card_money}}</span>元</span>{{huodong_info.card_name}}</div>
            <div class="bottom">{{huodong_info.card_subname}}</div>
          </div>

          <!-- <div class="comment">
                <span class="iconfont icon-fuwuxiangqingzan">好评率97%</span>
                <span class="count">共{{fw_info.token_num}}个消费评价</span>
            </div> -->

          <div class="address1" @click="toShop(huodong_info.card_face_id)">
            <div class="top">
              <div class="left">
                <div class="name" v-if="huodong_info.shop">{{huodong_info.shop[0].shop_name}}</div>
                <!-- <div class="info">
                            <rater :val='fw_info.token_pj' class="rater" :enable='enable'></rater>
                            <span class="count">28条</span>
                            <span class="juli">5.5KM</span>
                        </div> -->
              </div>
              <!-- <div class="right">
                        <span class="iconfont icon-lianxifangshi"></span>
                    </div> -->
            </div>
            <!-- <div class="bottom">
                    <span class="iconfont icon-weizhi1"></span>
                    <span class="txt">卫国道泰兴路益寿东里37号楼底商（近仁爱医院）</span>
                </div> -->
          </div>
          <div class="detail">
            <myTitle>
              <span>服务详情</span>
              <!-- <span slot="right">更多图文详情
                <i class="iconfont icon-jinru"></i>
              </span> -->
            </myTitle>
            <div class="content">
              <!-- v-if="huodong_info.content[0].hd_content" v-html="huodong_info.content[0].hd_content" -->
              <img :src="item.url" alt="" v-for="(item,index) in huodong_info.content" :key="index">

            </div>
          </div>

          <!-- <div class="pingjia">
        <Group>
          <Cell :title="'网友点评('+fw_info.token_num+')'">
            <span @click="more(fwId)">更多</span>
          </Cell>
        </Group>

        <div class="list">
          <pinglun :info='item' v-for="(item,index) in fw_info.token" :key="index"></pinglun>
        </div>
      </div>

      <div class="hot">
        <div class="title">小伙伴们还喜欢</div>
        <friendLike :friendLike='fw_info.friend_like'></friendLike>

      </div> -->

        </div>
      </ul>
    </div>



    <div class="buy-btn">
      <div class="opbtn">
        <!-- <span>
            <i>￥</i>{{fw_info.money}}
            <sup>￥{{fw_info.y_money}}</sup>
          </span> -->
        <div class="op-item" @click="toShop(huodong_info.card_face_id)">
          <i class="iconfont icon-dianpu"></i>
          <div>店铺</div>
        </div>
        <button class="op-item" :disabled='collecting' @click="collect">
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

  export default {
    data() {
      return {
        enable: true,
        huodong_info: {},
        ifCollect: false,
        collecting: false,
        collect_id: {},
        mountedStatus: false,
        imgLoaded: false,
        isLoading: true
      };
    },
    created() {
      document.title = "活动详情";
      this.$dialog.loading.open();
      this.collect_status();
      this.get_hd_info();
    },
    methods: {
      buy() {
        var _this = this;
        if (this.id) {
          this.$router.push({
            path: "/huodongqueren",
            query: {
              huodongId: this.huodongId,
              faceId:this.faceId
            }
          });
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: "请先登录",
            onHide() {
              _this.$router.push({
                path: "/index"
              });
            }
          });
        }
      },
      get_hd_info() {
        var _this = this;
        this.$axios
          .get(_this.API_URL + "/Api/Show/get_hd_content", {
            params: {
              id: _this.huodongId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            _this.huodong_info = data[0];
            this.preloadImages();
            // this.preloadImages().then(() => {
            //   this.scroll = new BScroll(this.$refs.wrapper, {
            //     tap: true,
            //     click: true,
            //   });
            // })
          });
      },
      toShop(id) {
        this.$router.push("/shangpu/" + id);
      },
      more(id) {
        this.$router.push("/pinglun/" + id);
      },
      preloadImages() {
        var loadednum = 0;
        var newimg = [];
        var imgarr = this.huodong_info.content;
        console.log(imgarr)
        for (let i = 0; i < imgarr.length; i++) {
          newimg[i] = new Image();
          newimg[i].src = imgarr[i].url
          newimg[i].onload = () => {
            loadednum++;
            console.log(loadednum)
            console.log(imgarr.length)
            if (loadednum == imgarr.length) {
              console.log('加载完了')
              this.imgLoaded = true;
              // resolve();
            }
          }
          newimg[i].onerror = () => {
            // reject();
          }
        }
        // return new Promise((resolve, reject) => {
        //   for (let i = 0; i < imgarr.length; i++) {
        //     newimg[i] = new Image();
        //     newimg[i].src = imgarr[i].url
        //     newimg[i].onload = () => {
        //       loadednum++;
        //       if (loadednum = imgarr.length) {
        //         console.log('加载完了')
        //         this.imgLoaded = true;
        //         resolve();
        //       }
        //     }
        //     newimg[i].onerror = () => {
        //       reject();
        //     }
        //   }

        // })
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
    },
    mounted() {
      this.mountedStatus = true;
    },
    watch: {
      $route() {
        this.get_hd_info();
      },
      isInitBetterScroll(newval) {
        console.log('触发初始化')
        console.log(newval)
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
      huodongId() {
        return this.$route.params.huodongId;
      },
      faceId(){
        return this.$route.params.faceId;
      },
      isInitBetterScroll() {
        return this.mountedStatus && this.imgLoaded;
      },
      collect_params() {
        return {
          uid: this.id,
          sid: this.huodongId,
          face_id:this.huodong_info.card_face_id,
          tj: 2
        }
      },
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
      .top,
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
