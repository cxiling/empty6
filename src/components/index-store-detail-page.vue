<template>
   <div class="index-store-detail-page page-content infinite-scroll pull-to-refresh-content " 
        data-distance="100"  data-ptr-distance="55" id="store-detail-list" :style="store_height()">
        <div class="refresh-layer-content" id="store-refresh-list" 
         v-if="store_detail.gift_id">
            <!-- 下拉刷新 -->
            <div class="pull-to-refresh-layer">
                <div class="preloader"></div>
                <div class="pull-to-refresh-arrow"></div>
            </div>
           <detail-head :val="store_detail" :user_info="user_info"></detail-head>
           <store-exchange :val="store_detail"></store-exchange>
           <detail-info :val="store_detail"></detail-info>
           <store-receive-list :record_list="record_list"></store-receive-list>
       </div>
        <no-data :msg="'暂无商品详情'" v-else></no-data>
   </div>
</template>

<script>
    import Vue from 'vue'
    import store from '../store/dispatch/guild-shop'
    import { guildDetail , currentGuildRecordList , guildDetailCurrent } from '../store/actions/guild-shop'
    import detail_head  from "./store-detail-commponnets/detail-head.vue"; // 商店头部
    import detail_info  from "./store-detail-commponnets/detail-info.vue"; // 商店描述
    import store_exchange  from "./store-detail-commponnets/store-exchange.vue"; // 商店描述
    import store_receive_list  from "./store-detail-commponnets/store-receive-list.vue"; // 商店描述
    import detail_game_button from "./common-commponents/detail-game-button.vue"
    import no_data  from "./common-commponents/no-data.vue"; // 暂无数据
    import { filterCenterGiftList , filterCenterGiftTotal } from "../api/computed.js"
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            gift_id(){
                const gift_id = store.state.data.current.gift_id ? store.state.data.current.gift_id 
                :this.share_data.gift_id
               return gift_id
            },
            share_data(){
                const shareData = store.state.data.share_data
                return shareData
            },
            store_detail(){
                return store.state.data.guild_shop.shop_info
            },
            user_info(){
                return store.state.data.user
            },
            record_list(){
                
                const obj = {}
                const gift_id = store.state.data.current.gift_id
                const record_list = store.state.data.guild_shop.record.list
                const total_list = store.state.data.guild_shop.record.total_list
                const total = filterCenterGiftTotal(total_list,'gift_id',gift_id,'total')
                const filterList = filterCenterGiftList(record_list,'gift_id',gift_id)

                obj.list = filterList
                obj.total = total > 0 ? total : 0
                return obj
            }
        },
        methods: {
             store_height(){
                const cheight = $$('body').height()
                return {'height':cheight+'px'}
            },
            title(){
                const gift_name =  store.state.data.current.gift_name //obj
                if(gift_name) $$('title').text(gift_name+'详情');
            },
            mount(){
                //挂载
                const vue_this = this
                const gameButton = new Vue(detail_game_button)
                gameButton.val = vue_this.store_detail
                gameButton.$mount('#index-store-detail-page .toolbar')
                vue_this.title()
            }
        },
        components: {
            'detail-head': detail_head,
            'detail-info': detail_info,
            'store-exchange':store_exchange,
            'store-receive-list':store_receive_list,
            'no-data':no_data
        },
        mounted () {
            //定义参数
            const vue_this = this
            const container = '#store-detail-list'
            const reflash = '#store-refresh-list'
            const gift_id = vue_this.gift_id
            const obj ={
                gift_id:gift_id
            }
            let loadFlag = false
            //请求数据
            const p1 = new Promise(function(resolve, reject) {
                guildDetailCurrent(store,obj,function(){
                    guildDetail(store,obj,function(){
                        resolve()
                    })
                })
            })
            p1.then(function(){
                //挂载
                vue_this.mount()
            })
            //初始化
            myApp.initPullToRefresh(container);
            myApp.attachInfiniteScroll(container);
            //监听页面下拉刷新
            $$(container).on('refresh',function(){
                guildDetail(store,obj,'',true)
                setTimeout(function(){
                    myApp.pullToRefreshDone(container);
                },500)
            })
            //监听页面上拉刷新
            $$(container).on('infinite', function () {
                 //加载中，避免重复触发
                if(loadFlag) return;
                loadFlag = true;
                guildDetail(store,obj,function(){
                    loadFlag = false
                    setTimeout(function(){
                      myApp.initImagesLazyLoad(container);
                    },500)
                })
                console.log('loading');  
            })
        },
        updated(){
            
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../assets/less/varsbank.less');  
    #store-detail-list{
        padding-top: 44px;
        margin-top: -44px;
    }
</style>