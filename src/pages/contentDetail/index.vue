<template>
    <div class="tw-detail-content">

    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {
    var _this = this;
    this.$axios
      .get(_this.API_URL + "Api/YouHui/get_hd_content", {
        params: {
          id: _this.twId
        }
      })
      .then(({ data }) => {
        console.log(data);
      });
  },
  computed: {
    twId() {
      return this.$route.params.twId;
    }
  }
};
</script>

<style lang='scss' scoped>
.tw-detail-content {
  padding: 0.4rem;
}
</style>