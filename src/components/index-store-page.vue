<template>
    <div class="page-content infinite-scroll pull-to-refresh-content"  v-if="gift_list.length" id="store-content" 
    data-distance="100" data-ptr-distance="55" :style="store_height()"> 
        <!-- 下拉刷新 -->
        <div class="pull-to-refresh-layer">
            <div class="preloader"></div>
            <div class="pull-to-refresh-arrow"></div>
        </div>
        <store-head-info></store-head-info>
        <div class="tabs-container" id="tabs-container">
            <div class="tabs-animated-wrap" >
                <div class="tabs" id="tabs-animated-wrap">
                           <div class="tabs-content tab active "  
                           v-for="(val,index) in gift_list">
                                <template v-if="val.length">
                                    <store-hot-list 
                                    :gift_list="val" :user_info="user_info" 
                                    :class="'hot-content-'+index"></store-hot-list>
                                </template>
                                <no-data :msg="msg" :class="'hot-content-'+index" v-else></no-data>
                           </div>
                    </div>
            </div>
        </div>
   </div>
</template>

<script>
    import Vue from 'vue';
    import store from '../store/dispatch/guild-shop';
    import { filterGiftList , filterShopList , swiperNav , filterOrderSortList , jumpLink , rejectFilterGift } from "../api/computed.js";
    import { guildInit , currentGuildIndex , currentGuserInfo } from '../store/actions/guild-shop';
    import store_head_info  from "./store-commponents/store-head-info.vue"; // 公会商店头部信息
    import store_hot_list  from "./store-commponents/store-hot-list.vue"; //商店热门信息
    import store_sticky  from "./store-commponents/store-sticky.vue"; // 公会置顶
    import no_data  from "./common-commponents/no-guild-data.vue"; // 暂无数据
    import store_sort_list  from "./store-commponents/store-sort-list.vue"; // 公会商店分类
    export default{
        data() {
            return {
                img_path:'assets/img/',
                msg:{
                    tip:'会长还没添加商品到商店哦',
                    info:{
                        pageName:'index-gift-center-page',
                        title:'去礼包中心逛逛'
                    }
                },
                obj:{
                    type:0,
                    source:0
                }
            }
        },
        computed: {
            gift_total(){
              const gift_total = store.state.data.guild_shop.gift_total
              const gift_filter_total = filterOrderSortList(gift_total)
              return gift_filter_total
            },
            gift_list(){

                let vue_this = this
                let gift_total = this.gift_total
                let gift_list = []

                $$.each(gift_total,function(index, item) {
                    let itemList = vue_this.gift_list_filter(item.type,item.source)
                    gift_list.push(itemList)
                });

                return gift_list
            },
            parameter(){
               return store.state.data.current.partermter
            },
            user_info(){
                return store.state.data.user
            },
            share_data(){
                return store.state.data.share_data
            }
        },
        methods: {
            gift_list_filter(type,source){
                let guild_list = store.state.data.guild_shop.gift.list
                let types = type ? type : 0
                let sources = source ? source : 1
                let gift_list = filterGiftList(guild_list,types,sources)
                let rejectList = rejectFilterGift(gift_list,{status:3},'profile')
                return rejectList
            },
            store_height(){
                const cheight = $$('body').height()+44
                return {'height':cheight+'px'}
            }
        },
        components: {
            'store-head-info': store_head_info,
            'store-hot-list': store_hot_list,
            'no-data':no_data,
            'store-sort-list':store_sort_list
        },
        mounted () {

            const vue_this = this
            
            //加载底部按钮上滑动
            const indexStoreStickyPage = new Vue(store_sticky)
            indexStoreStickyPage.$mount('#index-store-page .toolbar')
            // //加载顶部nav
            const indexStoreHeadPage = new Vue(store_sort_list)
            indexStoreHeadPage.$mount('#index-store-page .navbar')
            
            // const indexStore2 = new Vue(store_sort_list)
            // indexStore2.$mount('#sort-content')
            currentGuildIndex(store,vue_this.obj,function(){
                //请求初始化数据
                guildInit(store,{},function(){
                    // 延迟图片加载
                    setTimeout(function(){
                        myApp.initImagesLazyLoad('#index-store-page');
                    },300)
                    console.log('loading');  
                })
            })
        },
        updated(){
             // console.log(this.gift_filter_list)
           
        }
    }
</script>
<style lang="less">
    @import url('../../assets/less/varsbank.less');  
    #index-store-page{
       background: @color-Cbg;
       .page-content{
         overflow-x: hidden;
         padding-bottom: 0;
       }
       #store-content{
            margin-top: -44px;
            padding-top: 44px;
       }
       #tabs-container{
            margin-top: 4px;
            .tabs-content{
                background: @color-Cbg;
            }
       }
    }
</style>