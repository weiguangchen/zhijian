<template>
  <scroller :on-infinite="infinite" ref="myscroller">
    <div class="list">
      <template v-if="status == 0">
          <yhj class="yhj" v-for="(item,index) in list" :key="index" :info='item.content' :isDelete='true' @btnClick='use_yhj(item.content)'
          @deleteYhj='deleteYhj(item.id,index)' :status='status'>
          点击使用
        </yhj>

      </template>
      <template v-else>
          <yhj class="yhj" v-for="(item,index) in list" :key="index" :info='item.content' :isDelete='true' @btnClick='use_yhj(item.content)'
          @deleteYhj='deleteYhj(item.id,index)' :status='status' :hasBtn='false' :disabled='true'>
          点击使用
        </yhj>

      </template>
      
    </div>
  </scroller>
</template>

<script>
  import yhj from './index';
  import checkLogin from '@/mixins/checkLogin.js';

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
          this.$axios.get('/Api/Yhq/get_user_yhq', {
            params: {
              user_id: this.id,
              num: 8,
              p: this.p,
              status: this.status
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
        console.log(yhj)
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
        } else if (yhj.yh_status == 3) {
          //   商户
          console.log('气得我群多')
          this.$router.push({
            path: '/shangpu/' + yhj.yh_face_id
          })
        }
      },
      deleteYhj(id, index) {
        this.$axios.get('/Api/yhq/user_delete_yhq', {
          params: {
            id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            // 删除成功
            this.list.splice(index, 1);

          } else {
            // 删除失败
          }
        })
      }
    },
    components: {
      yhj
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss' scoped>
  .yhj {
    margin-bottom: .666667rem/* 50/75 */
    ;
  }

</style>
