import * as types from '../mutation-types.js'
import { modalData , filterCenterGiftList , filterCenterGiftTotal , filterGiftList , showToast , filterCenterGiftAllTotal } from '../../api/computed.js'
import { delayBounceAction , delayTroateAction } from '../../api/reference.js'

export const userInit = ({ dispatch, state } , obj, callback) => {
    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    // obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    const requestProcess = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(state.request.userInit, obj , function(data){
                dispatch(types.USER_PROFILE_UPDATE, data.data)
                callback && callback()
            },Indicator)
        })
    }
    requestProcess(true)
}
/*
发起请求商品详情初始化数据
    obj:{
        商品来源：source (1为官方，2为会长上传）
        type:1 ( 0 全部1 激活码，2 礼包，3 代金券，4 充值卡，5 首充号，6 周边）
        每页游戏数：page_num  ( 默认返回10个游戏数据)
        页号：page
        公会id：guild_id
        用户id：uid
    }
*/
export const guildInit = ({ dispatch, state } , obj, callback , refresh , infinte) => {

    if(!obj){
        obj = {}
    }
    // 需要存储使用筛选的类型
    obj.type = obj.type ? obj.type : 0
    obj.source = obj.source ? obj.source : 0
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.page_num = obj.page_num ? obj.page_num : 5

    //dispatch(types.GUILD_CHANGE_CURRENT_PARTERMTER,obj)   
    
    const total_type = {
        type:obj.type,
        source:obj.source
    }
    const refresh_api = refresh ? refresh : false
    const gift_list = filterGiftList(state.data.guild_shop.gift.list,obj.type,obj.source)
    const total = filterCenterGiftAllTotal(state.data.guild_shop.gift_total,total_type,'game_total')
    const totalRecord = total ? total : 0
    const countRecord = gift_list ? gift_list.length :0
    const pageNumber = !refresh ? Math.round(countRecord/obj.page_num) + 1 : 1
    const limitHttp = delayTroateAction(1,obj)
    const slimitHttp = delayTroateAction(0.005,obj)
    // console.log(totalRecord)
    //数据请求
    const requestProcess = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(state.request.guildInit, obj , function(data){
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_SHOP_UPDATE, data.data)
                dispatch(types.USER_PROFILE_UPDATE, data.data)
                dispatch(types.GUILD_CENTER_SHOP_MORE_LIST,data.data) //更新所有商品列表
                dispatch(types.GUILD_CENTER_SHOP_GID_LIST,data.data) //更新游戏商品
                // dispatch(types.GUILD_CENTER_SHOP_SEARCH_LIST, data.data) //更新搜索商品列表
                callback && callback()
            }, Indicator , function(data){

            })
        })
    }

    if(refresh_api){
        //限制请求时间
        delayBounceAction(300,function(){
            requestProcess(true)
        })
        return
    }
    if((countRecord == 0 || totalRecord == 0) && limitHttp){
        delayBounceAction(300,function(){
            requestProcess(false)
        })
    }
    if(countRecord < totalRecord && countRecord > 0 && totalRecord > 0 && (limitHttp || infinte)){
        obj.page = pageNumber
        //限制请求时间
        delayBounceAction(300,function(){
            requestProcess('bottom')
        })
    }
    

}

