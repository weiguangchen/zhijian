<template>
  <div class="page agent-setting">
    <Group>
      <XTextarea v-model="add" placeholder='填写地址'></XTextarea>
    </Group>
    <div class="xbtn">
      <XButton type='warn' @click.native='finish'>完成</XButton>

    </div>
  </div>
</template>

<script>
  import {
    Group,
    XTextarea,
    XButton
  } from 'vux';
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {
        add: ''
      }
    },
    methods: {
      finish() {
        var _this = this;
        if (!this.add) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写联系人姓名'
          })
        } else {
          var params = {
            dl_id: this.userinfo.dl[0].id,
            dl_name: this.userinfo.dl[0].dl_name,
            dl_phone: this.userinfo.dl[0].dl_phone,
            xingming: this.userinfo.dl[0].xingming,
            adress: this.add
          }
          this.$axios.get(this.API_URL + '/Api/DlCore/dl_sz', {
            params
          }).then(({
            data
          }) => {
            console.log(data);
            _this.$vux.alert.show({
              title: '提示',
              content: '修改完成',
              onHide() {
                _this.$router.replace({
                  path: '/agentSetting'
                })
              }
            })
          })

        }

      }
    },
    components: {
      Group,
      XTextarea,
      XButton
    },
    mixins: [checkLogin, setTitle]
  }

</script>

<style lang='scss'>
  .agent-setting {
    .xbtn {
      margin-top: 2.346667rem/* 176/75 */
      ;
      padding: 0 .4rem/* 30/75 */
      ;
    }
  }

</style>
