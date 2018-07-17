<template>
  <div class="youhui">
    <betterScroll>
      <div class="select">
        <!-- <div class=" item">全部</div> -->
        <i class="iconfont icon-a"></i>
        <div class="item active">活动卡</div>
        <div class="item">优惠券</div>
        <div class="item">代金券</div>
      </div>
      <div class="juan-list">
        <juan v-for="(item,index) in cardList" :key="index" :info='item' @chooseFw='chooseFw'></juan>
      </div>
    </betterScroll>
    <Popup v-model="popupShow" position="center" width="90%">
      <div class="popup1">
        <h1>选择门店<i class="iconfont icon-cha" @click='close'></i></h1>
        <div class="face" v-for="(item,index) in face" :key="index" @click="toDetail(item.face_id)">{{item.face_name}}</div>
      </div>
    </Popup>


    <!-- <Layout>
            <InfiniteScroll :callback="loadList" ref="infinitescroll"> -->
    <!-- <span slot="doneTip">暂无更多评论</span> -->
    <!-- </InfiniteScroll>
        </Layout> -->
  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll';
  import juan from './juan';
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import {
    InfiniteScroll
  } from "vue-ydui/dist/lib.px/infinitescroll";
  import {
    Layout
  } from "vue-ydui/dist/lib.px/layout";
  import {
    ViewBox,

  } from "vux";
  import BScroll from "better-scroll";
  import checkLogin from "@/mixins/checkLogin";
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {
        cardList: [],
        face: [],
        fwId: '',
        popupShow: false
      };
    },
    created() {
      var _this = this;
      this.get_card().then(res => {
        _this.cardList = res;
      });
    },
    methods: {
      loadList() {},
      get_card() {
        var _this = this;
        return this.$axios
          .get(_this.API_URL + "/Api/YouHui/see_card", {
            params: {
              uid: _this.id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            return data;
          });
      },
      cz_card(id, index, sonindex) {
        this.$axios
          .get(this.API_URL + "/Api/YouHui/cz_card", {
            params: {
              id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.cardList[index].son[sonindex].pay_ma = data;
          });
      },
      buy(id) {
        this.$router.push({
          path: '/serviceDetail/' + id
        })
      },
      chooseFw(obj) {
        this.popupShow = true;
        var _this = this;
        this.fwId = obj.fwId;
        this.cardList.map(m => {
          if (m.bk_id == obj.cardId) {
            m.son.map(n => {
              if (n.fw_id == obj.fwId) {
                _this.face = n.face;
              }
            })
          }
        })
      },

      toDetail(faceId) {
        this.$router.push({
          path: `/serviceDetail/${this.fwId}/${faceId}`
        })
      },
      close(){
        this.popupShow = false;
      }
    },
    computed: {

    },
    components: {
      Layout,
      InfiniteScroll,
      juan,
      betterScroll,
      Popup
    },
    mounted() {

    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style lang='scss'>
  .youhui {
    height: 100%;
    box-sizing: border-box;
    padding: 0.533333rem 0.4rem 0;
    .wrapper {
      height: 100%;
    }
    .select {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 1.2rem;
      border-radius: 0.6rem;
      padding: 0.133333rem;
      margin-bottom: 0.8rem;
      .item {
        box-sizing: border-box;
        height: 0.906667rem;
        padding: 0 0.586667rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.453333rem;
        flex: none;
      }
      .active {
        background: #de3232;
        color: #ffffff;
      }
      .icon-a {
        @include font-dpr(22px);
        margin-right: 0.6rem;
      }
    }
    .popup1{
      background: #ffffff;
      border-radius: .133333rem /* 10/75 */;
      font-size: .373333rem /* 28/75 */;
      h1,.face{
        display: flex;
        align-items: center;
        padding:0 .4rem /* 30/75 */;
      }
      h1{
        height: 1.106667rem /* 83/75 */;
        justify-content: space-between;
      } 
      .face{
        height: 1.186667rem /* 89/75 */;
        &:nth-child(even){
          background: #f8f8f8;
          border: 1px solid #dedede;
        }
      }
    }
  }

</style>
