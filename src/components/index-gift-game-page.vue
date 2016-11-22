<template>
    <div class="index-gift-game-page page">

        <!-- 礼包tab，TT礼包/公会礼包
                    toggleTab:切换tab回调事件
                    active:当前tab,1 TT礼包， 2 公会礼包-->
        <div class="index-gift-game-page-top">            
            <gift-tab
                    :toggleTab="toggleTab"
                    :active="kind"/>
        </div>

        <div class="tabs-animated-wrap" >
            <div class="tabs" id="tabs-animated-wrap">

                <!-- 上拉组件 -->
                <div class="page-content infinite-scroll tab" data-distance="300" :class="{active:kind==1}">

                    <!-- 礼包列表，TT礼包，激活码/游戏礼包
                            list:礼包列表
                            user:用户信息
                            empty:礼包列表为空时显示的文本
                            kind:礼包来源：1 TT礼包， 2 公会礼包
                            position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')-->
                        <gift-list
                                :list="tt_list"
                                :user="user"
                                :empty='empty'
                                :kind="1"
                                :position='"game"'></gift-list>
                </div>
                <!-- 上拉组件 -->    
                <div class="page-content infinite-scroll tab" data-distance="300" :class="{active:kind==2}">

                    <!-- 礼包列表，公会礼包，激活码/游戏礼包
                            list:礼包列表
                            user:用户信息
                            empty:礼包列表为空时显示的文本
                            kind:礼包来源：1 TT礼包， 2 公会礼包
                            position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')-->
                        <gift-list
                                :list="guild_list"
                                :user="user"
                                :empty='empty'
                                :kind="2"                                
                                :position='"game"'></gift-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store/dispatch/gift-center';
    import { centerTTGift , centerGuildGift , centerGiftGidList , centerGiftListPosition} from '../store/actions/gift-center.js'
    import gift_list  from "./gift-commponents/gift-list.vue"; // 礼包列表
    import gift_tab  from "./gift-commponents/gift-tab.vue"; // tabbar:tt礼包/公会礼包
    import { showToast , formatParmters , jumpLink , swiperTab , filterCenterGiftList}  from "../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
                kind: store.state.data.gift_center.center_current.game.kind || 1, // 礼包来源：1 TT礼包， 2 公会礼包
                obj:{
                    gid:store.state.data.gift_center.center_current.game.gid
                },
                empty:' '
            }
        },
        computed: {
            tt_list() {

                let vue_this = this;
                let list = []
                let filterList = []

                //筛选出包含对应gid的TT礼包列表
                list = store.state.data.gift_center.gid_list.tt_gift.list
                filterList = filterCenterGiftList(list,'gid',vue_this.obj.gid)
                return filterList
            },
            guild_list() {


                let vue_this = this;
                let list = []
                let filterList = []

                //筛选出包含对应gid的公会礼包列表
                list = store.state.data.gift_center.gid_list.guild_gift.list
                filterList = filterCenterGiftList(list,'gid',vue_this.obj.gid)
                return filterList
            },
            user() {
                return store.state.data.user
            }
        },
        methods: {
            //切换标签 传给子组件gift-tab的方法
            toggleTab(tab) {
                let vue_this = this;
                vue_this.obj.kind = tab;
                vue_this.kind = tab;

                //滑动tab
                swiperTab('#index-gift-game-page #tabs-animated-wrap',tab-1,'#index-gift-game-page #tabs-animated-wrap',500)
                
                if(tab == 1 && vue_this.tt_list.length === 0){
                    vue_this.empty = ' '
                    vue_this.obj.toggleFirst = true; //标志，第一次切换tab
                    
                    setTimeout(() =>{
                        centerGiftGidList(store,vue_this.obj,function(){
                            centerTTGift(store,vue_this.obj,function(){
                                
                                vue_this.obj.toggleFirst = false;
                                vue_this.empty = '暂无该游戏礼包'
                                
                                // 延迟图片加载
                                setTimeout(function(){
                                    myApp.initImagesLazyLoad('#index-gift-game-page');
                                },500)
                            })
                        })
                    },400)
                
                }
                
                if(tab == 2 && vue_this.guild_list.length === 0){
                    vue_this.empty = ' '
                    vue_this.obj.toggleFirst = true; //标志，第一次切换tab
                    
                    setTimeout(() =>{
                        centerGiftGidList(store,vue_this.obj,function(){
                            centerGuildGift(store,vue_this.obj,function(){
                                vue_this.obj.toggleFirst = false;

                                // 延迟图片加载
                                setTimeout(function(){
                                    myApp.initImagesLazyLoad('#index-gift-game-page');
                                },500)
                                vue_this.empty = '暂无该游戏礼包'

                            })
                        })
                    },400)
                
                }

                if(!vue_this.obj.toggleFirst){
                    //滑动tab
                    swiperTab('#index-gift-game-page #tabs-animated-wrap',tab-1,'#index-gift-game-page #tabs-animated-wrap',500)
                    vue_this.kind = tab;
                }

            },
        },
        components: {
            "gift-list" : gift_list,
            "gift-tab" : gift_tab
        },
        mounted () {
            let vue_this = this
            // 延迟图片加载
            setTimeout(function(){
                myApp.initImagesLazyLoad('#index-gift-game-page');
            },300)
            centerGiftListPosition(store,{position:'game'})

                if(vue_this.kind == 1){                
                    centerGiftGidList(store,vue_this.obj,function(){
                        centerTTGift(store,vue_this.obj,function(){
                            // 延迟图片加载
                            setTimeout(function(){
                                myApp.initImagesLazyLoad('#index-gift-game-page');
                            },300)
                            vue_this.empty = '暂无该游戏礼包'
                        })
                    })
                }else if(vue_this.kind == 2){
                    centerGiftGidList(store,vue_this.obj,function(){
                        centerGuildGift(store,vue_this.obj,function(){
                            // 延迟图片加载
                            setTimeout(function(){
                                myApp.initImagesLazyLoad('#index-gift-game-page');
                            },300)
                            vue_this.empty = '暂无该游戏礼包'
                            
                        })
                    })
                }

            //滑动tab
            swiperTab('#index-gift-game-page #tabs-animated-wrap',vue_this.kind-1,'#index-gift-game-page #tabs-animated-wrap',200)

        },
        updated(){
            let vue_this = this
            let loadFlag = false
            let queryStr = '#index-gift-game-page .infinite-scroll';
            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(queryStr);
            $$(queryStr).on('infinite', function () {
                // 加载中，避免重复触发
                if(loadFlag) return;
                loadFlag = true;

                vue_this.obj.kind = vue_this.kind;
                
                if(vue_this.kind == 1){                
                    centerTTGift(store,vue_this.obj,function(){
                        // 延迟图片加载
                        setTimeout(function(){
                            myApp.initImagesLazyLoad('#index-gift-game-page');
                        },300)
                        
                    },'bottom')
                }else if(vue_this.kind == 2){
                    centerGuildGift(store,vue_this.obj,function(){
                        // 延迟图片加载
                        setTimeout(function(){
                            myApp.initImagesLazyLoad('#index-gift-game-page');
                        },300)
                        
                    },'bottom')
                }
                console.log('loading');  
            })
        }
    }
</script>
<style lang="less" scoped>
@import url('../../assets/less/varsbank.less'); 

.index-gift-game-page{
    padding-top: 44px;
    .search-content{
        margin-bottom: 1px;
    }
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