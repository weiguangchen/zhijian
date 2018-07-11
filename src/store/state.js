const state = {
    id:'',      /* 用户id */
    userinfo:{},   /* 用户信息 */
    entryUrl:'',    /* jssdk在ios端授权地址是第一次进入地址 */

    
    routerMap:[],   
    routerStatus:false, 

    location:'',   /*   定位信息 */
    isLoading:false,    /* 跳转页面等待 */

    
    index_hd_id:'',   /* 首页活动 */
    
    publicQuery:{}      /* 临时传参 */
} 
export default state;