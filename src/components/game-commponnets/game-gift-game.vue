<template>
    <div class="game-gift-game" id="gift-game-page" v-if="tt_list.length || guild_list.length">

        <!-- 礼包tab，TT礼包/公会礼包
                    toggleTab:切换tab回调事件
                    active:当前tab,1 TT礼包， 2 公会礼包-->
        <div class="game-gift-game-top">            
            <gift-tab
                    :toggleTab="toggleTab"
                    :active="kind"/>
        </div>

        <div class="tabs-animated-wrap" >
            <div class="tabs" id="tabs-animated-wrap">

                <!-- 上拉组件 -->
                <div class="tab" data-distance="300" :class="{active:kind==1}" >

                    <!-- 礼包列表，TT礼包，激活码/游戏礼包
                            list:礼包列表
                            user:用户信息
                            empty:礼包列表为空时显示的文本
                            kind:礼包来源：1 TT礼包， 2 公会礼包
                            position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')-->
                        <gift-list
                                :list="tt_list.slice(0,2)"
                                :user="user"
                                :empty='empty'
                                :kind="1"
                                :position='"game"'></gift-list>
                        <div class="item-link item-more" @click="linkMore(1)" 
                            v-if="tt_list.length >= 2">
                            <a>更多礼包</a>
                        </div>
                </div>
                <!-- 上拉组件 -->    
                <div class="tab" data-distance="300" :class="{active:kind==2}">

                    <!-- 礼包列表，公会礼包，激活码/游戏礼包
                            list:礼包列表
                            user:用户信息
                            empty:礼包列表为空时显示的文本
                            kind:礼包来源：1 TT礼包， 2 公会礼包
                            position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')-->
                        <gift-list
                                :list="guild_list.slice(0,2)"
                                :user="user"
                                :empty='empty'
                                :kind="2"                                
                                :position='"game"'></gift-list>
                        <div class="item-link item-more" @click="linkMore(2)" 
                            v-if="guild_list.length >= 2">
                            <a>更多礼包</a>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '../../store/dispatch/gift-center';
    import { centerTTGift , centerGuildGift , centerGiftGidList , centerGiftListPosition} from '../../store/actions/gift-center.js'
    import gift_list  from "../gift-commponents/gift-list.vue"; // 礼包列表
    import gift_tab  from "../gift-commponents/gift-tab.vue"; // tabbar:tt礼包/公会礼包
    import { showToast , formatParmters , jumpLink , swiperTab , filterCenterGiftList}  from "../../api/computed.js";
    import hot_game_page from '../gift-commponents/gift-hot-game.vue'
    import guild_game_page from '../gift-commponents/gift-guild-game.vue'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                kind: store.state.data.gift_center.center_current.game.kind || 1, // 礼包来源：1 TT礼包， 2 公会礼包
                obj:{
                    gid:store.state.data.user.gid
                },
                empty:' '
            }
        },
        props:['zone'],
        computed: {
            gid(){
                return store.state.data.user.gid
            },
            name(){
                return this.zone.game.profile.name;
            },
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
                swiperTab('#tabs-animated-wrap',tab-1,'#tabs-animated-wrap',500)
                
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
                    swiperTab('#tabs-animated-wrap',tab-1,'#tabs-animated-wrap',500)
                    vue_this.kind = tab;
                }

            },
            //跳转游戏查询礼包
            linkMore(kind){
                const hot_game = kind == 1 ? new Vue(hot_game_page) : new Vue(guild_game_page)
                const gid = this.gid
                const game_name = this.name
                hot_game.toGidGiftList(gid,game_name)
            }
        },
        components: {
            "gift-list" : gift_list,
            "gift-tab" : gift_tab
        },
        mounted () {
            let vue_this = this
            // 延迟图片加载
           
            centerGiftListPosition(store,{position:'game'})

                if(vue_this.kind == 1){                
                    centerGiftGidList(store,vue_this.obj,function(){
                        centerTTGift(store,vue_this.obj,function(){
                            // 延迟图片加载
                            setTimeout(function(){
                                myApp.initImagesLazyLoad('#index-game-area-page');
                            },300)
                            vue_this.empty = '暂无该游戏礼包'
                        })
                    })
                }else if(vue_this.kind == 2){
                    centerGiftGidList(store,vue_this.obj,function(){
                        centerGuildGift(store,vue_this.obj,function(){
                            // 延迟图片加载
                            setTimeout(function(){
                                myApp.initImagesLazyLoad('#index-game-area-page');
                            },300)
                            vue_this.empty = '暂无该游戏礼包'
                            
                        })
                    })
                }

            //滑动tab
            swiperTab('#tabs-animated-wrap',vue_this.kind-1,'#tabs-animated-wrap',200)
        },
        updated(){
            let vue_this = this
             setTimeout(function(){
                myApp.initImagesLazyLoad('#index-game-area-page');
            },800)
        }
    }
</script>
<style lang="less" scope>
@import url('../../../assets/less/varsbank.less'); 

#gift-game-page{
    margin-bottom: 6pt;
    .search-content{
        margin-bottom: 1px;
    }
    .gift-list{
        position: relative;
        &-empty{
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            text-align: center;
            color: @color-Cgreyl;
            margin: 10%;
        }
    }
    .item-more{
        .flexbox();
        .align-items(center);
        .justify-content(center);
        height: 40pt*@pt;
        background:@color-Cmore;
        a{
            display: block;
            color:#1ed282;
            font-size:13pt*@pt;
        }
         &.active-state{
            background:@color-Cbg2;
        }
    }
    #tabs-animated-wrap{
    }
}
.hidden{
    display: none;
}  
</style>