/*
    商店礼包搜索引擎交互效果
    obj:{
        每页条数：page_num
        关键词：keywords
        页号：page
        公会id：guild_id
        用户id：uid
    }
*/
export const guildSearch = ({ dispatch, state } , obj, callback , refresh) => {

    if(!obj){
        obj = {}
    }
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.page_num = obj.page_num ? obj.page_num : 20
     //定义搜索函数
    const refresh_api = refresh ? refresh : false
    const keywords = obj.keywords ? obj.keywords : state.data.current.keywords
    const type = obj.type ? obj.type : 1
    const countList = filterCenterGiftList(state.data.guild_shop.search_list.list,'keywords',keywords)
    const totalRecord = filterCenterGiftTotal(state.data.guild_shop.search_list.total_list,'keywords',keywords,'total')
    const countRecord = countList.length
    const pageNumber = !refresh ? Math.round(countRecord/obj.page_num) + 1 : 1
    const url = state.request.guildSearch
    const limitHttp = delayTroateAction(1,obj) //表示限时1分钟内
    //数据请求
    const requestProcess = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(url, obj, function(data){

                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_SHOP_UPDATE,data.data) //更新商品中心信息
                dispatch(types.GUILD_CENTER_SHOP_SEARCH_LIST, data.data) //更新搜索商品列表
                dispatch(types.GUILD_CENTER_SHOP_MORE_LIST,data.data) //更新更多商品列表
                dispatch(types.GUILD_CENTER_SHOP_GID_LIST,data.data) //更新游戏商品
                callback && callback()
            },Indicator,function(){

            })
        })
    }
    //设置请求页码, 发起请求
    obj.page = pageNumber

    if(refresh_api){
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
        delayBounceAction(300,function(){
            requestProcess('bottom')
        })
    }
    

}
/*
    礼包id：gift_id
    预加载商品详情信息
*/
/*
    请求该游戏下更多公会领取记录
    每页条数（默认20条）：page_num
    游戏id：gid
    页号：page 
    公会id：guild_id
    用户id：uid
*/
export const guildDetail = ({ dispatch, state } , obj, callback, refresh) => {

    if(!obj){
        obj = {}
    }

    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.gift_id = obj.gift_id ? obj.gift_id : state.data.current.gift_id
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.page_num = obj.page_num ? obj.page_num : 20
    //定义查询该游戏下商品列表函数
    const pageName = state.data.share_data.pageName
    const countRecordList = filterCenterGiftList(state.data.guild_shop.record.list,'gift_id',obj.gift_id)
    const totalRecord = filterCenterGiftTotal(state.data.guild_shop.record.list,'gift_id',obj.gift_id,'total')
    const countRecord = countRecordList.length
    const pageNumber = !refresh ? Math.round(countRecord/obj.page_num) + 1 : 1
    const url = state.request.shopRecod
    const limitHttp = delayTroateAction(1,obj) //表示限时5/60分钟内
    //数据请求
    const requestProcess = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                // data.data.gift_id = state.data.current.gift_id
                //统一数据结构 
                const obj = {
                    list:[]
                }
                if(data.data.hasOwnProperty('gift_info') && data.data.gift_info){
                    const gift_info = data.data.gift_info
                    obj.gift_name = gift_info.gift_name
                    obj.gift_id = gift_info.gift_id

                    if(data.data.hasOwnProperty('record') && data.data.record){
                        gift_info.record = {
                            type:gift_info.type,
                            gift_id:gift_info.gift_id,
                            gift_list:data.data.record
                        }
                    }
                    obj.list.push(gift_info)
                }
                dispatch(types.GUILD_CHANGE_CURRENT_GIFT,obj)
                dispatch(types.GUILD_CENTER_SHOP_UPDATE,obj) //更新首页商店列表
                dispatch(types.GUILD_CENTER_SHOP_MORE_LIST,obj) //更新更多商品列表
                dispatch(types.GUILD_CENTER_SHOP_GID_LIST,obj) //更新游戏商品
                dispatch(types.GUILD_CENTER_SHOP_SEARCH_LIST, obj) //更新搜索列表
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_SHOP_RECORD_INFO, data.data)
                dispatch(types.GUILD_CENTER_SHOP_RECORD, data.data) //存储更多商品列表
                dispatch(types.GUILD_CENTER_SHOP_INFO, data.data)
                //如果本地有传index-store-detail-page则在拉一次
                if(pageName == 'index-store-detail-page') userInit({ dispatch, state })
                callback && callback()
            },Indicator,function(){

            })
        })
    }
    //设置请求页码, 发起请求
    obj.page = pageNumber
   
    //默认执行回调函数
    if(!limitHttp){
       callback && callback() 
    }
    //下拉刷新 load 强制执行
    if(refresh){
        delayBounceAction(300,function(){
            requestProcess(true)
        })
        return 
    }
    //初始化请求 
    if(countRecord == 0 && totalRecord == 0 && limitHttp){
        delayBounceAction(300,function(){
            requestProcess()
        })
    }

    if(countRecord  < totalRecord && countRecord > 0 && totalRecord > 0 && limitHttp){
        //延迟请求
        delayBounceAction(300,function(){
            requestProcess('bottom')
        })
    }

   
}
export const guildDetailCurrent = ({ dispatch, state } , obj, callback) => {

    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    obj.gift_id = obj.gift_id ? obj.gift_id : state.data.current.gift_id
    obj.keywords = obj.keywords ? obj.keywords : state.data.current.keywords
    dispatch(types.GUILD_CHANGE_CURRENT_GIFT,obj)
    dispatch(types.GUILD_CENTER_SHOP_INFO, obj)
    callback && callback()

}
/*
    发起领取商品
    请求参数 用户id：uid 公会id：guild_id 礼包id：gift_id
    obj:{
        货币类型：currency （1为红钻，2为公会贡献值，3为公会会员贡献值）
        价格：price
        礼包id：gift_id
        公会id：guild_id
        用户id：uid
    }
*/
export const guildFetch = ({ dispatch, state } , obj, callback) => {

    if(!obj){
        obj = {}
    }

    const keywords = obj.keywords ? obj.keywords : ''
    const status = obj.status ? obj.status : 1

    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.guild_id = obj.guild_id ? obj.guild_id : state.data.user.guild_id
    const limitHttp = delayTroateAction(5/60,obj) //表示限时5/60分钟内
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(state.request.fetchShopGift, obj , function(data){
                //静默拉取数据
                userInit({ dispatch, state },'','',true,true) 
                //guildDetail({ dispatch, state },'','',true,true) 
                //按照类型分类存储礼包搜索列表
                //统一数据结构 
                const obj = {
                    list:[]
                }
                if(data.data.hasOwnProperty('info') && data.data.info){
                    if(keywords){
                        data.data.info.keywords = keywords
                    }
                    if(data.data.hasOwnProperty('record') && data.data.record){
                        data.data.info.record =data.data.record
                    }
                    obj.list.push(data.data.info)
                }
                dispatch(types.GUILD_CENTER_SHOP_RECORD_INFO,data.data) //更新领取记录
                dispatch(types.GUILD_CENTER_SHOP_SEARCH_LIST, obj) //更新搜索列表
                dispatch(types.GUILD_CENTER_SHOP_UPDATE,obj) //更新首页商店列表
                dispatch(types.GUILD_CENTER_SHOP_MORE_LIST,obj) //更新更多商品列表
                dispatch(types.GUILD_CENTER_SHOP_GID_LIST,obj) //更新游戏商品
                dispatch(types.GUILD_CENTER_SHOP_INFO, data.data)
                callback && callback(data.data)
            }, false , function(data){

            })
        })
    }
    //执行函数
    if(limitHttp){
        delayBounceAction(300,function(){
            requestProcess()
        })
    }
}
/*
    请求该游戏下更多商品
    每页条数（默认20条）：page_num
    游戏id：gid
    页号：page 
    公会id：guild_id
    用户id：uid
*/
export const currentGuildGidList = ({ dispatch, state } , obj, callback , refresh) => {

    if(!obj){
        obj = {}
    }
    obj.gid = obj.gid ? obj.gid : state.data.current.gid
    obj.guild_id = obj.guild_id ? obj.guild_id:state.data.user.guild_id
    obj.uid = obj.uid ? obj.uid : state.data.user.uid
    obj.page_num = obj.page_num ? obj.page_num : 20
    //定义查询该游戏下商品列表函数
    const countRecordList = filterCenterGiftList(state.data.guild_shop.gid_list.list,'gid',obj.gid)
    const totalRecord = filterCenterGiftTotal(state.data.guild_shop.gid_list.total_list,'gid',obj.gid,'total')
    const countRecord = countRecordList.length
    const pageNumber = !refresh ? Math.round(countRecord/obj.page_num) + 1 : 1
    const url = state.request.guildGame
    const limitHttp = delayTroateAction(1,obj) //表示限时1分钟内
    //数据请求
    const requestProcess = (Indicator) => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //按照类型分类存储礼包搜索列表
                dispatch(types.GUILD_CENTER_SHOP_MORE_LIST, data.data) //存储更多商品列表
                dispatch(types.GUILD_CENTER_SHOP_GID_LIST,data.data) //更新更多商品列表
            },Indicator)
        },300)
    }
    //设置请求页码, 发起请求
    obj.page = pageNumber

    if(refresh){
        requestProcess(true)
        return
    }

    if((countRecord == 0 || totalRecord == 0) && limitHttp){
        requestProcess()
    }

    if(countRecord  < totalRecord && countRecord > 0 && totalRecord > 0 && limitHttp){
        //延迟请求
        delayBounceAction(300,function(){
            requestProcess('bottom')
        })
    }

}

//请求当前用户信息
export const currentGuserInfo = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    if(_.isEmpty(obj)) {
        userInit({ dispatch, state },{},callback)
    }else{
        dispatch(types.USER_PROFILE_UPDATE,obj)
        callback && callback()
    }
}   

//请求传递首页参数
export const currentGuildIndex = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    dispatch(types.GUILD_CHANGE_CURRENT_PARTERMTER,obj)
    callback && callback()
}
//传递传递gid游戏id
export const currentGuildGid = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    dispatch(types.GUILD_CHANGE_CURRENT_GAME,obj)
    callback && callback()
}  
//传递请求参数 gift_id 
export const currentGuildGiftId = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    dispatch(types.GUILD_CHANGE_CURRENT_GIFT,obj)
    callback && callback()
}
//传递请求参数 keywords
export const currentGuildKeywords = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    dispatch(types.GUILD_CHANGE_CURRENT_KEYWORDS,obj)
    callback && callback()
}
//请求传递首页参数
export const currentFailParmter = ({ dispatch, state } , obj, callback) => {
    if(!obj) obj = {}
    dispatch(types.GUILD_CHANGE_CURRENT_FAIL_PARTERMTER,obj)
    callback && callback()
}