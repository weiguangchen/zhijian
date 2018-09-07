<template>
  <div class="order-gl">
    <bigTitle title="管理优惠券" @showPopup='showPopup' :icon='false' :right='true'>
      <iview-select slot="right" class="select-wrapper" size='large' placeholder='选择优惠券类型' v-model="yhjType" @on-change='changeType'>
        <iview-op :value="1">使用中</iview-op>
        <iview-op :value="2">未使用</iview-op>

      </iview-select>
    </bigTitle>
    <div class="scroll-wrapper">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div class="yhj-item" v-for="item in list" :key="item.id">
          <div class="info">
            <div>
              <span class="tit">名称：</span>
              <span>{{item.yh_name}}</span>
            </div>
            <div>
              <span class="tit">面额：</span>
              <span>{{item.yh_money}}元</span>
            </div>
            <div>
              <span class="tit">有效期：</span>
              <span>{{item.yes_day}}天</span>
            </div>
            <div>
              <span class="tit">条件：</span>
              <span>
                <span v-if="item.yh_status == 1">指定类别</span>
                <span v-else-if="item.yh_status == 2">指定服务</span>
                <span v-else-if="item.yh_status == 3">店铺通用</span>

              </span>
            </div>
            <div>
              <span class="tit">数量：</span>
              <span v-if="item.yh_num_status == 1">一人一张</span>
              <span v-else>{{item.yh_num}}张</span>
            </div>
            <div  v-if="item.yh_num_status == 1">
              <span class="tit">下架时间：</span>
              <span>{{($moment.unix(item.yh_xj_day)).format('YYYY-MM-DD')}}</span>
            </div>
            <div v-else-if="item.yh_num_status == 2">
              <span class="tit">剩余数量：</span>
              <span>{{item.yh_num-item.ok_num}}张</span>
            </div>
          </div>
          <div class="total">
            <span class="active">领取：{{item.ok_num}}张</span>
            <span>使用：{{item.yes_num}}张</span>
            <span>过期：{{item.no_num}}张</span>
          </div>


        </div>
      </scroller>
    </div>

  </div>

</template>

<script>
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        yhjType: 1,
        noData: false,
        list: [],
        p: 1
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);
      this.get_list();
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
          this.$axios.get('/Api/Yhq/get_yhq', {
            params: {
              shop_id: this.userinfo.shop[0].id,
              status:3,
              p: this.p,
              num: 8
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
            console.log(this.$moment.unix(this.list[0].yh_xj_day))

            if (fn) fn();
          })
        }
      },

      showPopup(val) {
        this.$emit("showPopup", val);
      },
      changeType(val) {
          if(val == 2){
              this.$router.push({
                  path:'/shanghu/jingying/yhjHandle'
              })
          }
      },



    },

    components: {
      bigTitle,
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss' scoped>
  .order-gl {
    height: 100%;
    background: #f0f0f0;
    position: relative;
    display: flex;
    flex-direction: column;
    .scroll-wrapper {
      flex: 1;
      position: relative;
    }
    .select-wrapper {
      font-size: .373333rem/* 28/75 */
      ;
    }
    .yhj-item {
      margin-bottom: $bot;
      padding-left: .4rem/* 30/75 */
      ;
      padding-bottom: .6rem/* 45/75 */
      ;
      background: #ffffff;
      font-size: .373333rem/* 28/75 */
      ;
      .info {
        line-height: .986667rem/* 74/75 */
        ;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: .4rem/* 30/75 */
        ;
        margin-bottom: .533333rem/* 40/75 */
        ;
        .tit {
          flex: none;
          width: 2rem;
        }
        &>div {
          display: flex;
        }
      }
      .total {
        padding-right: .4rem/* 30/75 */
        ;
        display: flex;
        justify-content: space-between;
        &>span {
          display: inline-block;
          padding: .133333rem/* 10/75 */
          ;
        }
        .active {
          border-radius: .186667rem/* 14/75 */
          ;
          box-shadow: 0 4px 10px rgba(#000000, .4);
          color: #11be7a;
        }
      }
    }
  }

</style>
