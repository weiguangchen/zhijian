<template>
    <div class="classify2">
        <router-link :to="'/serviceList/'+item.id" v-for="(item,index) in classArr" :key="index" class="item"><img :src="item.two_class_img" alt="" class="img">
            <div>{{item.fw_name}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["classArr"],
  components: {}
};
</script>

<style lang='scss'>
.classify2 {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  //   flex-direction: column;
//   justify-content: space-between;
  background: #ffffff;
  padding: 0.533333rem 0.586667rem;
  height: 5.253333rem;
  box-sizing: border-box;
  margin-bottom: 0.24rem;
  .line {
    flex: none;
    display: flex;
    justify-content: space-between;
  }
  .item {
      width: 20%;
      
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: none;
    line-height: 1;
    @include font-dpr(13px);
    color: #383838;
    .img {
      width: 1.173333rem;
      height: 1.173333rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>