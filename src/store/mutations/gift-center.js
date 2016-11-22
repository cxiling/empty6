import {
    //公会商店
    USER_PROFILE_UPDATE,
    GUILD_CENTER_SHOP_UPDATE,
    GUILD_CENTER_SHOP_SEARCH_LIST,
    GUILD_CENTER_SHOP_MORE_LIST,
    GUILD_CENTER_SHOP_INFO,
    GUILD_CENTER_SHOP_RECORD,
    GUILD_CHANGE_CURRENT_GIFT,
    GUILD_CHANGE_CURRENT_GAME,
    //礼包中心
    // GUILD_CENTER_GIFT_UPDATE,
    GUILD_CENTER_HOME_UPDATE,
    GUILD_CENTER_GIFT_SEARCH_LIST,
    // GUILD_CENTER_GIFT_MORE_LIST,
    GUILD_CENTER_GIFT_LIST,
    GUILD_CENTER_GID_LIST,
    GUILD_CENTER_GIFT_INFO,
    CHANGE_CENTER_CURRENT_GIFT,
    CHANGE_CENTER_CURRENT_GAME,
    CHANGE_CENTER_CURRENT_GIFT_LIST,
    // CHANGE_CENTER_CURRENT_KEYWORDS,
    CHANGE_CENTER_CURRENT_SEARCH_LIST,//设置搜索页当前参数
    CHANGE_CENTER_CURRENT_GIFT_GUILD_LIST,//设置礼包查公会页参数（礼包id）
    CHANGE_CENTER_CURRENT_GIFT_LIST_POSITION,//设置礼包列表当前位置

    GUILD_CENTER_UPDATE_GIFT_INFO,
    GUILD_CENTER_ACTIVITY_LIST,//更新活动列表
    GUILD_CENTER_GIFT_GUILD,//更新礼包查公会列表
    GUILD_CENTER_FETCH_TT_GIFT,//更新最后一条领取记录 TT礼包
    GUILD_CENTER_NOTIFY,//通知会长采购公会礼包
    GUILD_CENTER_PURCHASE,//会长采购公会礼包
    // GUILD_CENTER_UPDATE_LAST_RECORD,//更新最后一条领取记录
    GUILD_CENTER_CLEAR_LAST_RECORD,//清空最后一次领取记录（当前加载礼包详情礼包与领取记录不同时）
    GUILD_CENTER_CLEAR_SEARCH_LIST,//清空搜索结果
    GUILD_CENTER_CHANGE_PAGE_NAME,//设置当前page_name
    GUILD_CENTER_UPDATE_GIFT_DETAIL,//更新当前礼包详情

} from '../mutation-types'

