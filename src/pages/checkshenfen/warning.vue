<template>
    <div>
        <h1>提示</h1>
        <div class="content">
            抱歉，确认信息失败<br/> 加盟商信息与该手机号码不匹配
            <br/> 请联系您的代理商
        </div>
        <XButton @click.native='queren'>点击返回公众号 ({time}s)</XButton>
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
      this.$router.replace("/index");
    },
    djs() {
      setTimeout(() => {
        this.time--;
        if (this.time <= 0) {
          this.$router.replace("/index");
        }
      }, 1000);
    }
  },
  components: {
    XButton
  }
};
</script>

<style lang='scss' scoped>
</style>