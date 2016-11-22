import * as types from '../mutation-types.js'
import { filterCenterGiftList , filterCenterGiftTotal } from '../../api/computed.js'
import { delayBounceAction , delayTroateAction } from '../../api/reference.js'

//礼包中心初始化
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    guild_id:user.guild_id,//公会id
}
**********************/
export const centerInit = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    // obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id  
    const url = state.request.giftInit
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                dispatch(types.GUILD_CENTER_HOME_UPDATE, data.data)
                callback && callback()
            })
        },300)
    }
    requestProcess()
}

//活动数据
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    page:1,//页号
    page_num:20,//每页条数
    refresh:1,//刷新指定页数据
}
**********************/
export const centerActivity = ({ dispatch, state } , obj, callback ,indicator) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.page_num = obj.page_num ? obj.page_num : 20

    obj.page = obj.page ? obj.page : 0
    
    //参数
    const type = obj.type ? obj.type : 1
    const countRecord = state.data.gift_center.activity.list.length
    const totalRecord = state.data.gift_center.activity.total 
    const pageNumber = Math.round(countRecord/obj.page_num) + 1
    const url = state.request.activity
    //数据请求
    const requestProcess = (indicator) => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_ACTIVITY_LIST, data.data)

                if(callback && typeof callback === 'function') callback()
            },indicator)
        },300)
    }

    //设置请求页码, 发起请求
    //刷新指定页号
    if(obj.refresh && obj.refresh > 0){
        obj.page = obj.refresh
        requestProcess(indicator)
    }
    //请求下页
    else{
        obj.page = pageNumber

        if(countRecord == 0 && totalRecord == 0 ){
            requestProcess()
        }

        if(countRecord  < totalRecord && countRecord > 0 && totalRecord > 0){
            //延迟请求
            delayBounceAction(500,function(){
                requestProcess(indicator)
            })
        }
    }

}

//TT礼包
/**********************  
请求参数
根据请求类型，type,gid,keywords 只有非空（0）的为有效参数
obj = {
    uid:user.uid,//用户id
    type:0,//(0 所有，1 激活码，2 礼包，3 代金券，4 充值卡，5 首充号，6 周边)
    gid:0,//游戏id
    keywords:'',//关键词
    page:1,//页号(1开始)
    page_num:20,//每页条数（默认20）
    refresh:1,//刷新指定页数据
}
indicator:菊花类型 (true表示不显示菊花, 'bottom'表示使用底部菊花)
**********************/
export const centerTTGift = ({ dispatch, state } , obj, callback, indicator) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    // obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.type = obj.type ? obj.type : 0
    obj.gid = obj.gid ? obj.gid : 0
    obj.keywords = obj.keywords ? obj.keywords : ''
    obj.page_num = obj.page_num ? obj.page_num : 20

    obj.page = obj.page ? obj.page : 0
    obj.kind = 1//TT礼包
    
    //参数
    let gift_list
    let countRecord 
    let totalRecord 
    let pageNumber
  
    //礼包类型
    if(obj.type != 0){
        gift_list = filterCenterGiftList(state.data.gift_center.tt_gift.list, 'type' ,obj.type)
        countRecord = gift_list.length
        totalRecord = filterCenterGiftTotal(state.data.gift_center.tt_gift.gift_total, 'type', obj.type)//返回type类型礼包总数
        pageNumber = Math.round(countRecord/obj.page_num) + 1
    }
    //搜索礼包
    else if(obj.keywords != ''){
        gift_list = filterCenterGiftList(state.data.gift_center.search_list.tt_gift.list,'keywords',obj.keywords)
        countRecord = gift_list.length
        totalRecord = filterCenterGiftTotal(state.data.gift_center.search_list.tt_gift.total_list,'keywords',obj.keywords,'total')
        pageNumber = Math.round(countRecord/obj.page_num) + 1
    }
    //游戏id查礼包
    else if(obj.gid != 0){
        gift_list = filterCenterGiftList(state.data.gift_center.gid_list.tt_gift.list, 'gid' , obj.gid)
        countRecord = gift_list.length
        totalRecord = filterCenterGiftTotal(state.data.gift_center.gid_list.tt_gift.gift_total, 'gid' , obj.gid)//返回type类型礼包总数
        pageNumber = Math.round(countRecord/obj.page_num) + 1
    }

    const url = state.request.ttGift
    //数据请求
    const requestProcess = (indicator) => {

        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //按照参数类型更新对应礼包列表
                //更新首页 TT礼包列表
                if(obj.type != 0){
                    dispatch(types.GUILD_CENTER_GIFT_LIST, data.data, obj)   
                }
                //更新搜索页 TT礼包列表
                else if(obj.keywords != ''){
                    dispatch(types.GUILD_CENTER_GIFT_SEARCH_LIST, data.data, obj)               
                }
                //更新游戏查礼包 TT礼包列表
                else if(obj.gid != 0){
                    dispatch(types.GUILD_CENTER_GID_LIST, data.data, obj)
                } 
                else{
                    //参数有误
                }
                if(callback && typeof callback === 'function') callback()
            },indicator)
        },300)

    }
    //设置请求页码, 发起请求
    //刷新指定页号
    if(obj.refresh && obj.refresh > 0){
        obj.page = obj.refresh
        requestProcess(indicator)
    }
    //请求下一页
    else{
        obj.page = pageNumber

        if(countRecord == 0 && totalRecord == 0 ){
            requestProcess()
        }

        if(countRecord  < totalRecord && countRecord >= 0 && totalRecord > 0){
            //延迟请求
            delayBounceAction(500,function(){
                requestProcess(indicator)
            })
        }
    }

    // console.log('countRecord: ' + countRecord + ' totalRecord: ' + totalRecord)
    // console.log('TT pageNumber: ' + pageNumber + ' TT obj.page: ' + obj.page)


}

