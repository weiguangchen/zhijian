<template>
  <div>
    <tx-map @finishAdd='finishAdd'></tx-map>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex';
  import map from '@/components/map/index';
  export default {
    data() {
      return {

      }
    },
    methods:{
        ...mapMutations(['SET_TX_MAP']),
        finishAdd(val){
            console.log(val)
            this.SET_TX_MAP(val);
            this.$router.go(-1);
        }
    },
    components: {
      'tx-map': map
    }
  }

</script>

<style>


</style>
