// import {
//   mapState,
//   mapActions,
//   mapMutations,
//   MapGetters
// } from 'vuex';
// export default {
//   created() {
//     console.log('商户状态：' + this.userinfo.shop_status)
//     var _this = this;
//     if (this.userinfo.shop_status == 1) {
//       console.log('是商户')
//     } else if (this.userinfo.shop_status == 0) {
//       console.log('不是商户')
//       this.$vux.alert.show({
//         title: '提示',
//         content: '不是商户，无法登陆商户后台！',
//         onHide() {
//           _this.$router.replace('/');
//         }
//       })
//     }
//   },
//   computed: {
//     ...mapState(['id', 'userinfo'])
//   }
// }