//公会礼包
/**********************  
请求参数
根据请求类型，type,gid,keywords 只有非空（0）的为有效参数
obj = {
    uid:user.uid,//用户id
    type:0,//(0 所有，1 激活码，2 礼包，3 代金券，4 充值卡，5 首充号，6 周边)
    gid:0,//游戏id
    keywords:'',//关键词
    page:1,//页号(1开始)
    page_num:20,//每页条数（默认20）
    refresh:1,//刷新指定页数据
}
indicator:菊花类型 (true表示不显示菊花, 'bottom'表示使用底部菊花)
**********************/
export const centerGuildGift = ({ dispatch, state } , obj, callback , indicator) => {
    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    // obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.type = obj.type ? obj.type : 0
    obj.gid = obj.gid ? obj.gid : 0
    obj.keywords = obj.keywords ? obj.keywords : ''
    obj.page_num = obj.page_num ? obj.page_num : 20

    obj.page = obj.page ? obj.page : 0
    obj.kind = 2//公会礼包
    //参数
    let gift_list
    let countRecord 
    let totalRecord 
    let pageNumber
    
    //礼包类型
    if(obj.type != 0){
        gift_list = filterCenterGiftList(state.data.gift_center.guild_gift.list, 'type' ,obj.type)
        countRecord = gift_list.length
        totalRecord = filterCenterGiftTotal(state.data.gift_center.guild_gift.gift_total, 'type', obj.type)//返回type类型礼包总数
        pageNumber = Math.round(countRecord/obj.page_num) + 1
    }
    //搜索礼包
    else if(obj.keywords != ''){
        gift_list = filterCenterGiftList(state.data.gift_center.search_list.guild_gift.list,'keywords',obj.keywords)
        countRecord = gift_list.length
        totalRecord = filterCenterGiftTotal(state.data.gift_center.search_list.guild_gift.total_list,'keywords',obj.keywords,'total')
        pageNumber = Math.round(countRecord/obj.page_num) + 1
    }
    //游戏id查礼包
    else if(obj.gid != 0){
        gift_list = filterCenterGiftList(state.data.gift_center.gid_list.guild_gift.list, 'gid' , obj.gid)
        countRecord = gift_list.length
        totalRecord = filterCenterGiftTotal(state.data.gift_center.gid_list.guild_gift.gift_total, 'gid' , obj.gid)//返回type类型礼包总数
        pageNumber = Math.round(countRecord/obj.page_num) + 1
    }

    const url = state.request.guildGift
    //数据请求
    const requestProcess = (indicator) => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //按照参数类型更新对应礼包列表
                //更新首页 TT礼包列表
                if(obj.type != 0){
                    dispatch(types.GUILD_CENTER_GIFT_LIST, data.data, obj)   
                }
                //更新搜索页 TT礼包列表
                else if(obj.keywords != ''){
                    dispatch(types.GUILD_CENTER_GIFT_SEARCH_LIST, data.data, obj)               
                }
                //更新游戏查礼包 TT礼包列表
                else if(obj.gid != 0){
                    dispatch(types.GUILD_CENTER_GID_LIST, data.data, obj)
                }
                else{
                    //参数有误
                } 
                if(callback && typeof callback === 'function') callback()

                // console.log('total: ' + data.data.total)
            },indicator)
        },300)
    }

    //设置请求页码, 发起请求
    //刷新指定页号
    if(obj.refresh && obj.refresh > 0){
        obj.page = obj.refresh
        requestProcess(indicator)
    }
    //请求下一页
    else{
        obj.page = pageNumber

        if(countRecord == 0 && totalRecord == 0 ){
            requestProcess()
        }

        if(countRecord  < totalRecord && countRecord >= 0 && totalRecord > 0){
            //延迟请求
            delayBounceAction(500,function(){
                requestProcess(indicator)
            })
        }
    }

    // console.log('countRecord: ' + countRecord + ' totalRecord: ' + totalRecord)
    // console.log('Guild pageNumber: ' + pageNumber + ' Guild obj.page: ' + obj.page)

}

