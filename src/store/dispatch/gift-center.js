import Vue from 'vue'
import Vuex from 'vuex'
import { guildInitState } from '../state' //state
import { giftCenterMutations } from '../mutations/gift-center' //礼包中心 Mutations

Vue.use(Vuex)

export default new Vuex.Store({
    state : guildInitState,
    mutations: giftCenterMutations,
})
