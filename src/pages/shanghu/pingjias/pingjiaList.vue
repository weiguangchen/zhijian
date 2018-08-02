<template>
  <Layout class="pingjia-detail">
    <InfiniteScroll :callback="loadList" ref="infinitescroll">
      <div slot="list">
        <bigTitle title="消费评价详情" class="big-title"></bigTitle>
        <div class="form-box">
          <div class="total-info">
            <div class="thumb-wrap">
              <div class="img-box">
                <img :src="fw_img" alt="" class="thumb">

              </div>
              <star :val='all' class="star"></star>
            </div>
            <div class="star-info">
              <div class="star-line">
                5星
                <starprogress :total='all_token' :num='starinfo.five' class="progress"></starprogress>{{starinfo.five}}
              </div>
              <div class="star-line">
                4星
                <starprogress :total='all_token' :num='starinfo.four' class="progress"></starprogress>{{starinfo.four}}
              </div>
              <div class="star-line">
                3星
                <starprogress :total='all_token' :num='starinfo.three' class="progress"></starprogress>{{starinfo.three}}
              </div>
              <div class="star-line">
                2星
                <starprogress :total='all_token' :num='starinfo.two' class="progress"></starprogress>{{starinfo.two}}
              </div>
              <div class="star-line">
                1星
                <starprogress :total='all_token' :num='starinfo.one' class="progress"></starprogress>{{starinfo.one}}
              </div>
            </div>
          </div>

          <div class="pingjia-content">

            <pinglun v-for="(item,index) in list" :key="index" :info='item' :shanghu='true'></pinglun>
          </div>

        </div>
      </div>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">暂无更多评论</span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <!-- <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" /> -->

    </InfiniteScroll>
  </Layout>

</template>

<script>
  import {
    ViewBox,
    ButtonTab,
    ButtonTabItem
  } from "vux";
  import {
    InfiniteScroll
  } from "vue-ydui/dist/lib.px/infinitescroll";
  import {
    Layout
  } from "vue-ydui/dist/lib.px/layout";
  import pinglun from "@/components/pinglun/index";
  import bigTitle from "@/components/bigTitle/index";
  import starprogress from "@/components/progress/index";
  import star from "@/components/star/index";
  export default {
    data() {
      return {
        activeIndex: 0,
        starinfo: {
          one: "",
          two: "",
          three: "",
          four: "",
          five: ""
        },
        fw_img: "",
        all_token: "",
        all: "",
        list: [],
        p: 1
      };
    },
    created() {
      var _this = this;
      this.getInfo();
      this.getList().then(res => {
        console.log(this);
        console.log(res);
        _this.list = res.list;
      });
    },
    methods: {
      loadList() {
        console.log("到底了");
        this.getList().then(res => {
          this.list = this.list.concat(res.list);
        });
      },
      getInfo() {
        var _this = this;
        this.$axios
          .get( "/Api/Shop/fw_token", {
            params: {
              fw_shop_id: _this.fwId
            }
          })
          .then(({
            data
          }) => {
            _this.starinfo.one = data.one;
            _this.starinfo.two = data.two;
            _this.starinfo.three = data.three;
            _this.starinfo.four = data.four;
            _this.starinfo.five = data.five;
            _this.fw_img = data.img;
            _this.all_token = data.all_token;
            _this.all = data.all;
          });
      },
      getList() {
        var _this = this;
        return this.$axios
          .get( "/Api/Shop/p_fw_token", {
            params: {
              fw_shop_id: _this.fwId,
              num: 4,
              p: _this.p
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            if (data.ok == 1) {
              this.p++;
            } else if (data.ok == 0) {
              _this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
            }
            this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
            return data;
          });
      }
    },
    computed: {
      fwId() {
        return this.$route.params.pingjiaId;
      }
    },
    components: {
      bigTitle,
      ViewBox,
      ButtonTab,
      ButtonTabItem,
      starprogress,
      star,
      pinglun,
      InfiniteScroll,
      Layout
    }
  };

</script>

<style lang='scss'>
  .pingjia-detail {
    .big-title {
      margin-bottom: 0.533333rem;
    }
    .total-info {
      display: flex;
      margin-bottom: 1.066667rem;
      padding-left: 0.533333rem;
      .thumb-wrap {
        position: relative;
        margin-right: 0.24rem;
        .star {
          position: absolute;
          bottom: 0.266667rem;
          left: 0.266667rem;
        }
        .img-box {
          overflow: hidden;
          width: 2.666667rem;
          height: 2.133333rem;
          border-radius: 0.106667rem;
          .thumb {
            height: 100%;
            max-width: none;
            transform: translateX(-15%);
          }
        }
      }

      .star-info {
        .star-line {
          display: flex;
          align-items: center;
          .progress {
            margin: 0 0.106667rem 0 0.16rem;
          }
        }
      }
    }
    .vux-button-group>a.vux-button-group-current {
      background: #de3232;
    }
    .vux-button-group>a.vux-button-tab-item-first:after {
      border: 1px solid #de3232;
    }

    .vux-button-group>a.vux-button-tab-item-last:after {
      border: 1px solid #de3232;
    }
  }

</style>
