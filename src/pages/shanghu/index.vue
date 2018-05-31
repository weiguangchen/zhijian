<template>
 <div>
     <router-view></router-view>
     <tabbar></tabbar>
     <!-- <router-view name="tab"></router-view> -->
 </div>
</template>

<script>
import tabbar from '@/components/tab/shangHuTab';
 export default {
   data () {
     return {

     }
   },
   components: {
       tabbar
   }
 }
</script>

<style lang='scss'>

 
</style>