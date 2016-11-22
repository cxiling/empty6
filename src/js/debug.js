import Vue from 'vue';
import Vuex from 'vuex';

/* commpents */
import index_common_rules_page from "../components/index-common-rules-page.vue"; //公共规则页面

import index_gift_active_page from "../components/index-gift-active-page.vue"; //礼包活动页面
import index_gift_center_page from "../components/index-gift-center-page.vue"; //礼包中心页面 
// import index_gift_activation_page from "../components/index-gift-activation-page.vue"; //礼包校验申请激活码密码页面 
import index_gift_tt_page from "../components/index-gift-tt-page.vue"; //tt礼包页面
import index_gift_detail_page from "../components/index-gift-detail-page.vue" ; //礼包详情页
import index_gift_apply_page from "../components/index-gift-apply-page.vue" ; //公会礼包申请
import index_gift_search_page from "../components/index-gift-search-page.vue" ; //礼包搜索页
import index_gift_game_page from "../components/index-gift-game-page.vue" ; //根据游戏找礼包

import index_guild_devote_page from "../components/index-guild-devote-page.vue"; //公会贡献加成名单列表页面
import index_guild_level_page from "../components/index-guild-level-page.vue"; //公会星级页面
import index_gift_guild_page from "../components/index-gift-guild-page.vue" ; //礼包公会

import index_store_page from "../components/index-store-page.vue"; //公会商店页面
import index_store_detail_page from "../components/index-store-detail-page.vue"; //公会商店商品详情页面
import index_store_search_page from "../components/index-store-search-page.vue"; //公会商店商品搜索页面
import index_store_list_page from "../components/index-store-list-page.vue"; //公会商店列表

import detail_game_button from "../components/common-commponents/detail-game-button.vue" //公共组件 下载游戏
import search_page  from "../components/common-commponents/search-page.vue"; //公告组件 搜索框

import networkError from '../components/network_error_page.vue' //错误页
import debugApi  from "../components/debug-api.vue" //网络错误页

Vue.use(Vuex);
Vue.config.devtools = true;
Vue.config.silent = false;

import gift_store from '../store/dispatch/gift-center';
import { getShareData } from '../api/js_api.js'
import { formatParmters , filterCenterType ,filterCenterKind , showToast } from '../api/computed.js'
import '../api/filters.js'; //公共函数库
import '../api/util.js'; //公共函数库

import guild_store from '../store/dispatch/guild-shop';
import { currentGuserInfo } from '../store/actions/guild-shop';

