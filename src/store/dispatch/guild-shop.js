import Vue from 'vue'
import Vuex from 'vuex'
import { guildInitState } from '../state' //state
import { guildShopMutations } from '../mutations/guild-shop' //公会商店 Mutations

Vue.use(Vuex)

export default new Vuex.Store({
    state : guildInitState,
    mutations: guildShopMutations,
})
