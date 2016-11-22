<template>

    <div class="page-content">
        <template v-if="zone && zone.gid == gid">
            <area-head :zone="zone"></area-head>

            <area-notice :zone="zone"></area-notice>

            <area-information :zone="zone"></area-information>

            <area-introduction :zone="zone"></area-introduction>

            <area-benefits :zone="zone"></area-benefits>
            
            <area-gift-page :zone="zone"></area-gift-page>

            <area-active :zone="zone"></area-active>
            
            <area-guild :zone="zone"></area-guild>
            
            <area-others :zone="zone"></area-others>

        </template>
        <template v-else>
            <no-data :msg="'暂无该游戏圈'"></no-data>
        </template>
    </div>
    
</template>


<script>
    import  Vue from 'vue'
    import store from '../store/dispatch/game-area'
    import { setAreaData , updateCurrentGameState  , updateCurrentGameDownloadProgress } from '../store/actions/game-area'
    import { filterCenterGiftList } from '../api/computed.js';
    import areaHead from './game-commponnets/head.vue' //头部组件
    import areaNotice from './game-commponnets/notice.vue' //公告组件
    import areaInformation from './game-commponnets/open_information.vue' //开服信息
    import areaIntroduction from './game-commponnets/game_introduction.vue' //游戏简介 -->子子组件 shot_list.vue 
    import areaBenefits from './game-commponnets/benefits_list.vue' //头部组件
    import areaGiftPage from './game-commponnets/game-gift-game.vue' //头部组件
    import areaActive from './game-commponnets/activity_list.vue' //头部组件
    import areaGuild from './game-commponnets/guild_list.vue' //头部组件
    import areaOthers from './game-commponnets/active_game_list.vue' //头部组件
    import areaDownload from './common-commponents/game_download.vue' //关注下载组件
    import no_data  from "./common-commponents/no-data.vue"; // 暂无数据    
    export default {
        computed: {
            gid(){
                return store.state.data.user.gid
            },
            status(){
                return this.zone.game.status
            },
            area_list(){
                return store.state.zone_list
            },
            zone(){
                const gid = store.state.data.user.gid
                const zoneList = filterCenterGiftList(store.state.zone_list,'gid',gid)
                return zoneList.length ? zoneList[0]:store.state.zone
            }
        },
        methods: {
          
        },
        // events: {
        //     'update-game-status': function () {
        //         store.actions.updateCurrentGameState()
        //         console.log('time 3')
        //         return true
        //     },
        //     'update-follow-status': function() {
        //         store.actions.setUserFollowState()
        //         console.log('time 3')
        //         return true
        //     },
        //     'update-follow-status-only': function() {
        //         store.actions.setUserFollowStateOnly()
        //         console.log('time 3')
        //         return true
        //     },
        //     'update-diamond': function () {
        //         store.actions.updateUserDiamond()
        //     },
        //     'delete-guild-recruit': function(recruit_id) {
        //         store.actions.deleteGuildRecruit(recruit_id)
        //     },
        //     'praise-guild-recruit': function(recruit_id) {
        //         store.actions.updateGuildRecruit(recruit_id)
        //     },
        //     // 'download-button-ready': function() {
        //     //     console.log('customize event back');
        //     //     $$('.lottery-click').on('click',function(){
        //     //         console.log('event trigger click ');
        //     //         $$('#down-game').trigger('click');
        //     //     })
        //     // },
        // },
        components: {
          'area-head':areaHead,
          'area-notice':areaNotice,
          'area-information':areaInformation,
          'area-introduction':areaIntroduction,
          'area-benefits':areaBenefits,
          'area-active':areaActive,
          'area-guild':areaGuild,
          'area-download':areaDownload,
          'area-gift-page':areaGiftPage,
          'area-others':areaOthers,
          'no-data':no_data
        },
        mounted(){
            const vue_this = this
            setTimeout(function(){
                 setAreaData(store,function(){
                    const downGameButton = new Vue(areaDownload)
                    downGameButton.type = 'long'
                    downGameButton.item = vue_this.status
                    downGameButton.$mount('#index-game-area-page>.toolbar')
                })
             },0)
            setTimeout(function(){
                myApp.initImagesLazyLoad('#index-game-area-page');
            },500)
        }
    }
</script>
<style lang="less" scoped>
  @import url('../../assets/less/varsbank.less');
  #area-index{
    background: @color-Cbg;
    .page-content{
      padding-bottom: 100/2px+16px;
    }
  }
</style>
