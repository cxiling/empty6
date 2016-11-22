<template>
   <div class="store-search-page">
        <div class="search-content">
            <search-page :placeholder="placeholder" ></search-page>
        </div>
        <div class="zone-content page-content infinite-scroll pull-to-refresh-content" 
            data-distance="100" id="zone-search-list" data-ptr-distance="55">
            <div class="refresh-layer-content " 
            id="store-refresh-list">
                 <!-- 下拉刷新 -->
                <div class="pull-to-refresh-layer">
                    <div class="preloader"></div>
                    <div class="pull-to-refresh-arrow"></div>
                </div>
                <store-zone-list  
                :guild_list="guild_list" 
                :user_info="user_info" 
                v-if="guild_list.length">
                </store-zone-list>
                <no-data  :msg="tips" v-if="!guild_list.length && keywords"></no-data>
            </div>
        </div>
   </div> 
</template>

<script>
    import store from '../store/dispatch/guild-shop.js'
    import { guildSearch , currentGuildKeywords } from '../store/actions/guild-shop.js'
    import search_page  from "./common-commponents/search-page.vue"; //搜索框
    import store_zone_list  from "./store-commponents/store-zone-list.vue"; //搜索游戏专区列表
    import no_data from './common-commponents/no-data.vue'
    import { filterGidList , filterCenterGiftList , rejectFilterGift } from '../api/computed.js'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                tips:'暂无商品',
                obj:{},
                container:'#zone-search-list',
                reflash:'#store-refresh-list'
            }
        },
        computed: {
            keywords(){
                return store.state.data.current.keywords
            },
            guild_list() {
                const keywords = store.state.data.current.keywords
                const search_list = store.state.data.guild_shop.search_list.list
                const guildList = filterCenterGiftList(search_list,'keywords',keywords)
                const rejectGuildList = rejectFilterGift(guildList,{status:3})
                return rejectGuildList
            },
            user_info(){
                return store.state.data.user
            },
            placeholder(){
                return (this.guild_list.length && this.keywords) ? this.keywords : '输入商品关键词搜索'
            }
        },
        methods: {
            imageLazy(){
                const vue_this = this
                setTimeout(function(){
                    myApp.initImagesLazyLoad(vue_this.container);
                },300)
            },
            search(){
                const vue_this = this
                myApp.searchbar('.searchbar-form',function(query){
                    vue_this.obj.keywords = query
                    currentGuildKeywords(store,query,function(){
                        vue_this.tips = '搜索中··'
                        const p1 = new Promise(function(resolve, reject) {
                            guildSearch(store,vue_this.obj)
                            resolve()
                        })
                        p1.then(function(){
                            setTimeout(function(){
                                vue_this.toast()
                            },500)
                        })
                    })
                })
            },
            toast(){
                const vue_this = this
                const guild_list = vue_this.guild_list
                if(guild_list.length){ 
                    vue_this.tips = '搜索完毕'
                }else{
                    vue_this.tips = '暂无相关商品'
                }
                vue_this.imageLazy(vue_this.container)
            }
        },
        components: {
            'search-page': search_page,
            'store-zone-list':store_zone_list,
            'no-data':no_data
        },
        mounted () {
            //搜索输入框
            this.search()
            const vue_this = this
            let loadFlag = false
            const container = vue_this.container
            const reflash = vue_this.reflash
            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(container);
            myApp.initPullToRefresh(container);
            $$(container).on('infinite', function () {
                 //加载中，避免重复触发
                // if(loadFlag) return;
                loadFlag = true;
                guildSearch(store,vue_this.obj,function(){
                    loadFlag = false
                    vue_this.imageLazy(container)
                })
                console.log('loading');  
            })
            //监听页面上拉刷新
            $$(container).on('refresh',function(){
                guildSearch(store,vue_this.obj,'',true)
                setTimeout(function(){
                    myApp.pullToRefreshDone(container);
                },500)
            })
            vue_this.imageLazy(vue_this.container)
        },
        updated(){
            const vue_this = this
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../assets/less/varsbank.less');  
    #index-store-search-page{
        .store-search-page{
            height: 100%;
            .search-content{
                position: absolute;
                width: 100%;
                margin-bottom: 4px;
                z-index: 999;
            }
            .page-content{
                padding-top: 46px;
                // padding-bottom: 44px;
            }
        }
    }
</style>