/*
    监听页面初始化事件
*/
$$(document).on('pageInit', function (e) {

    const page = e.detail.page;
    console.log(page.name);

    //规则页面
    if (page.name === 'index-common-rules-page') {
        //$$('title').text('规则页面');
        const commonRulesPage = new Vue(index_common_rules_page)
        commonRulesPage.$mount('#index-common-rules-page .page-content')
    }

     //全部活动页面
    if (page.name === 'index-gift-active-page') {
        $$('title').text('全部活动');
        const giftActivePage = new Vue(index_gift_active_page)
        giftActivePage.$mount('#index-gift-active-page .page-content')
    }

     //礼包中心
    if (page.name === 'index-gift-center-page') {
        $$('title').text('礼包中心');
        const giftCenterPage = new Vue(index_gift_center_page)
        giftCenterPage.$mount('#index-gift-center-page .page-content')
    }

     //礼包搜索页
    if (page.name === 'index-gift-search-page') {
        $$('title').text('礼包中心');
        const giftSearchPage = new Vue(index_gift_search_page)
        giftSearchPage.$mount('#index-gift-search-page .page-content')
    }

     //根据游戏找礼包
    if (page.name === 'index-gift-game-page') {
        $$('title').text('礼包中心');
        const giftGamePage = new Vue(index_gift_game_page)
        giftGamePage.$mount('#index-gift-game-page .page-content')
    }
     //礼包列表页面
    if (page.name === 'index-gift-tt-page') {

        const gift_list =  gift_store.state.data.gift_center.center_current.gift_list //kind:1, type:0,
        const kind = gift_list.kind //礼包来源：1 TT礼包， 2 公会礼包
        const type = gift_list.type //礼包类型: 1为激活码，2为游戏礼包
        $$('title').text(filterCenterKind(kind) + filterCenterType(type));

        const giftTtPage = new Vue(index_gift_tt_page)
        giftTtPage.$mount('#index-gift-tt-page .page-content')
    }

     //礼包激活验证码
    // if (page.name === 'index-gift-activation-page') {
    //     $$('title').text('礼包激活验证码');
    //     const giftActivationPage = new Vue(index_gift_activation_page)
    //     giftActivationPage.$mount('#index-gift-activation-page .page-content')
    // }

      //礼包详情页
    if (page.name === 'index-gift-detail-page') {
        $$('title').text('礼包详情页');
        const giftDetailPage = new Vue(index_gift_detail_page)
        giftDetailPage.$mount('#index-gift-detail-page .page-content')
    }

      //礼包详情页
    if (page.name === 'index-gift-guild-page') {
        $$('title').text('拥有该礼包的公会');
        const giftGuildPage = new Vue(index_gift_guild_page)
        giftGuildPage.$mount('#index-gift-guild-page .page-content')
    }

      //公会礼包申请
    if (page.name === 'index-gift-apply-page') {
        $$('title').text('申请公会礼包');
        const giftGuildPage = new Vue(index_gift_apply_page)
        giftGuildPage.$mount('#index-gift-apply-page .page-content')
    }

     //公会贡献加成名单列表页面
    if (page.name === 'index-guild-devote-page') {
        $$('title').text('公会贡献加成');
        const guildDevotePage = new Vue(index_guild_devote_page)
        guildDevotePage.$mount('#index-guild-devote-page .page-content')
    }
     //公会星级页面
    if (page.name === 'index-guild-level-page') {
        $$('title').text('公会星级加成');
        const guildLevelPage = new Vue(index_guild_level_page)
        guildLevelPage.$mount('#index-guild-level-page .page-content')
    }

     //商店页面
    if (page.name === 'index-store-page') {
        $$('title').text('公会商店');
        const indexStorePage = new Vue(index_store_page)
        indexStorePage.$mount('#index-store-page .page-content')
    }
     //商品详情
    if (page.name === 'index-store-detail-page') {
        const storeDetailPage = new Vue(index_store_detail_page)
        storeDetailPage.$mount('#index-store-detail-page .page-content')
    }
     //立即搜索
    if (page.name === 'index-store-search-page') {

        $$('title').text('立即搜索');
        const storeSearchPage = new Vue(index_store_search_page)
        storeSearchPage.$mount('#index-store-search-page .page-content')
        
    }

    //index_store_list_page
    if(page.name === 'index-store-list-page'){
        const game_name =  guild_store.state.data.current.game_name //obj
        $$('title').text(game_name+'更多礼包');
        const indexStoreListPage = new Vue(index_store_list_page)
        indexStoreListPage.$mount('#index-store-list-page .page-content')

    }

    //错误页面
    if (page.name === 'network-error'){
        const errorPage = new Vue(networkError)
        errorPage.$mount('#network-error .page-content')
    }

     //网络错误页
    if (page.name === 'debug-api'){
        let debugApi_vue = new Vue(debugApi);
        debugApi_vue.$mount('#debug-api .page-content');
    }

})

