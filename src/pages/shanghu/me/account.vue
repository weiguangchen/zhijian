<template>
  <div class="account">
    <betterScroll>
      <bigTitle title='账户管理' @showPopup='showPopup' class="account-title"></bigTitle>
      <div class="form-box">
        <div class="title">
          <div>当前登录账号：{{userinfo.nickname}}</div>
          <div>可管理账号列表：</div>
        </div>
        <div class="account-list">
          <Group class="reset-vux-input account-item" v-for="(item,index) in accountList" :key="index">
            <div class="tit">账号的名称：{{item.sub_name}}</div>
            <div class="tit">管理的门店：
              <span v-for="(item,index) in item.face" :key="index">{{item.face_name}}&nbsp;&nbsp;&nbsp;</span>
            </div>
            <!-- <div class="tit last-tit">账号说明：李海东</div> -->
            <div class="xbtn-box">
              <!-- <XButton :mini='true' :plain='true' type='warn' class="mini-btn" @click.native="setAuth">权限设置</XButton> -->
              <XButton :mini='true' :plain='true' type='warn' class="mini-btn" @click.native="edit_son(item.phone,item.id)">编辑</XButton>
            </div>
          </Group>
        </div>

        <XButton type='warn' class="xbtn" @click.native='add_son_account'>添加子账户</XButton>
      </div>
    </betterScroll>


  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll/index';

  import bigTitle from "@/components/bigTitle/index";
  import myMap from "@/components/map/index";
  import checkLogin from "@/mixins/checkLogin";
  import {
    XInput,
    Group,
    XButton
  } from "vux";

  export default {
    data() {
      return {
        accountList: []
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.$axios
        .get(this.API_URL + "/Api/UserShow/get_son", {
          params: {
            shop_id: _this.userinfo.shop[0].id
          }
        })
        .then(({
          data
        }) => {
          console.log(data);
          this.accountList = data;
        });
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      edit_son(phone, id) {
        this.$router.push({
          path: '/shanghu/me/addSonAccount',
          query: {
            phone,
            id
          }
        });
      },
      setAuth() {
        this.$router.push('/shanghu/me/setAuthority');
      },
      add_son_account() {
        this.$router.push('/shanghu/me/addSonAccount');
      }
    },
    components: {
      bigTitle,
      XInput,
      Group,
      XButton,
      myMap,
      betterScroll
    },
    computed: {
      faceId() {
        return this.$route.query.faceId;
      },
      finishBtn() {
        if (this.face_name && this.loc) {
          return false;
        } else {
          return true;
        }
      }
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .account {
    height: 100%;
    @include font-dpr(14px);
    .account-title {
      margin-bottom: 0.586667rem;
    }
    .title {
      &>div {
        margin-bottom: 0.586667rem;
      }
    }
    .account-list {
      .account-item {
        margin-bottom: 1.066667rem;
        .weui-cells:after {
          border: none;
        }
        .tit {
          @include font-dpr(14px);
          margin-bottom: 0.533333rem;
        }
        .last-tit {
          margin-bottom: 0;
        }
        padding: 0.266667rem 0.333333rem;
        .xbtn-box {
          margin-top: 0.6rem;
          display: flex;
          justify-content: flex-end;
          .mini-btn {
            margin: 0 0 0 0.933333rem;
          }
          .weui-btn+.weui-btn {
            margin-top: 0;
          }
        }
      }
    }
  }

</style>
