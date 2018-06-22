<template>

    <Swiper class="x-swiper" dots-position='center' :aspect-ratio='0.54' :show-dots='page>1?true:false'>
        <SwiperItem v-for="(item,index) in newClass" :key="index">
            <div class="classify1">
                <router-link :to="'/serviceClass/'+item1.id" v-for="(item1,index1) in item" :key="index1" class="item"><img :src="item1.one_class_img" alt="" class="img">
                    <div>{{item1.class_name}}</div>
                </router-link>
            </div>

        </SwiperItem>
    </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "vux";
export default {
  data() {
    return {
      page: 1,
      newClass: [],
      showdot: true
    };
  },
  props: ["classArr"],
  created() {
    this.page = Math.ceil(this.classArr.length / 8);
    for (let i = 0; i < this.page; i++) {
      this.newClass.push(this.classArr.slice(i * 8, (i + 1) * 8));
    }
  },
  watch: {},
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style lang='scss'>
.x-swiper {
  margin-bottom: $bot;
}
.classify1 {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background: #ffffff;
  padding: 0.533333rem 0.586667rem;
  height: 5.4rem;
  box-sizing: border-box;
  margin-bottom: 0.24rem;

  .line {
    flex: none;
    display: flex;
    justify-content: space-between;
  }
  .item {
    width: 25%;
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
      // border-radius: 50%;
    }
  }
}
</style>