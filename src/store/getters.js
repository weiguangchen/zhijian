
const getters = {
    currentMusic: (state) => {
        if (state.playList && state.playList.length > 0) {
            let currentMusic = state.playList.filter(m => {
                return m.id == state.currentMusicID;
            })
            return currentMusic[0];
        } else {
            return {}
        }
    },
    currentMusicIndex: (state, getters) => {
        if (state.sequenceList && state.sequenceList.length > 0 && Object.keys(getters.currentMusic).length > 0) {
            let index;
            state.sequenceList.map((m, i) => {
                if (m.id == state.currentMusicID) {
                    index = i
                }
            })
            return index;
        } else {
            return 0
        }
    },
    miniMusicPlaying: state => state.sequenceList.length > 0 && state.playing ? true : false,
    miniMusicPause: state => state.sequenceList.length > 0 && !state.playing ? true : false,
    nextCurrentIndex: (state, getters) => {
        return getters.currentMusicIndex + 1 >= state.sequenceList.length ? 0 : getters.currentMusicIndex + 1
    },
    prevCurrentIndex: (state, getters) => {
        return getters.currentMusicIndex - 1 < 0 ? state.sequenceList.length - 1 : getters.currentMusicIndex - 1
    }
}
export default getters