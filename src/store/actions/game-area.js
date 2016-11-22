import * as types from '../mutation-types.js'
import guild_store from '../dispatch/guild-shop'
import { currentGuserInfo } from '../actions/guild-shop'
import { delayBounceAction , delayTroateAction } from '../../api/reference.js'
//import store from './index'

export const setAreaData = ({ dispatch, state } , callback , Indicator , rerflash ) => {
    //初始化本地user表
    //dispatch(types.USER_PROFILE_LOCATION)
    // dispatch(types.GAME_AREA_CURRENT_LIST)
    //参数初始化,从共享内存中拿，拿不到再从链接参数拿
    const current_gid = state.data.user.gid;  
    const current_uid = state.data.user.uid;
    const obj = {
        uid: current_uid, gid: current_gid, scnt: 30, vcnt: 30
    }
    const limit = delayTroateAction(1,obj)
    //发起请求
    let requestApiZone = function(){
        myApp.requestApi(state.zone.request.zone_index, obj, function(data){
            dispatch(types.GAME_AREA_UPDATE_STATE, data.data)
            if(callback) callback()
            //分享当前页
            myApp.shareDataArea = function(){ 
                // setTimeout(function(){
                    
                    let shareData = {
                        title : '我正在玩' + data.data.game_profile.name + '，一起来玩！',
                        content: state.data.user.name + ' 给你推荐了一款游戏，有兴趣一起玩吗?',
                        url: 'http://app.52tt.com/gray/guild/index.html?pageName=index-game-area-page&gid=' + data.data.game_profile.gid,
                        imageUrl: data.data.game_profile.icon_url
                    }
                    myWebview.appShareAction(JSON.stringify(shareData))

                // },500)
            }
        },Indicator)
    }

    if(limit || rerflash){
        requestApiZone();
    }else{
       if(callback) callback()
    }



}


export const setUserProfile = ({ dispatch }) => {

    // const isInApp = myWebview.isInAppFunc();
    // let userProfile = {}

    // if(isInApp){
    //     const uid = function() {
    //         try {
    //             return myWebview.getAppData("getMyUid");
    //         } catch (e) {
    //             webErrorReport('apiError', 'uid获取失败 - ' + e.name + ": " + e.message);
    //         }
    //     }
    //     const account = function() {
    //         try {
    //             return myWebview.getAppData("getMyAccount");
    //         } catch (e) {
    //             webErrorReport('apiError', 'uAccount获取失败 - ' + e.name + ": " + e.message);
    //         }
    //     }
    //     const name = function(){
    //         try{
    //             return myWebview.getAppData("getMyNickname");
    //         }catch(e){
    //             webErrorReport('apiError', 'uName获取失败 - ' + e.name + ": " + e.message);
    //         }
    //     }
    //     const level = function(){
    //         try{
    //             return myWebview.getAppData("getMyLevel");
    //         }catch(e){
    //             webErrorReport('apiError', 'uLevel获取失败 - ' + e.name + ": " + e.message);
    //         }
    //     }
    //     const diamond = function(){
    //         try{
    //             return myWebview.getAppData("getMyRedDiamond");
    //         }catch(e){
    //             webErrorReport('apiError', 'uDiamond获取失败 - ' + e.name + ": " + e.message);
    //         }
    //     }
    //     const head = function(){
    //         try{
    //             return myWebview.getAppData("getMyPortrait");
    //         }catch(e){
    //             webErrorReport('apiError', 'uHead获取失败 - ' + e.name + ": " + e.message);
    //         }
    //     }
    //     userProfile.uid = uid()
    //     userProfile.account = account()
    //     userProfile.name = name()
    //     userProfile.level = level()
    //     userProfile.diamond = diamond()
    //     dispatch(types.USER_PROFILE_UPDATE, userProfile)

    // }
    //从js-api更新user profile
    currentGuserInfo(guild_store)
}

