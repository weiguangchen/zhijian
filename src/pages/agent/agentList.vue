<template>
  <div class="agent-list page">
    <betterScroll>
      <div class="list" v-if="type == 1">
        <!-- <div class="agent-item" v-for="(item,index) in list" :key="index">
          <div class="top">
            <div class="line">
              <span class="icon">
                <i class="iconfont icon-shijidaili"></i>
              </span>
              <span class="txt1">{{item.city_name}}代理</span>
              <span>{{item.dl_name}}{{item.dl_phone}}</span>
            </div>
            <div class="line2">
              <span class="txt1">地址</span>
              <span class="add">{{item.adress}}</span>
            </div>
          </div>
          <div class="bot">
            <span>区县代理：{{item.qy_count}}</span>
            <span>加盟商：{{item.shop_count}}</span>
          </div>
        </div> -->
        <agentCity :agent='item' v-for="(item,index) in list" :key="index"></agentCity>
      </div>
      <div class="list" v-else-if='type == 2'>
        <!-- <div class="agent-item" v-for="(item,index) in list" :key="index">
          <div class="top">
            <div class="line">
              <span class="icon">
                <i class="iconfont icon-quxiandaili"></i>
              </span>
              <span class="txt1">{{item.city_name}}代理</span>
              <span>{{item.dl_name}}{{item.dl_phone}}</span>
            </div>
            <div class="line2">
              <span class="txt1">地址</span>
              <span class="add">{{item.adress}}</span>
            </div>
          </div>
          <div class="bot">
            <span>加盟商：{{item.shop_count}}</span>
          </div>
        </div> -->
        <agentQy :agent='item' v-for="(item,index) in list" :key="index"></agentQy>
      </div>

    </betterScroll>

  </div>
</template>

<script>
  import betterScroll from "@/components/betterScroll";
  import checkLogin from "@/mixins/checkLogin.js";
  import agentCity from './components/agentCity';
  import agentQy from './components/agentQy';
  import setMetaTitle from '@/assets/js/setTitle.js';
  export default {
    data() {
      return {
        list: []
      };
    },
    created() {
      if (this.type == 1) {
        this.get_city();
        this.setMetaTitle('市级代理')
      } else if (this.type == 2) {
        if (this.userinfo.dl[0].dl_jb == 1) {
          // 股东代理查看区代
          this.get_qy();
        } else if (this.userinfo.dl[0].dl_jb == 2) {
          // 区域代理查看区代
          this.get_city_qy();
        }
        this.setMetaTitle('区级代理')
      }
    },
    methods: {
      get_city() {
        this.$axios
          .get( "/Api/DlCore/gd_city", {
            params: {
              gd_id: this.userinfo.dl[0].id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.list = data;
          });
      },
      get_qy() {
        this.$axios
          .get( "/Api/DlCore/gd_qy", {
            params: {
              gd_id: this.userinfo.dl[0].id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.list = data;
          });
      },
      get_city_qy() {
        this.$axios
          .get( "/Api/DlCore/city_qy", {
            params: {
              qy_id: this.userinfo.dl[0].id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.list = data;
          });
      }
    },
    computed: {
      type() {
        return this.$route.query.type;
      }
    },
    components: {
      betterScroll,
      agentCity,
      agentQy
    },
    mixins: [checkLogin]
  };

</script>

<style scoped lang='scss'>
  .agent-list {
    .agent-item {
      &:nth-child(odd) {
        background: url(~img/public/agent-list.png) no-repeat;
        background-position: 0 50%;
        background-size: cover;
        color: #ffffff;
        .top {
          border-bottom: 1px solid #ffffff;
        }
      }
      &:nth-child(even) {
        color: #000000;
        .top {
          border-bottom: 1px solid #000000;
        }
      }
    } // .agent-item {
    //   background: #ffffff;
    //   margin-top: $bot;
    //   height: 4.2rem /* 315/75 */;
    //   font-size: 0.373333rem /* 28/75 */;
    //   display: flex;
    //   flex-direction: column;
    //   .top {
    //     height: 2.733333rem /* 205/75 */;
    //     padding: 0.746667rem /* 56/75 */ 0 0.453333rem /* 34/75 */ 0;
    //     box-sizing: border-box;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //   }
    //   .bot {
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //     flex: 1;
    //     padding: 0 2rem 0 1.4rem;
    //   }
    //   .line,
    //   .line2 {
    //     display: flex;
    //     align-items: center;
    //     .txt1 {
    //       width: 2.733333rem /* 205/75 */;
    //     }
    //   }
    //   .line {
    //     .icon {
    //       flex: none;
    //       width: 1.4rem /* 105/75 */;
    //       display: flex;
    //       justify-content: center;
    //       .iconfont {
    //         font-size: 0.56rem /* 42/75 */;
    //       }
    //     }
    //   }
    //   .line2 {
    //     padding-left: 1.4rem /* 105/75 */;
    //     .add {
    //       flex: 1;
    //       line-height: 1.4; // overflow: hidden;
    //       // text-overflow: ellipsis;
    //       // white-space: nowrap;
    //     }
    //   }
    // }
  }

</style>
