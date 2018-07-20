<template>
    <div class="jms-item" @click='toDetail(jms.id)'>
        <div class="line">
            <span class="icon">
                <i class="iconfont icon-jiamengshang"></i>
            </span>
            <span class="tit">加盟商</span>
            <span>{{jms.shop_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{jms.shop_phone}}</span>
        </div>
        <div class="line1">
            <span class="tit">地址</span>
            <span>{{jms.adress}}

            </span>
        </div>
        <div class="line2">
            查看详情
            <i class="iconfont icon-jinru"></i>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["jms"],
  components: {}
};
</script>

<style lang='scss' scoped>
.jms-item {
  $icon: 1.4rem;
  padding: 0.586667rem 0;
  background: #ffffff;
  margin-bottom: $bot;
  .line,
  .line1,
  .line2 {
    display: flex;
    align-items: center;
    font-size: 0.373333rem;
    .tit {
      width: 2.666667rem;
    }
  }
  .line2 {
    font-size: 0.32rem;
    justify-content: flex-end;
    color: #a3a3a3;
    padding-right: 0.4rem;
    .iconfont {
      font-size: 0.16rem;
    }
  }
  .line {
    margin-bottom: 0.586667rem;
    .icon {
      width: $icon;
      text-align: center;
      .iconfont {
        font-size: 0.56rem;
      }
    }
  }
  .line1 {
    padding-left: $icon;
    margin-bottom: 0.4rem;
  }
}
</style>