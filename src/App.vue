/*
 * @Author: 魏广辰 
 * @Date: 2018-05-26 12:03:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-13 14:36:53
 */
<template>
  <div id="app">
    <!-- <keep-alive exclude='service-list'> -->
      <router-view/>
    <!-- </keep-alive> -->
    <router-view name="tab"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {}
};
</script>

<style lang='scss'>
#app {
  height: 100%;
  width: 100%;
}
</style>
