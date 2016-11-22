<template>
    <div class="index-gift-tt-page page">

        <!-- 上拉组件 -->
        <div class="page-content infinite-scroll" data-distance="100">

            <!-- 礼包列表，TT礼包/公会礼包，激活码/游戏礼包
                    list:礼包列表
                    user:用户信息
                    empty:礼包列表为空时显示的文本
                    kind:礼包来源：1 TT礼包， 2 公会礼包-->
            <gift-list
                    :list="gift_list"
                    :user="user"
                    :kind="kind"></gift-list>
        </div>

    </div>
</template>

<script>
    import store from '../store/dispatch/gift-center';
    import { centerTTGift , centerGuildGift , centerGiftList , centerGiftListPosition} from '../store/actions/gift-center.js'
    import gift_list  from "./gift-commponents/gift-list.vue"; // 礼包列表
    import { showToast , formatParmters , jumpLink , filterCenterGiftList}  from "../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
                type: store.state.data.gift_center.center_current.gift_list.type, //礼包类型: 1为激活码，2为游戏礼包
                kind: store.state.data.gift_center.center_current.gift_list.kind, // 礼包来源：1 TT礼包， 2 公会礼包
                obj:{
                    kind:store.state.data.gift_center.center_current.gift_list.kind,
                    type:store.state.data.gift_center.center_current.gift_list.type
                },

            }
        },
        computed: {
            gift_list() {
                let vue_this = this;
                let list = []
                let filterList = []

                if(vue_this.kind == 1){
                    //筛选出包含对应type的TT礼包列表
                    list = store.state.data.gift_center.tt_gift.list
                    filterList = filterCenterGiftList(list,'type',vue_this.type)
                    return filterList
                }

                //筛选出包含对应type的公会礼包列表
                list = store.state.data.gift_center.guild_gift.list
                filterList = filterCenterGiftList(list,'type',vue_this.type)
                return filterList
            },
            user() {
                return store.state.data.user
            }
        },
        methods: {
            lazyLoad(){
                // 延迟图片加载
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-gift-tt-page');
                },500)
            },
        },
        components: {
            "gift-list" : gift_list
        },
        mounted () {
            let vue_this = this
            centerGiftListPosition(store,{position:'home'})
            vue_this.lazyLoad()
            if(vue_this.gift_list.length <= 0){                
                // 更新TT礼包数据
                centerGiftList(store,vue_this.obj,function(){                
                    if(vue_this.kind == 1){
                        centerTTGift(store,vue_this.obj,vue_this.lazyLoad)
                    }else{ //更新公会礼包数据
                        centerGuildGift(store,vue_this.obj,vue_this.lazyLoad)
                    }
                })
            }

            vue_this.loadFlag = false
            let queryStr = '#index-gift-tt-page .infinite-scroll';
            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(queryStr);
            $$(queryStr).on('infinite', function () {
                // 加载中，避免重复触发
                if(vue_this.loadFlag) return;
                vue_this.loadFlag = true;

                // 更新TT礼包数据
                if(vue_this.kind == 1){
                    centerTTGift(store,vue_this.obj,()=>{
                        vue_this.lazyLoad()
                        vue_this.loadFlag = false
                    },'bottom')
                }else{ //更新公会礼包数据
                    centerGuildGift(store,vue_this.obj,()=>{
                        vue_this.lazyLoad()
                        vue_this.loadFlag = false
                    },'bottom')
                }
                console.log('loading');  
            })
        }
    }
</script>
<style lang="less" scoped>
@import url('../../assets/less/varsbank.less'); 

.index-gift-tt-page{
    .list-block{
        margin: 0;
    }
    
    &-empty{
        text-align: center;
        color: @color-Cgreyl;
        margin-top: 50%;
    }
    .index-gift-tt-page{
        margin-top: 150px;
    }

    .page-content{
        padding-bottom: 0;
    }
}
    
</style>