$$(document).on('pageBeforeAnimation', function (e) {
    const page = e.detail.page;
    if (page.name === 'index-common-rules-page') {
         //$$('title').text('规则页面');
    }
      //全部活动页面
    if (page.name === 'index-gift-active-page') {
        $$('title').text('全部活动');
    }
    
     //礼包中心
    if (page.name === 'index-gift-center-page') {
        $$('title').text('礼包中心');
    }
    
     //礼包搜索页
    if (page.name === 'index-gift-search-page') {
        $$('title').text('搜索礼包');
    }
    
     //根据游戏找礼包
    if (page.name === 'index-gift-game-page') {
        const gift_list =  gift_store.state.data.gift_center.center_current.game
        const name = gift_list.game_name //游戏名
        $$('title').text(name+'礼包');
    }
     //礼包列表页面
    if (page.name === 'index-gift-tt-page') {
        const gift_list =  gift_store.state.data.gift_center.center_current.gift_list //kind:1, type:0,
        const kind = gift_list.kind //礼包来源：1 TT礼包， 2 公会礼包
        const type = gift_list.type //礼包类型: 1为激活码，2为游戏礼包
        $$('title').text(filterCenterKind(kind) + filterCenterType(type));
    }

     //礼包激活验证码
    if (page.name === 'index-gift-activation-page') {
        $$('title').text('礼包激活验证码');
    }

      //礼包详情页
    if (page.name === 'index-gift-detail-page') {
        $$('title').text('礼包详情页');
    }

    if (page.name === 'index-gift-guild-page') {
         $$('title').text('拥有该礼包的公会');
    }

      //会长申请公会礼包页面
    if (page.name === 'index-gift-apply-page') {
         $$('title').text('申请公会礼包');
    }
    
    if (page.name === 'index-guild-devote-page') {
         $$('title').text('公会贡献加成');
    }
    if (page.name === 'index-guild-level-page') {
         $$('title').text('公会星级加成');
    }
    if (page.name === 'index-store-page') {
         $$('title').text('公会商店');
    }
    if (page.name === 'index-store-detail-page') {
        const gift_name =  guild_store.state.data.current.gift_name //obj
        if(gift_name) $$('title').text(gift_name+'详情');
    }
    if (page.name === 'index-store-search-page') {
         $$('title').text('商品搜索页');
    }
    //提交报错信息页面到接口
    try{
        _vr(page.name);
    }catch(e){}
    //关闭跳转页面关闭所有弹框
    myApp.closeModal()
})
/*
    用户的本地的分享数据
    获取本地的图片等
    获取方法:guild_store.state.data.user
    user:{
            uid: '1965630', ··
        }
    获取方法:guild_store.state.data.share_data
    share_data:{
        uri:'http://app.52tt.com/project/guild_system/index.html',
        pageName:'',//跳转入口页面
        gift_id:0, //商品详情id
        guildStarIcons:[
            {
                level:0,
                icon:'',
            }
        ]
    }
*/
currentGuserInfo(guild_store,{},function(){
    //showToast(JSON.stringify(guild_store.state.data.share_data))
})
//隐藏titlebar
myWebview.setRightTextVisibility(false)
/*
    多入口, 初始化默认首页
    demo: http://app.52tt.com/project/guild_system/index.html?pageName=index-guild-level-page
    page 默认跳转公会星级页面
    page 商店中心入口  pageName=index-store-page
    page 商店礼包详情  pageName=index-store-detail-page
    page 礼包中心页面  pageName=index-gift-center-page
    page 公会星级页面  pageName=index-guild-level-page
    page 礼包中心礼包详情页面  pageName=index-gift-detail-page
 */
// let shareData = getShareData(); //在挂载页面之前获取pageName 挂载之后可直接从guild_store获取数据
// let partialData = _.find(shareData.data, function(item){ 
//     let re = /guild_system\/index\.html/; //公会体系
//     let uri =  item.uri ? '' + item.uri : '';
//     return re.test(uri); 
//     // return item.uri == 'http://app.52tt.com/project/game_zone/index.html';
// })
// let pageName = (partialData && partialData.hasOwnProperty('pageName')) 
//     ? partialData.pageName : formatParmters().pageName;
// if (pageName) {
//     if(pageName === 'index-store-page' ){
//         myApp.redictNewPage(pageName, true, true, false, false) //带上头部navbar
//     }else if(pageName === 'index-gift-center-page'){
//         myApp.redictNewPage(pageName, true, false, false, false) //只带上头部navbar
//     }else if(pageName === 'index-store-detail-page'){
//         myApp.redictNewPage(pageName, false, true, false, false) //只带上底部toolbar
//     }else{
//         myApp.redictNewPage(pageName, false, false, false, false)
//     }
// }else {
//     myApp.redictNewPage('index-guild-level-page', false, false, false, false)
// }

 myApp.redictNewPage('debug-api', false, false)

