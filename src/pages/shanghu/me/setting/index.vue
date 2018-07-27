<template>
  <div class="page agent-setting">

    <Group>
      <Cell title='修改手机号' :is-link='true' link='/shanghu/me/yanzheng'>{{userinfo.shop[0].shop_phone}}</Cell>
      <Cell title='联系人' :is-link='true' link='/shanghu/me/name'>{{userinfo.shop[0].xingming}}</Cell>
      <Cell title='绑定微信'>
        <div class="avatar-box">
          <img :src="userinfo.headimgurl" alt="" class="avatar">{{userinfo.nickname}}
        </div>
      </Cell>
      <Cell title='地址' :is-link='true' link='/shanghu/me/address'>{{userinfo.shop[0].adress}}</Cell>
    </Group>
  </div>
</template>

<script>
  import checkLogin from "@/mixins/checkLogin.js";

  import setTitle from '@/mixins/setTitle.js'
  import {
    Cell,
    Group
  } from 'vux';
  export default {
    data() {
      return {

      }
    },
    components: {
      Cell,
      Group
    },
    mixins: [checkLogin, setTitle]
  }

</script>

<style lang='scss'>
  .agent-setting {
    .avatar-box {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: .6rem/* 45/75 */
      ;
      height: .6rem/* 45/75 */
      ;
      border-radius: 50%;
    }
  }

</style>
