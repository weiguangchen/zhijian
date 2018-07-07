<template>
     <div class="my-tabbar">
        <router-link class="tabbar-item" to="/shanghu/yanzheng/index">
            <i class="iconfont icon-shouye"></i><div>验证</div>
        </router-link>
        <router-link class="tabbar-item" to="/shanghu/pingjias/index">
            <i class="iconfont icon-shangcheng"></i><div>订单</div>
        </router-link>
        <router-link class="tabbar-item" to="/shanghu/me/index">
            <i class="iconfont icon-wode"></i><div>我的</div>
        </router-link>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  data() {
    return {};
  },
  components: {
      Tabbar,TabbarItem
  }
};
</script>

<style lang='scss'>
.my-tabbar{
    background: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
     z-index: 200;
    .tabbar-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
        .iconfont{
            font-size: 25px
        }
        text-align: center;
        flex: 1;
    }
}
</style>