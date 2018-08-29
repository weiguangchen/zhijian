<template>
  <div class="mine-step" :class='{active}'>
    <div class="mine-num">
      <span class="circle"></span>
      <span class="mine-label">{{title}}</span>
    </div>
    <div class="mine-main">
      <div class="mine-line"></div>
      <div class="mine-content">
        <div>{{content}}</div>
        <div>{{time}}</div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props:['title','content','time','active'],
    components: {

    }
  }

</script>

<style lang='scss'>
.active{

}

</style>
