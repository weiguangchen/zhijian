<template>
  <!-- <div class="mask" @touchmove.prevent='move'> -->
  <div class="address-select-box">
    <div class="add" v-if="type == 1">
      <!-- <template> -->
        <div class="qy">
          <div class="item" :class="{active:currentInfo.area.key == 0}">附近</div>
          <div class="item" @click="selectQy(item)" v-for="(item,index) in qy" :key="index" :class="{active:currentInfo.area.key == item.id}">{{item.qy_name}}</div>
        </div>
        <div class="sq">
          <div class="item" v-for="(item,index) in sq" :key="index" v-if="sq.length>0">{{item.sq_name}}</div>
          <div class="item" v-else>暂未开通</div>
          
        </div>
      <!-- </template> -->

    </div>
    <div class="order-type" v-else-if="type == 2">
      <div class="item">智能排序</div>
      <div class="item">热度最高</div>
    </div>
    <div class="select" v-else-if='type == 3'>
      <div class="item">条件一</div>
      <div class="item">条件二</div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      qy: [],
      sq: []
    };
  },
  created() {
    this.get_city();
  },
  props: ["type","currentInfo"],
  methods: {
    move() {},
    selectQy(qy) {
      this.sq = qy.sq;
      console.log(this.sq)
    },
    get_city() {
      var _this = this;
      this.$axios
        .get("http://zj.daonian.cn/Api/UserShow/city")
        .then(({ data }) => {
          console.log(data);
          console.log(this.location);
          data.map(m => {
            if (m.city == _this.location.province) {
              _this.qy = m.qy;
            }
          });
        });
    }
  },
  computed: {
    ...mapState(["location"])
  },
  components: {}
};
</script>

<style lang='scss'>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(#000000, 0.4);
  z-index: 99999;
}
.address-select-box {
  position: fixed;
  top: 1.386667rem;
  width: 100%;
  z-index: 9999;
  background: #ffffff;
  .add {
    display: flex;
  }
  .item {
    padding: 0.266667rem 0.533333rem;
    @include font-dpr(12px);
  }
  .active {
    color: #cb2620;
  }
}
</style>