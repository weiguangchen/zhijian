import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import state from "./state.js";
import mutations from './mutations.js';
import actions from "./actions.js";
import getters from "./getters.js";
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store;