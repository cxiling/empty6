import {

    GAME_ORDER_UPDATE_STATE

} from '../mutation-types'
// import { getShareData } from '../../api/js_api.js'

export const gameAreaMutations = {
    [GAME_ORDER_UPDATE_STATE] (state, data) {

        //获取客户端的uid等值
        const linkUrl  = 'http://app.52tt.com/project/guild/index.html'
        const colorList = ['#06d8b8','#0b4f6c','#1ed282','#1ec6f6','#ff6084','#ffbc00']
        
        //游戏截图
        if(data.hasOwnProperty('list') && data.list.length){

            $$.each(data.list, function(index, items){

                const game_order = {
                    profile:{
                        gid:items.gid,
                        icon:items.icon,
                        game_name:items.game_name,
                        description:items.description,
                        tag:[],
                        activity_url:items.activity_url,
                        status_order:items.status_order,
                        is_order:items.is_order,
                        order_times:items.order_times,
                    },
                    game:{
                        summary:{
                            screenshot:{
                                list:[],
                                total:0
                            },
                            video:{
                                list:[],
                                total:0
                            },
                            gift_list:{
                                list:[],
                                total:0
                            }
                        } 
                    }
                }
                //传入标签
                if(items.hasOwnProperty('tag')){
                    let colorListShuif =  _.shuffle(colorList); //乱序
                    let lengthShuif = colorListShuif.length
                    $$.each(items.tag, function(index, item){
                        item.color = index <= lengthShuif ? colorListShuif[index] : colorListShuif[index%lengthShuif]
                        const findLastIndex = _.findLastIndex(game_order.profile.tag,function(obj){ //查找遍历活动的数据
                            obj.id ? obj.id : obj.id = 0
                            return item.id === obj.id
                        })
                        if(findLastIndex !== -1 ){ //查找不到就更新数据
                            game_order.profile.tag.splice(findLastIndex,1,item)
                            //_.extend(game_order.profile.tag[findLastIndex], item);
                        }else{ //存在就添加数据
                            game_order.profile.tag.push(item)
                        }
                    })
                }

                //游戏截图
                if(items.hasOwnProperty('game_screenshot')){
                    if(items.game_screenshot.hasOwnProperty('list')){
                        $$.each(items.game_screenshot.list, function(index, item){
                            const findLastIndex = _.findLastIndex(game_order.game.summary.screenshot.list,function(obj){ //查找遍历活动的数据
                                obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                                return item.id === obj.id
                            })
                            if(findLastIndex !== -1 ){ //查找不到就更新数据
                                game_order.game.summary.screenshot.list.splice(findLastIndex,1,item)
                            }else{ //存在就添加数据
                                game_order.game.summary.screenshot.list.push(item)
                            }
                        })
                    }
                    if(items.game_screenshot.hasOwnProperty('total')){
                        game_order.game.summary.screenshot.total = items.game_screenshot.total
                    }
                }

                //游戏视频
                if(items.hasOwnProperty('game_video')){
                    if(items.game_video.hasOwnProperty('list')){
                        $$.each(items.game_video.list, function(index, item){
                            const findLastIndex = _.findLastIndex(game_order.game.summary.video.list,function(obj){ //查找遍历活动的数据
                                obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                                return item.id === obj.id
                            })
                            if(findLastIndex !== -1 ){ //查找不到就更新数据
                                game_order.game.summary.video.list.splice(findLastIndex,1,item)
                            }else{ //存在就添加数据
                                game_order.game.summary.video.list.push(item)
                            }
                        })
                    }
                    if(items.game_video.hasOwnProperty('total')){
                        game_order.game.summary.video.total = items.game_video.total
                    }
                }

                //游戏礼包
                if(items.hasOwnProperty('gift_list')){
                    if(items.gift_list){
                        $$.each(items.gift_list, function(index, item){
                            const findLastIndex = _.findLastIndex(game_order.game.summary.gift_list.list,function(obj){ //查找遍历活动的数据
                                obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                                return item.id === obj.id
                            })
                            if(findLastIndex !== -1 ){ //查找不到就更新数据
                                game_order.game.summary.gift_list.list.splice(findLastIndex,1,item)
                            }else{ //存在就添加数据
                                game_order.game.summary.gift_list.list.push(item)
                            }
                        })
                        game_order.game.summary.gift_list.total = items.gift_list.length
                    }
                }

                const findLastIndex =  _.findLastIndex(state.order.game_order.list,function(obj){
                    return obj.profile.gid === items.gid
                })

                if(findLastIndex !== -1){
                    state.order.game_order.list.splice(findLastIndex,1,game_order)
                }else{
                    state.order.game_order.list.push(game_order)
                }
            })

        }
        if(data.hasOwnProperty('total')){
            state.order.game_order.total = data.total
        }

    },
}