//领取TT礼包
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    gift_id:0,//礼包id
    tao:false,//是否淘号
}
**********************/
export const centerFetchTTGift = ({ dispatch, state } , obj, callback) => {
    if(!obj){
        obj = {}
    }

    obj.uid = obj.uid ? obj.uid : state.data.user.uid //uid
    obj.gift_id = obj.gift_id ? obj.gift_id : 0 //礼包id
    obj.tao = obj.tao ? obj.tao : false //是否淘号

    let url = state.request.fetchTtGift
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //更新最后一条领取记录（TT礼包）
                dispatch(types.GUILD_CENTER_FETCH_TT_GIFT, data.data)
                //在所有礼包中查找更新此礼包信息（有更新，没有不增加）
                dispatch(types.GUILD_CENTER_UPDATE_GIFT_INFO, data.data, 1 )
                callback && callback(data.data)
            })
        },300)
    }
    //执行函数
    requestProcess()
}


//通知会长申请礼包
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    gift_id:0,//礼包id
    guild_id:0,//公会id
}
**********************/
export const centerNotify = ({ dispatch, state } , obj, callback) => {
    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.gift_id = obj.gift_id ? obj.gift_id : 0
    obj.kind = obj.kind ? obj.kind : 2
    obj.gift_name = obj.gift_name ? obj.gift_name : ''
    const url = state.request.notify
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                dispatch(types.GUILD_CENTER_NOTIFY, data.data)
                callback && callback()
            })
        },300)
    }
    requestProcess()

}

//查找礼包公会
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    gift_id:0,//礼包id
    page:1,//页号(1开始)
    page_num:20,//每页条数（默认20）
    refresh:1,//刷新指定页数据
}
**********************/
export const centerGiftGuild = ({ dispatch, state } , obj, callback , indicator) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.gift_id = obj.gift_id ? obj.gift_id : 0
    obj.page_num = obj.page_num ? obj.page_num : 20
    obj.page = obj.page ? obj.page : 0
    
    const gift_list = filterCenterGiftList(state.data.gift_center.gift_guild.list, 'gift_id' , obj.gift_id)
    const countRecord = gift_list.length
    const totalRecord = filterCenterGiftTotal(state.data.gift_center.gift_guild.guild_total, 'gift_id' , obj.gift_id)//返回type类型礼包总数
    const pageNumber = Math.round(countRecord/obj.page_num) + 1
    
    const url = state.request.giftGuild
    //数据请求
    const requestProcess = (indicator) => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //更新游戏查公会 公会列表
                dispatch(types.GUILD_CENTER_GIFT_GUILD, data.data, obj) 
                if(callback && typeof callback === 'function') callback()            
            },indicator)
        },300)
    }

    //设置请求页码, 发起请求
    //刷新指定页号
    if(obj.refresh && obj.refresh > 0){
        obj.page = obj.refresh
        requestProcess(indicator)
    }
    //请求下一页
    else{
        obj.page = pageNumber

        if(countRecord == 0 && totalRecord == 0 ){
            requestProcess()
        }

        if(countRecord  < totalRecord && countRecord > 0 && totalRecord > 0){
            //延迟请求
            delayBounceAction(500,function(){
                requestProcess(indicator)
            })
        }
    }

}


//会长申请(采购)公会礼包
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    gift_id:0,//礼包id
    number:0,//申请数量
}
**********************/
export const centerPurchase = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    // obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.gift_id = obj.gift_id ? obj.gift_id : 0
    obj.number = obj.number ? obj.number : 0

    const url = state.request.purchase
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                dispatch(types.GUILD_CENTER_PURCHASE, data.data, obj)
                //在所有礼包中查找更新此礼包信息（有更新，没有不增加）
                dispatch(types.GUILD_CENTER_UPDATE_GIFT_INFO, data.data, 2 )
                callback && callback(data.msg)
            })
        },300)
    }
    requestProcess()
}

