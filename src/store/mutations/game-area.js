import {

    ZONE_GAME_GIFTS,GAME_AREA_SET_STATE, 
    GAME_AREA_UPDATE_STATE, 
    USER_PROFILE_UPDATE, 
    USER_PROFILE_LOCATION,
    GAME_AREA_UPDATE_CURRENT_STATE, 
    GAME_AREA_UPDATE_FOCUS_STATE, 
    GAME_AREA_UPDATE_DOWNLOAD_PROGRESS,
    ZONE_GAME_NOTICE,
    ZONE_GAME_SERVISE,
    GAME_AREA_CURRENT_INFO,
    GAME_AREA_CURRENT_LIST

} from '../mutation-types'
// import { getShareData } from '../../api/js_api.js'

export const gameAreaMutations = {
    [GAME_AREA_SET_STATE] (state, data) {
        //更新当前游戏id
        state.zone.status.current_game.gid = data.gid
        state.zone.game = data.game
    },
    [GAME_AREA_UPDATE_STATE] (state, data) {

        //获取客户端的uid等值
        const linkUrl  = 'http://app.52tt.com/project/recharge_lotto/index.html'
        const colorList = ['#06d8b8','#0b4f6c','#1ed282','#1ec6f6','#ff6084','#ffbc00']

        if(!data.hasOwnProperty('game_profile')){
            return false
        }

        //更新当前游戏id
        state.zone.status.current_game.gid = data.game_profile.gid
        //更新当前圈子id
        state.zone.status.current_game.cid = data.game_profile.cid

        //对象
        const game_zone = {
            gid: data.game_profile.gid, //游戏id
            time_now:data.time_now?data.time_now:state.zone.game.profile.time_now, //服务器时间
            profile : { //游戏下载状态简述
                guild_id:data.game_profile.guild_id?data.game_profile.guild_id:state.zone.game.profile.guild_id,
                id:data.game_profile.id?data.game_profile.id:state.zone.game.profile.id,
                name: data.game_profile.name?data.game_profile.name:state.zone.game.profile.name,
                icon: data.game_profile.icon_url?data.game_profile.icon_url:state.zone.game.profile.icon_url,
                status: data.game_profile.status_str?data.game_profile.status_str:state.zone.game.profile.status_str,
                focus: data.game_profile.focus_total? data.game_profile.focus_total : state.zone.game.profile.focus_total,
                download_total: data.game_profile.download_times?data.game_profile.download_times:state.zone.game.profile.download_times, //安装次数总计
                topic_total:data.game_profile.topic_total?data.game_profile.topic_total:state.zone.game.profile.topic_total
            },
            status:{ //游戏下载安装状态
                gid: data.game_profile.gid?data.game_profile.gid:state.zone.game.status.gid,
                cid:data.game_profile.cid?data.game_profile.cid:state.zone.game.status.cid,
                follow: data.game_profile.is_follow?data.game_profile.is_follow:state.zone.game.status.is_follow, //当前用户是否关注
                is_order:data.game_profile.is_order?data.game_profile.is_order:state.zone.game.status.is_order,
                status_order:data.game_profile.status_order?data.game_profile.status_order:state.zone.game.status.status_order,
                order_times:data.game_profile.order_times?data.game_profile.order_times:state.zone.game.status.order_times,
                activity_url:data.game_profile.activity_url ? data.game_profile.activity_url : state.zone.game.status.activity_url,
                installed: false,
                downloading: false,
                downloaded : false,
                repeat_download: false,
                packageUrl:data.game_profile.download_url?data.game_profile.download_url:state.zone.game.status.download_url,
                download_progress: 0,
                focus: data.game_profile.focus_total?data.game_profile.focus_total:state.zone.game.status.focus_total,
                download_total: data.game_profile.download_times?data.game_profile.download_times:state.zone.game.status.download_times, //安装次数总计
                package_size:data.game_profile.package_size > 0 ?(data.game_profile.package_size/(1024*1024)).toFixed(2)+'M':0+'M' //安装包大小
            },
            circle: { //游戏圈
                cid: data.game_profile.cid?data.game_profile.cid:state.zone.game.circle.cid,
                total: data.game_profile.topic_total?data.game_profile.topic_total:state.zone.game.circle.topic_total,
                uri: data.game_profile.circle_uri?data.game_profile.circle_uri:state.zone.game.circle.circle_uri,
                circle_master:data.game_profile.circle_master?data.game_profile.circle_master:state.zone.game.circle.circle_master
            },
            official_discussion_group:{
                total:0,
                url:''
            },
            summary: { //游戏简介
                description: data.game_profile.description?data.game_profile.description:state.zone.game.summary.description,
                screenshot:{
                    list:[],
                    total: data.game_screenshot.total?data.game_screenshot.total:state.zone.game.summary.total
                },
                video:{
                    list: [],
                    total:data.game_video.total?data.game_video.total:state.zone.game.summary.total
                },
                tag:{
                    list:[]
                }
            },
            game_activity: { //活动列表
                list:[]
            },
            game_open_service : {
                list:[] //游戏开服
            },
            game_notice:{ //公告信息开服
               list:[]
            },
            game_hotguild_list:{
                list:[]
            },
            game_first_charge:{  //游戏首充
            },
            lotto_profile:{ //充值抽奖
            },
            giftpkg_profile:{ //礼包充值 
            },
            game_other_list:{
                list:[]
            }
        }

        if(data.game_profile.hasOwnProperty('is_follow')){
            game_zone.status.follow = data.game_profile.is_follow?data.game_profile.is_follow:state.zone.game.status.is_follow, //当前用户是否关注
            myWebview.setGameCircle(game_zone.status.follow ? true : false)
        }

         //T群
        if(data.game_profile.hasOwnProperty('discussion_group')){
            game_zone.official_discussion_group.total = data.game_profile.discussion_group.total_person
            game_zone.official_discussion_group.uri = data.game_profile.discussion_group.url
        }

        //首充号
        if(data.hasOwnProperty('game_first_charge')){
            game_zone.game_first_charge.time_end = data.game_first_charge.time_end?data.game_first_charge.time_end:state.zone.game.game_first_charge.time_end
            game_zone.game_first_charge.product_id = data.game_first_charge.product_id?data.game_first_charge.product_id:state.zone.game.game_first_charge.product_id
            game_zone.game_first_charge.diamond = data.game_first_charge.diamond?data.game_first_charge.diamond:state.zone.game.game_first_charge.diamond
            game_zone.game_first_charge.charge = data.game_first_charge.charge?data.game_first_charge.charge:state.zone.game.game_first_charge.charge
            game_zone.game_first_charge.url = linkUrl+'?game_id='+state.data.user.gid+'user_id='+state.data.user.uid
        }

        //抽奖号
        if(data.hasOwnProperty('lotto_profile')){
            game_zone.lotto_profile.time = data.lotto_profile.time?data.lotto_profile.time:state.zone.game.lotto_profile.time
            game_zone.lotto_profile.charge = data.lotto_profile.charge?data.lotto_profile.charge:state.zone.game.lotto_profile.charge
            game_zone.lotto_profile.url = linkUrl+'?game_id='+state.data.user.gid+'user_id='+state.data.user.uid
        }

        //礼包充值
        if(data.hasOwnProperty('giftpkg_profile')){
            game_zone.giftpkg_profile.title = data.giftpkg_profile.title?data.giftpkg_profile.title:state.zone.game.giftpkg_profile.title
            game_zone.giftpkg_profile.desc = data.giftpkg_profile.desc?data.giftpkg_profile.desc:state.zone.game.giftpkg_profile.desc
            game_zone.giftpkg_profile.pic_url = data.giftpkg_profile.pic_url?data.giftpkg_profile.pic_url:state.zone.game.giftpkg_profile.pic_url
            game_zone.giftpkg_profile.has_fetched = data.giftpkg_profile.has_fetched?data.giftpkg_profile.has_fetched:state.zone.game.giftpkg_profile.has_fetched
            game_zone.giftpkg_profile.url = linkUrl+'?game_id='+state.data.user.gid+'user_id='+state.data.user.uid
        }

        //游戏截图
        if(data.hasOwnProperty('game_screenshot')){

            if(data.game_screenshot.list.length){

                $$.each(data.game_screenshot.list, function(index, item){

                    const findLastIndex = _.findLastIndex(game_zone.summary.screenshot.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1){ //查找不到就更新数据
                        game_zone.summary.screenshot.list.splice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        game_zone.summary.screenshot.list.push(item)
                    }

                })
            }
        }

        //游戏视频
        if(data.hasOwnProperty('game_video')){

            if(data.game_video.list.length){
                $$.each(data.game_video.list, function(index, item){
                    const findLastIndex = _.findLastIndex(game_zone.summary.video.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0 
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1){ //查找不到就更新数据
                        game_zone.summary.video.list.splice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        game_zone.summary.video.list.push(item)
                    }

                })
            }
        }

        //游戏活动
        if(data.hasOwnProperty('game_activity')){

            if(data.game_activity.length){

                $$.each(data.game_activity, function(index, item){

                    const findLastIndex = _.findLastIndex(game_zone.game_activity.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1 ){ //查找不到就更新数据
                        game_zone.game_activity.list.splice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        game_zone.game_activity.list.push(item)
                    }

                })
            }
        }

         //游戏公告
        if(data.hasOwnProperty('game_notice')){
            if(data.game_notice.length){
                $$.each(data.game_notice, function(index, item){
                    const findLastIndex = _.findLastIndex(game_zone.game_notice.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1 ){ //查找不到就更新数据
                        game_zone.game_notice.list.splice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        game_zone.game_notice.list.push(item)
                    }
                })
            }
        }

         //传入标签
        if(data.hasOwnProperty('game_open_service')){
             $$.each(data.game_open_service, function(index, item){
                const findLastIndex = _.findLastIndex(game_zone.game_open_service.list,function(obj){ //查找遍历活动的数据
                    obj.id ? obj.id : obj.id = 0
                    return item.id === obj.id
                })
                if(findLastIndex !== -1 ){ //查找不到就更新数据
                    game_zone.game_open_service.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    game_zone.game_open_service.list.push(item)
                }

            })
        }

        //传入标签
        if(data.game_profile.hasOwnProperty('tag')){
            let colorListShuif =  _.shuffle(colorList); //乱序
            let lengthShuif = colorListShuif.length
            $$.each(data.game_profile.tag, function(index, item){
                item.color = index <= lengthShuif ? colorListShuif[index] : colorListShuif[index%lengthShuif]
                const findLastIndex = _.findLastIndex(game_zone.summary.tag.list,function(obj){ //查找遍历活动的数据
                     obj.id ? obj.id : obj.id = 0
                    return item.id === obj.id
                })
                if(findLastIndex !== -1 ){ //查找不到就更新数据
                    game_zone.summary.tag.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    game_zone.summary.tag.list.push(item)
                }
            })
        }

         //其他游戏活动
        if(data.hasOwnProperty('game_other_list')){

            if(data.game_other_list.length){

                $$.each(data.game_other_list, function(index, item){
                    const findLastIndex = _.findLastIndex(game_zone.game_other_list.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1 ){ //查找不到就更新数据
                        game_zone.game_other_list.list.slice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        game_zone.game_other_list.list.push(item)
                    }

                })
            }
        }

         //游戏活动
        if(data.hasOwnProperty('game_hotguild_list')){

            if(data.game_hotguild_list.length){

                $$.each(data.game_hotguild_list, function(index, item){
                    item.icon_url = 'http://app.52tt.com/api/face?account='+item.id+'@guild'
                    const findLastIndex = _.findLastIndex(game_zone.game_hotguild_list.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1 ){ //查找不到就更新数据
                        game_zone.game_hotguild_list.list.slice(findLastIndex,1,item)
                    }else{ //存在就添加数据
                        game_zone.game_hotguild_list.list.push(item)
                    }
                    

                })
            }
        }

        //下载按钮状态值
        //预设状态
        let game_id = game_zone.gid;
        const isGameInstalled =  myWebview.checkGameInstalled(game_id);
        const isGameDownloading = myWebview.checkGameDownloading(game_id);
        const isGameDownloaded = myWebview.checkGameDownloaded(game_id); //游戏已下载
        const isGameDownloadRepeat = myWebview.checkGameDownloadRepeat(game_id);
        //更新状态
        game_zone.status.installed = isGameInstalled
        game_zone.status.downloading = isGameDownloading
        game_zone.status.downloaded = isGameDownloaded
        game_zone.status.repeat_download = isGameDownloadRepeat
        //下载进度
        const gameProgress = myWebview.checkGameDownloadProgress(game_id)
        game_zone.status.download_progress = parseInt(gameProgress).toFixed(1)
        

        //专区数据是否在store内,有则替换,无则添加
        let isInStore = false //标志位
        
        //赋值
        state.zone.game = _.extend(state.zone.game,game_zone);
        state.zone.game = state.zone.game
        state.zone.gid = state.zone.game.gid

        //传入游戏专区列表
        const item = {
            gid :game_zone.gid,
            game:game_zone
        }
       
        const findLastIndex = _.findLastIndex(state.zone_list,function(obj){
            return game_id == obj.gid
        })

        if(findLastIndex !== -1){
            state.zone_list.splice(findLastIndex,1,item)
        }else{
            //直接合并游戏专区的数据
            state.zone_list.push(item)
        }

    },
    //更新游戏状态
    [GAME_AREA_UPDATE_CURRENT_STATE] (state, data) {

        const game_id = state.zone.status.current_game.gid.toString()
        //预设状态
        const isGameInstalled =  myWebview.checkGameInstalled(game_id);
        const isGameDownloading = myWebview.checkGameDownloading(game_id);
        const isGameDownloaded = myWebview.checkGameDownloaded(game_id); //游戏已下载
        const isGameDownloadRepeat = myWebview.checkGameDownloadRepeat(game_id);

        //更新状态
        state.zone.game.status.installed = isGameInstalled
        state.zone.game.status.downloading = isGameDownloading
        state.zone.game.status.downloaded = isGameDownloaded
        state.zone.game.status.repeat_download = isGameDownloadRepeat
        //下载进度
        const gameProgress = myWebview.checkGameDownloadProgress(game_id)
        state.zone.game.status.download_progress = parseInt(gameProgress).toFixed(1)
        //更新游戏专区列表对应专区数据
        const findLastIndex = _.findLastIndex(state.zone_list,function(obj){
            return game_id == obj.gid
        })
        const status = {
            game:state.zone.game
        }
        if(findLastIndex !== -1){
            const item = _.extend(state.zone_list[findLastIndex], status);
            state.zone_list.splice(findLastIndex,1,item)
        }
    },

    //更新user
    [USER_PROFILE_UPDATE] (state, data) {
        state.data.user = data
    },

    //本地user
    // [USER_PROFILE_LOCATION] (state , data){

    //     //shareData为内存共享数据，结构:
    //     //从内存共享数据中提取 GameZone 独有数据 (没有uid)
    //     /*
    //     shareData = {
    //         data:[
    //             {
    //                 uri:'http://app.52tt.com/project/game_zone/index.html',
    //                 gid:'12345',
    //             }
    //         ],
    //         DeviceInfo:{
    //             deviceId:'8648512455',
    //             osType:'Android',
    //             osVersion:34013185,
    //         },
    //         UserInfo:{
    //             head:'',//用户头像
    //             uid:0,
    //             account:'tt10000123',
    //             nickName:'zhangyuge',
    //         },
    //     }
    //     */
    //     let shareData = getShareData();
    //     let partialData = _.find(shareData.data, function(item){ // return item.uri == 'http://app.52tt.com/project/game_zone/index.html';
    //     let re = /game_area\/index\.html|game_zone\/index\.html/;
    //     let uri =  item.uri ? '' + item.uri : '';
    //         return re.test(uri); 
    //     })

    //     //data中拿gid， UserInfo中拿 uid
    //     state.data.user.gid = (partialData && partialData.hasOwnProperty('gid')) 
    //                         ? partialData.gid : $$.parseUrlQuery(window.location.href).gid;
    //     state.data.user.uid = ( shareData && shareData.hasOwnProperty('UserInfo') &&shareData.UserInfo.hasOwnProperty('uid')) 
    //                         ?shareData.UserInfo.uid : $$.parseUrlQuery(window.location.href).uid;
    //     state.data.user.gid = state.data.user.gid ? state.data.user.gid :237539 //活动gid 237539 测试内部使用
    //     state.data.user.uid = state.data.user.uid ? state.data.user.uid : 2165700 //活动uid 2165700 测试内部使用

    //     // if (myWebview.isInAppFunc()){
    //     //     myWebview.showToast('内存数据:' + JSON.stringify(shareData));
    //     //     setTimeout(()=>{
    //     //         myWebview.showToast('state.data.user数据:' + JSON.stringify(state.data.user));
    //     //     }, 3500)
    //     // }else{
    //     //     myWebview.showToast('myWebview.isInAppFunc()无效');
    //     // }
    // },

    //更新下载进度
    [GAME_AREA_UPDATE_DOWNLOAD_PROGRESS](state, data) {
        state.zone.game.status.download_progress = data
        //更新游戏专区列表对应专区数据
        const game_id = state.zone.game.gid
        const status = {
            game:state.zone.game
        }
        const findLastIndex = _.findLastIndex(state.zone_list,function(obj){
            return game_id == obj.gid
        })
        if(findLastIndex !== -1){
            const item = _.extend(status,state.zone_list[findLastIndex]);
            state.zone_list.splice(findLastIndex,1,item)
        }
    },

    //更新关注
    [GAME_AREA_UPDATE_FOCUS_STATE] (state, data) {
        state.zone.game.status.follow = data
        state.zone.game.status.focus += 1
        myWebview.setGameCircle(state.zone.game.status.follow ? true : false)
        //更新游戏专区列表对应专区数据
        const game_id = state.zone.game.gid
        const status = {
            game:state.zone.game
        }
        const findLastIndex = _.findLastIndex(state.zone_list,function(obj){
            return game_id == obj.gid
        })
        if(findLastIndex !== -1){
            const item = _.extend(status,state.zone_list[findLastIndex]);
            state.zone_list.splice(findLastIndex,1,item)
        }
    },

    [ZONE_GAME_GIFTS] (state,data){
        state.zone.game.giftpkg_profile.has_fetched = 1;
        //更新游戏专区列表对应专区数据
        const game_id = state.zone.game.gid
        const status = {
            game:state.zone.game
        }
        const findLastIndex = _.findLastIndex(state.zone_list,function(obj){
            return game_id == obj.gid
        })
        if(findLastIndex !== -1){
            const item = _.extend(status,state.zone_list[findLastIndex]);
            state.zone_list.splice(findLastIndex,1,item)
        }
    },

    [GAME_AREA_CURRENT_INFO](state,data){
        if(data.hasOwnProperty('gid') && data){
            state.data.user.gid = data.gid
            state.zone.status.current_game.gid = data.gid
        }
    }

}