export const giftCenterMutations = {

    // //礼包中心礼包详情
    // [GUILD_CENTER_GIFT_INFO](state,data){

    //     //当前的礼包id
    //     const gift_id = state.data.current.gift_id
    //     const gift_list = state.data.gift_center.more_list.list
    //     const findLastIndex = _.findLastIndex(gift_list,function(obj){
    //         return obj.gift_id === gift_id
    //     })
    //     if(findLastIndex !== -1){
    //         state.data.gift_center.gift_info = gift_list[findLastIndex]
    //     }
    // },

    // //游戏礼包中心更多列表
    // [GUILD_CENTER_GIFT_MORE_LIST](state,data){

    //     //赋值搜索商品list表
    //     if(data.hasOwnProperty('list') && data.list.length){
    //          $$.each(data.list, function(index, item){
    //             const findLastIndex = _.findLastIndex(state.data.gift_center.more_list.list,function(obj){ //查找遍历活动的数据
    //                 obj.gift_id ? obj.gift_id : obj.gift_id = 0 //防止不存在id报错 
    //                 return item.gift_id === obj.gift_id
    //             })
    //             if(findLastIndex !== -1){ //查找不到就更新数据
    //                 state.data.gift_center.more_list.list.splice(findLastIndex,1,item)
    //             }else{ //存在就添加数据
    //                 state.data.gift_center.more_list.list.push(item)
    //             }
    //         })
    //     }
    //     //赋值搜索商品list表总页码
    //     state.data.guild_shop_more_list.total = data.total

    // },

    //更新公会礼包中心 首页信息    
    [GUILD_CENTER_HOME_UPDATE](state,data){

        //更新用户信息
        if(data.hasOwnProperty('user') && data.user.uid){
            state.data.user.uid = data.user.uid ? data.user.uid : state.data.user.uid
            state.data.user.account = data.user.account ? data.user.account : state.data.user.account
            state.data.user.head = data.user.head ? data.user.head : state.data.user.head
            state.data.user.name = data.user.name ? data.user.name : state.data.user.name
            state.data.user.contribution = data.user.contribution ? data.user.contribution : state.data.user.contribution
            state.data.user.consume = data.user.consume ? data.user.consume : state.data.user.consume
            state.data.user.diamond = data.user.diamond ? data.user.diamond : state.data.user.diamond
            // state.data.user.guild_id = data.user.guild_id ? data.user.guild_id : state.data.user.guild_id
            state.data.user.guild_id = data.user.guild_id
            state.data.user.guild_title = data.user.guild_title ? data.user.guild_title : state.data.user.guild_title
            state.data.user.level = data.user.level ? data.user.level : state.data.user.level
            state.data.user.guild_identity = data.user.guild_identity ? data.user.guild_identity : state.data.user.guild_identity
            state.data.user.guild_consume = data.user.guild_consume ? data.user.guild_consume : state.data.user.guild_consume
            state.data.user.purchase_rights = data.user.purchase_rights ? data.user.purchase_rights : state.data.user.purchase_rights
        }

        //更新banner图
        if(data.hasOwnProperty('banner_list') && data.banner_list.length){
            state.data.gift_center.banner_list = data.banner_list
        }

        //更新热门游戏列表
        if(data.hasOwnProperty('hot_game_list') && data.hot_game_list.length){

            $$.each(data.hot_game_list, function(index, item){
                const findLastIndex = _.findLastIndex(state.data.gift_center.hot_game_list,function(obj){
                    return item.gid === obj.gid
                })
                if(findLastIndex !== -1){
                    state.data.gift_center.hot_game_list.splice(findLastIndex,1,item)
                }else{
                    state.data.gift_center.hot_game_list.push(item)
                }
            })
        }  

        //更新公会入驻游戏列表   
        if(data.hasOwnProperty('guild_game_list') && data.guild_game_list.length){

            $$.each(data.guild_game_list, function(index, item){
                const findLastIndex = _.findLastIndex(state.data.gift_center.guild_game_list,function(obj){
                    return item.gid === obj.gid
                })
                if(findLastIndex !== -1){
                    state.data.gift_center.guild_game_list.splice(findLastIndex,1,item)
                }else{
                    state.data.gift_center.guild_game_list.push(item)
                }
            })
        }   

    },

    // //更新公会礼包中心信息    
    // [GUILD_CENTER_HOME_UPDATE](state,data){

    //     const game_list = ['banner_list','hot_game_list','guild_game_list']

    //     $$.each(game_list,function(index, gameItem) {
    //         //头部轮播图（数组）热门游戏（数组）入驻游戏（数组）
    //         if(data.hasOwnProperty(gameItem) && data[gameItem].length){
    //             $$.each(data[gameItem], function(index, item){

    //                 const findLastIndex = _.findLastIndex(state.data.gift_center[gameItem],function(obj){ //查找遍历活动的数据
    //                     obj.gift_id ? obj.gift_id : obj.gift_id = 0 //防止不存在id报错 
    //                     return item.gift_id === obj.gift_id
    //                 })
    //                 if(findLastIndex !== -1){ //查找不到就更新数据
    //                     state.data.gift_center[gameItem].splice(findLastIndex,1,item)
    //                 }else{ //存在就添加数据
    //                     state.data.gift_center[gameItem].push(item)
    //                 }

    //             })
    //         }
    //     });
    //     //公会礼包中心活动列表
    //     if(data.hasOwnProperty('activity')){
    //         if(data.activity.list.length){
    //             $$.each(data.activity.list, function(index, item){
    //                 item.keywords = data.keywords
    //                 const findLastIndex = _.findLastIndex(state.data.gift_center.active.list,function(obj){ //查找遍历活动的数据
    //                     obj.gift_id ? obj.gift_id : obj.gift_id = 0 //防止不存在id报错 
    //                     return item.gift_id === obj.gift_id
    //                 })
    //                 if(findLastIndex !== -1){ //查找不到就更新数据
    //                     state.data.gift_center.active.list.splice(findLastIndex,1,item)
    //                 }else{ //存在就添加数据
    //                     state.data.gift_center.active.list.push(item)
    //                 }

    //             })
    //         }
    //     }
    // },

    [GUILD_CENTER_GIFT_SEARCH_LIST](state,data){
        // const kind = data.kind ? data.kind : 1
        //获取当前种类 tt礼包或者公会礼包
        const kind = state.data.gift_center.center_current.search.kind 
        const keywords = state.data.gift_center.center_current.search.keywords 
        //TT礼包
        if(kind == 1){

            //赋值搜索商品list表
            if(data.hasOwnProperty('list') && data.list.length){
                 $$.each(data.list, function(index, item){
                    item.keywords = keywords

                    const findLastIndex = _.findLastIndex(state.data.gift_center.search_list.tt_gift.list,function(obj){ //查找遍历活动的数据
                        // obj.gift_id ? obj.gift_id : obj.gift_id = 0 //防止不存在id报错 
                        if(obj && obj.hasOwnProperty('gift_id')){
                            return item.gift_id === obj.gift_id
                        }else{
                            return false
                        }
                    })
                    if(findLastIndex !== -1){ //查找不到就更新数据
                        state.data.gift_center.search_list.tt_gift.list.splice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        state.data.gift_center.search_list.tt_gift.list.push(item)
                    }
                })
            }
            //赋值搜索商品list表总页码
            if(data.hasOwnProperty('total')){
                const item = {
                    keywords:keywords,
                    total:data.total
                }
                const findLastIndex = _.findLastIndex(state.data.gift_center.search_list.tt_gift.total_list,function(obj){ //查找遍历活动的数据
                    return obj.keywords=== keywords
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.gift_center.search_list.tt_gift.total_list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.gift_center.search_list.tt_gift.total_list.push(item)
                }
                state.data.gift_center.search_list.tt_gift.total = data.total
            }

            //赋值搜索商品list表总页码
            // state.data.gift_center.search_list.tt_gift.total = data.total

            if(data.hasOwnProperty('server_time')){
                state.data.gift_center.search_list.tt_gift.server_time = data.server_time
            }
        }
        else{//公会礼包

            //赋值搜索商品list表
            if(data.hasOwnProperty('list') && data.list.length){
                 $$.each(data.list, function(index, item){
                    item.keywords = keywords

                        const findLastIndex = _.findLastIndex(state.data.gift_center.search_list.guild_gift.list,function(obj){ //查找遍历活动的数据
                            // obj.gift_id ? obj.gift_id : obj.gift_id = 0 //防止不存在id报错 
                            if(obj && obj.hasOwnProperty('gift_id')){
                                return item.gift_id === obj.gift_id
                            }else{
                                return false
                            }
                            return item.gift_id === obj.gift_id
                        })
                        if(findLastIndex !== -1){ //查找不到就更新数据
                            state.data.gift_center.search_list.guild_gift.list.splice(findLastIndex,1,item)
                        }else{ //存在就添加数据
                            state.data.gift_center.search_list.guild_gift.list.push(item)
                        }
                })
            }
            //赋值搜索商品list表总页码
            if(data.hasOwnProperty('total')){
                const item = {
                    keywords:keywords,
                    total:data.total
                }
                const findLastIndex = _.findLastIndex(state.data.gift_center.search_list.guild_gift.total_list,function(obj){ //查找遍历活动的数据
                    return obj.keywords === keywords
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.gift_center.search_list.guild_gift.total_list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.gift_center.search_list.guild_gift.total_list.push(item)
                }
                state.data.gift_center.search_list.guild_gift.total = data.total
            }
            //赋值搜索商品list表总页码
            // state.data.gift_center.search_list.guild_gift.total = data.total

            if(data.hasOwnProperty('server_time')){
                state.data.gift_center.search_list.guild_gift.server_time = data.server_time
            }
        }
    },  


    //更新活动列表
    [GUILD_CENTER_ACTIVITY_LIST] (state,data){

        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){

                const findLastIndex = _.findLastIndex(state.data.gift_center.activity.list,function(obj){
                    return item.activity_id === obj.activity_id
                })
                if(findLastIndex !== -1){
                    state.data.gift_center.activity.list.splice(findLastIndex,1,item)
                }else{
                    state.data.gift_center.activity.list.push(item)
                }
            })
        }
        if(data.hasOwnProperty('total')){
            state.data.gift_center.activity.total = data.total
        }
        if(data.hasOwnProperty('server_time')){
            state.data.gift_center.activity.server_time = data.server_time
        }

    },

    //更新礼包查公会列表
    [GUILD_CENTER_GIFT_GUILD] (state, data, obj){
        //更新公会列表
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){

                const findLastIndex = _.findLastIndex(state.data.gift_center.gift_guild.list,function(obj){
                    obj.guild_id ? obj.guild_id : obj.guild_id = 0
                    return item.guild_id == obj.guild_id
                })

                //增加附加参数gift_id，公会id拼接公会图标url
                let tempItem = {}
                tempItem.gift_id = obj.gift_id
                tempItem.guild_id = item.guild_id ? item.guild_id : 0
                tempItem.short_id = item.short_id ? item.short_id : 0
                tempItem.description = item.description ? item.description : ''
                tempItem.icon = "http://app.52tt.com/api/face?account=" + item.guild_id + "@guild" 
                tempItem.name = item.name ? item.name : ''
                tempItem.level = item.level ? item.level : 0
                
                if(findLastIndex !== -1){
                    state.data.gift_center.gift_guild.list.splice(findLastIndex,1,tempItem)
                }else{
                    state.data.gift_center.gift_guild.list.push(tempItem)
                }
            })
        }
        //更新指定礼包，有礼包公会总数
        if(data.hasOwnProperty('total')){
            const findLastIndex = _.findLastIndex(state.data.gift_center.gift_guild.guild_total,function(item){ //查找遍历活动的数据
                return item.gift_id == obj.gift_id
            })
            if(findLastIndex !== -1){ 
                state.data.gift_center.gift_guild.guild_total[findLastIndex].total = data.total
            }
            else{ 
                state.data.gift_center.gift_guild.guild_total.push( {gift_id:obj.gift_id, total:data.total} )
            }
        } 
        if(data.hasOwnProperty('server_time')){
            state.data.gift_center.gift_guild.server_time = data.server_time
        }    
    },

     //更新即将访问的礼包参数,用于详情页参数传递
    [CHANGE_CENTER_CURRENT_GIFT] (state, obj) {
        // state.data.gift_center.center_current.detail.position = obj.position //(首页 'home'，搜索页 'search', 游戏找礼包 'game')
        state.data.gift_center.center_current.detail.kind = obj.kind
        state.data.gift_center.center_current.detail.gift_id = obj.gift_id
    },

    //更新即将访问的游戏id,用于游戏查礼包列表页参数传递
    [CHANGE_CENTER_CURRENT_GAME] (state, obj) {
        state.data.gift_center.center_current.game.kind = obj.kind ? obj.kind : state.data.gift_center.center_current.game.kind
        state.data.gift_center.center_current.game.gid = obj.gid ? obj.gid : state.data.gift_center.center_current.game.gid
        state.data.gift_center.center_current.game.game_name = obj.game_name ? obj.game_name : state.data.gift_center.center_current.game.game_name
    },

    //更新即将访问的礼包列表分类 kind , type
    [CHANGE_CENTER_CURRENT_GIFT_LIST] (state, obj) {
        state.data.gift_center.center_current.gift_list.kind = obj.kind ? obj.kind : state.data.gift_center.center_current.gift_list.kind
        state.data.gift_center.center_current.gift_list.type = obj.type ? obj.type : state.data.gift_center.center_current.gift_list.type
    },

    //更新搜索页参数
    [CHANGE_CENTER_CURRENT_SEARCH_LIST] (state, obj) {
        state.data.gift_center.center_current.search.kind = obj.kind ? obj.kind : state.data.gift_center.center_current.search.kind
        state.data.gift_center.center_current.search.keywords = obj.keywords ? obj.keywords : state.data.gift_center.center_current.search.keywords
    },

    //更新礼包查公会页参数
    [CHANGE_CENTER_CURRENT_GIFT_GUILD_LIST] (state, obj) {
        state.data.gift_center.center_current.gift_guild.gift_id = obj.gift_id ? obj.gift_id : 0
    },

    //更新礼包列表当前所在位置('home' 'search' 'game')
    [CHANGE_CENTER_CURRENT_GIFT_LIST_POSITION] (state, obj) {
        state.data.gift_center.center_current.position = obj.position ? obj.position : state.data.gift_center.center_current.position
    },

    //根据center_current参数加载指定礼包详情
    [GUILD_CENTER_GIFT_INFO] (state,data){
        let current_info = state.data.gift_center.center_current.detail
        let gift_id = current_info.gift_id
        let position = state.data.gift_center.center_current.position//礼包信息所在列表位置

        let gift_list 
        let findLastIndex 

        if( position == 'home'){
            if(current_info.kind == 1){
                gift_list = state.data.gift_center.tt_gift.list
            }else{
                gift_list = state.data.gift_center.guild_gift.list             
            }     
        }
        else if( position == 'search'){
            if(current_info.kind == 1){
                gift_list = state.data.gift_center.search_list.tt_gift.list
            }else{
                gift_list = state.data.gift_center.search_list.guild_gift.list             
            }  
        }
        else if( position == 'game'){
            if(current_info.kind == 1){
                gift_list = state.data.gift_center.gid_list.tt_gift.list
            }else{
                gift_list = state.data.gift_center.gid_list.guild_gift.list             
            }  
        }else{
            console.log('position 错误')
        }

        findLastIndex = _.findLastIndex(gift_list,function(obj){
            return obj.gift_id === gift_id
        })
        
        if(findLastIndex !== -1){
            if(current_info.kind == 1){
                state.data.gift_center.gift_detail.kind = 1
                state.data.gift_center.gift_detail.tt_gift_info = gift_list[findLastIndex]
            }else{
                state.data.gift_center.gift_detail.kind = 2
                state.data.gift_center.gift_detail.guild_gift_info = gift_list[findLastIndex]
            }      
        }

        //暂存最后一条领取信息 fetch_info 在 gift_detail 下面
        //领取信息与当前礼包相同才显示

    },

    //更新 首页、所有 礼包列表
    [GUILD_CENTER_GIFT_LIST] (state, data, obj){
        if(!obj){
            console.log('漏传obj')
            return
        }

        //TT礼包
        if(obj.kind == 1){
            //更新礼包列表
            if(data.hasOwnProperty('list') && data.list.length){
                $$.each(data.list, function(index, item){
                    const findLastIndex = _.findLastIndex(state.data.gift_center.tt_gift.list,function(obj){ //查找遍历活动的数据
                        return item.gift_id === obj.gift_id
                    })
                    if(findLastIndex !== -1){ //查找到就更新数据
                        state.data.gift_center.tt_gift.list.splice(findLastIndex,1,item)
                    }else{ //不存在就添加数据
                        state.data.gift_center.tt_gift.list.push(item)
                    }

                })
            }
            //更新不同type礼包总数
            if(data.hasOwnProperty('total')){
                
                const findLastIndex = _.findLastIndex(state.data.gift_center.tt_gift.gift_total,function(item){ //查找遍历活动的数据
                    return item.type === obj.type
                })
                if(findLastIndex !== -1){ 
                    state.data.gift_center.tt_gift.gift_total[findLastIndex].total = data.total
                }
                else{ 
                    state.data.gift_center.tt_gift.gift_total.push( {type:obj.type, total:data.total} )
                }
            }

        }
        //公会礼包
        else if(obj.kind == 2){
            //更新礼包列表
            if(data.hasOwnProperty('list') && data.list.length){
                $$.each(data.list, function(index, item){
                    const findLastIndex = _.findLastIndex(state.data.gift_center.guild_gift.list,function(obj){ //查找遍历活动的数据
                        return item.gift_id === obj.gift_id
                    })
                    if(findLastIndex !== -1){ //查找到就更新数据
                        state.data.gift_center.guild_gift.list.splice(findLastIndex,1,item)
                    }else{ //不存在就添加数据
                        state.data.gift_center.guild_gift.list.push(item)
                    }

                })
            }
            //更新不同type礼包总数
            if(data.hasOwnProperty('total')){
                
                const findLastIndex = _.findLastIndex(state.data.gift_center.guild_gift.gift_total,function(item){ //查找遍历活动的数据
                    return item.type === obj.type
                })
                if(findLastIndex !== -1){ 
                    state.data.gift_center.guild_gift.gift_total[findLastIndex].total = data.total
                }
                else{ 
                    state.data.gift_center.guild_gift.gift_total.push( {type:obj.type, total:data.total} )
                }
            }
        }
        else{
            console.log('kind 参数错误')
        }

    },

    //更新游戏查礼包列表
    [GUILD_CENTER_GID_LIST] (state, data, obj){

        if(!obj){
            console.log('漏传obj')
            return
        }

        //TT礼包
        if(obj.kind == 1){
            //更新礼包列表
            if(data.hasOwnProperty('list') && data.list.length){
                $$.each(data.list, function(index, item){
                    const findLastIndex = _.findLastIndex(state.data.gift_center.gid_list.tt_gift.list,function(obj){ //查找遍历活动的数据
                        return item.gift_id === obj.gift_id
                    })
                    if(findLastIndex !== -1){ //查找到就更新数据
                        state.data.gift_center.gid_list.tt_gift.list.splice(findLastIndex,1,item)
                    }else{ //不存在就添加数据
                        state.data.gift_center.gid_list.tt_gift.list.push(item)
                    }

                })
            }
            //更新不同gid礼包总数
            if(data.hasOwnProperty('total')){
                
                const findLastIndex = _.findLastIndex(state.data.gift_center.gid_list.tt_gift.gift_total,function(item){ //查找遍历活动的数据
                    return item.gid === obj.gid
                })
                if(findLastIndex !== -1){ 
                    state.data.gift_center.gid_list.tt_gift.gift_total[findLastIndex].total = data.total
                }
                else{ 
                    state.data.gift_center.gid_list.tt_gift.gift_total.push( {gid:obj.gid, total:data.total} )
                }
            }

        }
        //公会礼包
        else if(obj.kind == 2){
            //更新礼包列表
            if(data.hasOwnProperty('list') && data.list.length){
                $$.each(data.list, function(index, item){
                    const findLastIndex = _.findLastIndex(state.data.gift_center.gid_list.guild_gift.list,function(obj){ //查找遍历活动的数据
                        return item.gift_id === obj.gift_id
                    })
                    if(findLastIndex !== -1){ //查找到就更新数据
                        state.data.gift_center.gid_list.guild_gift.list.splice(findLastIndex,1,item)
                    }else{ //不存在就添加数据
                        state.data.gift_center.gid_list.guild_gift.list.push(item)
                    }

                })
            }
            //更新不同gid礼包总数
            if(data.hasOwnProperty('total')){
                
                const findLastIndex = _.findLastIndex(state.data.gift_center.gid_list.guild_gift.gift_total,function(item){ //查找遍历活动的数据
                    return item.gid === obj.gid
                })
                if(findLastIndex !== -1){ 
                    state.data.gift_center.gid_list.guild_gift.gift_total[findLastIndex].total = data.total
                }
                else{ 
                    state.data.gift_center.gid_list.guild_gift.gift_total.push( {gid:obj.gid, total:data.total} )
                }
            }
        }
        else{
            console.log('kind 参数错误')
        }

    },

    // //更新搜索页列表
    // [GUILD_CENTER_GIFT_SEARCH_LIST](state, data, kind){},

    //通知会长申请（采购）礼包
    [GUILD_CENTER_NOTIFY] (state, data){

    },

    //更新最后一次TT礼包领取记录
    [GUILD_CENTER_FETCH_TT_GIFT] (state, data){

        state.data.gift_center.fetch_info.kind = 1  
        
        //更新领取记录
        if(data.hasOwnProperty('record') && data.record.hasOwnProperty('gift_list')){
            state.data.gift_center.fetch_info.gift_list = data.record.gift_list ? data.record.gift_list : []
        }

        if(data.hasOwnProperty('gift_info')){
            state.data.gift_center.fetch_info.gift_id = data.gift_info.gift_id ? data.gift_info.gift_id : 0
            state.data.gift_center.fetch_info.type = data.gift_info.type ? data.gift_info.type : 0
            state.data.gift_center.fetch_info.exchange_type = data.gift_info.exchange_type ? data.gift_info.exchange_type : 255
        }

    },

    // //更新最后一条领取记录(TT礼包)
    // [GUILD_CENTER_UPDATE_LAST_RECORD] (state, data){

    // },

    //会长申请（采购）公会礼包，更新公会贡献值
    [GUILD_CENTER_PURCHASE] (state, data, obj){
        
        //更新公会贡献值
        if(data.hasOwnProperty('guild_consume')){
            state.data.user.guild_consume = data.guild_consume ? data.guild_consume : 0
        }

    },

    //更新单个礼包信息 所有（3个）礼包列表（有此礼包的列表更新，没有的不增加）
    [GUILD_CENTER_UPDATE_GIFT_INFO] (state, data, kind){

        let findLastIndex

        if(data.hasOwnProperty('gift_info')){
            if(kind == 1){    

                //首页 TT礼包列表
                findLastIndex = _.findLastIndex(state.data.gift_center.tt_gift.list,function(obj){ //查找遍历活动的数据
                    return data.gift_info.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找到就更新数据
                    state.data.gift_center.tt_gift.list.splice(findLastIndex,1,data.gift_info)
                    findLastIndex = -1
                }

                //搜索 TT礼包列表
                findLastIndex = _.findLastIndex(state.data.gift_center.search_list.tt_gift.list,function(obj){ //查找遍历活动的数据
                    return data.gift_info.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找到就更新数据
                    const guild_gift = state.data.gift_center.search_list.guild_gift.list[findLastIndex]
                    const item = _.extend(guild_gift, data.gift_info);
                    state.data.gift_center.search_list.guild_gift.list.splice(findLastIndex,1,item)
                    findLastIndex = -1
                }

                //game TT礼包列表
                findLastIndex = _.findLastIndex(state.data.gift_center.gid_list.tt_gift.list,function(obj){ //查找遍历活动的数据
                    return data.gift_info.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找到就更新数据
                    state.data.gift_center.gid_list.tt_gift.list.splice(findLastIndex,1,data.gift_info)
                    findLastIndex = -1
                }

            }
            else if(kind == 2){

                //首页 公会礼包列表
                findLastIndex = _.findLastIndex(state.data.gift_center.guild_gift.list,function(obj){ //查找遍历活动的数据
                    return data.gift_info.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找到就更新数据
                    state.data.gift_center.guild_gift.list.splice(findLastIndex,1,data.gift_info)
                    findLastIndex = -1
                }

                //搜索 公会礼包列表
                findLastIndex = _.findLastIndex(state.data.gift_center.search_list.guild_gift.list,function(obj){ //查找遍历活动的数据
                    return data.gift_info.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找到就更新数据
                    const guild_gift = state.data.gift_center.search_list.guild_gift.list[findLastIndex]
                    const item = _.extend(guild_gift, data.gift_info);
                    state.data.gift_center.search_list.guild_gift.list.splice(findLastIndex,1,item)
                    findLastIndex = -1
                }

                //game 公会礼包列表
                findLastIndex = _.findLastIndex(state.data.gift_center.gid_list.guild_gift.list,function(obj){ //查找遍历活动的数据
                    return data.gift_info.gift_id === obj.gift_id
                })
                if(findLastIndex !== -1){ //查找到就更新数据
                    state.data.gift_center.gid_list.guild_gift.list.splice(findLastIndex,1,data.gift_info)
                    findLastIndex = -1
                }
            }
            else{
                console.log('kind 参数错误')
            }
        }

    },


    //清空最后一次领取记录（obj参数的 kind 和 gift_id与最后一次领取记录不同时）
    [GUILD_CENTER_CLEAR_LAST_RECORD] (state, obj) {

        if(obj.gift_id != state.data.gift_center.fetch_info.gift_id || obj.kind != state.data.gift_center.fetch_info.kind ){
            state.data.gift_center.fetch_info.gift_id = 0           
            state.data.gift_center.fetch_info.kind = 1           
            state.data.gift_center.fetch_info.gift_list = []           

        }
    },

    //重置（清空）搜索结果
    [GUILD_CENTER_CLEAR_SEARCH_LIST] (state, obj) {

        state.data.gift_center.center_current.search.keywords = obj.keywords ? obj.keywords : ''
        state.data.gift_center.center_current.search.kind = 1

        state.data.gift_center.search_list.guild_gift.list = []
        state.data.gift_center.search_list.guild_gift.total = 0

        state.data.gift_center.search_list.tt_gift.list = []
        state.data.gift_center.search_list.tt_gift.total = 0

    },

    // [GUILD_CENTER_CHANGE_PAGE_NAME] (state, obj) {
    //     state.data.gift_center.center_current.page_name = obj.page_name ? obj.page_name : state.data.gift_center.center_current.page_name
    // },

    [GUILD_CENTER_UPDATE_GIFT_DETAIL] (state, data, obj) {

        if(obj.kind == 1){
            if(data.hasOwnProperty('gift_info')){
                state.data.gift_center.gift_detail.kind = 1
                state.data.gift_center.gift_detail.tt_gift_info.gift_id = data.gift_info.gift_id ? data.gift_info.gift_id : 0
                state.data.gift_center.gift_detail.tt_gift_info.gift_icon = data.gift_info.gift_icon ? data.gift_info.gift_icon : ''
                state.data.gift_center.gift_detail.tt_gift_info.gid = data.gift_info.gid ? data.gift_info.gid : 0
                state.data.gift_center.gift_detail.tt_gift_info.game_name = data.gift_info.game_name ? data.gift_info.game_name : ''
                state.data.gift_center.gift_detail.tt_gift_info.icon = data.gift_info.icon ? data.gift_info.icon : ''
                state.data.gift_center.gift_detail.tt_gift_info.type = data.gift_info.type ? data.gift_info.type : 0
                state.data.gift_center.gift_detail.tt_gift_info.gift_name = data.gift_info.gift_name ? data.gift_info.gift_name : ''
                state.data.gift_center.gift_detail.tt_gift_info.total = data.gift_info.total ? data.gift_info.total : 0
                state.data.gift_center.gift_detail.tt_gift_info.remained = data.gift_info.remained ? data.gift_info.remained : 0
                state.data.gift_center.gift_detail.tt_gift_info.price = data.gift_info.price ? data.gift_info.price : 0
                state.data.gift_center.gift_detail.tt_gift_info.tao = data.gift_info.tao ? data.gift_info.tao : 0
                state.data.gift_center.gift_detail.tt_gift_info.sa = data.gift_info.sa ? data.gift_info.sa : 0
                state.data.gift_center.gift_detail.tt_gift_info.start_time = data.gift_info.start_time ? data.gift_info.start_time : 0
                state.data.gift_center.gift_detail.tt_gift_info.end_time = data.gift_info.end_time ? data.gift_info.end_time : 0
                state.data.gift_center.gift_detail.tt_gift_info.desc = data.gift_info.desc ? data.gift_info.desc : ''
                state.data.gift_center.gift_detail.tt_gift_info.usage_method = data.gift_info.usage_method ? data.gift_info.usage_method : ''
                state.data.gift_center.gift_detail.tt_gift_info.package_name = data.gift_info.package_name ? data.gift_info.package_name : ''
                state.data.gift_center.gift_detail.tt_gift_info.exchange_type = data.gift_info.exchange_type ? data.gift_info.exchange_type : ''

            }
        }
        else if(obj.kind == 2){

            if(data.hasOwnProperty('gift_info')){
                state.data.gift_center.gift_detail.kind = 2
                state.data.gift_center.gift_detail.guild_gift_info.gift_id = data.gift_info.gift_id ? data.gift_info.gift_id : 0
                state.data.gift_center.gift_detail.guild_gift_info.guild_gift_id = data.gift_info.guild_gift_id ? data.gift_info.guild_gift_id : 0
                state.data.gift_center.gift_detail.guild_gift_info.gift_icon = data.gift_info.gift_icon ? data.gift_info.gift_icon : ''
                state.data.gift_center.gift_detail.guild_gift_info.gid = data.gift_info.gid ? data.gift_info.gid : 0
                state.data.gift_center.gift_detail.guild_gift_info.game_name = data.gift_info.game_name ? data.gift_info.game_name : ''
                state.data.gift_center.gift_detail.guild_gift_info.icon = data.gift_info.icon ? data.gift_info.icon : ''
                state.data.gift_center.gift_detail.guild_gift_info.type = data.gift_info.type ? data.gift_info.type : 0
                state.data.gift_center.gift_detail.guild_gift_info.gift_name = data.gift_info.gift_name ? data.gift_info.gift_name : ''
                state.data.gift_center.gift_detail.guild_gift_info.total = data.gift_info.total ? data.gift_info.total : 0
                state.data.gift_center.gift_detail.guild_gift_info.remained = data.gift_info.remained ? data.gift_info.remained : 0
                state.data.gift_center.gift_detail.guild_gift_info.price = data.gift_info.price ? data.gift_info.price : 0
                state.data.gift_center.gift_detail.guild_gift_info.have = data.gift_info.have ? data.gift_info.have : 0
                state.data.gift_center.gift_detail.guild_gift_info.start_time = data.gift_info.start_time ? data.gift_info.start_time : 0
                state.data.gift_center.gift_detail.guild_gift_info.end_time = data.gift_info.end_time ? data.gift_info.end_time : 0
                state.data.gift_center.gift_detail.guild_gift_info.desc = data.gift_info.desc ? data.gift_info.desc : ''
                state.data.gift_center.gift_detail.guild_gift_info.usage_method = data.gift_info.usage_method ? data.gift_info.usage_method : ''
                state.data.gift_center.gift_detail.guild_gift_info.package_name = data.gift_info.package_name ? data.gift_info.package_name : ''
                state.data.gift_center.gift_detail.guild_gift_info.exchange_type = data.gift_info.exchange_type ? data.gift_info.exchange_type : ''

            }

        }

    },

}
