<template>
  <div>
    <bigTitle title='编辑信息' @showPopup='showPopup' :icon='false'></bigTitle>
    <div class="form-box">
      <div class="form-group">
        <h2 class="sub-title">账号名称</h2>
        <Group class="reset-vux-input">
          <XInput v-model="account_name"></XInput>
        </Group>
      </div>
      <!-- <div class="form-group">
        <h2 class="sub-title">联系人</h2>
        <Group class="reset-vux-input">
          <XInput v-model="lianxiren"></XInput>
        </Group>
      </div> -->
      <XButton type='warn' class="xbtn" @click.native='finish'>完成</XButton>
    </div>

  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton,
    Cell
  } from "vux";
  import bigTitle from "@/components/bigTitle/index";

  import checkLogin from "@/mixins/checkLogin";
  export default {
    data() {
      return {
        account_name: '',
        lianxiren: ''
      }
    },
    created() {
      this.account_name = this.userinfo.fuwuyuan.sub_name;
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      finish() {
        var _this = this;
     
      },
    },
    components: {
      bigTitle,
      Group,
      XInput,
      XButton
    },
    mixins: [checkLogin]
  }

</script>

<style>


</style>
