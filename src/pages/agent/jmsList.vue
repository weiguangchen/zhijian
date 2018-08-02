<template>
    <div class="jms-list page">
        <betterScroll @pullingUp='pullingUp' ref='scroll'>
          <jms :jms='item' v-for="(item,index) in list" :key='index' ></jms>
            <!-- <div class="jms-item" v-for="(item,index) in list" :key='index' @click='toDetail(item.id)'>
                <div class="line">
                    <span class="icon">
                        <i class="iconfont icon-jiamengshang"></i>
                    </span>
                    <span class="tit">加盟商</span>
                    <span>{{item.shop_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.shop_phone}}</span>
                </div>
                <div class="line1">
                    <span class="tit">地址</span>
                    <span>{{item.adress}}

                    </span>
                </div>
                <div class="line2">
                    查看详情
                    <i class="iconfont icon-jinru"></i>
                </div>
            </div> -->
            <span slot="loadingTip">正在加载数据...</span>
            <span slot="doneTip">暂无更多数据</span>
        </betterScroll>
    </div>
</template>

<script>
import betterScroll from "@/components/betterScroll";
import jms from "./components/jms";
 import setTitle from '@/mixins/setTitle.js'

import checkLogin from "@/mixins/checkLogin.js";

export default {
  data() {
    return {
      p: 1,
      list: []
    };
  },
  created() {
    this.get_shop();

  },
  methods: {
    get_shop() {
      this.$axios
        .get( "/Api/DlCore/dl_get_shop", {
          params: {
            dl_jb: this.userinfo.dl[0].dl_jb,
            dl_id: this.userinfo.dl[0].id,
            num: 8,
            p: this.p
          }
        })
        .then(({ data }) => {
          if (data.ok == 1) {
            console.log("还有数据");
            this.p = this.p + 1;
          } else if (data.ok == 0) {
            console.log("没数据了");
            this.$refs.scroll.closePullUp();
          }
          this.list = this.list.concat(data.list);
          this.$refs.scroll.pullupLoadend();
        });
    },
    toDetail(id) {
      this.$router.push({
        path: "/jmsDetail",
        query: {
          id
        }
      });
    },
    pullingUp() {
      this.get_shop();
      this.$refs.scroll.finishPullupload();
    }
  },
  components: {
    betterScroll,
    jms
  },
  mixins: [checkLogin,setTitle]
};
</script>

<style lang='scss' scoped>
.jms-list {
  .jms-item {
    $icon: 1.4rem;
    padding: 0.586667rem 0;
    background: #ffffff;
    margin-bottom: $bot;
    .line,
    .line1,
    .line2 {
      display: flex;
      align-items: center;
      font-size: 0.373333rem;
      .tit {
        width: 2.666667rem;
      }
    }
    .line2 {
      font-size: 0.32rem;
      justify-content: flex-end;
      color: #a3a3a3;
      padding-right: 0.4rem;
      .iconfont {
        font-size: 0.16rem;
      }
    }
    .line {
      margin-bottom: 0.586667rem;
      .icon {
        width: $icon;
        text-align: center;
        .iconfont {
          font-size: 0.56rem;
        }
      }
    }
    .line1 {
      padding-left: $icon;
      margin-bottom: 0.4rem;
    }
  }
}
</style>