<template>
  <div class="tuijian">
    <Group>
      <Cell :title='info.fw_cid_name'>
        <span class="right-icon">更多
          <i class="iconfont icon-jinru"></i>
        </span>
      </Cell>
    </Group>
    <div class="tuijian-list">
      <div class="tuijian-item" v-for="(item,index) in info.list" :key="index"  @click="toDetail(item.shop_fw_id)">
        <div class="img">
          <img :src="item.fw_img" alt="" class="img">
        </div>
        <div class="name">{{item.fw_mingzi}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
export default {
  data() {
    return {};
  },
  props:['fwInfo'],
  methods: {
    toDetail(id) {
      var _this = this;
      this.$router.push({
        path: "/serviceDetail/" + id
      });
    }
  },
  props: ["info"],
  components: {
    Group,
    Cell
  }
};
</script>



<style lang='scss'>
.tuijian {
  background: #ffffff;
  .right-icon {
    line-height: 1;
    @include font-dpr(12px);
  }
  .weui-cells {
    &:after {
      border-bottom: none;
    }
  }
}
.tuijian-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 0.133333rem;
  .tuijian-item {
    margin: 0 1.5%;
    overflow: hidden;
    border-radius: 0.133333rem;
    width: 30%;
    flex: none;
    .img {
      height: 2.666667rem;
      overflow: hidden;
      margin-bottom: 0.066667rem;
    }
    .name {
      padding-left: 0.106667rem;
    }
  }
}
</style>