<template>
  <div class="order-gl">
    <bigTitle title="操作优惠券" @showPopup='showPopup' :icon='false' :right='true'>
      <iview-select slot="right" class="select-wrapper" size='large' placeholder='请选择订单类型' v-model="yhjType" @on-change='changeType'>
        <iview-op value=''>全部</iview-op>
        <iview-op value='0'>未审核</iview-op>
        <iview-op value='1'>已审核未上架</iview-op>
        <iview-op value='3'>已上架</iview-op>
        <iview-op value='4'>未通过审核</iview-op>

      </iview-select>
    </bigTitle>
    <div class="scroll-wrapper">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div class="yhj-item" v-for="(item,index) in list" :key="index">
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
                <span v-if="item.yh_status == 3">全店通用</span>
                <span v-else-if='item.yh_status == 1'>指定类型</span>
                <span v-else-if='item.yh_status == 2'>指定服务</span>
              </span>
            </div>
            <div>
              <span class="tit">数量：</span>
              <span>1000张</span>
            </div>
          </div>
          <div class="handle" v-if="item.status == 0||item.status == 1||item.status == 4">
            <div class="h-item" @click="edit(item.id)">
              <span class="h-icon">
                <img src="./img/xiugai.png" alt="">
              </span>
              <div class="tit">修改</div>
            </div>
            <div class="h-item" v-if="item.status == 0||item.status == 1||item.status == 4" @click="delete_yhj(item.id,index)">
              <span class="h-icon">
                <img src="./img/shanchu.png" alt="">
              </span>
              <div class="tit">删除</div>
            </div>
            <div class="h-item" @click="open_config(index)" v-if="item.status == 1">
              <span class="h-icon">
                <img src="./img/shangjia.png" alt="">
              </span>
              <div class="tit">上架</div>
            </div>
          </div>


        </div>
      </scroller>
    </div>



    <Popup v-model="alertShow" position='center'>
      <div class="config" v-if="current_yhj">
        <div class="info">
          <h1>上架配置</h1>
          <div class="line">
            <span class="tit">周期：</span>
            <span v-if="current_yhj.yh_num_status == 1">优惠券领完为止</span>
            <div v-else-if='current_yhj.yh_num_status == 2' class="day-input">
              <Group class="reset-vux-input">
                <!-- <XInput placeholder='发放天数' v-model="day"></XInput> -->
                <Datetime :start-date='start_time'  v-model="day" placeholder='发放天数'></Datetime>
              </Group>
              <p class="mtip">注：每人限领一张</p>
            </div>

          </div>
          <div class="line">
            <span class="tit">派发方式：</span>
            <div>
              <div>
                <mu-radio color='#0fbd78' label="店铺领取" v-model="provide_type" :value='1'></mu-radio>
              </div>
              <div>
                <mu-radio color='#0fbd78' label="下单支付完成派发" v-model="provide_type" :value='2'></mu-radio>
              </div>
              <div>
                <mu-radio color='#0fbd78' label="服务完成后派发" v-model="provide_type" :value='3'></mu-radio>
              </div>
            </div>
          </div>
          <p class="tips">如指定类别和服务就根据指定否则全店通用</p>
        </div>
        <div class="btn-wrapper">
          <XButton :mini='true' @click.native='sj_yhj'>上架</XButton>
          <XButton :mini='true' @click.native="cancel">取消</XButton>
        </div>
      </div>
    </Popup>
  </div>



</template>

