/* * @Author: 魏广辰 * @Date: 2018-05-26 12:03:22 * @Last Modified by: mikey.zhaopeng * @Last Modified time: 2018-06-27 12:04:17
*/
<template>
  <div id="app">

    <keep-alive>
      <transition name='router'>
        <router-view v-if="keepAlive" />
      </transition>
    </keep-alive>
    <transition name='router'>
      <router-view v-if='!keepAlive' />
    </transition>

    <router-view name="tab"></router-view>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
  import {
    Loading
  } from 'vux'

  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    name: "App",
    components: {},
    created() {
      // var router = this.$route;
      // console.log('router')
      // console.log(router);

      // if(router.meta.title != ''){
      //   this.setMetaTitle(router.meta.title);
      // }
    },
    computed: {
      ...mapState(['isLoading']),
      keepAlive() {
        return this.$route.meta.keepAlive;
      }
    },
    methods: {


    },
    components: {
      Loading
    }
  };

</script>

<style lang='scss'>
  #app {
    height: 100%;
    width: 100%;
  }

  .router-enter-active{
    transition: transform .3s ease-in-out;
  }

  .router-enter {
    transform: translateX(100%);
  }

</style>
