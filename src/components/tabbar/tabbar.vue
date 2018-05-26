<template>
 <div class="tabbar">
     <div class="item"><slot></slot></div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style lang='scss'>
.tabbar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    display: flex;
    .item{
        flex:1;
    }   
}
 
</style>