<script>
  import {
    Group,
    XInput,
    XButton,
    Datetime
  } from 'vux';
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        current_index: 0,
        alertShow: false,
        start_time:'',
        yhjType: '',
        provide_type: '',
        day: '',
        noData: false,
        list: [],
        p: 1
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);

      this.get_list();

      console.log(this.$moment().format('YYYY-MM-DD'));
      this.start_time = this.$moment().format('YYYY-MM-DD');

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
              p: this.p,
              num: 8,
              status: this.yhjType
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
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      open_config(index) {
        this.alertShow = true;
        this.current_index = index;
      },
      sj_yhj() {
        if (this.current_yhj.yh_num_status == 2) {
          //   填写周期
          if (!this.day) {
            this.$vux.toast.text('请填写发放天数')
          }
        }
        if (!this.provide_type) {
          this.$vux.toast.text('请选择派发方式')
        } else {
          this.$axios.get('/Api/Yhq/sj_yhq', {
            params: {
              id: this.current_yhj.id,
              yh_xj_day:this.$moment(this.day).unix(),
              pf_status:this.provide_type
            }
          }).then(({data})=>{
              this.$router.push({
                  path:'/shanghu/jingying/yhjList'
              })
          })
        }
      },
      cancel() {
        this.alertShow = false;
        this.day = '';
        this.provide_type = '';
      },
      changeType(val) {
        this.list = [];
        this.p = 1;
        this.noData = false;
        this.get_list();
      },
      edit(id) {
        this.$router.push({
          path: '/shanghu/jingying/createdYhj',
          query: {
            id
          }
        })
      },
      delete_yhj(id, index) {
        var _this = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '确定删除该优惠券？',
          // 组件除show外的属性
          onCancel() {},
          onConfirm() {
            _this.$axios.get('/Api/Yhq/delete_yhq', {
              params: {
                id
              }
            }).then(({
              data
            }) => {
              console.log(data);
              _this.list.splice(index, 1);
            })
          }
        })


      }
    },
    computed: {
      current_yhj() {
        return this.list[this.current_index];
      },
    },
    components: {
      bigTitle,
      Popup,
      XInput,
      Group,
      XButton,
      Datetime
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
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
          width: 1.666667rem/* 125/75 */
          ;
        }
        &>div {
          display: flex;
        }
      }
      .handle {
        padding-right: .4rem/* 30/75 */
        ;
        overflow: hidden;
        .h-item {
          float: left;
          margin-right: 2rem/* 150/75 */
          ;
          text-align: center;
          &:last-child {
            margin-right: 0;
          }
          .h-icon {
            display: inline-block;
            margin-bottom: .266667rem/* 20/75 */
            ;
            box-shadow: 0 4px 10px rgba(#000000, .4);
            width: 1.6rem/* 120/75 */
            ;
            height: .72rem/* 54/75 */
            ;
            line-height: .72rem/* 54/75 */
            ;
            border-radius: .133333rem/* 10/75 */
            ;
            background: #36a0ff;
            img {
              width: .453333rem/* 34/75 */
              ;
            }
          }
          .tit {
            font-weight: bold;
          }
        }

      }
    }
    .config {
      .info {
        padding: .4rem/* 30/75 */
        ;
        background: #ffffff;
        width: 9.2rem/* 690/75 */
        ;
        border-radius: .133333rem/* 10/75 */
        ;
        font-size: .373333rem/* 28/75 */
        ;
        h1 {
          font-size: .373333rem/* 28/75 */
          ;
          margin-bottom: 1.066667rem/* 80/75 */
          ;
        }
        .tips {
          text-align: center;
          color: #9c9c9c;
          font-size: .293333rem/* 22/75 */
          ;
        }
        .line {
          display: flex;
          margin-bottom: 1.066667rem/* 80/75 */
          ;
          .tit {
            flex: none;
            width: 2.666667rem/* 200/75 */
            ;
          }
          .day-input{
              flex: 1;
          }
          .mtip {
            color: #b1b1b1;
            font-size: .293333rem/* 22/75 */
            ;
            margin: .266667rem/* 20/75 */
            0 0 .6rem/* 45/75 */
            ;
          }
        }
      }
      .btn-wrapper {
        display: flex;
        justify-content: space-between;
        padding: .4rem/* 30/75 */
        ;
        .weui-btn+.weui-btn {
          margin-top: 0;
        }
      }
    }

  }

</style>
