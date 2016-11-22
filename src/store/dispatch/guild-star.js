import Vue from 'vue'
import Vuex from 'vuex'
import { guildInitState } from '../state' //state
import { guildStarMutations } from '../mutations/guild-star' //公会星级 Mutations

Vue.use(Vuex)

export default new Vuex.Store({
    state : guildInitState,
    mutations: guildStarMutations,
})
