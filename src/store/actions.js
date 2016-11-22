import * as types from './mutation-types.js'

//初始化user表
export const userInit = ({ dispatch, state } , callback) => {

    myApp.requestApi(state.request.userInit, {}, function(data){
        dispatch(types.USER_PROFILE_UPDATE, data.data)
    })

}

//商店礼包搜索引擎交互效果
export const guildSearch = ({ dispatch, state } , obj, callback) => {
    if(!obj){
        obj = {}
    }

     //定义搜索函数
    const type = obj.type ? obj.type : 1
    const countRecord = obj.type == 1 ? state.data.guild_shop.search_list.list.length:state.data.gift_shop.search_list.list.length
    const totalRecord = obj.type == 1 ? state.data.guild_shop.search_list.total :state.data.gift_shop.search_list.total
    const pageNumber = Math.round(countRecord/10) + 1
    const url = obj.type === 1 ? state.request.guildSearch : state.request.giftSearch
    //数据请求
    const requestProcess = () => {
        setTimeout(function(){
            myApp.requestApi(url, obj , function(data){
                //按照类型分类存储礼包搜索列表
                type === 1 && dispatch(types.GUILD_CENTER_SHOP_SEARCH_LIST, data.data)
                type === 2 && dispatch(types.GUILD_CENTER_GIFT_SEARCH_LIST, data.data)
            })
        })
    }
    //设置请求页码, 发起请求
    obj.page = pageNumber

    const limitHttp = myApp.getHttpTimeList(obj);

    if(countRecord == 0 && totalRecord == 0 && limitHttp){
        requestProcess()
    }

    if(countRecord  < totalRecord && countRecord > 0 && totalRecord > 0 && limitHttp){
        requestProcess()
    }

}