//预加载礼包详情页 礼包信息
/**********************  
请求参数
obj = {
    position:'',//详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')
    kind:0,//礼包分类（1 TT礼包 ， 2 公会礼包）
    gift_id:0,//礼包id
}
**********************/
export const centerGiftDetail = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }
    // obj.position = obj.position ? obj.position : ''
    obj.kind = obj.kind ? obj.kind : 1
    obj.gift_id = obj.gift_id ? obj.gift_id : 0

    //更新当前礼包参数
    dispatch(types.CHANGE_CENTER_CURRENT_GIFT, obj )

    //清空领取记录(最后领取礼包与此礼包不同时)
    dispatch(types.GUILD_CENTER_CLEAR_LAST_RECORD, obj)

    //加载礼包信息
    dispatch(types.GUILD_CENTER_GIFT_INFO, obj)

    callback &&  callback()
}

//设置游戏礼包列表页面
/*
    传入的obj:{
        game_name:'',//游戏名
        kind:1, //tt礼包 公会礼包
        gid:0  //游戏id
    }
*/
export const centerGiftGidList = ({ dispatch, state}, obj , callback) => {
    if(!obj){
        obj = {}
    }
    obj.kind = obj.kind ? obj.kind : 1
    obj.gid = obj.gid ? obj.gid : 0
    obj.game_name = obj.game_name ? obj.game_name : ''

    dispatch(types.CHANGE_CENTER_CURRENT_GAME,obj)
    callback &&  callback()
}

//设置更多礼包页面参数
/*
    传入的obj:{
        kind:1, //tt礼包 公会礼包
        type:0  //礼包类型
    }
*/
export const centerGiftList = ({ dispatch, state}, obj , callback) => {
    if(!obj){
        obj = {}
    }
    dispatch(types.CHANGE_CENTER_CURRENT_GIFT_LIST,obj)
    callback &&  callback()
}

//设置搜索页面参数
/*
    传入的obj:{
        kind:1, //tt礼包 公会礼包
        keywords:''  //关键词
    }
*/
export const centerSearchList = ({ dispatch, state}, obj , callback) => {
    if(!obj){
        obj = {}
    }
    dispatch(types.CHANGE_CENTER_CURRENT_SEARCH_LIST,obj)
    callback &&  callback()
}

//设置礼包查公会页面参数
/*
    传入的obj:{
        gift_id:0//礼包id
    }
*/
export const centerGiftGuildList = ({ dispatch, state}, obj , callback) => {
    if(!obj){
        obj = {}
    }
    dispatch(types.CHANGE_CENTER_CURRENT_GIFT_GUILD_LIST,obj)
    
    callback &&  callback()

}

//设置当前礼包列表页位置
/*
    传入的obj:{
        position:'home'//首页及各类型礼包列表页'home' ，搜索页 'search', 游戏搜礼包页'game'
    }
*/
export const centerGiftListPosition = ({ dispatch, state}, obj , callback) => {
    if(!obj){
        obj = {}
    }
    dispatch(types.CHANGE_CENTER_CURRENT_GIFT_LIST_POSITION,obj)
    callback && callback()
}

//重置(清空)搜索结果
/*
    传入的obj:{
        keywords:'',//默认空字符串
        kind:1,//默认1
    }
*/
export const centerClearSearchList = ({ dispatch, state}, obj , callback) => {
    if(!obj){
        obj = {}
    }
    obj.keywords = obj.keywords ? obj.keywords : ''
    obj.kind = obj.kind ? obj.kind : 1

    dispatch(types.GUILD_CENTER_CLEAR_SEARCH_LIST,obj)
    callback && callback()
}

// //设置当前页面page_name
// /*
//     传入的obj:{
//         page_name:''
//     }
// */
// export const centerSetPageName = ({ dispatch, state}, obj , callback) => {
//     if(!obj){
//         obj = {}
//     }
//     obj.page_name = obj.page_name ? obj.page_name : ''

//     dispatch(types.GUILD_CENTER_CHANGE_PAGE_NAME,obj)
//     callback && callback()
// }

//查询单个礼包详情(客户端直接跳详情页时调用)
/**********************  
请求参数
obj = {
    uid:user.uid,//用户id
    gift_id:0,//礼包id
    kind:1,//礼包分类（1 TT礼包，2 公会礼包）
}
**********************/
export const centerSingleGiftInfo = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.gift_id = obj.gift_id ? obj.gift_id : 0
    obj.kind = obj.kind ? obj.kind : 2

    const url = state.request.singleGiftInfo
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //更新当前礼包详情
                dispatch(types.GUILD_CENTER_UPDATE_GIFT_DETAIL, data.data, obj)
                callback && callback()
            })
        },100)
    }
    requestProcess()
}