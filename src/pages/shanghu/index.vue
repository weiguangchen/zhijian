<template>
  <div class="sh-page">
    <div class="shanghu-page">
      <router-view></router-view>
    </div>
    <tabbar></tabbar>
    <router-view name="tab"></router-view>
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll/index';
  import tabbar from "@/components/tab/shangHuTab";
  export default {
    data() {
      return {};
    },
    created() {},
    components: {
      tabbar,
      betterScroll
    }
  };

</script>

<style lang='scss'>
  .router-enter-active {
    transition: transform .3s ease-in-out;
  }

  .router-enter {
    transform: translateX(100%);
  }

</style>
