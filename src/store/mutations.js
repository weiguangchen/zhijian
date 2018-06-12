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

}

export default mutations;
