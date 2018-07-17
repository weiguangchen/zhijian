<template>
  <div class="address-list">
    <betterScroll>
      <div class="address-item" v-for="(item,index) in list" :key="index">
        <div class="name">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="address">
          <div class="add">服务地址：{{item.three}}{{item.adress}}</div>
          <div class="info">车辆信息：{{item.car_card}}&nbsp;&nbsp;{{item.car_xing}}&nbsp;&nbsp;{{item.car_color}}</div>
        </div>
        <div class="handler">
          <mu-radio label='设为默认地址' v-model="moren" :value='item.id' @change='set_moren'></mu-radio>
          <div>
            <XButton :plain='true' :mini='true' type='warn' @click.native='edit_add(item.id)'>编辑</XButton>
            <XButton :plain='true' :mini='true' type='warn' @click.native="deleteAdd(item.id)" v-if="item.id != moren">删除</XButton>
          </div>
        </div>
      </div>
    </betterScroll>

    <XButton type='warn' class="xbtn" @click.native="add_add">添加地址</XButton>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton
  } from 'vux'
  import betterScroll from '@/components/betterScroll';
  import checkLogin from "@/mixins/checkLogin.js";
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {
        list: [],
        moren: ''
      }
    },
    created() {
      this.get_List();
    },
    methods: {
      get_List() {
        this.$axios.get(this.API_URL + '/Api/Adress/get_adress', {
          params: {
            uid: this.id
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.list = data;
          data.map(m => {
            if (m.status == 1) {
              this.moren = m.id;
            }
          })
        })
      },
      add_add() {
        this.$router.push({
          path: '/editAddress'
        })
      },
      set_moren(val) {
        var params = {
          uid: this.id,
          id: val
        }
        console.log(val);
        this.$axios.get(this.API_URL + '/Api/Adress/sz_mr_adress', {
          params
        }).then(({
          data
        }) => {

        })
      },
      deleteAdd(val) {
        var params = {
          id: val
        }
        this.$axios.get(this.API_URL + '/Api/Adress/delete_adress', {
          params
        }).then(({
          data
        }) => {
          console.log(data)
          if (data.status == 1) {
            this.$vux.alert.show({
              title: '提示',
              content: data.msg
            })

          }
        }).then(res => {
          this.get_List();
        })
      },
      edit_add(id) {
        this.$router.push({
          path: '/editAddress',
          query: {
            id
          }
        })
      },
      select_add() {
        console.log(1)
        this.cityShow = true;
      }
    },
    components: {
      Group,
      XInput,
      XButton,
      betterScroll
    },
    mixins: [checkLogin,setTitle]
  }

</script>

<style lang='scss' scoped>
  .address-list {
    padding-bottom: 80px;
    height: 100%;
    position: relative;
    background: #f0f0ff;
    .address-item {
      font-size: .373333rem/* 28/75 */
      ;
      padding-left: .4rem/* 30/75 */
      ;
      background: #ffffff;
      margin-bottom: $bot;
      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.533333rem/* 115/75 */
        ;
        border-bottom: 1px dashed #f0f0ff;
        padding-right: .666667rem/* 50/75 */
        ;
      }
      .address {
        padding: .266667rem/* 20/75 */
        0;
        line-height: 2;
        border-bottom: 1px solid #f0f0f0;
        .info {
          color: #5b5b5b;
          font-size: .32rem/* 24/75 */
          ;
        }
        .add {
          word-wrap: break-word;
        }
      }
      .handler {
        height: 1.266667rem/* 95/75 */
        ;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .533333rem/* 40/75 */
        ;
        .mu-radio-label {
          font-size: .373333rem/* 28/75 */
          ;
        }
        .weui-btn {
          margin-left: .32rem/* 24/75 */
          ;
        }
        .weui-btn+.weui-btn {
          margin-top: 0;
        }
      }
    }
    .xbtn {
      position: fixed;
      left: 0;
      bottom: 0;
      border-radius: 0;
      &:after {
        border-radius: 0;
      }
    }
  }

</style>
