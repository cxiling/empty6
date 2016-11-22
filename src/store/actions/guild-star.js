import * as types from '../mutation-types.js'
import { delayBounceAction , delayTroateAction } from '../../api/reference.js'
import { currentGuserInfo } from '../actions/guild-shop'
import guild_store from '../dispatch/guild-shop'
//初始化user表
// export const starInit = ({ dispatch, state }, obj , callback) => {

//     myApp.requestApi(state.request.userInit, {}, function(data){
//         dispatch(types.USER_PROFILE_UPDATE, data.data)
//     })

// }
export const starInit = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id

    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(state.request.starInit, obj , function(data){
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_STAR_UPDATE, data.data)
                // dispatch(types.USER_PROFILE_UPDATE, data.data)
                currentGuserInfo(guild_store,data.data)
                callback && callback()
            }, false , function(data){

            })
        },300)
    }
    requestProcess()

}

/*
    获取到当前数据包含的page_id
    传递page_id 
    支持直接传&跨组件传page_id
    obj:{
        pageId:0 || state.data.current.page_id 
    }
*/
export const ruleInit = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }
    obj.pageId = obj.pageId ? obj.pageId : state.data.current.page_id
    const rules = state.data.guild_star.rule
    const limitHttp = delayTroateAction(1,obj)
    const requestRule = () => {
        setTimeout(function(){
            myApp.requestApi(state.request.cms, obj , function(data){
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_STAR_RULES, data.data)
                callRules()
            }, false , function(data){

            })
        },300)
    }
    const callRules = ()=>{
        if(rules){
            callback && callback()
        }
    }

    if(limitHttp){
        delayBounceAction(300,function(){
             requestRule()
        })
    }else{
        callRules()
    }
    
}

export const additional_list = ({ dispatch, state } , obj, callback , refresh) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.page_num = obj.page_num ? obj.page_num : 20
    //定义搜索函数
    const refresh_api = refresh ? refresh : false
    const countRecord = state.data.guild_star.additional.list.length
    const pageNumber = !refresh ? Math.round(countRecord/obj.page_num) + 1 : 1
    const totalRecord = state.data.guild_star.additional.total
    const additional_list = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(state.request.additionalList, obj , function(data){
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_STAR_UPDATE, data.data)
                // dispatch(types.USER_PROFILE_UPDATE, data.data)
                callback && callback()
            }, Indicator , function(data){

            })
        },300)
    }
    //传参数
    obj.page = pageNumber

    if(refresh_api){
        //限制请求时间
        delayBounceAction(300,function(){
            additional_list(true)
        })
        return
    }

    if(countRecord == 0 && totalRecord == 0){
        delayBounceAction(300,function(){
            additional_list()
        })
    }
    if(countRecord  < totalRecord && countRecord > 0 && totalRecord > 0){
        delayBounceAction(300,function(){
            additional_list('bottom')
        })
    }

}

/*
    跨组件页面传入班底page_id
    指定当前规则页面的id
    传入指定的 page_id
*/
export const ruleCurrenId = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    dispatch(types.GUILD_CHANGE_CURRENT_PAGEID,obj)
    callback && callback()
}