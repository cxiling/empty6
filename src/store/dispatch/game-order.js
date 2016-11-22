import Vue from 'vue'
import Vuex from 'vuex'
import { guildInitState } from '../state' //state
import { gameAreaMutations } from '../mutations/game-order.js' //游戏专区 Mutations

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //预约活动数据
        order:{ 
            request:guildInitState.request,
            game_order:guildInitState.data.game_order 
        },
        data:{
        	user: guildInitState.data.user
        }
    },
    mutations: gameAreaMutations,
})