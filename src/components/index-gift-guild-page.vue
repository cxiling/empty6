<template>
   <div class="page-content index-gift-guild-page infinite-scroll" data-distance="50" >
        <template v-if="guild_list.length !== 0">
            <div class="list-block media-list common-list">
                <!-- 公会列表 -->                
                <ul class="item-content">
                    <template v-for="item in guild_list">
                        <li>
                            <!-- gift:单个公会信息 -->                            
                            <gift-guild-package
                                :guild="item"></gift-guild-package> 
                        </li>
                    </template>
                </ul>
            </div>
        </template>

        <template v-else>
            <div class="index-gift-guild-page-empty">
                暂无公会拥有该礼包
            </div>
        </template> 
   </div>
</template>

<script>
    import store from '../store/dispatch/gift-center';
    import { giftSearch , centerGiftGuild } from '../store/actions/gift-center.js'
    import gift_guild_package  from "./gift-commponents/gift-guild-package.vue"; // 礼包公会
    import { filterCenterGiftList }  from "../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            gift_id() {
                return store.state.data.gift_center.center_current.gift_guild.gift_id
            },
            guild_list() {                

                let vue_this = this;
                let list = []
                let filterList = []

                //筛选出包含对应gift_id的公会
                list = store.state.data.gift_center.gift_guild.list
                filterList = filterCenterGiftList(list,'gift_id',vue_this.gift_id)
                return filterList
            }
        },
        methods: {            
            getData(indicator) {
                let vue_this = this
                let gift_id = vue_this.gift_id
                centerGiftGuild(store, {gift_id:gift_id},function(){
                    // 延迟图片加载
                    setTimeout(function(){
                        myApp.initImagesLazyLoad('#index-gift-guild-page')
                    },300)
                },indicator)
            }
        },
        components: {
            'gift-guild-package': gift_guild_package
        },
        mounted () {
            let vue_this = this
            
            setTimeout(function(){
                myApp.initImagesLazyLoad('#index-gift-guild-page')
            },300)
            //请求第一页
            vue_this.getData()           
        },
        updated(){
            let vue_this = this
            let loadFlag = false
            let queryStr = '#index-gift-guild-page .infinite-scroll';
            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(queryStr);
            $$(queryStr).on('infinite', function () {
                // 加载中，避免重复触发
                if(loadFlag) return;
                loadFlag = true;

                //请求下一页
                vue_this.getData('bottom')
                console.log('loading');  
            })
        }
    }
</script>
<style lang="less" scoped>
@import url('../../assets/less/varsbank.less'); 
    
.index-gift-guild-page{        
    &-empty{
        text-align: center;
        color: @color-Cgreyl;
        margin-top: 50%;
    }
}
</style>