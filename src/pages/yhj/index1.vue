<template>
  <div class="page lq-yhj">
    <scroller :on-infinite="infinite" ref="myscroller">
      <h1 class="desc-tit">可领优惠券</h1>
      <div class="list">
        <yhj :info='item' v-for="(item,index) in list" :key="index" @btnClick='lingqu(item,index)' :disabled='item.l_yes == 0' :status="item.l_yes == 0?1:''">
          <span>点击领取</span>
        </yhj>
      </div>
      <!-- <div class="line">
        <span class="l"></span>
        <span class="m">
          <img src="./components/yhj.png" alt="">

        </span>
        <span class="l"></span>
      </div>
      <h1 class="desc-tit">已领优惠券</h1>
      <div class="list">
        <yhj :isHandle='false' :status='1'></yhj>
      </div> -->
    </scroller>
  </div>
</template>

<script>
  import yhj from './components/index';
  import checkLogin from '@/mixins/checkLogin.js';

  export default {
    data() {
      return {
        noData: false,
        list: [],
        p: 1
      }
    },
    created() {},
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
      lingqu(yhj, index) {
        this.$axios.get('/Api/Yhq/user_get_yhq', {
          params: {
            yhq_id: yhj.id,
            shop_id: this.shopId,
            user_id: this.id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            this.list[index].l_yes = 0;
            this.$vux.alert.show({
              title: '提示',
              content: '领取成功！'
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '领取失败！'
            })
          }
        })
      }
    },
    computed: {
      shopId() {
        return this.$route.query.shopId;
      },
      fwId() {
        return this.$route.query.fwId;
      }
    },
    components: {
      yhj
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss' scoped>
  .lq-yhj {
    position: relative;
    background: #ffffff;
    .desc-tit {
      font-size: .373333rem/* 28/75 */
      ;
      border-left: .106667rem/* 8/75 */
      solid #01aafe;
      padding-left: .4rem/* 30/75 */
      ;
      margin-top: .666667rem/* 50/75 */
      ;
    }
    .list {
      padding: .4rem/* 30/75 */
      ;
    }
    .line {
      display: flex;
      align-items: center;
      padding: 0 .88rem/* 66/75 */
      ;
      .l {
        flex: 1;
        border-bottom: 1px solid #e4e4e4;
      }
      .m {
        width: 2.333333rem/* 175/75 */
        ;
        flex: none;
        text-align: center;
        img {
          width: .573333rem/* 43/75 */
          ;
        }
      }
    }
  }

</style>
