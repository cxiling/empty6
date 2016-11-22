import * as types from '../mutation-types.js'
import { delayBounceAction , delayTroateAction } from '../../api/reference.js'

//请求预约活动数据
export const inintGameOrder = ({ dispatch, state }, obj , callback , refresh ) => {

	if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.page_num = obj.page_num ? obj.page_num : 5
    //定义搜索函数
    const countRecord = state.order.game_order.list.length
    const pageNumber = !refresh ? Math.round(countRecord/obj.page_num) + 1 : 1
    const totalRecord = state.order.game_order.total
    //传参数
    obj.page = pageNumber
    const limitHttp = delayTroateAction(1,obj)
    const requestProcess = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(state.order.request.order_benefits, obj , function(data){
                //按照类型分类存储礼包搜索列表
                if(data.data) dispatch(types.GAME_ORDER_UPDATE_STATE, data.data)
                callback && callback()
            }, Indicator , function(data){

            })
        },300)
    }

    if(refresh){
        //限制请求时间
        delayBounceAction(300,function(){
            requestProcess(true)
        })
        return
    }

    if(countRecord == 0 && totalRecord == 0 && limitHttp){
        delayBounceAction(300,function(){
            requestProcess()
        })
    }

    if(countRecord  < totalRecord && countRecord >= 0 && totalRecord > 0 && limitHttp){
    	
        requestProcess(300,function(){
            additional_list('bottom')
        })
    }

}