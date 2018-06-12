<template>
    <!-- <div class="page">
        <div class="pinglun-detail"> -->
    <!-- <div class="pl-top">
                <div class="pl-item active">
                    <div class="count">28</div>
                    <div class="tit">全部</div>
                </div>
                <div class="pl-item">
                    <div class="count">12</div>
                    <div class="tit">好评</div>
                </div>
                <div class="pl-item">
                    <div class="count">2</div>
                    <div class="tit">中评</div>
                </div>
                <div class="pl-item">
                    <div class="count">1</div>
                    <div class="tit">差评</div>
                </div>
                <div class="pl-item">
                    <div class="count">12</div>
                    <div class="tit">有图</div>
                </div>
            </div> -->
    <Layout>
        <InfiniteScroll :callback="loadList" ref="infinitescroll">
            <div slot="list">
                <pinglun :info='item' v-for="(item,index) in list" :key="index"></pinglun>
            </div>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">暂无更多评论</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <!-- <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" /> -->

        </InfiniteScroll>
    </Layout>
    <!-- </div>
    </div> -->

</template>

<script>
import { InfiniteScroll } from "vue-ydui/dist/lib.px/infinitescroll";
import { Layout } from "vue-ydui/dist/lib.px/layout";
import pinglun from "@/components/pinglun/index";
export default {
  data() {
    return {
      list: [],
      p: 1,
    };
  },
  created() {
    document.title = "全部评论";
    var _this = this;
    this.get_all_pl().then(res => {
      _this.list = res.list;
    });
  },
  methods: {
    loadList() {
      var _this = this;
      this.get_all_pl().then(res => {
          console.log(res)
        // _this.list = [..._this.list, ...res.list];
        _this.list = _this.list.concat(res.list)
      });
    },
    get_all_pl() {
      var _this = this;
      return this.$axios(this.API_URL + "/Api/Show/token_all", {
        params: {
          fw_shop_id: _this.fwId,
          num: 4,
          p: _this.p
        }
      }).then(({ data }) => {
        if (data.ok == 1) {
          this.p++;
        } else if (data.ok == 0) {
          _this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
          return data;
        }
        _this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
        return data;
      });
    }
  },
  components: { pinglun, Layout, InfiniteScroll },
  computed: {
    fwId() {
      return this.$route.params.serviceId;
    }
  }
};
</script>

<style lang='scss'>
.pinglun-detail {
  height: 100%;
  .pl-top {
    height: 1.866667rem;
    background: #ffffff;
    display: flex;
    line-height: 1;
    .pl-item {
      color: #2b2b2b;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      flex: 1;
      @include font-dpr(13px);
      .count {
        margin-bottom: 0.16rem;
      }
    }
    .active {
      color: #de3230;
    }
  }
}
</style>