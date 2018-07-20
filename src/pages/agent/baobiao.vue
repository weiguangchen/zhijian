<template>
  <div class="baobiao page">
    <div class="shaixuan">
      <div class="open" v-if="shaixuan">
        <div class="wrapper">
          <h1>时间段</h1>
          <div class="time-wrap">
            <iview-date type='daterange' size='small' :value='date' :open='dateOpen' confirm @on-ok='dateOpen = false' :options='dateOption'
              placement='left-end' @on-change='changeDate'>
              <span @click="dateOpen = true">
                <!-- <template v-if="date[0] == ''">{{formatDate(start_time)}}</template> -->
                <template>{{formatDate(date[0])}}</template>
                &nbsp;&nbsp;——&nbsp;&nbsp;
                <!-- <template v-if="date[1] == ''">{{formatDate(new Date)}}</template> -->
                <template>{{formatDate(date[1])}}</template>
                <i class="iconfont icon-rili"></i>
              </span>
            </iview-date>
          </div>

        </div>
        <div class="wrapper">
          <h1>代理商等级</h1>
          <div class="btns">
            <Checker type='radio' v-model="dl" selected-item-class='active' default-item-class='default-span' :radio-required='true'
              @on-change='changeDl'>
              <CheckerItem :value='1' @on-item-click='dlClick'>市级代理</CheckerItem>
              <CheckerItem :value='2' @on-item-click='dlClick'>区级代理</CheckerItem>
              <CheckerItem :value='3' @on-item-click='dlClick'>加盟商</CheckerItem>
            </Checker>
          </div>
        </div>
        <div class="wrapper">
          <h1>排名</h1>
          <div class="btns">
            <Checker type='radio' v-model="paihang" selected-item-class='active' default-item-class='default-span' :radio-required='true'
              @on-change='changePh'>
              <CheckerItem :value='1'>订单总额</CheckerItem>
              <CheckerItem :value='2'>完成订单总额</CheckerItem>
            </Checker>
          </div>
        </div>
        <img src="~img/public/agent-arrow1.png" alt="" class="btn-img" @click="shaixuan = false">
      </div>
      <div class="close" v-else>
        <div class="line line1">
          <span v-if="date[0] == ''||date[1] == ''">{{formatDate(start_time)}}&nbsp;&nbsp;——&nbsp;&nbsp;{{formatDate(new Date)}}</span>
          <span class="left" v-else>{{formatDate(date[0])}} —— {{formatDate(date[1])}}</span>
          <div class="tit">筛选报表</div>
        </div>
        <div class="line">
          <div class="left">
            <span class="dl">{{dl_key}}</span>
            <span class="dl">{{ph_key}}</span>
          </div>
          <div class="tit">
            <img src="~img/public/agent-arrow.png" alt="" @click="shaixuan = true">
          </div>
        </div>
      </div>
    </div>
    <betterScroll>
      <div class="list">
        <div v-for="(item,index) in list" :key="index">
          <agentCity :agent='item' v-if="item.dl_jb == 2"></agentCity>
          <agentQy :agent='item' v-else-if='item.dl_jb == 3'></agentQy>
        </div>
      </div>
    </betterScroll>


  </div>
</template>

