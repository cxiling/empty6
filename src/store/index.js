import Vue from 'vue'
import Vuex from 'vuex'
import { guildInitState } from './state' //state
import { giftCenterMutations } from './mutations/gift-center' //礼包中心 Mutations
import { guildShopMutations } from './mutations/guild-shop' //公会商店 Mutations
import { guildStarMutations } from './mutations/guild-star' //公会星级 Mutations

Vue.use(Vuex)

export default new Vuex.Store({
    state : guildInitState,
    mutations: {
        giftCenter: giftCenterMutations,
        guildShop: guildShopMutations,
        guildStar: guildStarMutations
    },
})
