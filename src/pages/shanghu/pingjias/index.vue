<template>
  <div class="shanghu-box">
    <!-- <div class="wrapper shanghu-warpper" ref="wrapper">
      <ul class="content"> -->
        <transition name='router'>
        <router-view @showPopup='showPopup'></router-view>
        </transition>
      <!-- </ul>
    </div> -->
    <Popup position='right' v-model="popupShow">
      <div class="popup-list">
        <Group>
          <Cell title='消费评价' link='/shanghu/pingjias/pingjias'></Cell>
        </Group>
      </div>
    </Popup>
  </div>

</template>

<script>
import BScroll from "better-scroll";
import { Group, Cell } from "vux";
import { Popup } from "vue-ydui/dist/lib.px/popup";
import bigTitle from "@/components/bigTitle/index";
import checkLogin from "@/mixins/checkLogin.js";
export default {
  data() {
    return {
      popupShow: false
    };
  },
  created() {
    var _this = this;
    this.$axios
      .get( "/Api/Shop/shop_fw", {
        params: {
          shop_id: this.userinfo.shop[0].id
        }
      })
      .then(res => {
        console.log(res);
        _this.list = res.data;
      });
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     tap: true,
    //     click: true
    //   });
    // });
  },
  methods: {
    showPopup(val) {
      this.popupShow = val;
    },
    get_fw_content(fwid) {
      this.$router.push({
        path: "/shanghu/pingjiaList/" + fwid
      });
    }
  },
  components: { Popup, Group, Cell },
  mixins: [checkLogin]
};
</script>

<style lang='scss'>

.pingjia-list {
  padding-left: 0.533333rem;
    .router-enter-active {
    transition: transform .3s ease-in-out;
  }

  .router-enter {
    transform: translateX(100%);
  }
  .pingjia-item {
    @include font-dpr(12px);
    display: flex;
    box-sizing: border-box;
    padding-top: 0.56rem;
    height: 3.333333rem;
    border-bottom: 1px solid #f0f0f0;
    .img {
      width: 2.666667rem;
      height: 2.133333rem;
      border-radius: 0.133333rem;
      margin-right: 0.24rem;
    }
    .info {
      padding-right: 0.933333rem;
      flex: 1;
      .mingzi {
        height: 1.146667rem;
        overflow: hidden;
      }
      .num {
        color: #dc3232;
      }
    }
  }
}
</style>