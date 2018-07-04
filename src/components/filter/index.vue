<template>
  <div class="filter">
    <sticky>
      <div class="term">
        <div class="select-box">
          <span class="term-item" :class="{active:(selectType == 1&&selectAddShow)}" @click="selectAdd(1)">
            <span>{{currentInfo.area.sq.val}}</span>
            <span class="iconfont icon-zhankai1"></span>
          </span>
          <span class="term-item" :class="{active:(selectType == 2&&selectAddShow)}" @click="selectAdd(2)">
            <span>{{currentInfo.order.val}}</span>
            <span class="iconfont icon-zhankai1"></span>
          </span>
          <span class="term-item" :class="{active:(selectType == 3&&selectAddShow)}" @click="selectAdd(3)">
            <span>{{currentInfo.search.val}}</span>
            <span class="iconfont icon-zhankai1"></span>
          </span>
        </div>


      </div>
    </sticky>
    <div class="address-select-box" v-show="selectAddShow">
      <div class="add" v-if="selectType == 1">
        <div class="qy">
          <div class="item" :class="{active:qyVal.key == 0}" @click="fujin">附近</div>
          <div class="item" @click="selectQy(item)" v-for="(item,index) in qy" :key="index" :class="{active:qyVal.key== item.id}">{{item.qy_name}}</div>
        </div>
        <div class="sq">
          <template v-if="sq.length>0">
            <div class="item" :class="{active:sqVal.key == item.id}" v-for="(item,index) in sq" :key="index" @click="selectSq(item)">{{item.sq_name}}</div>
          </template>
          <div class="item" v-else>暂未开通</div>
        </div>

      </div>
      <div class="order-type" v-else-if="selectType == 2">
        <div class="item" :class="{active:orderVal.key == item.key}" @click="selectOrder(item)" v-for="(item,index) in order" :key="index">{{item.val}}</div>
      </div>
      <div class="select" v-else-if='selectType == 3'>
        <div class="item" :class="{active:searchVal.key == item.key}" v-for="(item,index) in search" :key="index">{{item.val}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Sticky
  } from "vux";
  export default {
    data() {
      return {};
    },
    components: {}
  };

</script>

<style scoped lang='scss'>


</style>
