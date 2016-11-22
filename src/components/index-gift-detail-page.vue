<template>
    <div class="index-gift-detail-page page-content" >  
        <template v-if="list.gift_id">   
            <detail-head  :list="list" :kind="kind" :gift_list="gift_list" :fetch_info="fetch_info" user="user" :position="'home'"></detail-head>
            <detail-info :list="list"></detail-info>
            <store-receive-list></store-receive-list> 
            <detail-game-button :val="list"></detail-game-button> 
        </template>
        <no-data :msg="'暂无礼包详情'" v-else></no-data>      
    </div>
</template>

<script>
    import store from '../store/dispatch/gift-center';
    import detail_game_button  from "./common-commponents/detail-game-button.vue"; // 打开游戏按钮
    import detail_head  from "./gift-detail-commponents/detail-head.vue"; // 礼包头部信息
    import detail_info  from "./gift-detail-commponents/detail-info.vue"; // 礼包基本信息
    import store_receive_list  from "./gift-detail-commponents/store-receive-list.vue";
    import { centerSingleGiftInfo } from '../store/actions/gift-center';
    import no_data  from "./common-commponents/no-data.vue"; // 暂无数据
     // 领取记录列表
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            kind(){
                return store.state.data.gift_center.gift_detail.kind;
            },
            list() {
                if(this.kind==1){
                    return store.state.data.gift_center.gift_detail.tt_gift_info;
                }
                else{
                    return store.state.data.gift_center.gift_detail.guild_gift_info;  
                }
            },
            fetch_info(){
                return store.state.data.gift_center.fetch_info;
            },
            gift_list(){
                return store.state.data.gift_center.fetch_info.gift_list;  
            },
            user(){
                return store.state.data.user;  
            }

        },
        methods: {
            
        },
        components: {
            'detail-game-button': detail_game_button,
            'detail-head': detail_head,
            'detail-info': detail_info,
            'store-receive-list': store_receive_list,
            'no-data':no_data
        },
        mounted () {
            if(store.state.data.share_data.pageName=='index-gift-detail-page' ){
                let obj = {}
                obj.gift_id = store.state.data.share_data.gift_id
                obj.kind = store.state.data.share_data.kind
                centerSingleGiftInfo(store,obj)
            }
            // 延迟图片加载
            /*setTimeout(function(){
                myApp.initImagesLazyLoad('#index-gift-detail-page');
            },200)*/
        }
    }
</script>
<style lang="less" scoped>
    #index-gift-detail-page{ padding-bottom:0;
        span.progressbar{ width:90px; margin-right:5px;}
    }
    .item-content{
            padding-bottom:44px;
        }
</style>