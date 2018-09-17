<template>

  <div class="yhj-wrapper">
    <Swipeout>
      <SwipeoutItem :disabled='true' ref="SwipeoutItem" @touchstart.native="showDelete" @touchend.native="clearDelete">
        <div slot="right-menu">
          <SwipeoutButton type='warn' @click.native='deleteYhj'>
            <img src="./icon.png" alt="" class="delete-icon">
          </SwipeoutButton>
        </div>
        <div slot="content">
          <div class="yhj" :class="{notuse:disabled}">
            <div class="yhj-img">
              <h1>￥{{$filter_money(info.yh_money)}}</h1>
              <div class="full-down">满{{$filter_money(info.man_jian)}}元可用</div>
            </div>
            <div class="yhj-info">
              <div>{{info.yh_name}}</div>
              <div class="line2">
                <span>有效期:{{info.yes_day}}天</span>
                <XButton class="use-yhj" v-if="hasBtn" :disabled='disabled' @click.native='lingqu'>
                  <slot>点击领取</slot>
                </XButton>
              </div>
            </div>

          </div>
        </div>
      </SwipeoutItem>
    </Swipeout>
    <!-- <div class="status-text is-lq" v-if="status==0">已领取</div> -->
    <div class="status-text is-use" v-if="status==1">已使用</div>
    <div class="status-text is-use" v-if="status==2">已过期</div>
  </div>

</template>

<script>
  import {
    XButton,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
  } from 'vux';
  import {
    setTimeout,
    clearTimeout
  } from 'timers';

  export default {
    data() {
      return {}
    },
    props: {
      isHandle: {
        default: true,
      },
      status: {
        default: ''
      },
      isDelete: {
        default: false
      },
      disabled: {
        default: false
      },
      info: {
        default: {}
      },
      hasBtn:{
          default:true
      }
    },
    methods: {
      showDelete() {
        console.log(111)
        if (!this.isDelete) return;
        var _this = this;
        this.$refs.SwipeoutItem.close();
        this.Loop = setTimeout(() => {
          _this.$refs.SwipeoutItem.open('right');
        }, 800)
      },
      clearDelete() {
        if (!this.isDelete) return;
        clearTimeout(this.Loop)
      },
      deleteYhj(){
          this.$emit('deleteYhj');
      },
      lingqu() {
        this.$emit('btnClick');
      }
    },
    components: {
      XButton,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    }
  }

</script>

<style lang='scss'>
  .yhj-wrapper {
    position: relative;
    .yhj {
    //   margin-bottom: .666667rem/* 50/75 */
    //   ;
      position: relative;
      display: flex;
      .yhj-img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 2.666667rem/* 200/75 */
        ;
        height: 2.666667rem/* 200/75 */
        ;
        flex: none;
        text-align: center;
        background: url(./bg.png) no-repeat;
        background-size: cover;
        color: #ffffff;
        h1 {
          font-size: .48rem/* 36/75 */
          ;
          text-shadow: #0081fc .066667rem/* 5/75 */
          .066667rem/* 5/75 */
          .066667rem/* 5/75 */
          ;
        }
        .full-down {
          font-size: .32rem/* 24/75 */
          ;
        }
      }
      .yhj-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: .4rem/* 30/75 */
        ;
        background: #f8f8f8;
        font-size: .32rem/* 24/75 */
        ;
        .line2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .use-yhj {
          margin: 0;
          width: auto;
          height: .666667rem/* 50/75 */
          ;
          line-height: .666667rem/* 50/75 */
          ;
          padding: 0 .333333rem/* 25/75 */
          ;
          border-radius: .333333rem/* 25/75 */
          ;
          background: #82defe;
          color: #ffffff;
          font-size: .32rem/* 24/75 */
          ;
        }

      }
      .delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.6rem/* 120/75 */
        ;
        background: #fe403f;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .status-text {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: .2rem/* 15/75 */
      ;
      transform: rotate(20deg);
      font-size: .506667rem/* 38/75 */
      ;
      color: #ffffff;
      font-size: .186667rem/* 14/75 */
      ;
      padding: .133333rem/* 10/75 */
      ;
      border-radius: .133333rem/* 10/75 */
      ;
      width: 1.386667rem/* 104/75 */
      ;
      height: .72rem/* 54/75 */
      ;
      z-index: 9999;
    }
    .is-use {
      color: #ee6663;
    }
    .is-lq {
      background: #f75a5a;
    }
    .delete-icon {
      width: .466667rem/* 35/75 */
      ;
    }
  }

  .notuse {
    opacity: .4;

  }

</style>
