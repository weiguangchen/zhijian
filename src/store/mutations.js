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
  SET_CURRENTLOCTION_TYPE:(state,preload)=>{            /* 设置当前地址 */
    state.locationType = preload;
  },
  SET_LOCATION:(state,preload)=>{              /* 设置当前定位 */
    state.location = preload;
  },
  SET_CITYLOCATION:(state,preload)=>{          /* 设置选择城市信息 */
    state.cityLocation = preload;
  },
  SET_ISLOADING:(state,preload)=>{
    state.isLoading = preload;
  },
  SET_INDEX_HD_ID:(state,preload)=>{
    state.index_hd_id = preload;
  },
  SET_ROUTER_STATUS:(state,preload)=>{
    state.routerStatus = preload;
  },
  SET_PUBLICQUERY:(state,preload)=>{
    state.publicQuery = preload;
  },
  SET_IF_MRADD:(state,preload)=>{
    state.if_moren_add = preload;
  },
  SET_SELECTED_ADD:(state,preload)=>{
    state.selected_add = preload;
  },
  SET_TX_MAP:(state,preload)=>{
    state.tx_map_info = preload;
  }
}

export default mutations;