//更新用户红钻数量
export const updateUserDiamond = ({ dispatch, state }) => {

    //查找当前游戏
    // const currentGame = _.find(state.zone.game, function(items){
    //     return items.gid == state.zone.status.current_game.gid
    // })
    let currentGame = state.zone.game
    let user = state.data.user
    let item = currentGame.game_first_charge
    let requestUri = state.zone.request.purchase_first_charge
    let tGroup = currentGame.official_discussion_group.total 
    let obj = {uid: user.uid, product_id:item.product_id}

    //发起兑换请求
    let requestApiNew = function(){
        myApp.requestApi(requestUri, obj , function(data){
            //兑换成功提示
            myApp.modal({
                title: '兑换成功',
                text: '你可到[我]-[我的宝箱]里查看',
                buttons:[
                    {
                        text: '立即查看',
                        color: 'gray',
                        onClick: function(){
                            myWebview.appNav('tt://navigation/giftpackage') //打开宝箱
                        }
                    },
                    {
                        text: '暂不查看',
                        color: 'green',
                        close:true
                    }
                ]
            })
        })
    }
    requestApiNew()
}

//更新关注状态(发起请求)
export const setUserFollowState = ({ dispatch, state }) => {
    // const gameIndex = _.findLastIndex(state.zone.game, {
    //     'gid': state.zone.status.current_game.gid
    // });
    const requstApi = state.zone.game.status.follow
    if(!requstApi){
        myApp.requestApi(state.zone.request.circle_focus, {uid: state.data.user.uid, cid: state.zone.status.current_game.cid}, function(data){
            dispatch(types.GAME_AREA_UPDATE_FOCUS_STATE, true) //已关注
            myWebview.showToast('关注成功')
            myWebview.updateUserGameFollow(state.zone.status.current_game.gid,state.zone.status.current_game.cid)
        },true)
    }else{
        myWebview.showToast('已关注成功')
    }
   
}

//更新关注状态(下载自动更新)
export const setUserFollowStateOnly = ({ dispatch, state }) => {
    dispatch(types.GAME_AREA_UPDATE_FOCUS_STATE, true) //已关注
}

//更新当前游戏状态
export const updateCurrentGameState = ({ dispatch, state }) => {

    const inApp = myWebview.isInAppFunc()
    if(inApp){
        dispatch(types.GAME_AREA_UPDATE_CURRENT_STATE)
    }
}

//更新当前游戏下载进度
export const updateCurrentGameDownloadProgress = ({ dispatch, state }, data ) => {
    dispatch(types.GAME_AREA_UPDATE_DOWNLOAD_PROGRESS, data)
}

//领取礼包接口
export const fetchGameGifts = ({ dispatch, state }) => {
    console.log('uid:',state.data.user.uid,'gid',state.zone.status.current_game.gid);
    myApp.requestApi(state.zone.request.fetch_game_gifts, {uid: state.data.user.uid, gid: state.zone.status.current_game.gid}, function(data){
        dispatch(types.ZONE_GAME_GIFTS,data) //领取
        myApp.modal({
                        title: "领取成功",
                        text:"兑换码已保存至“我的宝箱”中,请尽快使用。",
                        buttons: [
                            {
                                text: '关闭',
                                close: true
                            },
                            {
                                text: '打开游戏',
                                onClick: function (){
                                    //已下载游戏：打开   未下载：下载游戏
                                    let gameId = state.zone.status.current_game.gid;
                                    let isInstall = TTJSBridge.invoke("gamearea", "isGameInstall", gameId);
                                    console.log(isInstall);

                                    if(isInstall == true){
                                        TTJSBridge.invoke("gamearea", "startGameById", gameId);
                                    }else{
                                        setTimeout(function(){
                                            $$('#down-game').trigger('click');
                                        },500)
                                    }
                                }
                            }
                        ]
                    });
        // myWebview.showToast('领取成功')
        // myWebview.updateUserGameFollow(state.zone.status.current_game.gid,state.zone.status.current_game.cid)
    })
}
//跳转游戏专区
export const linkGameArea = ({ dispatch, state }, data , callback ) => {
    dispatch(types.GAME_AREA_CURRENT_INFO,data)
    if(callback) callback()
}