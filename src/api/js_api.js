// import { isArray, exapStr } from './computed.js'
import { exapStr } from './computed.js'

// webViewApi.prototype.getGameZoneData =  function(methods){
export const getShareData =  function(){
    // shareData为内存共享数据，结构:
    // shareData = {
    //     data:[
    //         //游戏专区
    //         {
    //             uri:'http://app.52tt.com/project/game_zone/index.html',
    //             gid:'12345',
    //         },
    //         //公会体系
    //         {
    //             uri:'http://app.52tt.com/gray/guild/index.html',
    //             /*                 
    //             page 默认跳转公会星级页面
    //             page 商店中心入口  pageName=index-store-page
    //             page 商店礼包详情  pageName=index-store-detail-page
    //             page 礼包中心页面  pageName=index-gift-center-page
    //             page 公会星级页面  pageName=index-guild-level-page
    //             page 礼包中心礼包详情页面  pageName=index-gift-detail-page
    //             */
    //             pageName:'',//跳转入口页面
    //             gid:'12345',
    //             gift_id:0, //商品详情id
    //             kind:0,//礼包类型（0 非礼包中心礼包，1 礼包中心 TT礼包，2 礼包中心 公会礼包）
    //             //星级图标数组
    //             guildStarIcons:[
    //                 {
    //                     level:0,
    //                     icon:'',
    //                 }
    //             ],
    //         },
    //     ],
    //     DeviceInfo:{
    //         deviceId:'8648512455',
    //         osType:'Android',
    //         osVersion:34013185,
    //     },
    //     UserInfo:{
    //         head:'',//用户头像
    //         uid:0,
    //         account:'tt10000123',
    //         nickName:'zhangyuge',
    //         //公会体系用户数据
    //         guild_system:{
    //             contribution: 1000, //历史贡献值
    //             consume: 100, //可消费贡献值
    //             diamond: 1000, //红钻
    //             guild_id:0,//公会id
    //             guild_title: '公会之花',//会员称号
    //             member_level: 0, //公会会员贡献等级
    //             guild_level:0,//公会等级
    //             guild_identity: '会长',//职位
    //             guild_consume:0,//公会可用贡献            
    //         }
    //     },
    // }
    
    let shareData = {};
    let data
    let dataStr

    if (myWebview.isInAppFunc()){
        try{
        	data = TTJSBridge.invoke("shareData", "getShareData");
            dataStr = typeof data === 'string' ? data : JSON.stringify(data)
            shareData  =  JSON.parse(exapStr(dataStr))//转义字符转换
            // shareData = shareData.data; //返回客户端返回的data数组
        	// myWebview.showToast(JSON.stringify(shareData));   	    
        }catch(e){}

    } else {
        // myApp.alert(JSON.stringify(data));
    }
    return shareData;
}
