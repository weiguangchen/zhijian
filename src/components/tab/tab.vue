<template>
    <!-- <Tabbar>
        <TabbarItem link='/'>
            <span slot="label">首页</span>
        </TabbarItem>
        <TabbarItem link='/shop'>
            <span slot="label">商城</span>
        </TabbarItem>
        <TabbarItem link='/faxian'>
            <span slot="label">发现</span>
        </TabbarItem>
        <TabbarItem link='/me'>
            <span slot="label">我的</span>
        </TabbarItem>
    </Tabbar> -->
    <div class="my-tabbar">
        <router-link class="tabbar-item" to="/index">
            <i class="iconfont icon-shouye"></i><div>首页</div>
        </router-link>
        <router-link class="tabbar-item" to="/shop">
            <i class="iconfont icon-shangcheng"></i><div>商城</div>
        </router-link>
        <router-link class="tabbar-item" to="/faxian">
            <i class="iconfont icon-faxian"></i><div>发现</div>
        </router-link>
        <router-link class="tabbar-item" to="/me">
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