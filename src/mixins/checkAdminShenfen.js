export default {
  computed: {
    shenfenType() {
      if (/^\/fuwuyuan/.test(this.$route.fullPath)) {
        return 'fuwuyuan';
      } else {
        return 'shanghu';
      }
    }
  }
}
