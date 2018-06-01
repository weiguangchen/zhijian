export const API_URL = 'http://zj.daonian.cn'

const $toDetail = function (id) {
  var _this = this;
  this.$router.push({
    path: "/serviceDetail/" + id,
  });
}
export default {
  install(Vue) {
    Vue.prototype.API_URL = API_URL;
    Vue.prototype.$toDetail = $toDetail;
  }
};
