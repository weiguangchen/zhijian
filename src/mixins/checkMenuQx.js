export default {
  methods: {
    checkQx(qx) {
      return this.menuqx.some(m => {
        return m == qx;
      });
    }
  },
  computed: {
    menuqx() {
      return this.$route.meta.menu;
    }
  }
}
