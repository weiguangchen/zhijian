<template>
  <div class="mine-step">
    <div class="mine-num"  :class='{"mine-num-active":active}'>
      <span class="circle"></span>
      <span class="mine-label">
        <slot></slot>
      </span>
    </div>
    <div class="mine-main">
      <div class="mine-line" v-if="!active"></div>
      <div class="mine-content">
        <!-- <div>{{content}}</div>
        <div>{{time}}</div> -->
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'step',
    data() {
      return {

      }
    },
    props: {
      title: {},
      content: {},
      time: {},
      active: {
        default: false
      }
    },
    components: {

    }
  }

</script>

<style lang='scss'>


</style>
