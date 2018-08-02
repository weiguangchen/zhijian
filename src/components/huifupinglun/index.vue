<template>
    <div class="shanghu-page hfpj">
        <bigtitle title='回复评价' :icon='false'></bigtitle>
        <div class="form-box">
            <Group>
                <XTextarea :autosize='true' v-model="huifu"></XTextarea>
            </Group>
            <XButton type='warn' class="xbtn" @click.native="huifuFn">提交</XButton>
        </div>

    </div>
</template>

<script>
import bigtitle from "@/components/bigTitle/index";
import { XTextarea, Group, XButton } from "vux";
export default {
  data() {
    return {
      huifu: ""
    };
  },
  created() {},
  methods: {
    huifuFn() {
      var _this = this;
      this.$axios
        .get("/Api/ShopFw/huifu", {
          params: {
            token_id: _this.plId,
            h_content: _this.huifu
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "回复成功！",
              onHide() {
                _this.$router.go(-1);
              }
            });
          } else if (data.status == 0) {
            this.$vux.alert.show({
              title: "提示",
              content: "回复失败！",
              onHide() {
                _this.$router.go(-1);
              }
            });
          } else if (data.status == 2) {
              this.$vux.alert.show({
                title:'提示',
                content:'已经回复过，不可重复回复',
                onHide(){
                    _this.$router.go(-1);
                }
            })
          }
        });
    }
  },
  computed: {
    plId() {
      return this.$route.query.plId;
    }
  },
  components: {
    bigtitle,
    XTextarea,
    Group,
    XButton
  }
};
</script>

<style lang='scss'>
.xbtn {
  margin-top: 0.266667rem;
}
</style>