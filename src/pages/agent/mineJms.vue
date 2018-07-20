<template>
    <div class="mine-jms page">
        <betterScroll @pullingUp='pullingUp' ref='scroll'>
            <div>
                <jms :jms='item' v-for="(item,index) in list" :key='index'></jms>
            </div>
            <span slot="loadingTip">正在加载数据...</span>
            <span slot="doneTip">暂无更多数据</span>
        </betterScroll>
    </div>
</template>

<script>
import betterScroll from "@/components/betterScroll";
import checkLogin from "@/mixins/checkLogin.js";
import jms from "./components/jms";
 import setTitle from '@/mixins/setTitle.js'

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
        .get(this.API_URL + "/Api/DlCore/dl_get_shop", {
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
    pullingUp() {
      this.$refs.scroll.finishPullupload();
    }
  },
  components: {
    jms,
    betterScroll
  },
  mixins: [checkLogin,setTitle]
};
</script>

<style lang='scss'>
.mine-jms {
}
</style>