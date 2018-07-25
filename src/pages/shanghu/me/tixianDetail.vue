<template>
  <div class="sh-tx-progress">
    <bigTitle title='提款进度' :icon='false'></bigTitle>
  </div>
</template>

<script>
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {

      }
    },
    created(){
    },
    methods: {
     
    },
    components: {
      bigTitle
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss'>
  .sh-tx-progress {}

</style>
