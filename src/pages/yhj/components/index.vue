<template>

  <div class="yhj-wrapper" :class="{notuse:disabled}">
    <Swipeout>
      <SwipeoutItem :disabled='true' ref="SwipeoutItem" @touchstart.native="isDelete?showDelete:''" @touchend.native="isDelete?clearDelete:''">
        <div slot="right-menu">
          <SwipeoutButton type='warn'>
            <img src="./icon.png" alt="" class="delete-icon">
          </SwipeoutButton>
        </div>
        <div slot="content">
          <div class="yhj">
            <div class="yhj-img">
              <h1>￥{{cut0(info.yh_money)}}</h1>
              <div class="full-down">满{{cut0(info.man_jian)}}元可用</div>
            </div>
            <div class="yhj-info">
              <div>{{info.yh_name}}</div>
              <div class="line2">
                <span>有效期:{{info.yes_day}}天</span>
                <XButton class="use-yhj" :disabled='disabled' v-if="isHandle" @click.native='lingqu'>
                  <slot>点击</slot>
                </XButton>
                <template v-else>
                  <span class="status-text is-lq" v-if="status==1">已领取</span>
                  <span class="status-text is-use" v-if="status==2">已使用</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </SwipeoutItem>
    </Swipeout>
    <!-- <div class="notuse">

    </div> -->
  </div>

</template>

<script>
  import {
    XButton,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
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
        default: 1
      },
      isDelete: {
        default: false
      },
      disabled: {
        default: false
      },
      info: {
        default: {}
      }
    },
    methods: {
      showDelete() {
        var _this = this;
        this.$refs.SwipeoutItem.close();
        this.Loop = setTimeout(() => {
          _this.$refs.SwipeoutItem.open('right');
        }, 800)
      },
      clearDelete() {
        clearTimeout(this.Loop)
      },
      cut0(num) {
          console.log(num.toString())
        if (num.toString().indexOf('.') > 0) {
          return num.split('.')[0];
        }
      },
      lingqu(){
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
      margin-bottom: .666667rem/* 50/75 */
      ;
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
        .status-text {
          font-size: .506667rem/* 38/75 */
          ;
          font-weight: bold;
        }
        .is-use {
          color: #ee6663;
        }
        .is-lq {
          color: #01aafe;
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
    .delete-icon {
      width: .466667rem/* 35/75 */
      ;
    }
    .notuse {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   z-index: 200;
      opacity: .4;
    //   background: #ffffff;
    }
  }
  .notuse{
      opacity: .4;

  }

</style>
