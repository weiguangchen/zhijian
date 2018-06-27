<template>
  <div class="address-select-box">
    <div class="add" v-if="type == 1">
      <div class="qy">
        <div class="item" :class="{active:currentInfo.area.key == 0}">附近</div>
        <div class="item" @click="selectQy(item)" v-for="(item,index) in qy" :key="index" :class="{active:currentInfo.area.qy.key == item.id}">{{item.qy_name}}</div>
      </div>
      <div class="sq">
        <template v-if="sq.length>0">
          <div class="item" :class="{active:currentInfo.area.sq.key == item.id}" v-for="(item,index) in sq" :key="index" @click="selectSq(item)">{{item.sq_name}}</div>
        </template>
        <div class="item" v-else>暂未开通</div>
      </div>

    </div>
    <div class="order-type" v-else-if="type == 2">
      <div class="item" :class="{active:currentInfo.order.key == item.id}" @click="selectOrder(item)" v-for="(item,index) in order" :key="index">{{item.val}}</div>
    </div>
    <div class="select" v-else-if='type == 3'>
      <div class="item">条件一</div>
      <div class="item">条件二</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      qy: [],
      qyVal:'',
      sq: [],
      sqVal:'',
      order: [
        {
          val: "智能排序",
          key: 1
        }
      ]
    };
  },
  created() {
    this.get_city();
    this.init();
  },
  props: ["type", "currentInfo"],
  methods: {
    move() {},
    selectQy(qy) {
      this.sq = qy.sq;
      console.log(qy);
      this.$emit("selectQy", qy);
    },
    selectSq(sq) {
      this.$emit("selectSq", sq);
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
    },
    selectOrder(order) {
      this.$emit("selectOrder", order);
    },
    init() {
      this.$emit("init",this.info);
    }
  },
  computed: {
    ...mapState(["location"]),
    info() {
      var info = {};
      info.qy = this.qy;
      info.sq = this.sq;
      info.order = this.order;
    }
  },
  components: {}
};
</script>

<style lang='scss'>
.address-select-box {
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