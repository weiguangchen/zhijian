<template>
    <div class="classify1">
        <!-- <div class="line"> -->

        <!-- <a href="" class="item" v-for="(item,index) in classArr" :key="index"><img src="~img/public/smxc.png" alt="" class="img">
            <div>{{item.class_name}}</div>
        </a> -->
        <router-link :to="'/serviceClass/'+item.id" v-for="(item,index) in classArr" :key="index" class="item"><img :src="item.one_class_img" alt="" class="img">
            <div>{{item.class_name}}</div>
        </router-link>
        <!-- <a href="" class="item"><img src="~img/public/qcmr.png" alt="" class="img">
            <div>汽车美容</div>
        </a>
        <a href="" class="item"><img src="~img/public/jjyh.png" alt="" class="img">
            <div>家具养护</div>
        </a>
        <a href="" class="item"><img src="~img/public/jzfw.png" alt="" class="img">
            <div>家政服务</div>
        </a> -->
        <!-- </div> -->
        <!-- <div class="line"> -->
        <!-- <a href="" class="item"><img src="~img/public/jqqc.png" alt="" class="img">
            <div>甲醛清除</div>
        </a>
        <a href="" class="item"><img src="~img/public/zxcp.png" alt="" class="img">
            <div>在线产品</div>
        </a>
        <a href="" class="item"><img src="~img/public/lyfw.png" alt="" class="img">
            <div>旅游服务</div>
        </a>
        <a href="" class="item"><img src="~img/public/bxfw.png" alt="" class="img">
            <div>保险服务</div>
        </a> -->
        <!-- </div> -->

    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["classArr"],
  created () {
      
  },
  components: {}
};
</script>

<style lang='scss'>
.classify1 {
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