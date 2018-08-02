<template>
    <div class="jms-detail">
        <div class="info-box">
            <div class="wrap">
                <h1 class="main-tit">加盟商名称</h1>
                <p>{{detail.shop_name}}</p>
            </div>

            <div class="line">
                <h1 class="tit">联系人</h1>
                <div class="content">{{detail.xingming}}</div>
            </div>
            <div class="line">
                <h1 class="tit">联系电话</h1>
                <div class="content">{{detail.shop_phone}}</div>
            </div>
            <div class="wrap">
                <h1 class="main-tit">地址</h1>
                <p>{{detail.adress}}</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        detail:{}
    };
  },
  created() {
    this.get_jms_detail();
  },
  methods: {
    get_jms_detail() {
      this.$axios
        .get( "/Api/ShopCore/get_shop", {
          params: {
            shop_id: this.shopId
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.detail=data;
        });
    }
  },
  computed: {
    shopId() {
      return this.$route.query.id;
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.jms-detail {
  padding: 0.4rem;
  font-size: 0.373333rem;
  .info-box {
    box-shadow: 0 0 10px 4px rgba(#000000, 0.08);
    border-radius: 0.133333rem;
    padding: 0.4rem;
    h1 {
      font-weight: bold;
      font-size: 0.453333rem;
    }
    .main-tit {
      margin-bottom: 0.533333rem;
    }
    .line {
      display: flex;
      align-items: center;
      .tit{
          width: 3.333333rem;
      }
      .content{
          flex: 1;
          line-height: 1.4;
      }
    }
    .wrap,.line{
        margin-bottom: .906667rem;
    }
  }
}
</style>