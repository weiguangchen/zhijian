const mutations = {
  SAVE_ID: (state, preload) => {
    state.id = preload;
  },
  SAVE_USERINFO: (state, preload) => {
    state.userinfo = preload;
  },
  SET_ENTRYURL: (state, preload) => {
    state.entryUrl = preload;
  },
  SET_ROUTER:(state,preload)=>{
    state.routerMap = preload;
  },
  SET_LOCATION:(state,preload)=>{
    state.location = preload;
  },
  SET_ISLOADING:(state,preload)=>{
    state.isLoading = preload;
  },
  SET_INDEX_HD_ID:(state,preload)=>{
    state.index_hd_id = preload;
  },
  SET_ROUTER_STATUS:(state,preload)=>{
    state.routerStatus = preload;
  }
}

export default mutations;
