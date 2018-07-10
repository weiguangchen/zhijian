<template>
  <div class="warning">
    <h1 class="title">提示</h1>
    <div class="content" v-if="tip == 'shanghu'">
      抱歉，确认信息失败<br/> 加盟商信息与该手机号码不匹配
      <br/> 请联系您的代理商
    </div>
    <div class="content" v-else-if="tip == 'daili'">
      抱歉，确认信息失败<br/> 代理商信息与该手机号码不匹配
      <br/> 请联系您的上级代理商
    </div>
    <div class="content" v-else-if="tip == 'servicer'">
      抱歉，确认信息失败<br/> 服务员信息与该手机号码不匹配
      <br/> 请联系您的管理员
    </div>
    <XButton @click.native='queren' class="xbtn" type='warn'>点击返回公众号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{time}}s)</XButton>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  data() {
    return {
      time: 60
    };
  },
  created() {
    this.djs();
  },
  methods: {
    queren() {
      this.$router.replace({
        path: "/index"
      });
    },
    djs() {
      var _this = this;
      setInterval(() => {
        this.time = this.time - 1;
        if (this.time <= 0) {
          this.$router.replace({
            path: "/index"
          });
        }
      }, 1000);
    }
  },
  computed: {
    tip(){
      return this.$route.query.tip;
    }
  },
  components: {
    XButton
  }
};
</script>

<style lang='scss' scoped>
.warning {
  padding: 1.2rem 0.4rem;
  @include font-dpr(17px);
  line-height: 0.88rem;
  .title {
    @include font-dpr(33px);
    font-weight: bold;
    margin-bottom: 1.6rem;
  }
  .xbtn {
    margin-top: 1.333333rem;
  }
}
</style>