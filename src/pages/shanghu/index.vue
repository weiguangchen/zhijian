<template>
  <div class="sh-page">
    <div class="shanghu-page">
      <transition name='router'>
        <router-view></router-view>
      </transition>
    </div>
    <tabbar></tabbar>
    <router-view name="tab"></router-view>
  </div>
</template>

<script>
  import tabbar from "@/components/tab/shangHuTab";
  export default {
    data() {
      return {};
    },
    created() {},
    components: {
      tabbar
    }
  };

</script>

<style lang='scss'>


</style>
