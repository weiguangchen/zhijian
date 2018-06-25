const mutations = {
  SAVE_ID: (state, preload) => {
    state.id = preload;
  },
  SAVE_USERINFO: (state, preload) => {
    state.userinfo = preload;
  },
  SAVE_ADDRESS: (state, preload) => {
    state.address = preload;
  },
  SET_ENTRYURL: (state, preload) => {
    state.entryUrl = preload;
  },
  SET_ROUTER:(state,preload)=>{
    state.routerMap = preload;
  }
}

export default mutations;
