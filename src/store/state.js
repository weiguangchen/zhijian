const state = {
    id:'',      /* 用户id */
    userinfo:{},   /* 用户信息 */
    entryUrl:'',    /* jssdk在ios端授权地址是第一次进入地址 */

    
    routerMap:[],    

    location:'',   /*   定位信息 */
    isLoading:false    /* 跳转页面等待 */
}
export default state;