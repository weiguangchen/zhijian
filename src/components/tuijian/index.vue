<template>
  <div class="tuijian">
    <Group>
      <Cell :title='info.fw_cid_name'>
        <span class="right-icon" @click="more(info.fw_cid)">更多
          <i class="iconfont icon-jinru"></i>
        </span>
      </Cell>
    </Group>
    <div class="tuijian-list">
      <div class="tuijian-item" v-for="(item,index) in info.list" :key="index" @click="toDetail(item.shop_fw_id,item.face.id)">
        <div class="img-box">
          <img v-lazy="item.fw_img" alt="" class="img">
        </div>
        <div class="name">{{item.fw_mingzi}}</div>
        <div class="price">
          <span class="num">{{item.money}}</span>元
          <span v-if="item.fw_gg">/{{item.fw_gg}}</span>
        </div>
        <div class="shop">
          <i class="iconfont icon-dianpu"></i>{{item.face.face_name}}</div>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    Group,
    Cell
  } from "vux";
  export default {
    data() {
      return {};
    },
    created() {
      this.sliceArr();
    },
    methods: {
      toDetail(id,faceId) {
        var _this = this;
        this.$router.push({
          path: "/serviceDetail/" + id+'/'+faceId
        });
      },
      more(id) {
        if (this.fwClass == 1) {
          this.$router.push({
            path: "/serviceClass/" + id
          });
        } else if (this.fwClass == 2) {
          this.$router.push({
            path: "/serviceList/" + id
          });
        }
      },
      sliceArr() {
        this.info.list = this.info.list.slice(0, 3);
      }
    },

    props: ["info", "fwClass"],
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
      .iconfont {
        @include font-dpr(12px);
      }
    }
    .weui-cells {
      &:after {
        border-bottom: none;
      }
    }
    .vux-label {
      line-height: 1;
      padding-left: 0.186667rem;
      @include font-dpr(14px);
      border-left: 0.066667rem solid #df3333;
    }
  }

  .tuijian-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 0.133333rem;
    @include font-dpr(14px);
    .tuijian-item {
      margin: 0 0.32rem;
      overflow: hidden;
      border-radius: 0.133333rem;
      width: 2.666667rem;
      flex: none;
      line-height: 0.533333rem;
      .img-box {
        height: 2.666667rem;
        overflow: hidden;
        margin-bottom: 0.066667rem;
        border-radius: .133333rem/* 10/75 */
        ;
        .img {
          max-width: none;
          height: 100%;
          transform: translateX(-15%);
        }
      }
      .name,
      .price,
      .shop {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        @include font-dpr(14px);
        ;
      }
      .price {
        @include font-dpr(12px);
        .num {
          color: #de3230;
        }
      }
      .shop {
        @include font-dpr(12px);
        color: #aaaaaa;
        .iconfont {
          margin-right: 0.133333rem;
        }
      }
    }
  }

</style>
