/*
 * @Author: 魏广辰 
 * @Date: 2018-05-26 12:03:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-29 15:23:20
 */
<template>
  <div id="app">
    <router-view/>
    <router-view name="tab"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created () {
  }
}
</script>

<style lang='scss'>
#app {
  height: 100%;
  width: 100%;
}
</style>
