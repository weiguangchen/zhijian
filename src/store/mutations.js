const mutations = {
    saveLogin(state, preload) {
        state.profile = preload;
    },
    // 处理播放器
    // 打开播放器页面
    OPEN_MUSIC(state, preload) {
        state.fullPage = preload;
    },
    SET_PAGE_FIXED(state, preload) {
        state.pageFixed = preload;
    },
    // 添加音乐列表
    SET_MUSIC_PLAYLIST(state, preload) {
        state.playList = preload;
    },
    SET_MUSIC_SEQUENCE(state, preload) {
        state.sequenceList = [].concat(preload);
    },
    // 添加音乐
    SET_NEW_MUSIC(state, preload) {
        if (state.sequenceList.length > 0) {
            state.currentMusicID = state.sequenceList[preload].id;
        }
    },
    DELETE_MUSIC(state, preload) {
        state.sequenceList = state.sequenceList.filter(m => {
            return m.id != preload;
        })
    },
    CLEAR_SEQUENCE_LIST(state){
        state.playList = [];
        state.sequenceList = [];
        state.currentMusicID = 0;
        state.playing = false;
    },
    // 添加播放音乐索引
    SET_MUSIC_CURRENTID(state, preload) {
        state.currentMusicID = preload
    },
    // 设置音乐状态
    SET_MUSIC_PLAYING(state, preload) {
        state.playing = preload;
    },
    // 设置播放模式
    SET_MUSIC_PLAYMODE(state) {
        state.mode = state.mode + 1 > 2 ? 0 : state.mode + 1
    }


}

export default mutations;