/*
 * @Author: 魏广辰 
 * @Date: 2018-05-26 12:02:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-26 18:00:55
 */
<template>
  <div class="page">
    <ViewBox>
      <div class="top-ad">
        <div class="top-input">
          <span>天津</span>
          <div class="search"><input type="text" placeholder="请输入商家名或地点"></div>
        </div>
      </div>
      <div class="classify">
        <div class="line">
          <a href="" class="item"><img src="~img/public/smxc.png" alt="" class="img">
            <div>上门洗车</div>
          </a>
          <a href="" class="item"><img src="~img/public/qcmr.png" alt="" class="img">
            <div>汽车美容</div>
          </a>
          <a href="" class="item"><img src="~img/public/jjyh.png" alt="" class="img">
            <div>家具养护</div>
          </a>
          <a href="" class="item"><img src="~img/public/jzfw.png" alt="" class="img">
            <div>家政服务</div>
          </a>
        </div>
        <div class="line">
          <a href="" class="item"><img src="~img/public/jqqc.png" alt="" class="img">
            <div>甲醛清除</div>
          </a>
          <a href="" class="item"><img src="~img/public/zxcp.png" alt="" class="img">
            <div>在线产品</div>
          </a>
          <a href="" class="item"><img src="~img/public/lyfw.png" alt="" class="img">
            <div>旅游服务</div>
          </a>
          <a href="" class="item"><img src="~img/public/bxfw.png" alt="" class="img">
            <div>保险服务</div>
          </a>
        </div>

      </div>
      <div class="huodong">
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
        <div class="item">
          <img src="~img/index/huodong1.png" alt="">
        </div>
      </div>
      <div class="huodong-list">
        <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
        <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
        <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
        <a href="" class="item"><img src="~/img/index/huodong1.png" alt="" class="img"></a>
      </div>
      <div class="server-list">
        <div class="tit-list">
          <Tab>
            <Tab-item>我的附近</Tab-item>
            <Tab-item>上门洗车</Tab-item>
            <Tab-item>汽车美容</Tab-item>
            <Tab-item>家居养护</Tab-item>
            <Tab-item>家政服务</Tab-item>
            <Tab-item>甲醛清除</Tab-item>
            <Tab-item>在线产品</Tab-item>
            <Tab-item>旅游服务</Tab-item>
            <Tab-item>保险服务</Tab-item>
          </Tab>
        </div>
        <div class="list-content">
          <service></service>
          1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/> 1
          <br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>2<br/>
        </div>
      </div>
      <Tabbar>
        <TabbarItem>
          <span slot="label">首页</span>
        </TabbarItem>
        <TabbarItem>
          <span slot="label">商城</span>
        </TabbarItem>
        <TabbarItem>
          <span slot="label">发现</span>
        </TabbarItem>
        <TabbarItem>
          <span slot="label">我的</span>
        </TabbarItem>
      </Tabbar>
    </ViewBox>

  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem, Tab, TabItem } from "vux";
import tabbarCom from "@/components/tabbar/tabbar";
import service from "@/components/service/service";
export default {
  data() {
    return {
      show: true
    };
  },
  components: {
    tabbarCom,
    ViewBox,
    Tabbar,
    TabbarItem,
    Tab,
    TabItem,
    service
  }
};
</script>

<style lang='scss'>
.top-ad {
  height: 2.666667rem;
  background: url(~img/index/top-ad.png) no-repeat;
  background-size: cover;
}

.classify {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding: 0.533333rem 0.586667rem;
  height: 5.253333rem;
  box-sizing: border-box;
  margin-bottom: 0.24rem;
  .line {
    flex: none;
    display: flex;
    justify-content: space-between;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: none;
      line-height: 1;
      @include font-dpr(13px);
      color: #383838;
      .img {
        width: 1.173333rem;
        height: 1.173333rem;
        margin-bottom: 0.2rem;
      }
    }
  }
}

.huodong {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1.56rem 0.4rem 0;
  height: 3.52rem;
  background: url(~img/index/huodong-bg.png) no-repeat;
  background-color: #ffffff;
  background-size: 6.533333rem;
  background-position: 50% -0.133333rem;
  border-bottom: 1px solid #dfdfdf;
  .item {
    height: 1.6rem;
    width: 2.666667rem;
  }
}

.huodong-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #ffffff;
  padding: 0.36rem 0.4rem;
  height: 6.866667rem;
  margin-bottom: $bot;
  .item {
    width: 4.08rem;
    height: 2.64rem;
    overflow: hidden;
    margin-bottom: 0.826667rem;
    .img {
      vertical-align: top;
    }
  }
}

.server-list{
  .tit-list{
    border-bottom: 1px solid #dfdfdf;
  }
}
</style>
