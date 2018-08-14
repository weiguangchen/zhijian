<template>
  <scroller :on-infinite="infinite" ref="myscroller">
    <div class="list">
      <yhj v-for="(item,index) in list" :key="index" :info='item.content' :isDelete='true' @btnClick='use_yhj(item.content)' @deleteYhj='deleteYhj'>
        点击使用
      </yhj>
    </div>
  </scroller>
</template>

<script>
  import yhj from '@/pages/yhj/components/index';
  import checkLogin from '@/mixins/checkLogin.js';
  import {
    Checker,
    CheckerItem
  } from 'vux';
  export default {
    data() {
      return {
        p: 1,
        noData: false,
        list: []
      }
    },
    props: {
      status: {
        default: ''
      }
    },
    methods: {
      infinite(done) {
        this.get_list(done);
      },
      get_list(fn) {
        if (this.noData) {
          // 没有数据了
          this.$refs.myscroller.finishInfinite(true);
          return
        } else {
          // 还有数据
          this.$axios.get('/Api/Yhq/fw_yhq_list', {
            params: {
              shop_id: this.shopId,
              fw_id: this.fwId,
              user_id: this.id,
              num: 8,
              p: this.p
            }
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.ok == 1) {
              //   还有数据
              this.p++;
            } else {
              //   没有数据
              this.noData = true;
            }
            this.list = this.list.concat(data.list);
            if (fn) fn();
          })
        }

      },
      use_yhj(yhj) {
        if (yhj.yh_status == 1) {
          //   类别
          this.$router.push({
            path: '/shangpu/' + yhj.yh_face_id
          })
        } else if (yhj.yh_status == 2) {
          //   服务
          this.$router.push({
            path: '/serviceDetail/' + yhj.yh_fw_id + '/' + yhj.yh_face_id
          })
        } else if (yhj.status == 3) {
          //   商户
          this.$router.push({
            path: '/shangpu/' + yhj.yh_face_id
          })
        }
      },
      deleteYhj() {

      }
    },
    components: {
      yhj
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss'>


</style>
