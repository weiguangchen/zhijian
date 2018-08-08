const state = {
  id: '',
  /* 用户id */
  userinfo: {},
  /* 用户信息 */
  entryUrl: '',
  /* jssdk在ios端授权地址是第一次进入地址 */


  routerMap: [],
  routerStatus: false,


  locationType: 1,
  /*  1使用定位2使用选择城市地址 */
  location: '',
  /*   定位信息 */
  cityLocation: {},
  /* 选择城市地址 */

  isLoading: false,
  /* 跳转页面等待 */

  index_hd_id: '',
  /* 首页活动 */

  publicQuery: {},
  /* 临时传参 */

  if_moren_add: true,
  /* 从服务详请下单时获取默认地址 */
  selected_add: {},


  tx_map_info: {} /* 用来存储各种定位信息 */
}
export default state;
