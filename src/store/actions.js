import axios from "axios";
const actions = {
    saveLogin(context, preload) {
        context.commit('saveLogin', preload);
    },
    GET_MUSIC_URL({ commit }, preload) {
        commit('SET_MUSIC_URL',preload);
    }

}
export default actions;