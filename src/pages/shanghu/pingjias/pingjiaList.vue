<template>
 <div>

 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   created () {
   },
   methods: {
     getList(){
     this.$axios.get(this.API_URL + "/Api/ShopFw/fw_token",{
         params:{
            //  fw_shop_id:
         }
     })  
         
     }  
   },
   components: {

   }
 }
</script>

<style lang='scss'>

 
</style>