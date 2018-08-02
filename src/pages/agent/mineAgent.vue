<template>
    <div class="mine-agent page">
        <betterScroll>
            <div class="list">
                <div v-for="(item,index) in list" :key="index" class="agent-wrapper">
                    <agentCity v-if="item.dl_jb == 2" :agent='item'></agentCity>
                    <agentQy v-else-if="item.dl_jb == 3" :agent='item'></agentQy>
                </div>
            </div>
        </betterScroll>
    </div>
</template>

<script>
import betterScroll from "@/components/betterScroll";
import checkLogin from "@/mixins/checkLogin.js";
import agentCity from "./components/agentCity";
import agentQy from "./components/agentQy";
 import setTitle from '@/mixins/setTitle.js'

export default {
  data() {
    return {
      p: 1,
      list: []
    };
  },
  created() {
    this.get_all_agent();
  },
  methods: {
    get_all_agent() {
      this.$axios
        .get( "/Api/DlCore/get_all_dl", {
          params: {
            dl_jb: this.userinfo.dl[0].dl_jb,
            dl_id: this.userinfo.dl[0].id,
            num: 8,
            p: this.p
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.list = data.list;
        });
    },

  },
  components: {
    agentCity,
    agentQy,
    betterScroll
  },
  mixins: [checkLogin,setTitle]
};
</script>

<style lang='scss' scoped>
.mine-agent {
  .agent-wrapper {
    &:nth-child(odd) {
      .agent-item {
        background: url(~img/public/agent-list.png) no-repeat;
        background-position: 0 50%;
        background-size: cover;
        color: #ffffff;
        .top {
          border-bottom: 1px solid #ffffff;
        }
      }
    }
    &:nth-child(even) {
      .agent-item {
        color: #000000;
        .top {
          border-bottom: 1px solid #000000;
        }
      }
    }
  }
}
</style>