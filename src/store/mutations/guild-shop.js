import {
    USER_PROFILE_UPDATE,
    GUILD_CENTER_SHOP_UPDATE,
    GUILD_CENTER_SHOP_SEARCH_LIST,
    GUILD_CENTER_SHOP_MORE_LIST,
    GUILD_CENTER_SHOP_INFO,
    GUILD_CENTER_SHOP_RECORD,
    GUILD_CHANGE_CURRENT_PARTERMTER,
    GUILD_CHANGE_CURRENT_GAME,
    GUILD_CENTER_SHOP_RECORD_INFO,
    GUILD_CENTER_SHOP_GID_LIST,
    GUILD_CHANGE_CURRENT_GIFT,
    GUILD_CHANGE_CURRENT_KEYWORDS,
    GUILD_CHANGE_CURRENT_FAIL_PARTERMTER
} from '../mutation-types'

import { getShareData } from '../../api/js_api.js'
import { formatParmters , showToast } from '../../api/computed.js'

export const guildShopMutations = {
    //用户的信息
    [USER_PROFILE_UPDATE](state,data){

        let shareData = getShareData();
        let partialData = _.find(shareData.data, function(item){ // return item.uri == 'http://app.52tt.com/project/game_zone/index.html';
            let re = /(guild|guild_system|guild_system_center|guild_area)\/index\.html/; //公会体系
            let uri =  item.uri ? '' + item.uri : '';
            return re.test(uri); 
        })
         //data中拿pageName
        state.data.share_data.uri = (partialData && partialData.hasOwnProperty('uri')) 
            ? partialData.uri : window.location.href;
        state.data.share_data.pageName = (partialData && partialData.hasOwnProperty('pageName')) 
            ? partialData.pageName : formatParmters().pageName;
        state.data.share_data.gift_id = (partialData && partialData.hasOwnProperty('gift_id')) 
            ? partialData.gift_id : formatParmters().gift_id;
        state.data.share_data.kind = (partialData && partialData.hasOwnProperty('kind')) 
            ? partialData.kind : formatParmters().kind;
        state.data.share_data.guildStarIcons = (partialData && partialData.hasOwnProperty('guildStarIcons')) 
            ? partialData.guildStarIcons : state.data.share_data.guildStarIcons;  
        state.data.user.gid = (partialData && partialData.hasOwnProperty('gid')) 
            ? partialData.gid : formatParmters().gid;
        if(_.isEmpty(data) || !data.hasOwnProperty('user')){

            if(shareData.hasOwnProperty('UserInfo')){                  
                //data中拿gid， UserInfo中拿 uid
                state.data.user.uid = ( shareData && shareData.hasOwnProperty('UserInfo') && shareData.UserInfo.hasOwnProperty('uid')) 
                                    ?shareData.UserInfo.uid : formatParmters().uid;
                state.data.user.account = shareData.UserInfo.account ? shareData.UserInfo.account : state.data.user.account //tt账号
                state.data.user.name = shareData.UserInfo.nickName ? shareData.UserInfo.nickName : '暂无昵称' //用户昵称
                state.data.user.head = 'http://api.52tt.com/face?uid='+state.data.user.uid 
                //公会体系参数
                if(shareData.UserInfo.hasOwnProperty('guild_system')){ 
                    state.data.user.guild_id = shareData.UserInfo.guild_system.guild_id ? shareData.UserInfo.guild_system.guild_id :  state.data.user.guild_id //活动guild_id 101336 测试内部使用
                    state.data.user.contribution = shareData.UserInfo.guild_system.contribution ? shareData.UserInfo.guild_system.contribution : state.data.user.contribution //历史贡献值
                    state.data.user.consume = shareData.UserInfo.guild_system.consume ? shareData.UserInfo.guild_system.consume :state.data.user.consume //可消费贡献值
                    state.data.user.diamond =  shareData.UserInfo.guild_system.diamond ?  shareData.UserInfo.guild_system.diamond : state.data.user.diamond //红钻
                    state.data.user.guild_title = shareData.UserInfo.guild_system.guild_title ? shareData.UserInfo.guild_system.guild_title : state.data.user.guild_title //公会id
                    state.data.user.guild_identity = shareData.UserInfo.guild_system.guild_identity ? shareData.UserInfo.guild_system.guild_identity : state.data.user.guild_identity //会员称号
                    state.data.user.guild_consume = shareData.UserInfo.guild_system.guild_consume ? shareData.UserInfo.guild_system.guild_consume : state.data.user.guild_consume //公会可用贡献   
                    state.data.user.level = shareData.UserInfo.guild_system.member_level ? shareData.UserInfo.guild_system.member_level : state.data.user.level //公会会员贡献等级
                }
            }
            // showToast(JSON.stringify(state.data.user))
        }else if(data.hasOwnProperty('user')){
            //用户基本信息 
            state.data.user.uid = data.user.uid ? data.user.uid : state.data.user.uid 
            state.data.user.account = data.user.account ? data.user.account : state.data.user.account 
            state.data.user.name = data.user.name ? data.user.name : state.data.user.name
            state.data.user.head = 'http://api.52tt.com/face?uid='+state.data.user.uid 
            state.data.user.contribution = data.user.contribution ? data.user.contribution : state.data.user.contribution
            state.data.user.consume = data.user.consume ? data.user.consume : state.data.user.consume
            state.data.user.diamond = data.user.diamond ? data.user.diamond : state.data.user.diamond
            //用户所在公会基本信息
            state.data.user.guild_id = data.user.guild_id ? data.user.guild_id : state.data.user.guild_id
            state.data.user.guild_title = data.user.guild_title ? data.user.guild_title : state.data.user.guild_title
            state.data.user.level = data.user.level ? data.user.level : state.data.user.level
            state.data.user.guild_identity = data.user.guild_identity ? data.user.guild_identity : state.data.user.guild_identity
            state.data.user.guild_consume = data.user.guild_consume ? data.user.guild_consume : state.data.user.guild_consume
            //用户兑换的记录
        }
    },
    //更新公会商店信息
    [GUILD_CENTER_SHOP_UPDATE](state,data){

        const partermter = state.data.current.partermter
        const source = partermter.source
        //筛选出来当前的tab选项卡类型
        if(data.hasOwnProperty('gift_total') && data.gift_total.length){

            $$.each(data.gift_total, function(index, item){
                const findLastIndex = _.findLastIndex(state.data.guild_shop.gift_total,function(obj){ //查找遍历活动的数据
                    return item.type === obj.type && item.source === obj.source //判断2者一致才返回更新替换
                })
                //给当前页面赋值game_total页码
                if(item.type === partermter.type && item.source === source){
                   item.game_total = parseInt(data.total)
                }
                //查找到就更新数据
                if(findLastIndex !== -1){
                    const lastItem = state.data.guild_shop.gift_total[findLastIndex] //获取将替换的数据
                    const thisItem = _.extend(lastItem,item); //合并之前的数据
                    state.data.guild_shop.gift_total.splice(findLastIndex,1,thisItem) //更新数据
                }else{ //不存在就添加数据
                    state.data.guild_shop.gift_total.push(item)
                }
            })
            state.data.guild_shop.gift.total = data.total    
        }
        
        //商品列表
        if(data.hasOwnProperty('list') && data.list.length){
            $$.each(data.list, function(index, item){
                if(!item) return false
                if(data.hasOwnProperty('keywords')){
                    item.keywords = data.keywords
                }
                const findLastIndex = _.findLastIndex(state.data.guild_shop.gift.list,function(obj){ //查找遍历活动的数据
                    return item.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.gift.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.guild_shop.gift.list.push(item)
                }
            })
        }


    },

    //公会商店搜索
    [GUILD_CENTER_SHOP_SEARCH_LIST](state,data){

        let keywords = state.data.current.keywords
        if(data.hasOwnProperty('keywords')){
            keywords = data.keywords
        }
        //赋值搜索商品list表
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){
                if(!item) return false
                if(keywords) item.keywords = keywords //关键词
                const findLastIndex = _.findLastIndex(state.data.guild_shop.search_list.list,function(obj){ //查找遍历活动的数据
                    return item.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.search_list.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.guild_shop.search_list.list.push(item)
                }

            })
        }
        //赋值搜索商品list表总页码
        if(data.hasOwnProperty('total')){
            const item = {
                keywords:keywords,
                total:data.total
            }
            const findLastIndex = _.findLastIndex(state.data.guild_shop.search_list.total_list,function(obj){ //查找遍历活动的数据
                return obj.keywords === keywords
            })
            if(findLastIndex !== -1){ //查找不到就更新数据
                state.data.guild_shop.search_list.total_list.splice(findLastIndex,1,item)
            }else{ //存在就添加数据
                state.data.guild_shop.search_list.total_list.push(item)
            }
            state.data.guild_shop.search_list.total = data.total
        }
    },  

    //商店商品详情
    [GUILD_CENTER_SHOP_INFO](state,data){

        //当前的礼包id
        const gift_id = state.data.current.gift_id
        const shop_list = state.data.guild_shop.more_list.list
        const findLastIndex = _.findLastIndex(shop_list,function(obj){
            return obj.gift_id == gift_id
        })
        if(findLastIndex !== -1){
            state.data.guild_shop.shop_info = shop_list[findLastIndex]
        }
        if(data.hasOwnProperty('gift_info') && data.gift_info){
            state.data.guild_shop.shop_info = data.gift_info
        }
        if(state.data.guild_shop.shop_info.gift_id == state.data.guild_shop.award.gift_id){
            state.data.guild_shop.shop_info.record = state.data.guild_shop.award //获取兑换码
        }
        // state.data.guild_shop.shop_info.record_list = state.data.guild_shop.record //礼包单独的记录

    },

    //商店中心更多列表
    [GUILD_CENTER_SHOP_MORE_LIST](state,data){

        //赋值搜索商品list表
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){
                if(!item) return false
                if(data.hasOwnProperty('keywords')){
                    item.keywords = data.keywords
                }
                const findLastIndex = _.findLastIndex(state.data.guild_shop.more_list.list,function(obj){ //查找遍历活动的数据
                    return item.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.more_list.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.guild_shop.more_list.list.push(item)
                }
            })
        }
        //赋值搜索商品list表总页码
        state.data.guild_shop.more_list.total = data.total

    },

    //商店中心更多列表
    [GUILD_CENTER_SHOP_GID_LIST](state,data){

        const gid = state.data.current.gid
        //赋值搜索商品list表
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){
                if(!item) return false
                if(data.hasOwnProperty('keywords')){
                    item.keywords = data.keywords
                }
                const findLastIndex = _.findLastIndex(state.data.guild_shop.gid_list.list,function(obj){ //查找遍历活动的数据
                    return item.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.gid_list.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.guild_shop.gid_list.list.push(item)
                }
            })
        }
        //赋值搜索商品list表总页码
        if(data.hasOwnProperty('total') && gid){
            const item = {
                gid:gid,
                total:data.total
            }
            const findLastIndex = _.findLastIndex(state.data.guild_shop.gid_list.total_list,function(obj){ //查找遍历活动的数据
                return item.gid === obj.gid
            })
            if(findLastIndex !== -1){ //查找不到就更新数据
                state.data.guild_shop.gid_list.total_list.splice(findLastIndex,1,item)
            }else{ //存在就添加数据
                state.data.guild_shop.gid_list.total_list.push(item)
            }
            state.data.guild_shop.gid_list.total = data.total
        }
    },

     //公会商品领取记录
    [GUILD_CENTER_SHOP_RECORD](state,data){

        const gift_id = data.gift_id ? data.gift_id : state.data.current.gift_id
        //遍历
        if(data.hasOwnProperty('list') && data.list.length){
            $$.each(data.list, function(index, item){
                if(!item) return false
                item.gift_id = gift_id
                item.user.icon = item.user.icon ? item.user.icon : 'http://api.52tt.com/face?uid='+item.user.uid
                const findLastIndex = _.findLastIndex(state.data.guild_shop.record.list,function(obj){ //查找遍历活动的数据
                    return item.user.uid === obj.user.uid && gift_id === obj.gift_id //筛选出相同uid 和礼包id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.record.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.guild_shop.record.list.push(item)
                }
            })
        }
        //赋值搜索商品list表总页码
        if(data.hasOwnProperty('total')){
            const item = {
                gift_id:gift_id,
                total:data.total
            }
            const findLastIndex = _.findLastIndex(state.data.guild_shop.record.total_list,function(obj){ //查找遍历活动的数据
                return item.gift_id === obj.gift_id
            })
            if(findLastIndex !== -1){ //查找不到就更新数据
                state.data.guild_shop.record.total_list.splice(findLastIndex,1,item)
            }else{ //存在就添加数据
                state.data.guild_shop.record.total_list.push(item)
            }
            state.data.guild_shop.record.total = data.total
        }

    },

    //当前公会礼包领取提示
    [GUILD_CENTER_SHOP_RECORD_INFO](state,data){
        //遍历中奖数据
        if(data.hasOwnProperty('record') && data.record ){
            if(data.record.hasOwnProperty('gift_list')){
                $$.each(data.record.gift_list,function(index, item) {
                    item.type = data.record.type
                    item.gift_id = data.gift_id
                });
                state.data.guild_shop.award.gift_id = data.record.gift_id
                state.data.guild_shop.award.type = data.record.type
                state.data.guild_shop.award.gift_list = data.record.gift_list
            }
            //state.data.guild_shop.shop_info.record = state.data.guild_shop.award
        }
    },



     //更新即将首页请求的触发的参数
    [GUILD_CHANGE_CURRENT_KEYWORDS] (state, data) {
        state.data.current.keywords = data;
    },

    //更新即将首页请求的触发的参数
    [GUILD_CHANGE_CURRENT_PARTERMTER] (state, data) {
        state.data.current.partermter = data;
    },

    //更新即将访问的礼包id,用于详情页参数传递
    [GUILD_CHANGE_CURRENT_GIFT] (state, data) {
        if(data.hasOwnProperty('gift_name')){
            state.data.current.gift_name = data.gift_name;
        }
        if(data.hasOwnProperty('gift_id')){
            state.data.current.gift_id = data.gift_id;
        }
        if(data.hasOwnProperty('keywords')){
            state.data.current.keywords = data.keywords;
        }
    },

    //更新即将访问的游戏id,用于详情页参数传递
    [GUILD_CHANGE_CURRENT_GAME] (state, data) {
        if(data.hasOwnProperty('game_name')){
            state.data.current.game_name = data.game_name;
        }
        if(data.hasOwnProperty('gid')){
            state.data.current.gid = data.gid;
        }
    },

    [GUILD_CHANGE_CURRENT_FAIL_PARTERMTER](state,data){
        state.data.current.fail_info = data;
    }
}
