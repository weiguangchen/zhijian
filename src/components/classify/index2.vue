<template>

  <!-- <Swiper class="x-swiper" :aspect-ratio='0.54' dots-position='center' :show-dots='page>1?true:false'>
    <SwiperItem v-for="(item,index) in newClass" :key="index">
      <div class="classify2">
        <router-link :to="'/serviceList/'+item1.id" v-for="(item1,index1) in item" :key="index1" class="item"><img :src="item1.two_class_img" alt="" class="img">
          <div>{{item1.fw_name}}</div>
        </router-link>
      </div>

    </SwiperItem>
  </Swiper> -->
  <swiper :options="swiperOption" ref="mySwiper" class="x-swiper">
    <swiper-slide v-for="(item,index) in newClass" :key="index">
      <div class="classify2">
        <router-link :to="'/serviceList/'+item1.id" v-for="(item1,index1) in item" :key="index1" class="item">
          <img :src="item1.two_class_img" alt="" class="img">
          <div>{{item1.fw_name}}</div>
        </router-link>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  // import { Swiper, SwiperItem } from "vux";

  export default {
    data() {
      return {
        page: 1,
        newClass: [],
        swiperOption: {
          autoHeight: true
        }
      };
    },
    props: ["classArr"],
    created() {
      this.page = Math.ceil(this.classArr.length / 8);
      for (let i = 0; i < this.page; i++) {
        this.newClass.push(this.classArr.slice(i * 8, (i + 1) * 8));
      }

      console.log(this.newClass)
    },
    components: {
      swiper,
      swiperSlide
    }
  };

</script>

<style lang='scss' scoped>
  .x-swiper {
    .classify2 {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start; //   flex-direction: column;
      background: #ffffff;
      padding: 0.533333rem 0.586667rem;
      box-sizing: border-box;
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
  }

</style>
