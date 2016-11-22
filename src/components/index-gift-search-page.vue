<template>
   <div class="index-gift-search-page page">   
        <div class="index-gift-search-page-top">
            
            <div class="search-content">
                <search-page :placeholder="'输入礼包关键词搜索'"></search-page>
            </div>

            <!-- 礼包tab，TT礼包/公会礼包
                        toggleTab:切换tab回调事件
                        active:当前tab,1 TT礼包， 2 公会礼包-->
            <div class="index-gift-search-page-tab">                
                <gift-tab
                        :toggleTab="toggleTab"
                        :active="kind"></gift-tab>
            </div>

        </div>    

        <div class="tabs-animated-wrap" >
            <div class="tabs" id="gift-search-tabs-animated-wrap">
                <!-- 上拉组件 -->
                <div class="page-content infinite-scroll tab" data-distance="256" :class="{active:kind==1}">

                    <!-- 礼包列表，TT礼包，激活码/游戏礼包
                            list:礼包列表
                            user:用户信息
                            empty:礼包列表为空时显示的文本
                            kind:礼包来源：1 TT礼包， 2 公会礼包
                            position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')-->
                        <gift-list
                                :list="tt_list"
                                :user="user"
                                :empty="emptyTxt"
                                :kind="1"
                                :position='"search"'></gift-list>
                </div>
                <!-- 上拉组件 -->    
                <div class="page-content infinite-scroll tab" data-distance="256" :class="{active:kind==2}">

                    <!-- 礼包列表，公会礼包，激活码/游戏礼包
                            list:礼包列表
                            user:用户信息
                            empty:礼包列表为空时显示的文本
                            kind:礼包来源：1 TT礼包， 2 公会礼包
                            position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')-->
                        <gift-list
                                :list="guild_list"
                                :user="user"
                                :empty="emptyTxt"
                                :kind="2"
                                :position='"search"'></gift-list>
                </div>
            </div>
        </div>
        
   </div>
</template>

