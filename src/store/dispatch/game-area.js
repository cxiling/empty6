import Vue from 'vue'
import Vuex from 'vuex'
import { guildInitState } from '../state' //state
import { gameAreaMutations } from '../mutations/game-area.js' //游戏专区 Mutations

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
    	//原游戏专区state(去掉user,使用公会体系user)
        zone: {
        	request:guildInitState.request,
        	status:guildInitState.data.game_area.status,
        	game:guildInitState.data.game_area.game
        },
        zone_list:guildInitState.data.game_area_list,
        //公会体系state(暂只增加礼包中心)
        data:{
        	user: guildInitState.data.user,
        	share_data: guildInitState.data.share_data,
        	gift_center: guildInitState.data.gift_center,
        },
        //预约活动数据
        order:{ 
            request:guildInitState.request,
            order_list:guildInitState.data.game_order 
        }
    },
    mutations: gameAreaMutations,
})