<script>
  import {
    Checker,
    CheckerItem
  } from 'vux';
  import betterScroll from "@/components/betterScroll";

  import setTitle from '@/mixins/setTitle.js'
  import checkLogin from "@/mixins/checkLogin.js";
  import agentCity from './components/baobiao/agentCity';
  import agentQy from './components/baobiao/agentQy';
  export default {
    data() {
      return {
        shaixuan: false,
        dateOpen: false,
        dateOption: {
          // disabledDate(date) {
          //   return date && date.valueOf() < Date.now() - 86400000;
          // }
        },
        dlmap: [{
          key: '市区代理',
          value: 1
        }, {
          key: '区级代理',
          value: 2
        }, {
          key: '加盟商',
          value: 3
        }],
        phmap: [{
          key: '订单总额',
          value: 1
        }, {
          key: '完成订单总额',
          value: 2
        }],


        start_time: '2018-05-01',
        end_time: this.$moment().format('YYYY-MM-DD'),
        dl: 1,
        paihang: 1,
        p: 1,

        list: []
      }
    },
    created() {
      if (this.userinfo.dl[0].dl_jb == 1) {
        // 股东代理
        this.get_city();
      } else if (this.userinfo.dl[0].dl_jb == 2) {
        // 市级代理
        this.dl = 2;
        this.get_qy();
      } else if (this.userinfo.dl[0].dl_jb == 3) {
        // 区级代理
        this.dl = 3;
        this.get_jms();
      }
    },
    methods: {
      get_city() {
        this.$axios.get(this.API_URL + '/Api/DlCore/dl_bb_sd', {
          params: this.tiaojian
        }).then(({
          data
        }) => {
          console.log(data);
          this.list = data.list;
        })
      },
      get_qy() {
        this.$axios.get(this.API_URL + '/Api/DlCore/dl_bb_qy', {
          params: this.tiaojian
        }).then(({
          data
        }) => {
          console.log(data);
          this.list = data.list;
        })
      },
      get_jms() {
        this.$axios.get(this.API_URL + '/Api/DlCore/get_shop', {
          params: this.tiaojian
        }).then(({
          data
        }) => {
          console.log(data)
          this.list = data.list;
        })
      },
      formatDate(date) {
        return this.$moment(date).format('YYYY年MM月DD日');
      },
      changeDl(val) {
        console.log(val);
        this.changeTiaoJian();
      },
      changePh(val) {
        this.changeTiaoJian();
      },
      changeTiaoJian() {
        var val = this.dl;
        if (val == 1) {
          this.get_city();
        } else if (val == 2) {
          this.get_qy();
        } else if (val == 3) {
          this.get_jms();
        }
      },
      changeDate(val) {
        this.start_time = val[0];
        this.end_time = val[1];
        this.changeTiaoJian();
      }
    },
    computed: {
      date: {
        get() {
          return [this.start_time, this.end_time];
        },
        set(val) {
          this.start_time = this.$moment(val[0]).format('YYYY-MM-DD');
          this.end_time = this.$moment(val[0]).format('YYYY-MM-DD');
        }
      },
      dl_key() {
        var dl_key;
        this.dlmap.map(m => {
          if (m.value == this.dl) {
            dl_key = m.key;
          }
        })
        return dl_key;
      },
      ph_key() {
        var ph_key;
        this.phmap.map(m => {
          if (m.value == this.paihang) {
            ph_key = m.key;
          }
        })
        return ph_key;
      },
      tiaojian() {
        var params = {
          dl_id: this.userinfo.dl[0].id,
          dl_jb: this.userinfo.dl[0].dl_jb,
          tj: this.paihang,
          num: 8,
          p: this.p,
          start_time: this.$moment(this.start_time).unix(),
          end_time: this.$moment(this.end_time).unix()
        };
        return params;
      }
    },
    components: {
      agentCity,
      agentQy,
      betterScroll,
      CheckerItem,
      Checker
    },
    mixins: [setTitle, checkLogin]
  }

</script>

<style lang='scss'>
  .baobiao {
    padding-top: 3.2rem/* 240/75 */
    ;
    .shaixuan {
      background: #ffffff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      .open {
        font-size: .373333rem/* 28/75 */
        ;
        .wrapper {
          margin-bottom: .773333rem/* 58/75 */
          ;
          h1 {
            font-weight: bold;
            margin-bottom: .666667rem/* 50/75 */
            ;
          }
          .btns {
            %span {
              display: inline-block;
              margin-right: .666667rem/* 50/75 */
              ;
              height: .8rem/* 60/75 */
              ;
              line-height: .8rem/* 60/75 */
              ;
              padding: 0 .24rem/* 18/75 */
              ;
              font-size: .373333rem/* 28/75 */
              ;
            }
            .default-span {
              @extend %span;
            }
            .active {
              color: #ffffff;
              background: #3598f9;
              border-radius: .24rem/* 18/75 */
              ;
            }
          }
          .time-wrap {
            display: flex;
            align-items: center;
            .iconfont {
              color: #3a95ff;
              font-size: .466667rem/* 35/75 */
              ;
              margin-left: .466667rem/* 35/75 */
              ;
            }
          }
        }
        .btn-img {
          width: .746667rem/* 56/75 */
          ;
          display: block;
          margin: 0 auto;
        }

      }
      .close {
        .line {
          display: flex;
          align-items: center;
          .tit {
            font-weight: bold;
            font-size: .373333rem/* 28/75 */
            ;
            flex: 1;
            text-align: center;
            img {
              width: .746667rem/* 56/75 */
              ;
            }
          }
          .left {
            width: 6.8rem/* 510/75 */
            ;
            flex: none;
            .dl {
              margin-right: 1.333333rem/* 100/75 */
              ;
            }
          }
        }
        .line1 {
          margin-bottom: .4rem/* 30/75 */
          ;
        }
      }
      .ivu-select-dropdown {
        transform: scale(.85); //   min-width: none;
      }
      box-shadow: 0 4px 10px 4px rgba(#000000, .08);
      font-size: .32rem/* 24/75 */
      ;
      padding: .533333rem/* 40/75 */
      .4rem/* 30/75 */
      ;

    }
    .list {
      .agent-item {
        &:nth-child(odd) {
          background: url(~img/public/agent-list.png) no-repeat;
          background-position: 0 50%;
          background-size: cover;
          color: #ffffff;
          .top {
            border-bottom: 1px solid #ffffff;
          }
        }
        &:nth-child(even) {
          color: #000000;
          .top {
            border-bottom: 1px solid #000000;
          }
        }
      }
    }
  }

</style>
