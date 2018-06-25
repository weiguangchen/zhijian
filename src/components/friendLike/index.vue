<template>
    <div class="friend-like-list">
        <div class="friend-like-item" @click="toDetail(item.shop_fw_id)" v-for='(item,index) in friendLike' :key="index">
            <img :src="item.fw_img" alt="" class="thumb">
            <div class="intr">
                <div class="tit">{{item.fw_mingzi}}</div>
                <rater :val='item.token_pj' class="rater"></rater>
                <div class="tip">
                    <span>{{item.fw_name}}</span>
                    <span>卫国道</span>
                    <span>12KM</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import rater from "@/components/star/index";
export default {
  data() {
    return {};
  },
  props: {
    friendLike: {
      default(){
          return {}
      }
    }
  },
  methods: {
    toDetail(id){
      this.$router.push('/serviceDetail/'+id);
    }
  },
  components: {
      rater
  }
};
</script>

<style lang='scss'>
.friend-like-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.4rem;
  background: #ffffff;
  .friend-like-item {
    width: 4.24rem;
    line-height: 1;
    background: #ffffff;
    padding-bottom: 0.426667rem;
    .thumb {
      width: 100%;
      height: 2.426667rem;
      margin-bottom: 0.133333rem;
    }
    .tit {
      @include font-dpr(15px);
      color: #2b2b2b;
      margin-bottom: 0.213333rem;
    }
    .rater {
      margin-bottom: 0.293333rem;
    }
    .tip {
      display: flex;
      justify-content: space-between;
      color: #2b2b2b;
      @include font-dpr(12px);
      opacity: 0.5;
    }
  }
}
</style>