<script>
    import Vue from 'vue';
    // import store from '../store/index'
    import store from '../store/dispatch/gift-center';
    import { centerTTGift , centerGuildGift , centerSearchList , centerGiftListPosition} from '../store/actions/gift-center.js'
    import gift_list  from "./gift-commponents/gift-list.vue"; // 礼包列表
    import gift_tab  from "./gift-commponents/gift-tab.vue"; // tabbar:tt礼包/公会礼包
    import gift_search  from "./common-commponents/search-page.vue"; //搜索框
    import { showToast , formatParmters , jumpLink , filterCenterGiftList , swiperTab }  from "../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
                kind:store.state.data.gift_center.center_current.search.kind, // 礼包来源：1 TT礼包， 2 公会礼包
                obj:{},
                emptyTxt:' ',
                loadFlag:false
            }
        },
        computed: {
            search_info(){
                return store.state.data.gift_center.center_current.search
            },
            tt_list() {
                //筛选出包含关键词的TT礼包列表
                const ttList = store.state.data.gift_center.search_list.tt_gift.list
                const keywords = store.state.data.gift_center.center_current.search.keywords
                const filterList = filterCenterGiftList(ttList,'keywords',keywords)
                return filterList
            },
            guild_list() {
                 //筛选出包含关键词的公会礼包列表
                const guildList = store.state.data.gift_center.search_list.guild_gift.list
                const keywords = store.state.data.gift_center.center_current.search.keywords
                const filterList = filterCenterGiftList(guildList,'keywords',keywords)
                return filterList
            },
            user() {
                return store.state.data.user
            },
        },
        methods: {
            //切换标签 传给子组件gift-tab的方法
            toggleTab(tab) {
                let vue_this = this;
                let tabSt = (tab == 1 && vue_this.obj.keywords.length > 0 && vue_this.tt_list.length === 0)
                let tabNd = (tab == 2 && vue_this.obj.keywords.length > 0 && vue_this.guild_list.length === 0)
                let toggleFlag = tabSt || tabNd //第一次切换tab标志
                vue_this.obj.kind = tab;
                vue_this.kind = tab
                
                if(tabSt){
                    vue_this.obj.toggleFirst = true; //标志，第一次切换tab
                    //滑动tab
                    swiperTab('#gift-search-tabs-animated-wrap',tab-1,'#gift-search-tabs-animated-wrap',500)
                    vue_this.emptyTxt = ' '
                    
                    setTimeout(function(){
                        centerSearchList(store,vue_this.obj,function(){
                            centerTTGift(store,vue_this.obj,function(){
                                vue_this.emptyTxt = ''
                                vue_this.obj.toggleFirst = false

                            })
                        })
                    },400)
                }

                if(tabNd){
                    vue_this.obj.toggleFirst = true; //标志，第一次切换tab
                    //滑动tab
                    swiperTab('#gift-search-tabs-animated-wrap',tab-1,'#gift-search-tabs-animated-wrap',500)
                    vue_this.emptyTxt = ' '
                    
                    setTimeout(function(){
                        centerSearchList(store,vue_this.obj,function(){
                            centerGuildGift(store,vue_this.obj,function(){
                                vue_this.emptyTxt = ''
                                vue_this.obj.toggleFirst = false

                            })
                        })
                    },400)

                }

                if(!toggleFlag){
                    swiperTab('#gift-search-tabs-animated-wrap',tab-1,'#gift-search-tabs-animated-wrap',500)
                    setTimeout(function(){
                        centerSearchList(store,vue_this.obj,function(){})
                    },400)
                }
            },

            search(){
                let vue_this = this
                let $tab = $$('.index-gift-search-page-tab')
                myApp.searchbar('.searchbar-form',function(keywords){

                    vue_this.obj.keywords = keywords
                    vue_this.obj.kind = vue_this.kind

                    $$('#index-gift-search-page .infinite-scroll').scrollTop(0) // 滚回顶部
                    
                    if($tab.hasClass('hidden')){
                        $tab.removeClass('hidden')
                    }

                    vue_this.emptyTxt = '搜索中......'
                    if(vue_this.kind == 1){  
                        centerSearchList(store,vue_this.obj,function(){
                            centerTTGift(store,vue_this.obj,function(){
                                //显示结果
                                vue_this.emptyTxt = ''

                                swiperTab('#gift-search-tabs-animated-wrap',vue_this.kind-1,'#gift-search-tabs-animated-wrap',500)
                            })
                        })
                    }
                    if(vue_this.kind == 2){  
                        centerSearchList(store,vue_this.obj,function(){
                            centerGuildGift(store,vue_this.obj,function(){
                                //显示结果
                                vue_this.emptyTxt = ''

                                swiperTab('#gift-search-tabs-animated-wrap',vue_this.kind-1,'#gift-search-tabs-animated-wrap',500)
                            })
                        })
                    }
                })
            },
            lazyLoad(){
                // 延迟图片加载
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-gift-search-page');
                },300)
            }
        },
        components: {
            'search-page': gift_search,
            'gift-list': gift_list,
            'gift-tab': gift_tab
        },
        mounted () {
            //搜索输入框
            let vue_this = this
            let queryStr = '#index-gift-search-page .infinite-scroll';

            centerGiftListPosition(store,{position:'search'})

            if(vue_this.tt_list.length === 0 && vue_this.guild_list.length === 0){
                $$('.index-gift-search-page-tab').addClass('hidden')
                vue_this.emptyTxt = ' '
            }else{
                vue_this.lazyLoad()
            }

            vue_this.search()

            swiperTab('#gift-search-tabs-animated-wrap',vue_this.tab-1,'#gift-search-tabs-animated-wrap',500)

            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(queryStr);
            $$(queryStr).on('infinite', function () {
                // 加载中，避免重复触发
                // if(vue_this.loadFlag) return;
                vue_this.loadFlag = true;

                if(vue_this.kind == 1){
                    
                    centerTTGift(store,vue_this.obj,()=>{
                        vue_this.loadFlag = false;
                    },'bottom')

                }else if(vue_this.kind == 2){

                    centerGuildGift(store,vue_this.obj,()=>{
                        vue_this.loadFlag = false;
                    },'bottom')
                }
                console.log('loading');  
            })
        },
        updated(){
            let vue_this = this
            vue_this.lazyLoad()
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../assets/less/varsbank.less');  

    .index-gift-search-page{
        padding-top: 92px;
        .page-content{
            padding-top: 0;
            padding-bottom: 0;
        }
        &-top{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    }
    .hidden{
        display: none;
    }
</style>