<template>
  <div class="mine-jms page">
    <div class="search-wrapper">
      <div class="search">
        <div class="search-btn">
          <Selector title='城市' v-model="cityId" :options='city' @on-change='changeCity' ref="city"></Selector>
        </div>
        <i class="iconfont icon-zhankai1" @click="select"></i>
      </div>
      <div class="search">
        <div class="search-btn">
          <Selector title='地区' v-model="qyId" :options='qy' @on-change='changeQy' :value-map="['id','qy_name']"></Selector>
        </div>
        <i class="iconfont icon-zhankai1" @click="select"></i>
      </div>
    </div>
    <betterScroll @pullingUp='pullingUp' ref='scroll'>
      <div>
        <jms :jms='item' v-for="(item,index) in list" :key='index'></jms>
      </div>
      <span slot="loadingTip">正在加载数据...</span>
      <span slot="doneTip">暂无更多数据</span>
    </betterScroll>
  </div>
</template>

<script>
  import betterScroll from "@/components/betterScroll";
  import checkLogin from "@/mixins/checkLogin.js";
  import jms from "./components/jms";
  import setTitle from '@/mixins/setTitle.js'
  import {
    Selector,
    Group
  } from 'vux';
  export default {
    data() {
      return {
        p: 1,
        list: [],
        add: [],
        city: [{
          value: '全部',
          key: 0
        }],
        qy: [],
        cityId: 0,
        qyId: 0,

      };
    },
    created() {
      this.get_add();
    },
    methods: {
      get_add() {
        this.$axios.get(this.API_URL + '/Api/DlCore/get_name', {
          params: {
            dl_id: this.userinfo.dl[0].id,
            dl_jb: this.userinfo.dl[0].dl_jb
          }
        }).then(({
          data
        }) => {
          this.add = data;

          data.map(m => {
            var item = {};
            item.key = m.id;
            item.value = m.city;
            this.city.push(item);
          })
          console.log(this.add)
        })
      },
      get_shop() {
        return this.$axios
          .get(this.API_URL + "/Api/DlCore/dl_get_shop", {
            params: this.params
          })
          .then(({
            data
          }) => {
            if (data.ok == 1) {
              console.log("还有数据");
              this.p = this.p + 1;
            } else if (data.ok == 0) {
              console.log("没数据了");
              this.$refs.scroll.closePullUp();
            }
            this.$refs.scroll.pullupLoadend();
            return data.list;
          });
      },
      pullingUp() {
        this.$refs.scroll.finishPullupload();
      },
      changeCity(cityId) {
        console.log('触发选择城市')
        console.log(cityId)
        this.list = [];
        console.log('清空list')
        this.qyId = 0;
        if (cityId === 0) {
          this.qy = [{
            qy_name: '全部',
            id: 0
          }]
        } else {
          console.log(this.add)
          this.add.map(m => {
            if (m.id == cityId) {
              this.qy = m.son;
              console.log(m.son)
            }
          })
          console.log(this.qy)
          var qy = [...this.qy];
          qy.unshift({
            qy_name: '全部',
            id: 0
          })
          this.qy = qy;
          console.log(this.qy)
        }
        this.p = 1;
        this.get_shop().then(list => {
          this.list = list;
        })
      },
      changeQy(qyId) {
        console.log('触发选择区域')
        console.log('qyId' + qyId)
        this.list = [];
        this.p = 1;
        this.get_shop().then(list => {
          this.list = list;
        })
      },
      select() {
        this.open(this.$refs.city);
      },
      open(elem) {
        if (document.createEvent) {
          var e = document.createEvent("MouseEvents");
          e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          elem[0].dispatchEvent(e);
        } else if (element.fireEvent) {
          elem[0].fireEvent("onmousedown");
        }
      }

    },
    computed: {
      params() {
        var params = {
          dl_jb: this.userinfo.dl[0].dl_jb,
          dl_id: this.userinfo.dl[0].id,
          num: 8,
          p: this.p
        }
        if (this.qyId != 0) {
          Object.assign(params, {
            qy: this.qyId
          })
        } else if (this.qyId === 0 && this.cityId != 0) {
          Object.assign(params, {
            city: this.cityId
          })
        }
        return params;

      }
    },
    components: {
      jms,
      betterScroll,
      Selector,
      Group
    },
    mixins: [checkLogin, setTitle]
  };

</script>

<style lang='scss'>
  .mine-jms {
    padding-top: 3.2rem/* 240/75 */
    ;
    .search-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      background: #ffffff;
      padding: 0 .4rem/* 30/75 */
      ;
      display: flex;
      align-items: center;
      width: 100%;
      z-index: 200;
      .search {
        display: flex;
        align-items: center;
        height: 2.933333rem/* 220/75 */
        ;
        flex: 1;
        .search-btn {
          font-size: .373333rem/* 28/75 */
          ;
          color: #ffffff;
          text-align: center;
          height: 1.133333rem/* 85/75 */
          ;
          line-height: 1.133333rem/* 85/75 */
          ;
          width: 3.253333rem/* 244/75 */
          ;
          background: #5b62fb;
          border-radius: .133333rem/* 10/75 */
          ;
          .weui-cell__hd {
            width: 1px;
            visibility: hidden;
          }
          select {
            width: 100%;
            height: 100%;
            color: #ffffff;
            border: none;
            text-align: center;
            padding-left: .56rem/* 42/75 */
            ;
          }
          .weui-cell_select .weui-cell__bd:after {
            display: none;
          }
        }
        .iconfont {
          font-size: .48rem/* 36/75 */
          ;
          color: #434343;
        }
      }
    }

  }

</style>
