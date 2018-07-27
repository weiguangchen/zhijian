<template>
  <div class="safe">
    <bigTitle title='账号与安全' @showPopup='showPopup' class="account-title"></bigTitle>
    <div class="form-box">
      <Group>
        <Cell title='账号名称：' :isLink='true' link='/fuwuyuan/me/name'>{{userinfo.fuwuyuan.sub_name}}</Cell>
        <Cell title='所属门店'>测试门店</Cell>
        <Cell title='修改手机号' :isLink='true' link='/fuwuyuan/me/yanzheng'>{{userinfo.fuwuyuan.phone}}</Cell>
      </Group>
    </div>
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
    XButton,
    Cell
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
      betterScroll,
      Cell
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

<style lang='scss' scoped>
  .safe {
    .weui-cell {
      @include font-dpr(14px);
      height: 1.28rem;
      padding-left: 0;
      padding-right: 0;
      &::before {
        left: 0;
      }
    }
  }

</style>
